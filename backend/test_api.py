import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.models import UserRole
from app.security import create_access_token

client = TestClient(app)

def test_full_system_flow():
    print("--- 1. Testing Health Endpoint ---")
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("Health check OK:", res.json())

    print("\n--- 2. Testing Terms Acceptance Endpoint ---")
    res = client.post("/terms/accept", json={
        "user_id": "test_student_01",
        "user_role": "student",
        "accepted_version": "v1.0",
        "biometric_consent": True,
        "continuous_monitoring_consent": True,
        "revocation_terms_consent": True
    })
    assert res.status_code == 200, f"Terms acceptance failed: {res.text}"
    terms_data = res.json()
    consent_hash = terms_data["consent_hash"]
    print("Terms Accepted OK. Consent Hash:", consent_hash)

    print("\n--- 3. Testing Credential Issuance Endpoint ---")
    res = client.post("/credential/issue", json={
        "user_id": "test_student_01",
        "user_role": "student",
        "institution": "IIT Bombay",
        "department": "Computer Science",
        "full_name": "Test Student",
        "consent_hash": consent_hash
    })
    assert res.status_code == 200, f"Credential issuance failed: {res.text}"
    cred_data = res.json()
    id_token = cred_data["id_token"]
    cred_id = cred_data["credential"]["credential_id"]
    print("Credential Issued OK. ID Token generated, Credential ID:", cred_id)

    print("\n--- 4. Testing Auth Start Session Endpoint ---")
    res = client.post(
        "/auth/start",
        headers={"Authorization": f"Bearer {id_token}"},
        json={
            "user_id": "test_student_01",
            "device_id": "DEV-TEST-01",
            "ip_address": "127.0.0.1",
            "user_agent": "TestRunner"
        }
    )
    assert res.status_code == 200, f"Auth start failed: {res.text}"
    session_data = res.json()
    session_id = session_data["session_id"]
    print("Session Started OK. Session ID:", session_id)

    print("\n--- 5. Testing Continuous Trust Evaluation Endpoint ---")
    res = client.post("/trust/evaluate", json={
        "session_id": session_id,
        "liveness_sig": 0.95,
        "behavior_sig": 0.90,
        "device_sig": 1.0,
        "context_sig": 0.95
    })
    assert res.status_code == 200, f"Trust evaluation failed: {res.text}"
    trust_res = res.json()
    print("Trust Evaluated OK. Score:", trust_res["trust_score"], "Latency:", trust_res["latency_ms"], "ms")
    assert trust_res["latency_ms"] < 50.0, "Latency target violated!"

    print("\n--- 6. Testing Portal Security: Client User Access Blocked on Admin Route ---")
    res = client.get("/admin/risk-summary", headers={"Authorization": f"Bearer {id_token}"})
    assert res.status_code == 403, f"Security Breach! Client token reached admin endpoint! Status: {res.status_code}"
    print("Portal Isolation Confirmed! Student token rejected on Admin route (403 Forbidden).")

    print("\n--- 7. Testing Admin Credential Revocation Endpoint ---")
    # Generate valid JWT token for Admin
    admin_token = create_access_token(
        user_id="admin001",
        role=UserRole.ADMIN,
        credential_id="CRED-ADM-001",
        consent_hash="0xADMIN_HASH"
    )
    res = client.post(
        "/credential/revoke",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "credential_id": cred_id,
            "reason": "PROXY_ATTENDANCE_TEST",
            "admin_id": "admin001"
        }
    )
    assert res.status_code == 200, f"Revocation failed: {res.text}"
    print("Credential Revoked OK. Response:", res.json())

    print("\n--- 8. Testing Session Lockout after Revocation ---")
    res = client.post("/trust/evaluate", json={
        "session_id": session_id,
        "liveness_sig": 0.95,
        "behavior_sig": 0.90,
        "device_sig": 1.0,
        "context_sig": 0.95
    })
    assert res.status_code == 200
    revoked_eval = res.json()
    assert revoked_eval["recommended_action"] == "revoke"
    print("Session Lockout Confirmed! Session evaluated as REVOKED.")

    print("\n--- 9. Testing Admin Risk Summary Endpoint with Admin Token ---")
    res = client.get("/admin/risk-summary", headers={"Authorization": f"Bearer {admin_token}"})
    assert res.status_code == 200
    summary = res.json()
    print("Admin Risk Summary Fetched OK. Total active sessions:", summary["total_active_sessions"], "Revoked count:", summary["revoked_credentials_count"])

    print("\n=======================================================")
    print(" ALL 9 SYSTEM INTEGRATION TESTS PASSED CLEANLY & VERIFIED!")
    print("=======================================================")

if __name__ == "__main__":
    test_full_system_flow()
