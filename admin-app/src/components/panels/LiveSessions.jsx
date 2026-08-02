import React, { useState } from 'react';
import { Monitor, AlertTriangle, XCircle, StopCircle } from 'lucide-react';

const SESSION_KPI = [
  { label: 'Active Sessions', value: '18,420', color: '#06b6d4' },
  { label: 'Trusted', value: '17,610', color: '#10b981' },
  { label: 'Monitoring', value: '601', color: '#06b6d4' },
  { label: 'Step-Up Required', value: '170', color: '#f59e0b' },
  { label: 'High Risk', value: '39', color: '#ef4444' },
];

const SESSIONS = [
  { id: 'SES-77A12B', client: 'IIT Bombay', user: 'STU-28401-****', device: 'MacBook Pro (Trusted)', trust: 94, risk: 'low', duration: '1h 42m', lastEval: '14s ago', status: 'trusted' },
  { id: 'SES-33C044', client: 'UPSC Authority', user: 'EXM-94521-****', device: 'Windows Laptop (Unknown)', trust: 41, risk: 'high', duration: '24m', lastEval: '8s ago', status: 'high-risk' },
  { id: 'SES-98F2E1', client: 'NIT Trichy', user: 'STU-7810-****', device: 'Chrome OS (Trusted)', trust: 62, risk: 'medium', duration: '55m', lastEval: '2s ago', status: 'monitoring' },
  { id: 'SES-AB5D91', client: 'Delhi University', user: 'STU-11290-****', device: 'iPhone 15 (Trusted)', trust: 88, risk: 'low', duration: '2h 10m', lastEval: '4s ago', status: 'trusted' },
  { id: 'SES-EF1C72', client: 'VIT Vellore', user: 'STU-44001-****', device: 'iPad Pro (Trusted)', trust: 55, risk: 'medium', duration: '31m', lastEval: '18s ago', status: 'step-up' },
  { id: 'SES-GH2A03', client: 'BITS Pilani', user: 'STU-15920-****', device: 'Linux Desktop (Unknown)', trust: 30, risk: 'high', duration: '8m', lastEval: '1s ago', status: 'high-risk' },
  { id: 'SES-IJ3B84', client: 'IIT Bombay', user: 'STU-28550-****', device: 'MacBook Air (Trusted)', trust: 97, risk: 'low', duration: '3h 05m', lastEval: '10s ago', status: 'trusted' },
];

const STATUS_CFG = {
  trusted: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)', label: 'Trusted' },
  monitoring: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)', label: 'Monitoring' },
  'step-up': { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)', label: 'Step-Up' },
  'high-risk': { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.4)', label: 'High Risk' },
};

function TrustBar({ value }) {
  const color = value >= 80 ? '#10b981' : value >= 60 ? '#06b6d4' : value >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', minWidth: 60 }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color, width: 30 }}>{value}</span>
    </div>
  );
}

export default function LiveSessions() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? SESSIONS : SESSIONS.filter(s => s.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Global Live Sessions</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Platform-wide session health — privacy restricted view</p>
        </div>
        <span style={{ fontSize: '0.78rem', color: '#34d399', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 9999, padding: '0.35rem 0.85rem', fontWeight: 600 }}>
          ● Live Monitoring
        </span>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {SESSION_KPI.map(k => (
          <div key={k.label} className="glass-panel" style={{ flex: 1, padding: '0.85rem 1rem', borderTop: `3px solid ${k.color}` }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{k.value}</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.2rem' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['all', 'trusted', 'monitoring', 'step-up', 'high-risk'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.35rem 0.85rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600,
            textTransform: 'capitalize', cursor: 'pointer', border: '1px solid',
            background: filter === f ? 'rgba(139,92,246,0.2)' : 'transparent',
            color: filter === f ? '#c4b5fd' : '#94a3b8',
            borderColor: filter === f ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)'
          }}>{f.replace('-', ' ')}</button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Session ID</th><th>Client</th><th>Pseudonymous User</th><th>Device State</th>
                <th>Trust Score</th><th>Risk</th><th>Duration</th><th>Last Eval</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const sCfg = STATUS_CFG[s.status] || {};
                const riskCfg = { low: '#34d399', medium: '#fbbf24', high: '#f87171' };
                return (
                  <tr key={s.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{s.id}</td>
                    <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.85rem' }}>{s.client}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>{s.user}</td>
                    <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{s.device}</td>
                    <td><TrustBar value={s.trust} /></td>
                    <td><span style={{ fontSize: '0.78rem', fontWeight: 700, color: riskCfg[s.risk] || '#94a3b8', textTransform: 'uppercase' }}>{s.risk}</span></td>
                    <td style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' }}>{s.duration}</td>
                    <td style={{ fontSize: '0.72rem', color: '#64748b' }}>{s.lastEval}</td>
                    <td><span style={{ padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{sCfg.label}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.25rem 0.45rem' }}>Investigate</button>
                        {s.status === 'high-risk' && (
                          <button className="btn" style={{ fontSize: '0.65rem', padding: '0.25rem 0.45rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Terminate</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ fontSize: '0.78rem', color: '#475569', textAlign: 'center' }}>
        User identifiers are pseudonymized. Full lookup requires elevated Security Admin authorization and generates an audit entry.
      </div>
    </div>
  );
}
