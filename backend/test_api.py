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

    print("\n--- 2. Testing Banking Overview Endpoint ---")
    res = client.get("/api/banking/overview")
    assert res.status_code == 200, f"Banking overview failed: {res.text}"
    overview = res.json()
    assert overview["status"] == "success"
    print("Banking Overview OK:", overview["metrics"])

    print("\n--- 3. Testing Accounts List Endpoint ---")
    res = client.get("/api/banking/accounts")
    assert res.status_code == 200, f"Accounts list failed: {res.text}"
    accounts = res.json()["accounts"]
    assert len(accounts) > 0
    print("Accounts List OK. Account count:", len(accounts))

    print("\n--- 4. Testing Blockchain Transfer Endpoint ---")
    res = client.post("/api/banking/transfer", json={
        "sender_account": "ACC-NEX-884920",
        "receiver_account": "ACC-HDFC-302910",
        "amount": 2500.0,
        "currency": "INR",
        "description": "Test Transfer"
    })
    assert res.status_code == 200, f"Transfer failed: {res.text}"
    tx_data = res.json()
    assert "blockchain_tx_hash" in tx_data
    print("Transfer Executed OK. TX Hash:", tx_data["blockchain_tx_hash"])

    print("\n--- 5. Testing UPI 2.0 Instant Payment ---")
    res = client.post("/api/banking/upi/pay", json={
        "vpa": "merchant@nexusbank",
        "amount": 500.0,
        "note": "Unit Test UPI"
    })
    assert res.status_code == 200, f"UPI payment failed: {res.text}"
    print("UPI Payment OK. TX Hash:", res.json()["blockchain_tx_hash"])

    print("\n--- 6. Testing 60+ Field Metadata Inspector Endpoint ---")
    obj_id = accounts[0]["metadata"]["object_id"]
    res = client.get(f"/api/banking/metadata/{obj_id}")
    assert res.status_code == 200, f"Metadata inspection failed: {res.text}"
    meta = res.json()["metadata"]
    assert meta["object_name"] == accounts[0]["metadata"]["object_name"]
    assert "consensus_algorithm" in meta
    assert "compliance_standards" in meta
    print("60+ Field Metadata Verified OK:", meta["object_name"], "Consensus:", meta["consensus_algorithm"])

    print("\n--- 7. Testing Blockchain Regulatory Node Topology ---")
    res = client.get("/api/blockchain/nodes")
    assert res.status_code == 200, f"Blockchain nodes endpoint failed: {res.text}"
    nodes_info = res.json()
    assert len(nodes_info["active_validators"]) > 0
    print("Regulatory Nodes OK. Active validators:", len(nodes_info["active_validators"]))

    print("\n=== ALL NEXUS BLOCKBANK CORE TESTS PASSED SUCCESSFULLY! ===")

if __name__ == "__main__":
    test_full_system_flow()
