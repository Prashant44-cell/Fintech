import time
import jwt
from typing import Dict, Any, Optional
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models import UserRole

SECRET_KEY = "ANTIGRAVITY_SUPER_SECRET_HUMAN_VERIFICATION_KEY_2026"
ALGORITHM = "HS256"

security_bearer = HTTPBearer()

def create_access_token(user_id: str, role: UserRole, credential_id: str, consent_hash: str) -> str:
    payload = {
        "sub": user_id,
        "role": role.value,
        "credential_id": credential_id,
        "consent_hash": consent_hash,
        "iat": time.time(),
        "exp": time.time() + 86400  # 24 hours
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> Dict[str, Any]:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired authentication token")

def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security_bearer)) -> Dict[str, Any]:
    return decode_access_token(credentials.credentials)

def require_admin_role(current_user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    allowed_roles = [UserRole.ADMIN.value, UserRole.PROCTOR.value, UserRole.SECURITY_OFFICER.value, UserRole.ISSUER.value]
    if current_user.get("role") not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail="Forbidden: Client portal users cannot access Server/Admin portal resources."
        )
    return current_user
