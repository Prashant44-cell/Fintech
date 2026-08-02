import React, { useState } from 'react';
import { FileText, Search, Download } from 'lucide-react';

const LOGS = [
  { id: 'AUD-9001', ts: '2026-08-01 14:12:05', userId: 'STU-5529', session: 'SES-FF5G6H', event: 'SESSION_TERMINATED', actor: 'Admin: Anitha V.', cred: 'CRED-STU-FF6G7H', prevTrust: 12, newTrust: 0, risk: 'critical', action: 'Terminate', result: 'SUCCESS', reason: 'Hijack containment' },
  { id: 'AUD-9000', ts: '2026-08-01 13:45:33', userId: 'STU-3312', session: '—', event: 'CREDENTIAL_REVOKE', actor: 'Admin: Dr. Suresh Kumar', cred: 'CRED-STU-GG7H8I', prevTrust: 0, newTrust: 0, risk: 'high', action: 'Revoke', result: 'SUCCESS', reason: 'Policy violation' },
  { id: 'AUD-8999', ts: '2026-08-01 09:34:12', userId: 'STU-2841', session: 'SES-AA1B2C', event: 'STEPUP_PASSED', actor: 'Trust Engine v1.4', cred: 'CRED-STU-AA1B2C', prevTrust: 67, newTrust: 91, risk: 'medium', action: 'Step-Up', result: 'PASS', reason: 'Behavioral anomaly resolved' },
  { id: 'AUD-8998', ts: '2026-08-01 09:32:08', userId: 'STU-2841', session: 'SES-AA1B2C', event: 'TRUST_CHANGE', actor: 'Risk Engine v1.2', cred: 'CRED-STU-AA1B2C', prevTrust: 94, newTrust: 67, risk: 'medium', action: 'Monitor', result: 'WARN', reason: 'Behavioral anomaly detected' },
  { id: 'AUD-8997', ts: '2026-08-01 09:01:14', userId: 'STU-2841', session: 'SES-AA1B2C', event: 'CREDENTIAL_VERIFY', actor: 'Authentication Service', cred: 'CRED-STU-AA1B2C', prevTrust: 0, newTrust: 94, risk: 'low', action: 'Allow', result: 'SUCCESS', reason: 'Valid credential on exam entry' },
  { id: 'AUD-8996', ts: '2026-08-01 08:50:20', userId: 'STU-1042', session: 'SES-BB2C3D', event: 'LIVENESS_FAIL', actor: 'Trust Engine v1.4', cred: 'CRED-STU-CC3D4E', prevTrust: 55, newTrust: 39, risk: 'high', action: 'Step-Up', result: 'FAIL', reason: 'Liveness confidence below threshold' },
  { id: 'AUD-8995', ts: '2026-08-01 08:30:00', userId: 'ADM-001', session: '—', event: 'POLICY_UPDATE', actor: 'Admin: Anitha V.', cred: '—', prevTrust: 0, newTrust: 0, risk: 'low', action: 'Config', result: 'SUCCESS', reason: 'Step-up threshold updated: 65→70' },
];

const RESULT_CFG = {
  SUCCESS: '#34d399', PASS: '#34d399', FAIL: '#f87171', WARN: '#fbbf24', REVOKED: '#f87171',
};
const RISK_CFG = {
  critical: 'rgba(239,68,68,0.04)',
  high: 'rgba(245,158,11,0.03)',
  medium: 'transparent',
  low: 'transparent',
};

export default function AuditLogs() {
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('all');

  const events = [...new Set(LOGS.map(l => l.event))];
  const filtered = LOGS.filter(l => {
    const matchSearch = l.userId.toLowerCase().includes(search.toLowerCase()) || l.event.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase());
    const matchEvent = eventFilter === 'all' || l.event === eventFilter;
    return matchSearch && matchEvent;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Audit Logs</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Immutable identity and security event trail</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary"><Download size={15} /> CSV</button>
          <button className="btn btn-secondary"><Download size={15} /> PDF</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search user, event, ID…" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.5rem 0.85rem 0.5rem 2rem', fontSize: '0.875rem', outline: 'none', width: 260 }} />
        </div>
        <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
          <option value="all">All Events</option>
          {events.map(ev => <option key={ev} value={ev}>{ev}</option>)}
        </select>
        <select style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
          <option>Today</option><option>Last 7 Days</option><option>Last 30 Days</option>
        </select>
        <select style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
          <option>All Risk Levels</option><option>Critical</option><option>High</option><option>Medium</option>
        </select>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Event ID</th><th>Timestamp</th><th>User ID</th><th>Session</th>
                <th>Event Type</th><th>Actor</th><th>Trust Change</th><th>Action</th><th>Result</th><th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id} style={{ background: RISK_CFG[log.risk] }}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#a78bfa' }}>{log.id}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap' }}>{log.ts}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600 }}>{log.userId}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{log.session}</td>
                  <td>
                    <code style={{ fontSize: '0.72rem', color: '#c4b5fd', background: 'rgba(139,92,246,0.1)', padding: '0.1rem 0.4rem', borderRadius: 5, fontFamily: 'monospace' }}>{log.event}</code>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{log.actor}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {log.prevTrust > 0 || log.newTrust > 0 ? (
                      <span>
                        <span style={{ fontWeight: 600, color: '#64748b' }}>{log.prevTrust}</span>
                        <span style={{ color: '#475569', margin: '0 0.2rem' }}>→</span>
                        <span style={{ fontWeight: 700, color: log.newTrust > log.prevTrust ? '#34d399' : log.newTrust < log.prevTrust ? '#f87171' : '#94a3b8' }}>{log.newTrust}</span>
                      </span>
                    ) : <span style={{ color: '#475569' }}>—</span>}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{log.action}</td>
                  <td style={{ fontWeight: 700, fontSize: '0.78rem', color: RESULT_CFG[log.result] || '#94a3b8' }}>{log.result}</td>
                  <td style={{ fontSize: '0.78rem', color: '#64748b', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ fontSize: '0.75rem', color: '#334155', textAlign: 'center' }}>
        Selected audit proofs are anchored to Sepolia blockchain. Not all log entries require on-chain anchoring.
      </div>
    </div>
  );
}
