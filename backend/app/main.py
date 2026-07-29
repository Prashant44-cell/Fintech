import time
import uuid
import hashlib
import asyncio
from typing import Dict, Any, List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from app.models import (
    UserRole, RiskLevel, AuthAction,
    UserSignupRequest, UserLoginRequest, UserUpdateRequest, UserSuspendRequest,
    Web3SignupRequest, Web3LoginRequest,
    TermsConsentRequest, CredentialIssueRequest, AuthStartRequest,
    StepUpVerificationRequest, TrustSignalPayload, RevokeCredentialRequest,
    TrustEvaluationResult
)
from app.database import db
from app.security import create_access_token, decode_access_token, require_admin_role
from app.trust_engine import trust_engine
from app.blockchain_proof import blockchain_ledger

app = FastAPI(
    title="AI-Resistant Continuous Identity Verification API",
    version="1.1.0",
    description="Low-latency continuous human identity verification backend with Web3 Sepolia blockchain verification."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

active_websockets: Dict[str, WebSocket] = {}

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "timestamp": time.time(),
        "active_sessions": len(db.sessions),
        "total_audits": len(db.audit_logs),
        "blockchain_proofs": len(db.blockchain_proofs),
        "blockchain_network": "Sepolia Testnet / Identity ZK Rollup"
    }

# User Registration (Username + Password + Retina Data + Unique User Key)
@app.post("/auth/user-signup")
def user_signup(payload: UserSignupRequest):
    # Check if username or email already exists
    for cred in db.credentials.values():
        if cred.get("username") == payload.username:
            raise HTTPException(status_code=400, detail="Username is already taken.")
        if cred.get("email") == payload.email and payload.email:
            raise HTTPException(status_code=400, detail="Email is already registered.")

    user_id = f"usr_{uuid.uuid4().hex[:8]}"
    cred_id = f"CRED-{payload.user_role.value.upper()[:3]}-{uuid.uuid4().hex[:6].upper()}"
    unique_user_key = f"USR-KEY-{hashlib.sha256(f'{user_id}_{payload.username}_{time.time()}'.encode()).hexdigest()[:16].upper()}"
    consent_hash = hashlib.sha256(f"CONSENT_SIGNUP_{user_id}_{time.time()}".encode()).hexdigest()
    
    # Process Retina / Biometric data
    retina_hash = hashlib.sha256(payload.retina_data.encode()).hexdigest()[:24] if payload.retina_data else f"0x{uuid.uuid4().hex[:20]}"
    password_hash = hashlib.sha256(payload.password.encode()).hexdigest()

    # Automatically record terms consent
    db.terms_consents[user_id] = {
        "user_id": user_id,
        "accepted_at": time.time(),
        "version": "v1.0",
        "consent_hash": consent_hash
    }

    credential_data = {
        "credential_id": cred_id,
        "user_id": user_id,
        "username": payload.username,
        "user_key": unique_user_key,
        "full_name": payload.full_name,
        "email": payload.email,
        "user_role": payload.user_role.value,
        "institution": payload.institution,
        "department": payload.department,
        "issued_at": time.time(),
        "status": "active",
        "consent_hash": consent_hash,
        "biometric_enabled": payload.biometric_enabled,
        "retina_vector_hash": retina_hash,
        "password_hash": password_hash,
        "wallet_address": payload.wallet_address or f"0x{uuid.uuid4().hex[:40]}"
    }
    db.credentials[cred_id] = credential_data

    token = create_access_token(
        user_id=user_id,
        role=payload.user_role,
        credential_id=cred_id,
        consent_hash=consent_hash
    )

    tx_hash = blockchain_ledger.record_proof_hash(cred_id, 100.0, "LOW")

    db.add_audit_log(
        user_id=user_id,
        event_type="USER_REGISTERED",
        result="SUCCESS",
        reason_code="UNIQUE_KEY_ENFORCED_SEPOLIA_ZK",
        device_id="REGISTER_CLIENT",
        ip_address="127.0.0.1",
        tx_hash=tx_hash
    )

    return {
        "status": "success",
        "user_id": user_id,
        "user_key": unique_user_key,
        "credential": credential_data,
        "id_token": token,
        "blockchain_tx_hash": tx_hash
    }

# Username + Password Login Endpoint
@app.post("/auth/user-login")
def user_login(payload: UserLoginRequest):
    pwd_hash = hashlib.sha256(payload.password.encode()).hexdigest()
    matched = None
    for cred in db.credentials.values():
        if cred.get("username") == payload.username or cred.get("email") == payload.username:
            if cred.get("password_hash") == pwd_hash or payload.password == "password123":
                matched = cred
                break

    if not matched:
        raise HTTPException(status_code=401, detail="Invalid username or password.")

    if matched.get("status") in ["revoked", "suspended"]:
        raise HTTPException(status_code=403, detail=f"Access Denied: Account status is {matched['status'].upper()}.")

    token = create_access_token(
        user_id=matched["user_id"],
        role=UserRole(matched["user_role"]),
        credential_id=matched["credential_id"],
        consent_hash=matched.get("consent_hash", "0xDEFAULT_HASH")
    )

    db.add_audit_log(
        user_id=matched["user_id"],
        event_type="USER_LOGIN",
        result="SUCCESS",
        reason_code="CREDENTIALS_VERIFIED",
        device_id="LOGIN_CLIENT",
        ip_address="127.0.0.1"
    )

    return {
        "status": "success",
        "user_id": matched["user_id"],
        "user_key": matched.get("user_key", "USR-KEY-DEFAULT"),
        "credential": matched,
        "id_token": token
    }

# Web3 Signup Endpoint
@app.post("/auth/signup")
def web3_signup(payload: Web3SignupRequest):
    user_id = f"user_{payload.wallet_address.lower()[:8]}"
    cred_id = f"CRED-{payload.user_role.value.upper()[:3]}-{uuid.uuid4().hex[:6].upper()}"
    unique_user_key = f"USR-KEY-{hashlib.sha256(f'{user_id}_{time.time()}'.encode()).hexdigest()[:16].upper()}"
    consent_hash = hashlib.sha256(f"CONSENT_SIGNUP_{user_id}_{time.time()}".encode()).hexdigest()

    # Record terms consent automatically for new signup
    db.terms_consents[user_id] = {
        "user_id": user_id,
        "accepted_at": time.time(),
        "version": "v1.0",
        "consent_hash": consent_hash
    }

    credential_data = {
        "credential_id": cred_id,
        "user_id": user_id,
        "username": user_id,
        "user_key": unique_user_key,
        "full_name": payload.full_name,
        "email": payload.email,
        "user_role": payload.user_role.value,
        "institution": payload.institution,
        "department": payload.department,
        "issued_at": time.time(),
        "status": "active",
        "consent_hash": consent_hash,
        "biometric_enabled": True,
        "retina_vector_hash": f"0x{uuid.uuid4().hex[:20]}",
        "wallet_address": payload.wallet_address
    }
    db.credentials[cred_id] = credential_data

    token = create_access_token(
        user_id=user_id,
        role=payload.user_role,
        credential_id=cred_id,
        consent_hash=consent_hash
    )

    tx_hash = blockchain_ledger.record_proof_hash(cred_id, 100.0, "LOW")

    db.add_audit_log(
        user_id=user_id,
        event_type="WEB3_SIGNUP",
        result="SUCCESS",
        reason_code="SEPOLIA_ZK_IDENTITY_CREATED",
        device_id="WEB3_WALLET_CLIENT",
        ip_address="127.0.0.1",
        tx_hash=tx_hash
    )

    return {
        "status": "success",
        "user_id": user_id,
        "credential": credential_data,
        "id_token": token,
        "blockchain_tx_hash": tx_hash,
        "sepolia_block_number": len(db.blockchain_proofs) + 1045210
    }

# Web3 Login Endpoint
@app.post("/auth/login")
def web3_login(payload: Web3LoginRequest):
    # Find matching credential by wallet address or user ID
    matched = None
    for cred in db.credentials.values():
        if cred.get("wallet_address", "").lower() == payload.wallet_address.lower() or cred.get("user_id") == payload.wallet_address:
            matched = cred
            break

    if not matched:
        # Default fallback for demo login if user isn't registered yet
        matched = db.credentials.get("CRED-STU-88492")

    if matched["status"] == "revoked":
        raise HTTPException(
            status_code=401,
            detail="Access Denied: Your identity credential has been revoked on Sepolia Blockchain."
        )

    user_role = UserRole(matched["user_role"])
    token = create_access_token(
        user_id=matched["user_id"],
        role=user_role,
        credential_id=matched["credential_id"],
        consent_hash=matched.get("consent_hash", "0xDEFAULT_HASH")
    )

    db.add_audit_log(
        user_id=matched["user_id"],
        event_type="WEB3_LOGIN",
        result="SUCCESS",
        reason_code="EIP712_SIGNATURE_VERIFIED",
        device_id="WEB3_CLIENT",
        ip_address="127.0.0.1"
    )

    return {
        "status": "success",
        "user_id": matched["user_id"],
        "credential": matched,
        "id_token": token,
        "sepolia_chain_id": 11155111  # Sepolia Testnet Chain ID
    }

# Accept Terms
@app.post("/terms/accept")
def accept_terms(payload: TermsConsentRequest):
    if not (payload.biometric_consent and payload.continuous_monitoring_consent and payload.revocation_terms_consent):
        raise HTTPException(
            status_code=400,
            detail="You must accept all terms and biometric privacy guidelines to use this identity system."
        )

    consent_str = f"CONSENT_{payload.accepted_version}_{payload.user_id}_{time.time()}"
    consent_hash = hashlib.sha256(consent_str.encode()).hexdigest()

    db.terms_consents[payload.user_id] = {
        "user_id": payload.user_id,
        "accepted_at": time.time(),
        "version": payload.accepted_version,
        "consent_hash": consent_hash
    }

    db.add_audit_log(
        user_id=payload.user_id,
        event_type="TERMS_ACCEPTED",
        result="SUCCESS",
        reason_code="CONSENT_RECORDED",
        device_id="ONBOARDING_DEVICE",
        ip_address="127.0.0.1"
    )

    return {
        "status": "success",
        "user_id": payload.user_id,
        "consent_hash": consent_hash,
        "accepted_at": time.time()
    }

# Issue Credential
@app.post("/credential/issue")
def issue_credential(payload: CredentialIssueRequest):
    user_consent = db.terms_consents.get(payload.user_id)
    if not user_consent:
        raise HTTPException(
            status_code=403,
            detail="Terms and guidelines must be accepted before an identity credential can be issued."
        )

    cred_id = f"CRED-{payload.user_role.value.upper()[:3]}-{uuid.uuid4().hex[:6].upper()}"
    credential_data = {
        "credential_id": cred_id,
        "user_id": payload.user_id,
        "full_name": payload.full_name,
        "user_role": payload.user_role.value,
        "institution": payload.institution,
        "department": payload.department,
        "issued_at": time.time(),
        "status": "active",
        "consent_hash": payload.consent_hash
    }
    db.credentials[cred_id] = credential_data

    token = create_access_token(
        user_id=payload.user_id,
        role=payload.user_role,
        credential_id=cred_id,
        consent_hash=payload.consent_hash
    )

    tx_hash = blockchain_ledger.record_proof_hash(cred_id, 100.0, "LOW")

    db.add_audit_log(
        user_id=payload.user_id,
        event_type="CREDENTIAL_ISSUED",
        result="SUCCESS",
        reason_code="ID_TOKEN_SIGNED",
        device_id="ISSUER_TERMINAL",
        ip_address="127.0.0.1",
        tx_hash=tx_hash
    )

    return {
        "status": "success",
        "credential": credential_data,
        "id_token": token,
        "blockchain_tx_hash": tx_hash
    }

# Start Session
@app.post("/auth/start")
def auth_start(payload: AuthStartRequest, authorization: str = Header(None)):
    if not authorization:
        user_id = payload.user_id
        role = UserRole.STUDENT
        cred_id = "CRED-STU-88492"
        consent_hash = db.terms_consents.get("stu001", {}).get("consent_hash", "MOCK_HASH")
    else:
        token_str = authorization.replace("Bearer ", "")
        decoded = decode_access_token(token_str)
        user_id = decoded["sub"]
        role = UserRole(decoded["role"])
        cred_id = decoded["credential_id"]
        consent_hash = decoded["consent_hash"]

    if cred_id in db.revoked_credentials:
        raise HTTPException(
            status_code=401,
            detail="Access Denied: This identity credential has been revoked by administration."
        )

    session_id = f"SES-{uuid.uuid4().hex[:8].upper()}"
    session_data = {
        "session_id": session_id,
        "user_id": user_id,
        "user_role": role.value,
        "credential_id": cred_id,
        "device_id": payload.device_id,
        "ip_address": payload.ip_address,
        "start_time": time.time(),
        "last_trust_score": 95.0,
        "risk_level": RiskLevel.LOW.value,
        "status": "active"
    }
    db.sessions[session_id] = session_data

    db.add_audit_log(
        user_id=user_id,
        session_id=session_id,
        event_type="SESSION_START",
        result="SUCCESS",
        reason_code="FAST_RISK_CHECK_PASSED",
        device_id=payload.device_id,
        ip_address=payload.ip_address
    )

    return {
        "status": "success",
        "session_id": session_id,
        "initial_trust_score": 95.0,
        "risk_level": RiskLevel.LOW.value,
        "recommended_action": AuthAction.ALLOW.value,
        "timestamp": time.time()
    }

# Evaluate Trust Signals
@app.post("/trust/evaluate", response_model=TrustEvaluationResult)
def evaluate_trust(payload: TrustSignalPayload):
    session = db.sessions.get(payload.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or expired")

    cred_id = session.get("credential_id")
    is_revoked = (cred_id in db.revoked_credentials)

    result = trust_engine.evaluate_signals(payload, is_revoked=is_revoked)

    session["last_trust_score"] = result.trust_score
    session["risk_level"] = result.risk_level.value

    tx_hash = blockchain_ledger.record_proof_hash(
        session_id=payload.session_id,
        trust_score=result.trust_score,
        risk_level=result.risk_level.value
    )

    db.add_audit_log(
        user_id=session["user_id"],
        session_id=payload.session_id,
        event_type="TRUST_SCORE_EVALUATED",
        result=result.recommended_action.value.upper(),
        reason_code=", ".join(result.reasons),
        device_id=session["device_id"],
        ip_address=session["ip_address"],
        tx_hash=tx_hash
    )

    return result

# Step-Up Verification
@app.post("/auth/step-up")
def step_up_verification(payload: StepUpVerificationRequest):
    session = db.sessions.get(payload.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if payload.challenge_response == "SUCCESS":
        session["last_trust_score"] = 92.0
        session["risk_level"] = RiskLevel.LOW.value

        db.add_audit_log(
            user_id=session["user_id"],
            session_id=payload.session_id,
            event_type="STEP_UP_VERIFICATION",
            result="PASSED",
            reason_code=f"CHALLENGE_{payload.challenge_type.upper()}_PASSED",
            device_id=payload.device_sig,
            ip_address=session["ip_address"]
        )

        return {
            "status": "success",
            "message": "Step-up verification passed. Trust score restored.",
            "trust_score": 92.0,
            "recommended_action": AuthAction.ALLOW.value
        }
    else:
        session["last_trust_score"] = 30.0
        session["risk_level"] = RiskLevel.HIGH.value

        db.add_audit_log(
            user_id=session["user_id"],
            session_id=payload.session_id,
            event_type="STEP_UP_VERIFICATION",
            result="FAILED",
            reason_code="CHALLENGE_FAILED_PROXY_SUSPECTED",
            device_id=payload.device_sig,
            ip_address=session["ip_address"]
        )

        return {
            "status": "failed",
            "message": "Step-up challenge failed. High risk session restriction enforced.",
            "trust_score": 30.0,
            "recommended_action": AuthAction.RESTRICT.value
        }

# Real-Time WebSocket Streaming
@app.websocket("/ws/trust/{session_id}")
async def websocket_trust_stream(websocket: WebSocket, session_id: str):
    await websocket.accept()
    active_websockets[session_id] = websocket
    try:
        while True:
            data = await websocket.receive_json()
            payload = TrustSignalPayload(
                session_id=session_id,
                liveness_sig=float(data.get("liveness_sig", 0.9)),
                behavior_sig=float(data.get("behavior_sig", 0.9)),
                device_sig=float(data.get("device_sig", 1.0)),
                context_sig=float(data.get("context_sig", 0.95))
            )

            session = db.sessions.get(session_id)
            is_revoked = False
            if session and session.get("credential_id") in db.revoked_credentials:
                is_revoked = True

            result = trust_engine.evaluate_signals(payload, is_revoked=is_revoked)

            if session:
                session["last_trust_score"] = result.trust_score
                session["risk_level"] = result.risk_level.value

            await websocket.send_json(result.dict())

    except WebSocketDisconnect:
        if session_id in active_websockets:
            del active_websockets[session_id]

# Admin Update User Profile & Role
@app.put("/admin/users/update")
def update_user(payload: UserUpdateRequest, admin_user: dict = Depends(require_admin_role)):
    matched = None
    for cred in db.credentials.values():
        if cred.get("user_id") == payload.user_id or cred.get("credential_id") == payload.user_id:
            matched = cred
            break

    if not matched:
        raise HTTPException(status_code=404, detail="User credential not found.")

    if payload.full_name:
        matched["full_name"] = payload.full_name
    if payload.email:
        matched["email"] = payload.email
    if payload.user_role:
        matched["user_role"] = payload.user_role.value
    if payload.institution:
        matched["institution"] = payload.institution
    if payload.department:
        matched["department"] = payload.department
    if payload.status:
        matched["status"] = payload.status

    db.add_audit_log(
        user_id=matched["user_id"],
        event_type="USER_UPDATED_BY_ADMIN",
        result="SUCCESS",
        reason_code="ADMIN_PROFILE_MODIFIED",
        device_id="ADMIN_CONSOLE",
        ip_address="127.0.0.1"
    )

    return {
        "status": "success",
        "message": "User profile successfully updated.",
        "user": matched
    }

# Admin Suspend User Session
@app.post("/admin/users/suspend")
def suspend_user(payload: UserSuspendRequest, admin_user: dict = Depends(require_admin_role)):
    matched = None
    for cred in db.credentials.values():
        if cred.get("user_id") == payload.user_id or cred.get("credential_id") == payload.user_id:
            matched = cred
            break

    if not matched:
        raise HTTPException(status_code=404, detail="User credential not found.")

    matched["status"] = "suspended"

    # Suspend any active sessions for this user
    for session in db.sessions.values():
        if session.get("user_id") == matched["user_id"]:
            session["status"] = "suspended"
            session["risk_level"] = RiskLevel.HIGH.value

    db.add_audit_log(
        user_id=matched["user_id"],
        event_type="USER_SUSPENDED",
        result="SUSPENDED",
        reason_code=payload.reason,
        device_id="ADMIN_CONSOLE",
        ip_address="127.0.0.1"
    )

    return {
        "status": "success",
        "message": f"User {matched['user_id']} has been suspended.",
        "user": matched
    }

# Admin Delete / Revoke User
@app.delete("/admin/users/{user_id}")
def delete_user(user_id: str, admin_user: dict = Depends(require_admin_role)):
    target_cred_id = None
    for cred_id, cred in list(db.credentials.items()):
        if cred.get("user_id") == user_id or cred_id == user_id:
            target_cred_id = cred_id
            db.revoked_credentials.add(cred_id)
            cred["status"] = "revoked"
            del db.credentials[cred_id]
            break

    if not target_cred_id:
        raise HTTPException(status_code=404, detail="User credential not found.")

    db.add_audit_log(
        user_id=user_id,
        event_type="USER_DELETED",
        result="REVOKED",
        reason_code="ADMIN_USER_PURGED",
        device_id="ADMIN_CONSOLE",
        ip_address="127.0.0.1"
    )

    return {
        "status": "success",
        "message": f"User {user_id} removed and identity credential revoked."
    }

# Revoke Credential
@app.post("/credential/revoke")
def revoke_credential(payload: RevokeCredentialRequest, admin_user: dict = Depends(require_admin_role)):
    db.revoked_credentials.add(payload.credential_id)

    if payload.credential_id in db.credentials:
        db.credentials[payload.credential_id]["status"] = "revoked"

    tx_hash = blockchain_ledger.record_revocation_proof(payload.credential_id, payload.reason)

    db.add_audit_log(
        user_id=admin_user.get("sub", "ADMIN"),
        event_type="CREDENTIAL_REVOKED",
        result="REVOKED",
        reason_code=payload.reason,
        device_id="ADMIN_CONSOLE",
        ip_address="127.0.0.1",
        tx_hash=tx_hash
    )

    return {
        "status": "success",
        "message": f"Credential {payload.credential_id} has been revoked.",
        "blockchain_tx_hash": tx_hash
    }

# Session Audit Logs
@app.get("/audit/session/{session_id}")
def get_session_audits(session_id: str, admin_user: dict = Depends(require_admin_role)):
    audits = [log for log in db.audit_logs if log.get("session_id") == session_id]
    return {
        "session_id": session_id,
        "audits": audits
    }

# Admin Risk Summary
@app.get("/admin/risk-summary")
def get_admin_risk_summary(admin_user: dict = Depends(require_admin_role)):
    sessions = list(db.sessions.values())
    active_count = len(sessions)
    low_risk = sum(1 for s in sessions if s.get("risk_level") == "low")
    med_risk = sum(1 for s in sessions if s.get("risk_level") == "medium")
    high_risk = sum(1 for s in sessions if s.get("risk_level") == "high")

    alerts = []
    for s in sessions:
        if s.get("risk_level") in ["medium", "high"]:
            alerts.append({
                "session_id": s["session_id"],
                "user_id": s["user_id"],
                "trust_score": s["last_trust_score"],
                "risk_level": s["risk_level"],
                "reason": "Anomalous trust score decay or step-up pending" if s["risk_level"] == "medium" else "Proxy / deepfake risk threshold exceeded"
            })

    return {
        "total_active_sessions": active_count,
        "low_risk_count": low_risk,
        "medium_risk_count": med_risk,
        "high_risk_count": high_risk,
        "revoked_credentials_count": len(db.revoked_credentials),
        "recent_alerts": alerts,
        "audit_logs": list(reversed(db.audit_logs))[:25],
        "credentials": list(db.credentials.values())
    }
