import React, { useState, useEffect } from 'react';
import {
  Building2, Users, CreditCard, Activity, Shield, AlertTriangle,
  Bell, Ban, Zap, Server, CheckCircle2, AlertCircle, XCircle,
  TrendingUp, TrendingDown, Eye, Clock
} from 'lucide-react';

const KPI_DATA = [
  { label: 'Total Institutions', value: '142', icon: Building2, color: '#06b6d4', trend: '+3', up: true },
  { label: 'Active Institutions', value: '138', icon: Building2, color: '#10b981', trend: '+2', up: true },
  { label: 'Registered Identities', value: '4.2M', icon: Users, color: '#8b5cf6', trend: '+12.4K', up: true },
  { label: 'Active Credentials', value: '3.87M', icon: CreditCard, color: '#06b6d4', trend: '+8.1K', up: true },
  { label: 'Active Sessions', value: '18,420', icon: Activity, color: '#10b981', trend: '+237', up: true },
  { label: 'High-Risk Sessions', value: '39', icon: AlertTriangle, color: '#f59e0b', trend: '-12', up: false },
  { label: 'Security Alerts', value: '7', icon: Bell, color: '#ef4444', trend: '+2', up: true },
  { label: 'Revoked Credentials', value: '2,140', icon: Ban, color: '#f87171', trend: '+5', up: true },
  { label: 'API Requests / min', value: '84.2K', icon: Zap, color: '#a78bfa', trend: '+3.2K', up: true },
  { label: 'Platform Availability', value: '99.97%', icon: Server, color: '#34d399', trend: 'SLA Met', up: true },
];

const SECURITY_OVERVIEW = [
  { label: 'Trusted', value: 17610, color: '#10b981', pct: 95.6 },
  { label: 'Monitoring', value: 601, color: '#06b6d4', pct: 3.3 },
  { label: 'Step-Up Required', value: 170, color: '#f59e0b', pct: 0.9 },
  { label: 'High Risk', value: 39, color: '#ef4444', pct: 0.2 },
  { label: 'Restricted', value: 0, color: '#7f1d1d', pct: 0 },
];

const SERVICES = [
  { name: 'API Gateway', status: 'healthy', lat: '12ms', err: '0.01%' },
  { name: 'Auth Service', status: 'healthy', lat: '18ms', err: '0.02%' },
  { name: 'Credential Service', status: 'healthy', lat: '24ms', err: '0.00%' },
  { name: 'Trust Engine', status: 'healthy', lat: '84ms', err: '0.07%' },
  { name: 'Risk Engine', status: 'healthy', lat: '72ms', err: '0.04%' },
  { name: 'Policy Engine', status: 'degraded', lat: '310ms', err: '1.2%' },
  { name: 'Audit Service', status: 'healthy', lat: '9ms', err: '0.00%' },
  { name: 'Notification Svc', status: 'healthy', lat: '55ms', err: '0.10%' },
  { name: 'Blockchain/Proof', status: 'healthy', lat: '420ms', err: '0.03%' },
  { name: 'Database', status: 'healthy', lat: '6ms', err: '0.00%' },
  { name: 'Cache (Redis)', status: 'healthy', lat: '2ms', err: '0.00%' },
  { name: 'Event Queue', status: 'degraded', lat: '180ms', err: '0.55%' },
];

const CRITICAL_EVENTS = [
  { time: '14:12:05', client: 'IIT Bombay', user: 'SES-77A12B', event: 'Session Hijack Attempt Detected', severity: 'critical', action: 'Contained' },
  { time: '14:09:42', client: 'Delhi University', user: 'CRED-AB8821', event: 'Credential Revocation by Proctor', severity: 'high', action: 'Revoked' },
  { time: '14:07:18', client: 'UPSC Authority', user: 'SES-33C044', event: 'Deepfake Suspicion Flag Raised', severity: 'high', action: 'Step-Up Issued' },
  { time: '13:58:00', client: 'Platform', user: 'ADMIN-001', event: 'Global Trust Policy Updated', severity: 'medium', action: 'Audited' },
  { time: '13:45:33', client: 'NIT Trichy', user: 'SES-98F2E1', event: 'Proxy Suspicion — VPN Exit Node', severity: 'medium', action: 'Monitoring' },
  { time: '13:30:11', client: 'VIT Vellore', user: 'USR-2210A', event: 'Failed MFA × 5 — Lockout Applied', severity: 'high', action: 'Locked' },
];

function StatusDot({ status }) {
  const cfg = {
    healthy: { color: '#10b981', shadow: '#10b981' },
    degraded: { color: '#f59e0b', shadow: '#f59e0b' },
    unavailable: { color: '#ef4444', shadow: '#ef4444' },
  }[status] || { color: '#94a3b8', shadow: '#94a3b8' };
  return (
    <span style={{
      display: 'inline-block', width: 9, height: 9, borderRadius: '50%',
      background: cfg.color, boxShadow: `0 0 8px ${cfg.shadow}`,
      animation: status === 'healthy' ? 'pulseDot 2s infinite' : 'none'
    }} />
  );
}

function SeverityBadge({ sev }) {
  const map = {
    critical: { bg: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'rgba(239,68,68,0.5)' },
    high: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.4)' },
    medium: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.35)' },
    low: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  }[sev] || {};
  return (
    <span style={{
      padding: '0.2rem 0.6rem', borderRadius: 9999,
      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
      background: map.bg, color: map.color, border: `1px solid ${map.border}`
    }}>{sev}</span>
  );
}

export default function SuperAdminDashboard({ summary }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  const total = SECURITY_OVERVIEW.reduce((a, b) => a + b.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
            Platform Overview
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Super Admin — CallID Identity Platform • {now.toLocaleTimeString()}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.4)' }}>
            ● Platform Operational
          </span>
          <span style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
            ⚠ 2 Services Degraded
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        {KPI_DATA.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="glass-panel" style={{ padding: '1rem 1.1rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, borderRadius: '0 0 0 60px', background: `${kpi.color}18` }} />
              <Icon size={18} color={kpi.color} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</div>
              <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: kpi.up ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {kpi.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Overview + Platform Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.25rem' }}>

        {/* Security Overview */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Security Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {SECURITY_OVERVIEW.map((tier) => (
              <div key={tier.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{tier.label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: tier.color }}>
                    {tier.value.toLocaleString()} <span style={{ color: '#475569', fontWeight: 400 }}>({tier.pct}%)</span>
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${tier.pct}%`, background: tier.color, borderRadius: 3, transition: 'width 0.8s ease', minWidth: tier.value > 0 ? 4 : 0 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: '#94a3b8' }}>Total Active Sessions</span>
            <span style={{ color: '#fff', fontWeight: 700 }}>{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Platform Health */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Platform Health</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            {SERVICES.map((svc) => (
              <div key={svc.name} style={{
                background: 'rgba(0,0,0,0.3)', border: `1px solid ${svc.status === 'healthy' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.3)'}`,
                borderRadius: 10, padding: '0.65rem 0.8rem', display: 'flex', flexDirection: 'column', gap: '0.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e2e8f0' }}>{svc.name}</span>
                  <StatusDot status={svc.status} />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {svc.lat} · ERR {svc.err}
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: svc.status === 'healthy' ? '#34d399' : '#fbbf24' }}>
                  {svc.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Critical Events */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Recent Critical Events</h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live · Auto-refreshing</span>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Time</th><th>Client</th><th>User / Session</th><th>Event</th><th>Severity</th><th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              {CRITICAL_EVENTS.map((ev, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#94a3b8' }}>{ev.time}</td>
                  <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.85rem' }}>{ev.client}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{ev.user}</td>
                  <td style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{ev.event}</td>
                  <td><SeverityBadge sev={ev.severity} /></td>
                  <td style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 600 }}>{ev.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
