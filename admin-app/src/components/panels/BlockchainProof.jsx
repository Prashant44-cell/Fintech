import React from 'react';
import { Link2, Server, CheckCircle2, XCircle } from 'lucide-react';

const NETWORK_STATUS = [
  { label: 'Network', value: 'Sepolia Testnet / ZK Rollup', status: 'online', color: '#10b981' },
  { label: 'Latest Block', value: '#8,291,445', status: 'online', color: '#06b6d4' },
  { label: 'Avg Confirm Time', value: '12.4 sec', status: 'online', color: '#8b5cf6' },
  { label: 'Failed Txns (24h)', value: '2', status: 'warning', color: '#f59e0b' },
];

const PROOFS = [
  { id: 'PRF-A1B2C3D4', hash: '0x3892a01f9b82e…', issuer: 'IIT Bombay Registrar', timestamp: '2026-08-01 14:10:22', network: 'Sepolia ZK', txRef: '0xAF91C…3B20', status: 'confirmed' },
  { id: 'PRF-E5F6G7H8', hash: '0x7120bfa29c14e…', issuer: 'UPSC Exam Dept.', timestamp: '2026-08-01 13:58:09', network: 'Sepolia ZK', txRef: '0xBC82D…9A14', status: 'confirmed' },
  { id: 'PRF-I9J0K1L2', hash: '0x4480dab12f31c…', issuer: 'Delhi University', timestamp: '2026-08-01 13:45:31', network: 'Sepolia ZK', txRef: '0xC20E1…5F80', status: 'pending' },
  { id: 'PRF-M3N4O5P6', hash: '0x2b10caf93a22d…', issuer: 'VIT Vellore HR Dept.', timestamp: '2026-08-01 13:30:18', network: 'Sepolia ZK', txRef: '0xD38F4…2C11', status: 'confirmed' },
  { id: 'PRF-Q7R8S9T0', hash: '0x9920eba74b43e…', issuer: 'NIT Trichy Registrar', timestamp: '2026-08-01 13:12:55', network: 'Sepolia ZK', txRef: '0xE44A2…8D90', status: 'failed' },
];

const PROOF_CFG = {
  confirmed: { color: '#34d399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  pending: { color: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  failed: { color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)' },
};

export default function BlockchainProof() {
  const stats = [
    { label: 'Total Proofs', value: '3,614,200' },
    { label: 'Revocations', value: '2,140' },
    { label: 'Transactions', value: '3,616,340' },
    { label: 'Failed Txns', value: '48' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Blockchain / Proof Layer</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Credential anchoring and revocation proof infrastructure</p>
      </div>

      <div style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#22d3ee' }}>
        ℹ Blockchain is supporting infrastructure for credential proofs. Raw biometric data is never stored or transmitted to the chain — only cryptographic hashes.
      </div>

      {/* Network Status */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {NETWORK_STATUS.map(s => (
          <div key={s.label} className="glass-panel" style={{ flex: 1, padding: '1rem', borderLeft: `3px solid ${s.color}` }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>{s.label}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {stats.map(s => (
          <div key={s.label} className="glass-panel" style={{ flex: 1, padding: '0.9rem' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>{s.value}</div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.2rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Proof Records */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link2 size={16} color="#8b5cf6" />
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Recent Proof Records</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Proof ID</th><th>Credential Hash</th><th>Issuer</th><th>Timestamp</th><th>Network</th><th>Tx Reference</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PROOFS.map(p => {
                const cfg = PROOF_CFG[p.status] || {};
                return (
                  <tr key={p.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#a78bfa' }}>{p.id}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{p.hash}</td>
                    <td style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>{p.issuer}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{p.timestamp}</td>
                    <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{p.network}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#8b5cf6' }}>{p.txRef}</td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...cfg }}>{p.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
