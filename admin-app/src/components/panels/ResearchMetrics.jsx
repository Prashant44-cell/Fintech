import React from 'react';
import { FlaskConical, GitCompare } from 'lucide-react';

const METRICS = [
  { label: 'FAR (False Accept Rate)', value: '0.12%', target: '< 0.20%', status: 'pass', color: '#34d399', desc: 'Rate at which imposters are incorrectly accepted.' },
  { label: 'FRR (False Reject Rate)', value: '0.31%', target: '< 0.50%', status: 'pass', color: '#34d399', desc: 'Rate at which legitimate users are incorrectly rejected.' },
  { label: 'Precision', value: '99.78%', target: '> 99%', status: 'pass', color: '#34d399', desc: 'True positives / (True positives + False positives)' },
  { label: 'Recall', value: '99.69%', target: '> 99%', status: 'pass', color: '#34d399', desc: 'True positives / (True positives + False negatives)' },
  { label: 'Detection Latency', value: '84ms', target: '< 150ms', status: 'pass', color: '#34d399', desc: 'Time from signal acquisition to risk score output.' },
  { label: 'Verification Latency', value: '18ms', target: '< 50ms', status: 'pass', color: '#34d399', desc: 'End-to-end time for identity verification.' },
  { label: 'Trust Recovery Time', value: '4.2 min', target: '< 10 min', status: 'pass', color: '#34d399', desc: 'Time for a session to recover from step-up to trusted state.' },
  { label: 'False Alert Rate', value: '2.1%', target: '< 5%', status: 'pass', color: '#34d399', desc: 'Fraction of security alerts that are false positives.' },
  { label: 'Model Drift Index', value: '0.024', target: '< 0.05', status: 'pass', color: '#34d399', desc: 'Statistical drift vs validation baseline dataset.' },
];

const MODEL_COMPARISON = [
  { metric: 'FAR', v13: '0.18%', v14: '0.12%', improvement: '33% better', up: true },
  { metric: 'FRR', v13: '0.42%', v14: '0.31%', improvement: '26% better', up: true },
  { metric: 'Detection Latency', v13: '91ms', v14: '84ms', improvement: '8% faster', up: true },
  { metric: 'Precision', v13: '99.71%', v14: '99.78%', improvement: '+0.07%', up: true },
  { metric: 'Recall', v13: '99.58%', v14: '99.69%', improvement: '+0.11%', up: true },
  { metric: 'Drift Index', v13: '0.031', v14: '0.024', improvement: '23% lower', up: true },
  { metric: 'Model Size', v13: '420 MB', v14: '380 MB', improvement: '10% smaller', up: true },
];

export default function ResearchMetrics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Research & Model Analytics</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>IEEE-grade model performance metrics — separate from business analytics</p>
      </div>

      {/* Current Model Metrics */}
      <div className="glass-panel" style={{ background: 'linear-gradient(135deg,rgba(139,92,246,0.07),rgba(6,182,212,0.05))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <FlaskConical size={18} color="#8b5cf6" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Trust Model v1.4 — Production Performance</h3>
          <span style={{ padding: '0.15rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.35)' }}>ALL PASS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
          {METRICS.map(m => (
            <div key={m.label} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: '1rem', border: `1px solid rgba(16,185,129,0.15)` }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: m.color }}>{m.value}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', marginTop: '0.2rem' }}>{m.label}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>Target: {m.target}</div>
              <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: '0.35rem', lineHeight: 1.4 }}>{m.desc}</div>
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: m.color }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: m.color, textTransform: 'uppercase' }}>{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Comparison */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GitCompare size={16} color="#06b6d4" />
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Model Comparison: v1.3 vs v1.4</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ color: '#94a3b8' }}>v1.3 (Deprecated)</th>
                <th style={{ color: '#34d399' }}>v1.4 (Production)</th>
                <th>Improvement</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_COMPARISON.map(m => (
                <tr key={m.metric}>
                  <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{m.metric}</td>
                  <td style={{ color: '#64748b', fontFamily: 'monospace' }}>{m.v13}</td>
                  <td style={{ color: '#34d399', fontWeight: 700, fontFamily: 'monospace' }}>{m.v14}</td>
                  <td>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      ↑ {m.improvement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
