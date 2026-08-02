import React, { useState } from 'react';
import { RotateCcw, ShieldOff, Plus } from 'lucide-react';

const RECOVERY_CASES = [
  { id: 'REC-0044', user: 'Rohan Mehta', userId: 'STU-7810', reason: 'Device Stolen', cred: 'CRED-STU-CC3D4E', risk: 'medium', method: 'Institutional Manual', requested: '2026-08-01 13:00', status: 'pending', notes: 'Student attended admin office — awaiting identity re-verification.' },
  { id: 'REC-0043', user: 'Priya Iyer', userId: 'STU-1042', reason: 'Verification Failure', cred: 'CRED-STU-CC3D4E', risk: 'high', method: 'Admin Override', requested: '2026-08-01 10:00', status: 'in-progress', notes: 'Liveness module failure triggered — student submitting new biometric challenge.' },
  { id: 'REC-0042', user: 'Divya Prasad', userId: 'STU-4411', reason: 'Phone Lost', cred: 'CRED-STU-DP4411', risk: 'low', method: 'Recovery Credential', requested: '2026-07-28 09:15', status: 'resolved', notes: 'Recovery credential issued. Original credential renewed.' },
];

const REVOCATIONS = [
  { id: 'REV-0012', user: 'Vikram Singh', userId: 'STU-3312', cred: 'CRED-STU-GG7H8I', reason: 'Policy Violation', revokedBy: 'Dr. Suresh Kumar', revokedAt: '2026-07-20 15:30', chain: '0xGG7H8I' },
  { id: 'REV-0011', user: 'Kavya Reddy', userId: 'STU-5529', cred: 'CRED-STU-FF6G7H', reason: 'Security Incident — Hijack Suspicion', revokedBy: 'Anitha V.', revokedAt: '2026-08-01 11:02', chain: 'Pending' },
];

const METHODS = ['Institutional / Manual Verification', 'Recovery Credential', 'Hardware Security Key', 'Authorized Administrator', 'Identity Re-enrollment'];

const STATUS_CFG = {
  pending: { color: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  'in-progress': { color: '#22d3ee', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
  resolved: { color: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
};
const RISK_CFG = {
  low: { color: '#34d399' }, medium: { color: '#fbbf24' }, high: { color: '#f87171' }, critical: { color: '#f87171' },
};

export default function RecoveryRevocation() {
  const [tab, setTab] = useState('recovery');
  const [revokeFlow, setRevokeFlow] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Recovery & Revocation</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Safe identity restoration and credential revocation management</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={() => setTab('recovery')} ><RotateCcw size={14} /> New Recovery</button>
          <button className="btn" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)' }} onClick={() => setRevokeFlow(true)}><ShieldOff size={14} /> Revoke Credential</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.25rem', width: 'fit-content' }}>
        {[['recovery', 'Recovery Requests'], ['revocation', 'Revocation History'], ['methods', 'Recovery Methods']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '0.45rem 1.1rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: tab === id ? 'rgba(6,182,212,0.2)' : 'transparent', color: tab === id ? '#22d3ee' : '#94a3b8' }}>{label}</button>
        ))}
      </div>

      {tab === 'recovery' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {RECOVERY_CASES.map(rec => {
            const sCfg = STATUS_CFG[rec.status] || {};
            const rCfg = RISK_CFG[rec.risk] || {};
            return (
              <div key={rec.id} className="glass-panel" style={{ padding: '1rem 1.25rem', border: `1px solid ${rec.status === 'pending' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{rec.user}</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{rec.userId}</span>
                      <span style={{ padding: '0.15rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{rec.status}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Reason: <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{rec.reason}</span> · Method: {rec.method} · Requested: {rec.requested}
                    </div>
                    <div style={{ marginTop: '0.3rem', fontSize: '0.78rem', color: '#64748b' }}>{rec.notes}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {rec.status === 'pending' && <button className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}>Approve</button>}
                    <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}>View Details</button>
                    {rec.status !== 'resolved' && <button className="btn" style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Reject</button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'revocation' && (
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
            <thead><tr><th>Revocation ID</th><th>User</th><th>Credential</th><th>Reason</th><th>Revoked By</th><th>Revoked At</th><th>Blockchain Proof</th></tr></thead>
            <tbody>
              {REVOCATIONS.map(r => (
                <tr key={r.id}>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#a78bfa' }}>{r.id}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#e2e8f0' }}>{r.user} <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#64748b' }}>({r.userId})</span></td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#8b5cf6' }}>{r.cred}</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#94a3b8' }}>{r.reason}</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#94a3b8' }}>{r.revokedBy}</td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{r.revokedAt}</td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.72rem', color: r.chain === 'Pending' ? '#fbbf24' : '#34d399' }}>{r.chain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'methods' && (
        <div className="glass-panel">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Supported Recovery Methods</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {METHODS.map((m, i) => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', border: '1px solid rgba(139,92,246,0.3)' }}>{i + 1}</span>
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
