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

# Roles that may enter the Super Admin portal (3001). Deliberately excludes PROCTOR and
# ISSUER: institution staff work in the client portal (3000), and a token minted there must
# never open the platform console.
ADMIN_PORTAL_ROLES = [UserRole.ADMIN.value, UserRole.REGULATOR.value, UserRole.AUDITOR.value, UserRole.BRANCH_MANAGER.value]

def require_admin_role(current_user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    if current_user.get("role") not in ADMIN_PORTAL_ROLES:
        raise HTTPException(
            status_code=403,
            detail="Forbidden: Client portal users cannot access Server/Admin portal resources."
        )
    return current_user
