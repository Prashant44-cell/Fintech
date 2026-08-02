import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Search } from 'lucide-react';

const ALERTS = [
  { id: 'ALT-8801', user: 'STU-1042', session: 'SES-BB2C3D', detected: '14:05:11', category: 'Deepfake Suspicion', severity: 'high', confidence: '87%', trust: 39, action: 'Step-Up Issued', status: 'investigating' },
  { id: 'ALT-8800', user: 'STU-5529', session: 'SES-FF5G6H', detected: '11:00:22', category: 'Session Hijacking', severity: 'critical', confidence: '94%', trust: 12, action: 'Session Terminated', status: 'resolved' },
  { id: 'ALT-8799', user: 'STU-6620', session: 'SES-GG6H7I', detected: '10:45:09', category: 'Proxy Suspicion', severity: 'high', confidence: '78%', trust: 21, action: 'Restricted', status: 'open' },
  { id: 'ALT-8798', user: 'STU-7810', session: 'SES-CC3D4E', detected: '14:10:55', category: 'Behavioral Anomaly', severity: 'medium', confidence: '71%', trust: 58, action: 'Monitoring', status: 'open' },
  { id: 'ALT-8797', user: 'FAC-0044', session: 'SES-DD4E5F', detected: '09:45:00', category: 'Multiple Failed Verification', severity: 'medium', confidence: '92%', trust: 42, action: 'Step-Up Issued', status: 'resolved' },
  { id: 'ALT-8796', user: 'STU-3312', session: 'SES-HH8I9J', detected: '2026-07-20', category: 'Credential Misuse', severity: 'critical', confidence: '99%', trust: 0, action: 'Credential Revoked', status: 'resolved' },
];

const CATEGORIES = ['All', 'Deepfake Suspicion', 'Proxy Suspicion', 'Session Hijacking', 'Behavioral Anomaly', 'Credential Misuse', 'Multiple Failed Verification', 'Device Change', 'Replay Attempt', 'Unusual Network'];

const SEVERITY_CFG = {
  critical: { bg: 'rgba(239,68,68,0.18)', color: '#f87171', border: 'rgba(239,68,68,0.45)' },
  high: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.35)' },
  medium: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  low: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
};

const STATUS_CFG = {
  open: { color: '#f87171' },
  investigating: { color: '#fbbf24' },
  resolved: { color: '#34d399' },
  'false positive': { color: '#64748b' },
};

export default function RiskAlerts() {
  const [catFilter, setCatFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filtered = ALERTS.filter(a => {
    const matchCat = catFilter === 'All' || a.category === catFilter;
    const matchSev = severityFilter === 'all' || a.severity === severityFilter;
    return matchCat && matchSev;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Risk & Alerts</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Central security operations — threat detection and response</p>
        </div>
        <span style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.35)' }}>
          ● {ALERTS.filter(a => a.status !== 'resolved').length} Open Alerts
        </span>
      </div>

      {/* Category Filter Chips */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCatFilter(cat)} style={{ padding: '0.3rem 0.75rem', borderRadius: 9999, fontSize: '0.73rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: catFilter === cat ? 'rgba(239,68,68,0.15)' : 'transparent', color: catFilter === cat ? '#f87171' : '#94a3b8', borderColor: catFilter === cat ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Severity Filter */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {['all', 'critical', 'high', 'medium', 'low'].map(s => {
          const sCfg = SEVERITY_CFG[s] || {};
          return (
            <button key={s} onClick={() => setSeverityFilter(s)} style={{ padding: '0.3rem 0.7rem', borderRadius: 9999, fontSize: '0.73rem', fontWeight: 700, textTransform: 'capitalize', cursor: 'pointer', border: '1px solid', background: severityFilter === s ? (sCfg.bg || 'rgba(255,255,255,0.08)') : 'transparent', color: severityFilter === s ? (sCfg.color || '#e2e8f0') : '#94a3b8', borderColor: severityFilter === s ? (sCfg.border || 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.1)' }}>
              {s}
            </button>
          );
        })}
      </div>

      {/* Alert Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Alert ID</th><th>User</th><th>Session</th><th>Detected At</th><th>Category</th><th>Severity</th><th>Confidence</th><th>Trust</th><th>Action Taken</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(a => {
                const sCfg = SEVERITY_CFG[a.severity] || {};
                const stCfg = STATUS_CFG[a.status] || {};
                return (
                  <tr key={a.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#a78bfa' }}>{a.id}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600 }}>{a.user}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{a.session}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b', whiteSpace: 'nowrap' }}>{a.detected}</td>
                    <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{a.category}</td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{a.severity}</span></td>
                    <td style={{ fontWeight: 700, color: '#fbbf24' }}>{a.confidence}</td>
                    <td style={{ fontWeight: 700, color: a.trust < 40 ? '#f87171' : a.trust < 60 ? '#fbbf24' : '#34d399' }}>{a.trust}</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{a.action}</td>
                    <td style={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'capitalize', color: stCfg.color }}>{a.status}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>Investigate</button>
                        {a.status === 'open' && <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>Resolve</button>}
                      </div>
                    </td>
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
