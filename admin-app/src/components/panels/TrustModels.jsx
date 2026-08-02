import React, { useState } from 'react';
import { Layers, Plus, Edit2 } from 'lucide-react';

const MODELS = [
  { id: 'MDL-004', version: 'v1.4', status: 'production', deployed: '2026-06-01', signals: 7, validated: true, far: 0.12, frr: 0.31, latency: '84ms', drift: 'stable' },
  { id: 'MDL-003', version: 'v1.3', status: 'deprecated', deployed: '2025-12-15', signals: 6, validated: true, far: 0.18, frr: 0.42, latency: '91ms', drift: 'stable' },
  { id: 'MDL-005', version: 'v1.5', status: 'canary', deployed: '2026-07-20', signals: 8, validated: true, far: 0.09, frr: 0.28, latency: '76ms', drift: 'low' },
  { id: 'MDL-006', version: 'v1.6', status: 'testing', deployed: '—', signals: 9, validated: false, far: 0.07, frr: 0.25, latency: '68ms', drift: 'unknown' },
  { id: 'MDL-007', version: 'v2.0', status: 'development', deployed: '—', signals: 10, validated: false, far: null, frr: null, latency: '—', drift: '—' },
];

const STATUS_CFG = {
  production: { bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.35)' },
  canary: { bg: 'rgba(6,182,212,0.12)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  testing: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  development: { bg: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: 'rgba(139,92,246,0.3)' },
  deprecated: { bg: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: 'rgba(100,116,139,0.25)' },
};

const DRIFT_CFG = {
  stable: '#34d399',
  low: '#22d3ee',
  medium: '#fbbf24',
  high: '#f87171',
  unknown: '#64748b',
  '—': '#475569',
};

export default function TrustModels() {
  const prod = MODELS.find(m => m.status === 'production');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Trust Model Management</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Research & production model version tracking</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> New Model Version</button>
      </div>

      {/* Production Model Highlight */}
      {prod && (
        <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.06) 100%)', border: '1px solid rgba(16,185,129,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                <Layers size={20} color="#10b981" />
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Production: Trust Model {prod.version}</h2>
                <span style={{ padding: '0.15rem 0.65rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.35)' }}>LIVE</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Deployed {prod.deployed} · {prod.signals} signals active · Validated: {prod.validated ? 'Yes' : 'No'}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {[['FAR', `${prod.far}%`, '#f59e0b'], ['FRR', `${prod.frr}%`, '#06b6d4'], ['Latency', prod.latency, '#8b5cf6'], ['Drift', prod.drift, DRIFT_CFG[prod.drift]]].map(([k, v, c]) => (
                <div key={k} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.65rem 0.85rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: c }}>{v}</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.2rem' }}>{k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Model Versions Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>All Model Versions</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Model ID</th><th>Version</th><th>Status</th><th>Deployed</th><th>Signals</th><th>Validated</th><th>FAR</th><th>FRR</th><th>Latency</th><th>Drift</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map(m => {
                const sCfg = STATUS_CFG[m.status] || {};
                return (
                  <tr key={m.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{m.id}</td>
                    <td style={{ fontWeight: 700, color: '#e2e8f0' }}>{m.version}</td>
                    <td><span style={{ padding: '0.15rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{m.status}</span></td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>{m.deployed}</td>
                    <td style={{ fontWeight: 600, color: '#e2e8f0', textAlign: 'center' }}>{m.signals}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: m.validated ? '#34d399' : '#f87171' }}>{m.validated ? '✓ Yes' : '✗ No'}</span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#f59e0b' }}>{m.far !== null ? `${m.far}%` : '—'}</td>
                    <td style={{ fontWeight: 600, color: '#06b6d4' }}>{m.frr !== null ? `${m.frr}%` : '—'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#94a3b8' }}>{m.latency}</td>
                    <td style={{ fontWeight: 600, color: DRIFT_CFG[m.drift] }}>{m.drift}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        {m.status === 'testing' && <button className="btn btn-secondary" style={{ fontSize: '0.68rem', padding: '0.25rem 0.5rem' }}>Promote</button>}
                        {m.status === 'canary' && <button className="btn btn-primary" style={{ fontSize: '0.68rem', padding: '0.25rem 0.5rem' }}>Deploy</button>}
                        <button className="btn btn-secondary" style={{ fontSize: '0.68rem', padding: '0.25rem 0.5rem' }}>Details</button>
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
