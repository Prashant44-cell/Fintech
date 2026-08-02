import React, { useState } from 'react';
import { FileText, Search } from 'lucide-react';

const AUDIT_LOGS = [
  { id: 'AUD-A1001', ts: '2026-08-01 14:12:05', client: 'Platform', actor: 'Kavita Menon', role: 'Security Admin', action: 'SESSION_TERMINATE', resource: 'SES-77A12B', prev: 'active', next: 'terminated', ip: '10.0.0.5', result: 'SUCCESS', reason: 'Hijack containment', privileged: false },
  { id: 'AUD-A1000', ts: '2026-08-01 13:58:00', client: 'Platform', actor: 'Prashant', role: 'Super Admin', action: 'GLOBAL_POLICY_UPDATE', resource: 'POL-001 v1.2', prev: 'v1.1', next: 'v1.2', ip: '10.0.0.1', result: 'SUCCESS', reason: 'Stricter step-up threshold', privileged: true },
  { id: 'AUD-A0999', ts: '2026-08-01 13:45:33', client: 'IIT Bombay', actor: 'Dr. Sharma', role: 'Institution Admin', action: 'CREDENTIAL_REVOKE', resource: 'CRED-STU-AA1B2C', prev: 'active', next: 'revoked', ip: '192.168.1.10', result: 'SUCCESS', reason: 'Policy violation', privileged: false },
  { id: 'AUD-A0998', ts: '2026-08-01 13:30:11', client: 'Platform', actor: 'Prashant', role: 'Super Admin', action: 'ISSUER_AUTHORIZE', resource: 'ISR-007', prev: 'pending', next: 'authorized', ip: '10.0.0.1', result: 'SUCCESS', reason: 'New institution onboard', privileged: true },
  { id: 'AUD-A0997', ts: '2026-08-01 13:20:44', client: 'UPSC Authority', actor: 'Mr. Pillai', role: 'Institution Admin', action: 'SESSION_STEPUP_ISSUED', resource: 'SES-33C044', prev: 'monitoring', next: 'step_up', ip: '203.88.12.5', result: 'SUCCESS', reason: 'Low trust during exam', privileged: false },
  { id: 'AUD-A0996', ts: '2026-08-01 12:15:00', client: 'Platform', actor: 'Rahul Singh', role: 'Operations Admin', action: 'SERVICE_RESTART', resource: 'Trust Engine v1.4', prev: 'running', next: 'restarted', ip: '10.0.0.3', result: 'SUCCESS', reason: 'Memory leak patch', privileged: true },
  { id: 'AUD-A0995', ts: '2026-08-01 11:44:20', client: 'VIT Vellore', actor: 'Dr. Suresh', role: 'Institution Admin', action: 'USER_SUSPEND', resource: 'USR-STU-44050', prev: 'active', next: 'suspended', ip: '165.22.88.12', result: 'SUCCESS', reason: 'Exam rule violation', privileged: false },
  { id: 'AUD-A0994', ts: '2026-08-01 10:30:00', client: 'Platform', actor: 'Prashant', role: 'Super Admin', action: 'CLIENT_PLAN_CHANGE', resource: 'CLIENT-NIT-005', prev: 'Starter', next: 'Institution', ip: '10.0.0.1', result: 'SUCCESS', reason: 'Upgrade request approved', privileged: true },
];

const RESULT_CFG = {
  SUCCESS: { color: '#34d399' },
  FAILURE: { color: '#f87171' },
  PARTIAL: { color: '#fbbf24' },
};

export default function AuditCompliance() {
  const [search, setSearch] = useState('');
  const [showPrivileged, setShowPrivileged] = useState(false);

  const filtered = AUDIT_LOGS.filter(l => {
    const matchSearch = l.action.toLowerCase().includes(search.toLowerCase()) || l.actor.toLowerCase().includes(search.toLowerCase()) || l.client.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase());
    const matchPriv = showPrivileged ? l.privileged : true;
    return matchSearch && matchPriv;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Audit & Compliance</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Immutable global audit trail — all sensitive actions traceable</p>
        </div>
        <button className="btn btn-secondary">Export CSV</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search action, actor, client, event ID…" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.55rem 0.85rem 0.55rem 2.25rem', fontSize: '0.875rem', outline: 'none' }} />
        </div>
        <button onClick={() => setShowPrivileged(!showPrivileged)} style={{
          padding: '0.45rem 1rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1px solid',
          background: showPrivileged ? 'rgba(245,158,11,0.15)' : 'transparent',
          color: showPrivileged ? '#fbbf24' : '#94a3b8',
          borderColor: showPrivileged ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.1)'
        }}>⭐ Privileged Actions Only</button>
        <select style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>
          <option>All Clients</option>
          <option>Platform Only</option>
          <option>IIT Bombay</option>
          <option>Delhi University</option>
          <option>UPSC Authority</option>
        </select>
        <select style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Event ID</th><th>Timestamp</th><th>Client</th><th>Actor</th><th>Role</th>
                <th>Action</th><th>Resource</th><th>Prev State</th><th>New State</th><th>Result</th><th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => {
                const rCfg = RESULT_CFG[l.result] || {};
                return (
                  <tr key={l.id} style={{ background: l.privileged ? 'rgba(245,158,11,0.04)' : 'transparent' }}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: l.privileged ? '#fbbf24' : '#a78bfa' }}>
                      {l.privileged && <span style={{ marginRight: '0.25rem' }}>⭐</span>}{l.id}
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap' }}>{l.ts}</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{l.client}</td>
                    <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{l.actor}</td>
                    <td style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{l.role}</td>
                    <td>
                      <code style={{ fontSize: '0.72rem', color: '#c4b5fd', background: 'rgba(139,92,246,0.1)', padding: '0.1rem 0.45rem', borderRadius: 5, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                        {l.action}
                      </code>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#8b5cf6', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.resource}</td>
                    <td style={{ fontSize: '0.75rem', color: '#64748b' }}>{l.prev}</td>
                    <td style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{l.next}</td>
                    <td style={{ fontWeight: 700, fontSize: '0.78rem', color: rCfg.color }}>{l.result}</td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ fontSize: '0.78rem', color: '#475569', textAlign: 'center' }}>
        ⭐ Privileged admin actions are highlighted and require dual-approval for enforcement-sensitive events.
      </div>
    </div>
  );
}
