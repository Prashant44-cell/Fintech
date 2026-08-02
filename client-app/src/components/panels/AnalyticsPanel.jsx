import React, { useState } from 'react';
import { BarChart2, TrendingUp, TrendingDown, FlaskConical } from 'lucide-react';

const TABS = ['Overview', 'Security', 'Performance', 'Research Metrics'];

const OVERVIEW = [
  { label: 'Auth Attempts (30d)', value: '182,440', trend: '+4.2%', up: true, color: '#06b6d4' },
  { label: 'Verification Success Rate', value: '97.8%', trend: '+0.3%', up: true, color: '#10b981' },
  { label: 'Step-Up Events (30d)', value: '2,840', trend: '-120', up: false, color: '#f59e0b' },
  { label: 'Proxy Suspicions (30d)', value: '44', trend: '-8', up: false, color: '#fbbf24' },
  { label: 'Revocations (30d)', value: '12', trend: '+2', up: true, color: '#ef4444' },
  { label: 'Recovery Requests (30d)', value: '8', trend: '-3', up: false, color: '#8b5cf6' },
  { label: 'Avg Verification Latency', value: '18ms', trend: '-3ms', up: false, color: '#34d399' },
  { label: 'High-Risk Events (30d)', value: '38', trend: '-12', up: false, color: '#f87171' },
];

const TRUST_TREND = [
  { label: 'Wk 1', trusted: 94.8, monitoring: 3.2, stepup: 1.5, high: 0.5 },
  { label: 'Wk 2', trusted: 95.2, monitoring: 3.0, stepup: 1.3, high: 0.5 },
  { label: 'Wk 3', trusted: 95.8, monitoring: 2.8, stepup: 1.0, high: 0.4 },
  { label: 'Wk 4', trusted: 96.2, monitoring: 2.6, stepup: 0.9, high: 0.3 },
];

const RESEARCH_METRICS = [
  { label: 'FAR (False Accept Rate)', value: '0.12%', target: '< 0.20%', status: 'pass', note: 'Rate imposters incorrectly accepted' },
  { label: 'FRR (False Reject Rate)', value: '0.31%', target: '< 0.50%', status: 'pass', note: 'Rate legit users incorrectly rejected' },
  { label: 'Detection Latency (P95)', value: '84ms', target: '< 150ms', status: 'pass', note: 'Time from signal to risk score' },
  { label: 'Verification Latency (P95)', value: '18ms', target: '< 50ms', status: 'pass', note: 'End-to-end identity verification' },
  { label: 'Trust Recovery Time (avg)', value: '4.2 min', target: '< 10 min', status: 'pass', note: 'Step-up to trusted state restore time' },
  { label: 'System Overhead', value: '~14ms', target: '< 30ms', status: 'pass', note: 'Trust evaluation processing overhead' },
];

export default function AnalyticsPanel() {
  const [tab, setTab] = useState('Overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Analytics</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>What has happened over time — unlike the dashboard which shows right now</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}>
            <option>Last 30 Days</option><option>Last 7 Days</option><option>Today</option>
          </select>
          <button className="btn btn-secondary">Export</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.25rem', width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '0.45rem 1.1rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: tab === t ? 'rgba(6,182,212,0.2)' : 'transparent', color: tab === t ? '#22d3ee' : '#94a3b8' }}>{t}</button>
        ))}
      </div>

      {tab === 'Overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
            {OVERVIEW.map(m => (
              <div key={m.label} className="glass-panel" style={{ padding: '0.9rem 1rem', borderLeft: `3px solid ${m.color}` }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{m.value}</div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.2rem' }}>{m.label}</div>
                <div style={{ marginTop: '0.3rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem', color: m.up && m.label.includes('Revoc') || m.up && m.label.includes('High') || m.up && m.label.includes('Proxy') ? '#f87171' : m.up ? '#34d399' : '#34d399' }}>
                  {m.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {m.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Trend */}
          <div className="glass-panel">
            <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '1.1rem' }}>Trust Distribution Trend — Last 4 Weeks</h3>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', justifyContent: 'space-around' }}>
              {TRUST_TREND.map(w => (
                <div key={w.label} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: 100 }}>
                    {[['trusted', '#10b981', w.trusted], ['monitoring', '#06b6d4', w.monitoring], ['stepup', '#f59e0b', w.stepup], ['high', '#ef4444', w.high]].map(([k, c, v]) => (
                      <div key={k} style={{ width: 32, height: `${v}%`, background: c, borderRadius: 3, opacity: 0.85 }} title={`${k}: ${v}%`} />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.35rem' }}>{w.label}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399' }}>{w.trusted}%</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', justifyContent: 'center' }}>
              {[['Trusted', '#10b981'], ['Monitoring', '#06b6d4'], ['Step-Up', '#f59e0b'], ['High Risk', '#ef4444']].map(([l, c]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#94a3b8' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: 'inline-block' }} />{l}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'Security' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[['Deepfake Alerts (30d)', '3', '#ef4444'], ['Proxy Suspicions', '44', '#fbbf24'], ['Session Hijack Susp.', '2', '#f87171'], ['Brute Force Attempts', '18', '#f59e0b'], ['Credential Misuse', '5', '#fbbf24'], ['Revocations', '12', '#ef4444']].map(([l, v, c]) => (
            <div key={l} className="glass-panel" style={{ padding: '1.1rem', borderTop: `3px solid ${c}` }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: c }}>{v}</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.25rem' }}>{l}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Performance' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[['P95 Auth Latency', '18ms', '#34d399'], ['P95 Trust Eval', '84ms', '#34d399'], ['P95 API Response', '214ms', '#34d399'], ['Error Rate', '0.12%', '#34d399'], ['Uptime (30d)', '99.97%', '#10b981'], ['Verification Accuracy', '97.8%', '#34d399']].map(([l, v, c]) => (
            <div key={l} className="glass-panel" style={{ padding: '1.25rem', border: '1px solid rgba(16,185,129,0.15)' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: c }}>{v}</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.3rem' }}>{l}</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>✓ Within SLA</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Research Metrics' && (
        <>
          <div style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#22d3ee' }}>
            ℹ Research Mode: Clearly distinguishing <strong>simulated/demo values</strong> from experimentally validated results. These metrics are from development benchmarking, not production calibration.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {RESEARCH_METRICS.map(m => (
              <div key={m.label} className="glass-panel" style={{ padding: '1.1rem', border: '1px solid rgba(16,185,129,0.18)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399' }}>{m.value}</div>
                <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.85rem', marginTop: '0.2rem' }}>{m.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>Target: {m.target}</div>
                <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: '0.35rem', lineHeight: 1.4 }}>{m.note}</div>
                <span style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.65rem', fontWeight: 700, padding: '0.12rem 0.45rem', borderRadius: 9999, background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
                  ✓ PASS (demo/prototype)
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
