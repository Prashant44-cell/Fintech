import React, { useState, useEffect } from 'react';
import { Users, CreditCard, Monitor, ShieldCheck, AlertTriangle, Ban, Bell, TrendingUp, TrendingDown, CheckCircle2, Server } from 'lucide-react';

const KPI_CARDS = [
  { label: 'Total Users', value: '12,840', icon: Users, color: '#06b6d4', trend: '+42 today', up: true },
  { label: 'Active Credentials', value: '11,920', icon: CreditCard, color: '#10b981', trend: '+38 today', up: true },
  { label: 'Active Sessions', value: '3,240', icon: Monitor, color: '#8b5cf6', trend: '+124 today', up: true },
  { label: 'Trusted Sessions', value: '3,118', icon: ShieldCheck, color: '#10b981', trend: '96.2% of active', up: true },
  { label: 'Step-Up Required', value: '84', icon: AlertTriangle, color: '#f59e0b', trend: '-6 last hour', up: false },
  { label: 'High-Risk Sessions', value: '18', icon: AlertTriangle, color: '#ef4444', trend: '+2 last hour', up: true },
  { label: 'Revoked Credentials', value: '94', icon: Ban, color: '#f87171', trend: '+1 today', up: true },
  { label: 'Open Security Alerts', value: '5', icon: Bell, color: '#fbbf24', trend: '2 critical', up: true },
];

const TRUST_DIST = [
  { label: 'Trusted (80–100)', value: 3118, pct: 96.2, color: '#10b981' },
  { label: 'Monitoring (60–79)', value: 84, pct: 2.6, color: '#06b6d4' },
  { label: 'Step-Up (40–59)', value: 20, pct: 0.6, color: '#f59e0b' },
  { label: 'High Risk (<40)', value: 18, pct: 0.6, color: '#ef4444' },
];

const RECENT_EVENTS = [
  { user: 'STU-2841', event: 'Step-Up Verification Passed', risk: 'low', trust: 91, time: '2 min ago', action: 'Resolved' },
  { user: 'STU-1042', event: 'Behavioral Anomaly Detected', risk: 'high', trust: 39, time: '5 min ago', action: 'Restricted' },
  { user: 'STU-7810', event: 'Unknown Device Login Attempt', risk: 'medium', trust: 58, time: '12 min ago', action: 'Step-Up Issued' },
  { user: 'FAC-0044', event: 'Liveness Check Failed × 2', risk: 'high', trust: 42, time: '18 min ago', action: 'Alert Raised' },
  { user: 'STU-5529', event: 'Session Hijack Suspicion', risk: 'critical', trust: 12, time: '31 min ago', action: 'Session Terminated' },
  { user: 'STU-9901', event: 'Credential Verified & Session Started', risk: 'low', trust: 97, time: '45 min ago', action: 'Allowed' },
];

const SERVICES = [
  { name: 'Authentication Service', status: 'healthy' },
  { name: 'Trust Engine', status: 'healthy' },
  { name: 'Credential Service', status: 'healthy' },
  { name: 'Blockchain / Proof', status: 'healthy' },
  { name: 'API Status', status: 'healthy' },
];

const RISK_CFG = {
  critical: { color: '#f87171', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)' },
  high: { color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  medium: { color: '#22d3ee', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
  low: { color: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
};

export default function ClientDashboard({ trustResult, sessionId, credential }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#fff', marginBottom: '0.2rem' }}>Identity Command Center</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Institution Admin · CallID Platform · {now.toLocaleTimeString()}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.4)' }}>
            ● Identity Environment: Safe
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
        {KPI_CARDS.map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="glass-panel" style={{ padding: '0.9rem 1rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 55, height: 55, borderRadius: '0 0 0 55px', background: `${k.color}18` }} />
              <Icon size={17} color={k.color} style={{ marginBottom: '0.4rem' }} />
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.label}</div>
              <div style={{ marginTop: '0.3rem', fontSize: '0.68rem', color: k.up ? (k.label.includes('High') || k.label.includes('Revoked') || k.label.includes('Alert') ? '#f87171' : '#34d399') : '#34d399', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {k.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Distribution + System Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Trust Distribution */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Trust Distribution — Live</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {TRUST_DIST.map(t => (
              <div key={t.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{t.label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: t.color }}>{t.pct}%<span style={{ color: '#475569', fontWeight: 400, marginLeft: 4 }}>({t.value.toLocaleString()})</span></span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${t.pct}%`, background: `linear-gradient(90deg, ${t.color}aa, ${t.color})`, borderRadius: 4, minWidth: t.value > 0 ? 4 : 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>System Health</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {SERVICES.map(svc => (
              <div key={svc.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.85rem', background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: `1px solid ${svc.status === 'healthy' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.3)'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Server size={14} color={svc.status === 'healthy' ? '#10b981' : '#f59e0b'} />
                  <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 500 }}>{svc.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: svc.status === 'healthy' ? '#10b981' : '#f59e0b', display: 'inline-block', boxShadow: `0 0 6px ${svc.status === 'healthy' ? '#10b981' : '#f59e0b'}` }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: svc.status === 'healthy' ? '#34d399' : '#fbbf24' }}>{svc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Security Events */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Recent Security Events</h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live · Auto-refreshing</span>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>User ID</th><th>Event</th><th>Risk Level</th><th>Trust Score</th><th>Time</th><th>Action Taken</th></tr></thead>
            <tbody>
              {RECENT_EVENTS.map((ev, i) => {
                const rCfg = RISK_CFG[ev.risk] || {};
                return (
                  <tr key={i}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>{ev.user}</td>
                    <td style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{ev.event}</td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...rCfg }}>{ev.risk}</span></td>
                    <td>
                      <span style={{ fontWeight: 700, color: ev.trust >= 80 ? '#34d399' : ev.trust >= 60 ? '#22d3ee' : ev.trust >= 40 ? '#fbbf24' : '#f87171' }}>{ev.trust}</span>
                      <span style={{ color: '#475569', fontSize: '0.75rem' }}>/100</span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{ev.time}</td>
                    <td style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 600 }}>{ev.action}</td>
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
