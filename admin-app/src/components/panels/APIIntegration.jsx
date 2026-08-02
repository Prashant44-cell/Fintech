import React, { useState } from 'react';
import { Code2, Webhook, Key, Plus, RefreshCw, Trash2 } from 'lucide-react';

const API_CLIENTS = [
  { name: 'IIT Bombay LMS', keyId: 'KEY-IIT-001', env: 'Production', perms: ['verify', 'session.read'], requests: '48.2K', rateLimit: '1000/min', lastUsed: '2 min ago', status: 'active' },
  { name: 'UPSC Exam Portal', keyId: 'KEY-UPSC-002', env: 'Production', perms: ['verify', 'credential.check', 'session.start'], requests: '124.7K', rateLimit: '5000/min', lastUsed: '30s ago', status: 'active' },
  { name: 'Delhi Univ. SSO', keyId: 'KEY-DU-003', env: 'Production', perms: ['auth.login', 'credential.read'], requests: '22.4K', rateLimit: '500/min', lastUsed: '15 min ago', status: 'active' },
  { name: 'NIT Trichy Test', keyId: 'KEY-NIT-004', env: 'Staging', perms: ['verify', 'session.read'], requests: '1.2K', rateLimit: '100/min', lastUsed: '2 hr ago', status: 'active' },
  { name: 'GRE Board Integration', keyId: 'KEY-GRE-005', env: 'Production', perms: ['verify'], requests: '0', rateLimit: '500/min', lastUsed: 'Never', status: 'suspended' },
];

const WEBHOOKS = [
  { endpoint: 'https://lms.iitb.ac.in/callid/hook', events: ['credential.issued', 'trust.changed'], status: 'active', lastDelivery: '2 min ago', failures: 0 },
  { endpoint: 'https://exam.upsc.gov.in/webhook', events: ['session.restricted', 'stepup.required', 'security.alert'], status: 'active', lastDelivery: '45s ago', failures: 0 },
  { endpoint: 'https://portal.du.ac.in/callid', events: ['credential.revoked', 'credential.issued'], status: 'active', lastDelivery: '1 hr ago', failures: 2 },
  { endpoint: 'https://gre.in/callid-hook', events: ['trust.changed'], status: 'failing', lastDelivery: '3 days ago', failures: 18 },
];

const ALL_EVENTS = ['credential.issued', 'credential.revoked', 'trust.changed', 'stepup.required', 'session.restricted', 'security.alert'];

export default function APIIntegration() {
  const [tab, setTab] = useState('clients');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>API & Integration Management</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>API clients, keys, webhooks, and integration configuration</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> {tab === 'clients' ? 'New API Client' : 'Add Webhook'}</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.25rem', width: 'fit-content' }}>
        {['clients', 'webhooks'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.45rem 1.25rem', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600,
            textTransform: 'capitalize', cursor: 'pointer', border: 'none',
            background: tab === t ? 'rgba(139,92,246,0.25)' : 'transparent',
            color: tab === t ? '#c4b5fd' : '#94a3b8'
          }}>{t === 'clients' ? 'API Clients' : 'Webhooks'}</button>
        ))}
      </div>

      {tab === 'clients' && (
        <>
          <div style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '0.7rem 1rem', fontSize: '0.8rem', color: '#22d3ee' }}>
            🔒 API keys are displayed here as masked IDs only. Full keys are shown once upon creation and cannot be retrieved again.
          </div>
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-container">
              <table>
                <thead>
                  <tr><th>Client Name</th><th>Key ID</th><th>Environment</th><th>Permissions</th><th>Requests</th><th>Rate Limit</th><th>Last Used</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {API_CLIENTS.map(c => (
                    <tr key={c.keyId}>
                      <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{c.name}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{c.keyId}</td>
                      <td><span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 9999, background: c.env === 'Production' ? 'rgba(16,185,129,0.1)' : 'rgba(6,182,212,0.1)', color: c.env === 'Production' ? '#34d399' : '#22d3ee', border: `1px solid ${c.env === 'Production' ? 'rgba(16,185,129,0.3)' : 'rgba(6,182,212,0.3)'}` }}>{c.env}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                          {c.perms.map(p => <span key={p} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: 5, background: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.2)' }}>{p}</span>)}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{c.requests}</td>
                      <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{c.rateLimit}</td>
                      <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{c.lastUsed}</td>
                      <td><span style={{ fontSize: '0.72rem', fontWeight: 600, color: c.status === 'active' ? '#34d399' : '#f87171' }}>{c.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}><Key size={10} /> Rotate</button>
                          <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Revoke</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'webhooks' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {WEBHOOKS.map(w => (
              <div key={w.endpoint} className="glass-panel" style={{ padding: '1rem 1.25rem', border: `1px solid ${w.status === 'failing' ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.1)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                      <code style={{ fontSize: '0.85rem', color: '#a78bfa', fontFamily: 'monospace' }}>{w.endpoint}</code>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 9999, background: w.status === 'active' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.15)', color: w.status === 'active' ? '#34d399' : '#f87171', border: `1px solid ${w.status === 'active' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.4)'}` }}>{w.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {w.events.map(e => <span key={e} style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem', borderRadius: 6, background: 'rgba(6,182,212,0.08)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.2)' }}>{e}</span>)}
                    </div>
                    <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: '#64748b' }}>
                      Last Delivery: {w.lastDelivery} · Failures: <span style={{ color: w.failures > 0 ? '#f87171' : '#34d399', fontWeight: 700 }}>{w.failures}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}><RefreshCw size={11} /> Test</button>
                    {w.failures > 0 && <button className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}>Retry</button>}
                    <button className="btn" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}><Trash2 size={11} /> Disable</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Supported Events */}
          <div className="glass-panel">
            <h4 style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Supported Webhook Events</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {ALL_EVENTS.map(e => <span key={e} style={{ fontSize: '0.8rem', padding: '0.3rem 0.7rem', borderRadius: 8, background: 'rgba(139,92,246,0.08)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)', fontFamily: 'monospace' }}>{e}</span>)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
