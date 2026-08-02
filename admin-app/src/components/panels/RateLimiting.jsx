import React from 'react';
import { Gauge, Shield, Ban } from 'lucide-react';

const RATE_METRICS = [
  { label: 'Requests / sec', value: '1,403', color: '#06b6d4' },
  { label: 'Blocked Requests', value: '312', color: '#ef4444' },
  { label: 'Throttled Requests', value: '87', color: '#f59e0b' },
  { label: 'Pass-Through Rate', value: '97.8%', color: '#10b981' },
];

const TOP_CLIENTS = [
  { name: 'Delhi University', rps: 284, blocked: 12, throttled: 3 },
  { name: 'UPSC Authority', rps: 412, blocked: 0, throttled: 0 },
  { name: 'IIT Bombay', rps: 198, blocked: 4, throttled: 8 },
  { name: 'VIT Vellore', rps: 155, blocked: 21, throttled: 14 },
  { name: 'NIT Trichy', rps: 88, blocked: 270, throttled: 62 },
];

const TOP_ENDPOINTS = [
  { path: '/auth/verify', rps: 622, err: '0.2%' },
  { path: '/trust/evaluate', rps: 410, err: '0.07%' },
  { path: '/credentials/check', rps: 188, err: '0.0%' },
  { path: '/auth/login', rps: 94, err: '1.8%' },
  { path: '/sessions/start', rps: 89, err: '0.4%' },
];

const POLICIES = [
  { name: 'Login Attempts', limit: '5 / 5 min', dimension: 'Per IP', status: 'active' },
  { name: 'Verification', limit: '10 / min', dimension: 'Per User', status: 'active' },
  { name: 'Recovery', limit: '3 / day', dimension: 'Per Account', status: 'active' },
  { name: 'API General', limit: '1000 / min', dimension: 'Per API Key', status: 'active' },
  { name: 'Burst Limit', limit: '150 / sec burst', dimension: 'Per Client', status: 'active' },
  { name: 'Admin Actions', limit: '20 / min', dimension: 'Per Admin', status: 'active' },
];

const SUSPICIOUS_IPS = [
  { ip: '185.220.101.47', country: 'TOR Exit', requests: 1240, blocked: 1240, reason: 'Tor exit node' },
  { ip: '194.165.16.78', country: 'RU', requests: 892, blocked: 888, reason: 'Brute force pattern' },
  { ip: '45.148.10.220', country: 'NL', requests: 540, blocked: 540, reason: 'VPN exit — abuse list' },
];

export default function RateLimiting() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Rate Limiting & Abuse Protection</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Request throttling, blocking policies, and suspicious IP monitoring</p>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {RATE_METRICS.map(m => (
          <div key={m.label} className="glass-panel" style={{ flex: 1, padding: '1rem', borderTop: `3px solid ${m.color}` }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{m.value}</div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.2rem' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Top Clients + Endpoints */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Top Clients by Traffic</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr><th>Client</th><th>RPS</th><th>Blocked</th><th>Throttled</th></tr>
            </thead>
            <tbody>
              {TOP_CLIENTS.map(c => (
                <tr key={c.name}>
                  <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#e2e8f0' }}>{c.name}</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#06b6d4', fontWeight: 600 }}>{c.rps}</td>
                  <td style={{ padding: '0.65rem 1rem', color: c.blocked > 50 ? '#f87171' : '#64748b', fontWeight: c.blocked > 50 ? 700 : 400 }}>{c.blocked}</td>
                  <td style={{ padding: '0.65rem 1rem', color: c.throttled > 0 ? '#fbbf24' : '#64748b' }}>{c.throttled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Top Endpoints</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr><th>Endpoint</th><th>RPS</th><th>Error Rate</th></tr>
            </thead>
            <tbody>
              {TOP_ENDPOINTS.map(e => (
                <tr key={e.path}>
                  <td style={{ padding: '0.65rem 1rem', fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{e.path}</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#06b6d4', fontWeight: 600 }}>{e.rps}</td>
                  <td style={{ padding: '0.65rem 1rem', color: parseFloat(e.err) > 1 ? '#f87171' : '#34d399', fontWeight: 600 }}>{e.err}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rate Limit Policies */}
      <div className="glass-panel">
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={16} color="#8b5cf6" /> Rate Limit Policies
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
          {POLICIES.map(p => (
            <div key={p.name} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.85rem 1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.88rem' }}>{p.name}</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#a78bfa', marginTop: '0.2rem' }}>{p.limit}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>{p.dimension}</div>
              <span style={{ display: 'inline-block', marginTop: '0.4rem', fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.45rem', borderRadius: 9999, background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suspicious IPs */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Ban size={15} color="#ef4444" /> Suspicious IPs
          </h3>
          <button className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.7rem' }}>Add to Blocklist</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr><th>IP Address</th><th>Country</th><th>Requests</th><th>Blocked</th><th>Reason</th><th>Action</th></tr>
          </thead>
          <tbody>
            {SUSPICIOUS_IPS.map(ip => (
              <tr key={ip.ip}>
                <td style={{ padding: '0.65rem 1rem', fontFamily: 'monospace', color: '#f87171' }}>{ip.ip}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#94a3b8' }}>{ip.country}</td>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#e2e8f0' }}>{ip.requests.toLocaleString()}</td>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 700, color: '#f87171' }}>{ip.blocked.toLocaleString()}</td>
                <td style={{ padding: '0.65rem 1rem', fontSize: '0.78rem', color: '#94a3b8' }}>{ip.reason}</td>
                <td style={{ padding: '0.65rem 1rem' }}>
                  <button className="btn" style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Permanent Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
