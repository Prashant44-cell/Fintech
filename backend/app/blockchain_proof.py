import time
import hashlib
import uuid
from typing import Dict, Any, List
from app.database import db

class BlockchainProofLayer:
    def __init__(self):
        self.chain_name = "Sepolia Testnet / Institutional Identity Rollup"

    def record_proof_hash(self, session_id: str, trust_score: float, risk_level: str) -> str:
        timestamp = time.time()
        payload = f"{session_id}:{trust_score}:{risk_level}:{timestamp}"
        proof_hash = hashlib.sha256(payload.encode()).hexdigest()
        tx_hash = f"0x{uuid.uuid4().hex}"

        db.blockchain_proofs.append({
            "tx_hash": tx_hash,
            "proof_hash": proof_hash,
            "session_id": session_id,
            "type": "TRUST_PROOF",
            "timestamp": timestamp,
            "block_number": len(db.blockchain_proofs) + 1045210
        })
        return tx_hash

    def record_revocation_proof(self, credential_id: str, reason: str) -> str:
        timestamp = time.time()
        payload = f"REVOKE:{credential_id}:{reason}:{timestamp}"
        proof_hash = hashlib.sha256(payload.encode()).hexdigest()
        tx_hash = f"0x{uuid.uuid4().hex}"

        db.blockchain_proofs.append({
            "tx_hash": tx_hash,
            "proof_hash": proof_hash,
            "credential_id": credential_id,
            "type": "REVOCATION_RECORD",
            "timestamp": timestamp,
            "block_number": len(db.blockchain_proofs) + 1045210
        })
        return tx_hash

blockchain_ledger = BlockchainProofLayer()
