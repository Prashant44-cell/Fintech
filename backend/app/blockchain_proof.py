import time
import hashlib
import uuid
from typing import Dict, Any, List
from app.database import db, generate_blockchain_metadata

class BlockchainProofLayer:
    def __init__(self):
        self.chain_name = "Hyperledger Besu / Sepolia ZK Rollup Banking Ledger"

    def record_banking_transaction(self, tx_type: str, sender: str, receiver: str, amount: float, currency: str) -> dict:
        timestamp = time.time()
        tx_id = f"TX-BLK-{uuid.uuid4().hex[:8].upper()}"
        payload = f"{tx_id}:{sender}:{receiver}:{amount}:{currency}:{timestamp}"
        proof_hash = "0x" + hashlib.sha256(payload.encode()).hexdigest()
        tx_hash = f"0x{uuid.uuid4().hex}"
        block_number = len(db.blockchain_proofs) + 1489205

        meta = generate_blockchain_metadata(
            object_name="TransactionAsset",
            customer_id="stu001",
            account_number=sender,
            balance=amount,
            currency=currency,
            account_type=tx_type,
            status="ACTIVE_SETTLED"
        )
        meta["transaction_hash"] = tx_hash
        meta["block_number"] = block_number

        proof_entry = {
            "tx_hash": tx_hash,
            "proof_hash": proof_hash,
            "tx_id": tx_id,
            "type": tx_type,
            "sender": sender,
            "receiver": receiver,
            "amount": amount,
            "currency": currency,
            "timestamp": timestamp,
            "block_number": block_number,
            "metadata": meta
        }
        db.blockchain_proofs.append(proof_entry)
        return proof_entry

    def record_proof_hash(self, session_id: str, trust_score: float, risk_level: str) -> str:
        timestamp = time.time()
        payload = f"{session_id}:{trust_score}:{risk_level}:{timestamp}"
        proof_hash = hashlib.sha256(payload.encode()).hexdigest()
        tx_hash = f"0x{uuid.uuid4().hex}"

        db.blockchain_proofs.append({
            "tx_hash": tx_hash,
            "proof_hash": proof_hash,
            "session_id": session_id,
            "type": "BIOMETRIC_TRUST_PROOF",
            "timestamp": timestamp,
            "block_number": len(db.blockchain_proofs) + 1489205
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
            "type": "CARD_REVOCATION_RECORD",
            "timestamp": timestamp,
            "block_number": len(db.blockchain_proofs) + 1489205
        })
        return tx_hash

blockchain_ledger = BlockchainProofLayer()
