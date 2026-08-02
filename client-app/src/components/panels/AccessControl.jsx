import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

const ROLES = ['Student', 'Faculty', 'Proctor', 'Administrator', 'Security Officer', 'Credential Issuer'];
const RESOURCES = ['Campus', 'Library', 'Laboratory', 'Hostel', 'Exam', 'Admin System'];

const POLICIES = [
  { id: 'ACP-001', role: 'Student', resource: 'Exam', requiredCred: 'Exam Eligibility', minTrust: 75, schedule: '06:00–22:00', status: 'active' },
  { id: 'ACP-002', role: 'Student', resource: 'Laboratory', requiredCred: 'Laboratory Access', minTrust: 65, schedule: '08:00–20:00', status: 'active' },
  { id: 'ACP-003', role: 'Student', resource: 'Library', requiredCred: 'Student Identity', minTrust: 60, schedule: '07:00–23:00', status: 'active' },
  { id: 'ACP-004', role: 'Student', resource: 'Hostel', requiredCred: 'Hostel Resident', minTrust: 55, schedule: '24/7', status: 'active' },
  { id: 'ACP-005', role: 'Faculty', resource: 'Campus', requiredCred: 'Faculty Identity', minTrust: 50, schedule: '24/7', status: 'active' },
  { id: 'ACP-006', role: 'Faculty', resource: 'Admin System', requiredCred: 'Faculty Identity', minTrust: 80, schedule: '08:00–20:00', status: 'active' },
  { id: 'ACP-007', role: 'Proctor', resource: 'Exam', requiredCred: 'Faculty Identity', minTrust: 85, schedule: 'Exam hours only', status: 'active' },
  { id: 'ACP-008', role: 'Administrator', resource: 'Admin System', requiredCred: 'Faculty Identity', minTrust: 90, schedule: '24/7', status: 'active' },
];

const DECISION_LOG = [
  { user: 'STU-2841', resource: 'Exam', trust: 94, cred: '✓', decision: 'Allow', time: '09:00:12' },
  { user: 'STU-1042', resource: 'Laboratory', trust: 39, cred: '✓', decision: 'Deny — Low Trust', time: '10:14:45' },
  { user: 'STU-7810', resource: 'Library', trust: 58, cred: '✓', decision: 'Allow with Monitoring', time: '11:22:03' },
  { user: 'FAC-0044', resource: 'Admin System', trust: 88, cred: '✓', decision: 'Allow', time: '09:00:44' },
  { user: 'STU-5529', resource: 'Exam', trust: 12, cred: '✓', decision: 'Deny — Credential Suspended', time: '11:00:00' },
];

const DECISION_CFG = {
  'Allow': { color: '#34d399', bg: 'rgba(16,185,129,0.1)' },
  'Deny — Low Trust': { color: '#f87171', bg: 'rgba(239,68,68,0.12)' },
  'Deny — Credential Suspended': { color: '#f87171', bg: 'rgba(239,68,68,0.12)' },
  'Allow with Monitoring': { color: '#22d3ee', bg: 'rgba(6,182,212,0.1)' },
  'Step-Up Required': { color: '#fbbf24', bg: 'rgba(245,158,11,0.1)' },
};

export default function AccessControl() {
  const [selectedRole, setSelectedRole] = useState('Student');
  const [selectedResource, setSelectedResource] = useState('all');

  const filtered = POLICIES.filter(p =>
    (selectedRole === 'all' || p.role === selectedRole) &&
    (selectedResource === 'all' || p.resource === selectedResource)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Access Control</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Identity + Credential + Context + Trust → Access Decision</p>
        </div>
        <button className="btn btn-primary">+ New Policy</button>
      </div>

      {/* Decision Formula */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', background: 'linear-gradient(135deg,rgba(139,92,246,0.07),rgba(6,182,212,0.05))' }}>
        <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#64748b', marginBottom: '0.6rem' }}>Access Formula</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[['Identity', '#8b5cf6'], ['Credential', '#06b6d4'], ['Context', '#10b981'], ['Trust Score', '#f59e0b']].map(([label, color], i) => (
            <React.Fragment key={label}>
              <span style={{ padding: '0.4rem 0.85rem', borderRadius: 10, fontWeight: 700, fontSize: '0.85rem', background: `${color}18`, color, border: `1px solid ${color}40` }}>{label}</span>
              {i < 3 && <span style={{ color: '#475569', fontWeight: 700, fontSize: '1.1rem' }}>+</span>}
            </React.Fragment>
          ))}
          <span style={{ color: '#475569', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
          <span style={{ padding: '0.4rem 0.85rem', borderRadius: 10, fontWeight: 700, fontSize: '0.85rem', background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.4)' }}>Access Decision</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.6rem' }}>This is more powerful than simple role-based access control — trust and context are evaluated alongside identity and credentials.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Role</div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {['all', ...ROLES].map(r => (
              <button key={r} onClick={() => setSelectedRole(r)} style={{ padding: '0.3rem 0.7rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: selectedRole === r ? 'rgba(139,92,246,0.15)' : 'transparent', color: selectedRole === r ? '#c4b5fd' : '#94a3b8', borderColor: selectedRole === r ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.1)' }}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.07)', paddingLeft: '1rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Resource</div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {['all', ...RESOURCES].map(r => (
              <button key={r} onClick={() => setSelectedResource(r)} style={{ padding: '0.3rem 0.7rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: selectedResource === r ? 'rgba(6,182,212,0.12)' : 'transparent', color: selectedResource === r ? '#22d3ee' : '#94a3b8', borderColor: selectedResource === r ? 'rgba(6,182,212,0.35)' : 'rgba(255,255,255,0.1)' }}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Access Policies</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Policy ID</th><th>Role</th><th>Resource</th><th>Required Credential</th><th>Min Trust</th><th>Schedule</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#a78bfa' }}>{p.id}</td>
                  <td style={{ fontWeight: 600, color: '#c4b5fd', fontSize: '0.85rem' }}>{p.role}</td>
                  <td style={{ fontWeight: 600, color: '#22d3ee', fontSize: '0.85rem' }}>{p.resource}</td>
                  <td>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 7, background: 'rgba(6,182,212,0.08)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.2)' }}>{p.requiredCred}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: p.minTrust >= 80 ? '#f87171' : p.minTrust >= 70 ? '#fbbf24' : '#34d399' }}>{p.minTrust}</span>
                    <span style={{ color: '#475569', fontSize: '0.72rem' }}>/100</span>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>{p.schedule}</td>
                  <td><span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#34d399' }}>● {p.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>Edit</button>
                      <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>Disable</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Decisions */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Recent Access Decisions</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead><tr><th>User</th><th>Resource</th><th>Trust</th><th>Credential</th><th>Decision</th><th>Time</th></tr></thead>
          <tbody>
            {DECISION_LOG.map((d, i) => {
              const dCfg = DECISION_CFG[d.decision] || {};
              return (
                <tr key={i}>
                  <td style={{ padding: '0.65rem 1rem', fontFamily: 'monospace', color: '#a78bfa' }}>{d.user}</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#94a3b8' }}>{d.resource}</td>
                  <td style={{ padding: '0.65rem 1rem', fontWeight: 700, color: d.trust >= 75 ? '#34d399' : '#f87171' }}>{d.trust}</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#34d399' }}>{d.cred}</td>
                  <td style={{ padding: '0.65rem 1rem' }}>
                    <span style={{ padding: '0.18rem 0.6rem', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 700, background: dCfg.bg, color: dCfg.color }}>{d.decision}</span>
                  </td>
                  <td style={{ padding: '0.65rem 1rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>{d.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
