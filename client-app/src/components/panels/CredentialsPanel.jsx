import React, { useState } from 'react';
import { CreditCard, Plus, CheckCircle2, XCircle, RotateCcw, ShieldOff, RefreshCw } from 'lucide-react';

const CREDENTIALS = [
  { id: 'CRED-STU-AA1B2C', userId: 'STU-2841', name: 'Aarav Sharma', type: 'Student Identity', issuer: 'NMIT Registrar', issued: '2024-08-01', expires: '2028-07-31', status: 'active', proofStatus: 'verified', revoked: false },
  { id: 'CRED-STU-BB2C3D', userId: 'STU-2841', name: 'Aarav Sharma', type: 'Exam Eligibility', issuer: 'NMIT Exam Cell', issued: '2026-01-10', expires: '2026-07-30', status: 'active', proofStatus: 'verified', revoked: false },
  { id: 'CRED-STU-CC3D4E', userId: 'STU-1042', name: 'Priya Iyer', type: 'Student Identity', issuer: 'NMIT Registrar', issued: '2025-08-01', expires: '2029-07-31', status: 'active', proofStatus: 'verified', revoked: false },
  { id: 'CRED-STU-DD4E5F', userId: 'STU-7810', name: 'Rohan Mehta', type: 'Laboratory Access', issuer: 'NMIT Labs Division', issued: '2026-02-15', expires: '2026-12-31', status: 'active', proofStatus: 'verified', revoked: false },
  { id: 'CRED-FAC-EE5F6G', userId: 'FAC-0044', name: 'Dr. Suresh Kumar', type: 'Faculty Identity', issuer: 'NMIT HR Dept.', issued: '2020-07-15', expires: '2027-07-14', status: 'active', proofStatus: 'verified', revoked: false },
  { id: 'CRED-STU-FF6G7H', userId: 'STU-5529', name: 'Kavya Reddy', type: 'Student Identity', issuer: 'NMIT Registrar', issued: '2026-08-01', expires: '2030-07-31', status: 'suspended', proofStatus: 'suspended', revoked: false },
  { id: 'CRED-STU-GG7H8I', userId: 'STU-3312', name: 'Vikram Singh', type: 'Student Identity', issuer: 'NMIT Registrar', issued: '2025-08-01', expires: '2029-07-31', status: 'revoked', proofStatus: 'revoked', revoked: true },
  { id: 'CRED-STU-HH8I9J', userId: 'STU-9901', name: 'Arjun Nair', type: 'Hostel Resident', issuer: 'NMIT Hostel Office', issued: '2024-08-01', expires: '2028-07-31', status: 'active', proofStatus: 'verified', revoked: false },
];

const CRED_TYPES = ['Student Identity', 'Faculty Identity', 'Exam Eligibility', 'Laboratory Access', 'Hostel Resident', 'Event Participant', 'Course Completion'];

const STATUS_CFG = {
  active: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  suspended: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  revoked: { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.4)' },
  verified: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.25)' },
};

const VERIFICATION_HISTORY = [
  { credId: 'CRED-STU-AA1B2C', event: 'Verified for Exam Entry', time: '2026-08-01 09:01', result: 'pass', verifier: 'Exam Portal API' },
  { credId: 'CRED-STU-AA1B2C', event: 'Session Trust Eval', time: '2026-08-01 14:08', result: 'pass', verifier: 'Trust Engine v1.4' },
  { credId: 'CRED-STU-CC3D4E', event: 'Verified for Attendance', time: '2026-08-01 08:50', result: 'pass', verifier: 'Attendance System API' },
  { credId: 'CRED-STU-FF6G7H', event: 'Suspension Triggered', time: '2026-08-01 11:00', result: 'fail', verifier: 'Admin: Anitha V.' },
  { credId: 'CRED-STU-GG7H8I', event: 'Revocation — Policy Violation', time: '2026-07-20 15:30', result: 'revoked', verifier: 'Admin: Dr. Suresh Kumar' },
];

const V_CFG = {
  pass: { color: '#34d399', label: 'Pass' },
  fail: { color: '#f87171', label: 'Fail' },
  revoked: { color: '#f87171', label: 'Revoked' },
};

export default function CredentialsPanel() {
  const [filterType, setFilterType] = useState('all');

  const filtered = filterType === 'all' ? CREDENTIALS : CREDENTIALS.filter(c => c.type === filterType || c.status === filterType);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Identity & Credentials</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Institutional digital credential lifecycle management</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> Issue Credential</button>
      </div>

      {/* Credential Type Filters */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {['all', 'active', 'suspended', 'revoked'].map(f => (
          <button key={f} onClick={() => setFilterType(f)} style={{ padding: '0.35rem 0.8rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize', cursor: 'pointer', border: '1px solid', background: filterType === f ? 'rgba(6,182,212,0.15)' : 'transparent', color: filterType === f ? '#22d3ee' : '#94a3b8', borderColor: filterType === f ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.1)' }}>
            {f}
          </button>
        ))}
        <div style={{ height: '100%', width: 1, background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />
        {CRED_TYPES.slice(0, 4).map(t => (
          <button key={t} onClick={() => setFilterType(t)} style={{ padding: '0.35rem 0.8rem', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: filterType === t ? 'rgba(139,92,246,0.15)' : 'transparent', color: filterType === t ? '#c4b5fd' : '#64748b', borderColor: filterType === t ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.07)' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Credential Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Credential ID</th><th>User</th><th>Type</th><th>Issuer</th><th>Issued</th><th>Expires</th><th>Status</th><th>Proof</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(cred => {
                const sCfg = STATUS_CFG[cred.status] || {};
                const pCfg = STATUS_CFG[cred.proofStatus] || {};
                return (
                  <tr key={cred.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#a78bfa' }}>{cred.id}</td>
                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>{cred.name}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#64748b' }}>{cred.userId}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 7, background: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.2)' }}>{cred.type}</span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{cred.issuer}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{cred.issued}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{cred.expires}</td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{cred.status}</span></td>
                    <td>
                      {cred.proofStatus === 'verified' ? <CheckCircle2 size={16} color="#10b981" /> : cred.proofStatus === 'revoked' ? <XCircle size={16} color="#ef4444" /> : <span style={{ fontSize: '0.72rem', color: '#fbbf24' }}>{cred.proofStatus}</span>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>Verify</button>
                        {cred.status === 'active' && <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>Suspend</button>}
                        {cred.status === 'active' && <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Revoke</button>}
                        {cred.status !== 'active' && !cred.revoked && <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}><RefreshCw size={10} /> Renew</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification History */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Verification History</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr><th>Credential ID</th><th>Event</th><th>Time</th><th>Result</th><th>Verifier</th></tr>
          </thead>
          <tbody>
            {VERIFICATION_HISTORY.map((v, i) => {
              const vCfg = V_CFG[v.result] || {};
              return (
                <tr key={i}>
                  <td style={{ padding: '0.6rem 1rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#8b5cf6' }}>{v.credId}</td>
                  <td style={{ padding: '0.6rem 1rem', color: '#94a3b8' }}>{v.event}</td>
                  <td style={{ padding: '0.6rem 1rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{v.time}</td>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: 700, color: vCfg.color }}>{vCfg.label}</td>
                  <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#94a3b8' }}>{v.verifier}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
