import React, { useState } from 'react';
import { Brain, Cpu, Zap, Eye } from 'lucide-react';

const TRUST_DIST = [
  { label: '80–100 Trusted', value: 17610, pct: 95.6, color: '#10b981' },
  { label: '60–79 Monitoring', value: 601, pct: 3.3, color: '#06b6d4' },
  { label: '40–59 Step-Up', value: 170, pct: 0.9, color: '#f59e0b' },
  { label: '0–39 High Risk', value: 39, pct: 0.2, color: '#ef4444' },
];

const SIGNALS = [
  { name: 'Credential Validity', status: 'active', version: 'v2.3', perf: 99.8, updated: '2026-07-15', clients: 142 },
  { name: 'Device Trust', status: 'active', version: 'v1.9', perf: 97.4, updated: '2026-06-01', clients: 138 },
  { name: 'Human Presence (Liveness)', status: 'active', version: 'v3.1', perf: 96.2, updated: '2026-07-20', clients: 136 },
  { name: 'Behavioral Biometrics', status: 'active', version: 'v2.0', perf: 94.7, updated: '2026-05-10', clients: 128 },
  { name: 'Context (Location/Time)', status: 'active', version: 'v1.5', perf: 98.1, updated: '2026-04-22', clients: 142 },
  { name: 'Network Integrity', status: 'active', version: 'v1.2', perf: 97.9, updated: '2026-03-18', clients: 140 },
  { name: 'Session History', status: 'active', version: 'v1.0', perf: 99.2, updated: '2026-02-05', clients: 135 },
  { name: 'Deepfake Detection', status: 'beta', version: 'v0.4', perf: 88.3, updated: '2026-07-28', clients: 12 },
];

export default function TrustEngine() {
  const total = TRUST_DIST.reduce((a, b) => a + b.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Trust Engine</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Central trust evaluation system — signal registry and distribution</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.25rem' }}>
        {/* Trust Distribution */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={18} color="#8b5cf6" /> Trust Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {TRUST_DIST.map(tier => (
              <div key={tier.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{tier.label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: tier.color }}>{tier.pct}%</span>
                </div>
                <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${tier.pct}%`, background: `linear-gradient(90deg,${tier.color}aa,${tier.color})`, borderRadius: 5, minWidth: tier.value > 0 ? 4 : 0 }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.25rem' }}>{tier.value.toLocaleString()} sessions</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#64748b' }}>Total Evaluated</span>
              <span style={{ color: '#fff', fontWeight: 700 }}>{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Architecture Note */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="#06b6d4" /> Architecture — Model vs Policy
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#c4b5fd', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Trust Model</div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Produces evidence and risk scores from behavioral signals. Does not make decisions. Outputs a composite trust score (0–100) per evaluation cycle.
              </p>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {['Biometrics', 'Liveness', 'Behavior', 'Context', 'Network'].map(t => (
                  <span key={t} style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: 9999, background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.3)' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#22d3ee', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Policy Engine</div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Consumes trust evidence and applies institution or global rules to decide: Allow, Monitor, Step-Up, Restrict, Block. Keeps risk decisions separate from scoring.
              </p>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {['Allow', 'Monitor', 'Step-Up', 'Restrict', 'Block'].map(a => (
                  <span key={a} style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: 9999, background: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)' }}>{a}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#fbbf24' }}>
            ⚠ Trust Model weights are not arbitrary sliders. They are calibrated via FAR/FRR validation. See Research Metrics for model performance data.
          </div>
        </div>
      </div>

      {/* Signal Registry */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={16} color="#f59e0b" /> Signal Registry
          </h3>
          <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>+ Register Signal</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Signal Name</th><th>Status</th><th>Version</th><th>Performance</th><th>Last Updated</th><th>Clients Using</th>
              </tr>
            </thead>
            <tbody>
              {SIGNALS.map(sig => (
                <tr key={sig.name}>
                  <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{sig.name}</td>
                  <td>
                    <span style={{ padding: '0.15rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', background: sig.status === 'active' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.1)', color: sig.status === 'active' ? '#34d399' : '#fbbf24', border: `1px solid ${sig.status === 'active' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
                      {sig.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>{sig.version}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 60, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${sig.perf}%`, background: sig.perf > 95 ? '#10b981' : sig.perf > 90 ? '#f59e0b' : '#ef4444', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: sig.perf > 95 ? '#34d399' : sig.perf > 90 ? '#fbbf24' : '#f87171' }}>{sig.perf}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>{sig.updated}</td>
                  <td style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>{sig.clients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
