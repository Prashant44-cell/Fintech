import React, { useState } from 'react';
import { BarChart2, TrendingUp, TrendingDown, Users, CreditCard, Shield, Zap } from 'lucide-react';

const TABS = ['Identity', 'Security', 'Performance', 'Client Usage'];

const IDENTITY_STATS = [
  { label: 'Total Identities', value: '4,218,450', trend: '+12,430 today', up: true, color: '#06b6d4' },
  { label: 'New This Month', value: '88,200', trend: '+4.2% vs last month', up: true, color: '#8b5cf6' },
  { label: 'Active Users', value: '1,240,800', trend: '+3.1% vs last week', up: true, color: '#10b981' },
  { label: 'Credentials Issued', value: '3,872,450', trend: '+8,100 today', up: true, color: '#06b6d4' },
  { label: 'Credentials Verified', value: '1,204,000', trend: 'Last 24 hrs', up: true, color: '#34d399' },
  { label: 'Credentials Expired', value: '214,110', trend: '+350 today', up: true, color: '#f59e0b' },
  { label: 'Revocations (30d)', value: '2,140', trend: '-12 vs last month', up: false, color: '#ef4444' },
];

const SECURITY_STATS = [
  { label: 'High-Risk Sessions', value: '39', trend: 'Active now', color: '#ef4444' },
  { label: 'Step-Ups (24h)', value: '2,840', trend: '+120 vs yesterday', up: true, color: '#f59e0b' },
  { label: 'Proxy Suspicions', value: '14', trend: 'Active now', color: '#fbbf24' },
  { label: 'Session Takeover Susp.', value: '3', trend: 'Active now', color: '#f87171' },
  { label: 'Alerts (24h)', value: '6', trend: 'Total alerts', color: '#ef4444' },
  { label: 'Incidents (30d)', value: '18', trend: '3 open, 15 resolved', color: '#a78bfa' },
];

const PERF_STATS = [
  { label: 'Auth Latency (P95)', value: '18ms', color: '#34d399', good: true },
  { label: 'Trust Eval Latency (P95)', value: '84ms', color: '#34d399', good: true },
  { label: 'API Latency (P95)', value: '214ms', color: '#34d399', good: true },
  { label: 'Error Rate', value: '0.12%', color: '#34d399', good: true },
  { label: 'Uptime (30d)', value: '99.97%', color: '#10b981', good: true },
  { label: 'Policy Engine Latency', value: '310ms ⚠', color: '#fbbf24', good: false },
];

const CLIENT_USAGE = [
  { client: 'Delhi University', users: '182K', api: '22.4K rps', sessions: '18,200', creds: '171K' },
  { client: 'UPSC Authority', users: '945K', api: '124.7K rps', sessions: '0', creds: '920K' },
  { client: 'IIT Bombay', users: '28.4K', api: '48.2K rps', sessions: '3,240', creds: '26.8K' },
  { client: 'VIT Vellore', users: '44K', api: '18.1K rps', sessions: '1,880', creds: '41.5K' },
  { client: 'NIT Trichy', users: '12K', api: '8.8K rps', sessions: '740', creds: '11.4K' },
  { client: 'BITS Pilani', users: '16.8K', api: '11.2K rps', sessions: '892', creds: '15.9K' },
];

export default function Analytics() {
  const [tab, setTab] = useState('Identity');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Platform Analytics</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Identity, security, performance, and client usage insights</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}>
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Today</option>
          </select>
          <button className="btn btn-secondary">Export</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.25rem', width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.45rem 1.1rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600,
            cursor: 'pointer', border: 'none',
            background: tab === t ? 'rgba(139,92,246,0.25)' : 'transparent',
            color: tab === t ? '#c4b5fd' : '#94a3b8'
          }}>{t}</button>
        ))}
      </div>

      {tab === 'Identity' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {IDENTITY_STATS.map(s => (
            <div key={s.label} className="glass-panel" style={{ padding: '1rem', borderLeft: `3px solid ${s.color}` }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.2rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.72rem', color: s.up === false ? '#f87171' : '#34d399', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                {s.up !== undefined && (s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />)} {s.trend}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Security' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {SECURITY_STATS.map(s => (
            <div key={s.label} className="glass-panel" style={{ padding: '1.1rem', borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.25rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>{s.trend}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Performance' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {PERF_STATS.map(s => (
            <div key={s.label} className="glass-panel" style={{ padding: '1.25rem', border: `1px solid ${s.good ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.3)'}` }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.3rem' }}>{s.label}</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', fontWeight: 600, color: s.good ? '#34d399' : '#fbbf24' }}>
                {s.good ? '✓ Within SLA' : '⚠ Above threshold'}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Client Usage' && (
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Top Clients by Usage</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Institution</th><th>Users</th><th>API Volume</th><th>Active Sessions</th><th>Credentials</th></tr>
              </thead>
              <tbody>
                {CLIENT_USAGE.map(c => (
                  <tr key={c.client}>
                    <td style={{ fontWeight: 600, color: '#e2e8f0', padding: '0.75rem 1rem' }}>{c.client}</td>
                    <td style={{ color: '#06b6d4', fontWeight: 600, padding: '0.75rem 1rem' }}>{c.users}</td>
                    <td style={{ color: '#8b5cf6', fontWeight: 600, padding: '0.75rem 1rem' }}>{c.api}</td>
                    <td style={{ color: '#10b981', fontWeight: 600, padding: '0.75rem 1rem' }}>{c.sessions}</td>
                    <td style={{ color: '#94a3b8', padding: '0.75rem 1rem' }}>{c.creds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
