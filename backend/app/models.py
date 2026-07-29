from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "student"
    PROCTOR = "proctor"
    ADMIN = "admin"
    SECURITY_OFFICER = "security_officer"
    ISSUER = "issuer"

class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class AuthAction(str, Enum):
    ALLOW = "allow"
    STEP_UP = "step_up"
    RESTRICT = "restrict"
    REVOKE = "revoke"
    BLOCK = "block"

class UserSignupRequest(BaseModel):
    username: str
    password: str
    full_name: str
    email: str
    user_role: UserRole = UserRole.STUDENT
    institution: str = "IIT Bombay - CS & Cybersecurity"
    department: str = "Computer Science"
    retina_data: Optional[str] = None
    biometric_enabled: bool = True
    security_credentials: Optional[str] = None
    wallet_address: Optional[str] = None

class UserLoginRequest(BaseModel):
    username: str
    password: str

class UserUpdateRequest(BaseModel):
    user_id: str
    full_name: Optional[str] = None
    email: Optional[str] = None
    user_role: Optional[UserRole] = None
    institution: Optional[str] = None
    department: Optional[str] = None
    status: Optional[str] = None

class UserSuspendRequest(BaseModel):
    user_id: str
    reason: str

class Web3SignupRequest(BaseModel):
    wallet_address: str
    full_name: str
    email: str
    user_role: UserRole = UserRole.STUDENT
    institution: str = "IIT Bombay - CS & Cybersecurity"
    department: str = "Computer Science"

class Web3LoginRequest(BaseModel):
    wallet_address: str
    signature: str
    nonce: str

class TermsConsentRequest(BaseModel):
    user_id: str
    user_role: UserRole
    accepted_version: str = "v1.0"
    biometric_consent: bool = True
    continuous_monitoring_consent: bool = True
    revocation_terms_consent: bool = True

class CredentialIssueRequest(BaseModel):
    user_id: str
    user_role: UserRole
    institution: str = "Indian Institute of Technology (IIT)"
    department: str = "Computer Science & Cybersecurity"
    full_name: str
    consent_hash: str

class AuthStartRequest(BaseModel):
    user_id: str
    device_id: str
    ip_address: str = "127.0.0.1"
    user_agent: str = "Mozilla/5.0"

class StepUpVerificationRequest(BaseModel):
    session_id: str
    challenge_type: str
    challenge_response: str
    device_sig: str

class TrustSignalPayload(BaseModel):
    session_id: str
    liveness_sig: float = Field(..., ge=0.0, le=1.0)
    behavior_sig: float = Field(..., ge=0.0, le=1.0)
    device_sig: float = Field(..., ge=0.0, le=1.0)
    context_sig: float = Field(..., ge=0.0, le=1.0)

class RevokeCredentialRequest(BaseModel):
    credential_id: str
    reason: str
    admin_id: str

class TrustEvaluationResult(BaseModel):
    session_id: str
    trust_score: float
    risk_level: RiskLevel
    recommended_action: AuthAction
    reasons: List[str]
    latency_ms: float
    timestamp: float

class AuditLogEntry(BaseModel):
    id: str
    timestamp: float
    user_id: str
    session_id: Optional[str] = None
    event_type: str
    result: str
    reason_code: str
    device_id: str
    ip_address: str
    blockchain_tx_hash: Optional[str] = None

