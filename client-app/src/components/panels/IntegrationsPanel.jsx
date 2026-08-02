import React, { useState } from 'react';
import { Plug, Code2, Webhook } from 'lucide-react';

const INTEGRATIONS = [
  { name: 'Student Information System', type: 'SIS', status: 'connected', endpoint: 'https://sis.nmit.ac.in/api/callid', auth: 'API Key', lastSync: '5 min ago', errors: 0 },
  { name: 'Learning Management System', type: 'LMS', status: 'connected', endpoint: 'https://lms.nmit.ac.in/callid', auth: 'OAuth2', lastSync: '10 min ago', errors: 0 },
  { name: 'Attendance System', type: 'Attendance', status: 'connected', endpoint: 'https://attendance.nmit.ac.in/api', auth: 'API Key', lastSync: '1 hr ago', errors: 2 },
  { name: 'Examination Portal', type: 'Exam', status: 'connected', endpoint: 'https://exam.nmit.ac.in/callid', auth: 'JWT', lastSync: '2 min ago', errors: 0 },
  { name: 'Campus Access System', type: 'Physical Access', status: 'disconnected', endpoint: 'Not configured', auth: 'N/A', lastSync: '—', errors: 0 },
  { name: 'Library System', type: 'Library', status: 'connected', endpoint: 'https://lib.nmit.ac.in/api', auth: 'API Key', lastSync: '30 min ago', errors: 0 },
  { name: 'SSO / Identity Provider', type: 'SSO', status: 'connected', endpoint: 'https://sso.nmit.ac.in', auth: 'SAML 2.0', lastSync: '15 min ago', errors: 0 },
];

const API_KEYS = [
  { name: 'Exam Portal Integration', key: 'KEY-EXM-001', env: 'Production', perms: ['verify', 'session.read'], lastUsed: '2 min ago', status: 'active' },
  { name: 'LMS Webhook', key: 'KEY-LMS-002', env: 'Production', perms: ['credential.issued', 'trust.changed'], lastUsed: '10 min ago', status: 'active' },
  { name: 'Attendance API', key: 'KEY-ATT-003', env: 'Production', perms: ['verify'], lastUsed: '1 hr ago', status: 'active' },
];

const WEBHOOKS = [
  { endpoint: 'https://exam.nmit.ac.in/hooks', events: ['stepup.required', 'session.terminated'], status: 'active', failures: 0 },
  { endpoint: 'https://lms.nmit.ac.in/callid-hook', events: ['credential.issued', 'trust.changed'], status: 'active', failures: 0 },
  { endpoint: 'https://attendance.nmit.ac.in/hook', events: ['credential.issued'], status: 'failing', failures: 5 },
];

const STATUS_CFG = {
  connected: { color: '#34d399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  disconnected: { color: '#64748b', bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.25)' },
  error: { color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)' },
};

export default function IntegrationsPanel() {
  const [tab, setTab] = useState('integrations');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Integrations</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Connect existing institutional systems without replacing them</p>
      </div>

      <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.25rem', width: 'fit-content' }}>
        {[['integrations', 'Systems'], ['api', 'API Keys'], ['webhooks', 'Webhooks']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '0.45rem 1.1rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: tab === id ? 'rgba(139,92,246,0.2)' : 'transparent', color: tab === id ? '#c4b5fd' : '#94a3b8' }}>{label}</button>
        ))}
      </div>

      {tab === 'integrations' && (
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table>
              <thead><tr><th>System</th><th>Type</th><th>Status</th><th>Endpoint</th><th>Auth Method</th><th>Last Sync</th><th>Errors</th><th>Actions</th></tr></thead>
              <tbody>
                {INTEGRATIONS.map(int => {
                  const sCfg = STATUS_CFG[int.status] || {};
                  return (
                    <tr key={int.name}>
                      <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{int.name}</td>
                      <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{int.type}</td>
                      <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{int.status}</span></td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{int.endpoint}</td>
                      <td style={{ fontSize: '0.78rem', color: '#8b5cf6' }}>{int.auth}</td>
                      <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{int.lastSync}</td>
                      <td style={{ fontWeight: int.errors > 0 ? 700 : 400, color: int.errors > 0 ? '#f87171' : '#64748b' }}>{int.errors}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>{int.status === 'connected' ? 'Configure' : 'Connect'}</button>
                          {int.errors > 0 && <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)' }}>Retry</button>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'api' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#22d3ee' }}>
            🔒 API keys are displayed as masked IDs. Full keys shown once at creation.
          </div>
          {API_KEYS.map(k => (
            <div key={k.key} className="glass-panel" style={{ padding: '0.9rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#e2e8f0' }}>{k.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#a78bfa', marginTop: '0.2rem' }}>{k.key}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>
                  Env: {k.env} · Last used: {k.lastUsed} · Perms: {k.perms.join(', ')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button className="btn btn-secondary" style={{ fontSize: '0.72rem' }}>Rotate</button>
                <button className="btn" style={{ fontSize: '0.72rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Revoke</button>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>+ Generate API Key</button>
        </div>
      )}

      {tab === 'webhooks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {WEBHOOKS.map(w => (
            <div key={w.endpoint} className="glass-panel" style={{ padding: '1rem 1.25rem', border: `1px solid ${w.status === 'failing' ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.08)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <code style={{ fontSize: '0.85rem', color: '#a78bfa', fontFamily: 'monospace' }}>{w.endpoint}</code>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                    {w.events.map(e => <span key={e} style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 6, background: 'rgba(6,182,212,0.08)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.2)' }}>{e}</span>)}
                  </div>
                  <div style={{ marginTop: '0.3rem', fontSize: '0.75rem', color: '#64748b' }}>
                    Status: <span style={{ fontWeight: 700, color: w.status === 'active' ? '#34d399' : '#f87171' }}>{w.status}</span> · Failures: <span style={{ fontWeight: 700, color: w.failures > 0 ? '#f87171' : '#34d399' }}>{w.failures}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button className="btn btn-secondary" style={{ fontSize: '0.72rem' }}>Test</button>
                  {w.failures > 0 && <button className="btn btn-secondary" style={{ fontSize: '0.72rem' }}>Retry</button>}
                  <button className="btn" style={{ fontSize: '0.72rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Disable</button>
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>+ Add Webhook</button>
        </div>
      )}
    </div>
  );
}
