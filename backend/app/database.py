import time
import uuid
import hashlib
from typing import Dict, List, Optional
from app.models import UserRole, RiskLevel, AuthAction

class InMemoryDatabase:
    def __init__(self):
        # Credentials: key = credential_id
        self.credentials: Dict[str, dict] = {}
        # Terms consents: key = user_id
        self.terms_consents: Dict[str, dict] = {}
        # Active sessions: key = session_id
        self.sessions: Dict[str, dict] = {}
        # Audit logs: list of dicts
        self.audit_logs: List[dict] = []
        # Blockchain proofs: list of dicts
        self.blockchain_proofs: List[dict] = []
        # Revocation list: set of revoked credential IDs
        self.revoked_credentials: set = set()
        
        # Seed initial default data for testing
        self._seed_default_data()

    def _seed_default_data(self):
        # Demo student credential
        student_cred_id = "CRED-STU-88492"
        student_user_key = "USR-KEY-" + hashlib.sha256(b"stu001_aarav_key").hexdigest()[:16].upper()
        consent_hash = hashlib.sha256(b"CONSENT_AGREED_V1.0_STU001").hexdigest()
        self.terms_consents["stu001"] = {
            "user_id": "stu001",
            "accepted_at": time.time() - 3600,
            "version": "v1.0",
            "consent_hash": consent_hash
        }
        self.credentials[student_cred_id] = {
            "credential_id": student_cred_id,
            "user_id": "stu001",
            "username": "aarav_sharma",
            "user_key": student_user_key,
            "full_name": "Aarav Sharma",
            "email": "aarav@iitb.ac.in",
            "user_role": UserRole.STUDENT.value,
            "institution": "IIT Bombay - CS Dept",
            "department": "Computer Science & Cybersecurity",
            "issued_at": time.time() - 3600,
            "status": "active",
            "consent_hash": consent_hash,
            "biometric_enabled": True,
            "retina_vector_hash": "0x8f3b201948aeef12093847aef",
            "password_hash": hashlib.sha256(b"password123").hexdigest()
        }
        
        # Demo proctor credential
        proctor_cred_id = "CRED-PRC-10924"
        proctor_user_key = "USR-KEY-" + hashlib.sha256(b"proctor001_sunita_key").hexdigest()[:16].upper()
        proctor_consent_hash = hashlib.sha256(b"CONSENT_AGREED_V1.0_PROCTOR001").hexdigest()
        self.terms_consents["proctor001"] = {
            "user_id": "proctor001",
            "accepted_at": time.time() - 7200,
            "version": "v1.0",
            "consent_hash": proctor_consent_hash
        }
        self.credentials[proctor_cred_id] = {
            "credential_id": proctor_cred_id,
            "user_id": "proctor001",
            "username": "sunita_rao",
            "user_key": proctor_user_key,
            "full_name": "Dr. Sunita Rao (Proctor)",
            "email": "sunita@iitb.ac.in",
            "user_role": UserRole.PROCTOR.value,
            "institution": "IIT Bombay - Exam Controller",
            "department": "Cybersecurity & Exam Authority",
            "issued_at": time.time() - 7200,
            "status": "active",
            "consent_hash": proctor_consent_hash,
            "biometric_enabled": True,
            "retina_vector_hash": "0x3892a01f9b82e88902a3c1d8",
            "password_hash": hashlib.sha256(b"proctor123").hexdigest()
        }

        # Seed initial audit logs
        self.add_audit_log(
            user_id="stu001",
            event_type="TERMS_ACCEPTED",
            result="SUCCESS",
            reason_code="CONSENT_RECORDED",
            device_id="DEV-MACBOOK-PRO-01",
            ip_address="192.168.1.45"
        )
        self.add_audit_log(
            user_id="stu001",
            event_type="CREDENTIAL_ISSUED",
            result="SUCCESS",
            reason_code="ID_TOKEN_SIGNED",
            device_id="DEV-MACBOOK-PRO-01",
            ip_address="192.168.1.45"
        )

    def add_audit_log(self, user_id: str, event_type: str, result: str, reason_code: str, device_id: str, ip_address: str, session_id: Optional[str] = None, tx_hash: Optional[str] = None) -> dict:
        log_entry = {
            "id": f"AUD-{uuid.uuid4().hex[:8].upper()}",
            "timestamp": time.time(),
            "user_id": user_id,
            "session_id": session_id,
            "event_type": event_type,
            "result": result,
            "reason_code": reason_code,
            "device_id": device_id,
            "ip_address": ip_address,
            "blockchain_tx_hash": tx_hash or f"0x{uuid.uuid4().hex}"
        }
        self.audit_logs.append(log_entry)
        return log_entry

db = InMemoryDatabase()
