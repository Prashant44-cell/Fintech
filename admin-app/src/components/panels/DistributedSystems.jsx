import React from 'react';
import { ArrowDown, Zap } from 'lucide-react';

const FLOW = [
  { label: 'Client App', sub: 'Port 3000 / 3001', color: '#8b5cf6' },
  { label: 'Load Balancer', sub: 'HAProxy / NGINX', color: '#06b6d4' },
  { label: 'API Gateway', sub: 'Auth · Rate Limit · Routing', color: '#3b82f6' },
  { label: 'Auth / Credential', sub: 'Identity Verification', color: '#10b981' },
  { label: 'Risk + Trust Engine', sub: 'Score Evaluation', color: '#f59e0b' },
  { label: 'Policy Engine', sub: 'Rule Evaluation', color: '#a78bfa' },
  { label: 'Decision', sub: 'Allow / Monitor / Step-Up / Block', color: '#34d399' },
];

const METRICS = [
  { label: 'Throughput', value: '1,403 req/s', status: 'normal', color: '#06b6d4' },
  { label: 'P95 Latency', value: '214ms', status: 'normal', color: '#10b981' },
  { label: 'Queue Depth', value: '44 msgs', status: 'normal', color: '#8b5cf6' },
  { label: 'Cache Hit Rate', value: '94.7%', status: 'good', color: '#34d399' },
  { label: 'Timeouts (1m)', value: '3', status: 'normal', color: '#f59e0b' },
  { label: 'Retries (1m)', value: '12', status: 'normal', color: '#fbbf24' },
  { label: 'Circuit Breakers', value: '0 open', status: 'good', color: '#34d399' },
  { label: 'Failed Jobs', value: '2', status: 'warning', color: '#f87171' },
];

const STAGES = [
  { name: 'Load Balancer', lat: '1ms', throughput: '1,403 rps', err: '0.0%' },
  { name: 'API Gateway', lat: '12ms', throughput: '1,403 rps', err: '0.01%' },
  { name: 'Auth Service', lat: '18ms', throughput: '622 rps', err: '0.02%' },
  { name: 'Trust Engine', lat: '84ms', throughput: '410 rps', err: '0.07%' },
  { name: 'Risk Engine', lat: '72ms', throughput: '410 rps', err: '0.04%' },
  { name: 'Policy Engine', lat: '310ms ⚠', throughput: '410 rps', err: '1.20%' },
  { name: 'Decision Cache', lat: '2ms', throughput: '890 rps', err: '0.0%' },
];

export default function DistributedSystems() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Distributed System Monitoring</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Request flow topology and per-stage performance metrics</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem' }}>
        {/* Request Flow Diagram */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Zap size={14} color="#f59e0b" /> Request Flow
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {FLOW.map((node, i) => (
              <React.Fragment key={node.label}>
                <div style={{
                  width: '100%', background: `${node.color}15`, border: `1px solid ${node.color}50`,
                  borderRadius: 10, padding: '0.6rem 0.85rem', textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: node.color }}>{node.label}</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.1rem' }}>{node.sub}</div>
                </div>
                {i < FLOW.length - 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.15rem 0' }}>
                    <div style={{ width: 1, height: 8, background: 'rgba(255,255,255,0.12)' }} />
                    <ArrowDown size={12} color="#475569" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {METRICS.map(m => (
              <div key={m.label} className="glass-panel" style={{ padding: '0.85rem', borderLeft: `3px solid ${m.color}` }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{m.value}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.2rem' }}>{m.label}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, marginTop: '0.2rem', color: m.status === 'good' ? '#34d399' : m.status === 'warning' ? '#f87171' : '#64748b' }}>
                  {m.status}
                </div>
              </div>
            ))}
          </div>

          {/* Per-Stage Latency Table */}
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Per-Stage Performance</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr><th>Stage</th><th>Latency</th><th>Throughput</th><th>Error Rate</th></tr>
              </thead>
              <tbody>
                {STAGES.map(s => {
                  const isWarn = parseFloat(s.err) > 0.5;
                  return (
                    <tr key={s.name} style={{ background: isWarn ? 'rgba(245,158,11,0.04)' : 'transparent' }}>
                      <td style={{ padding: '0.7rem 1rem', fontWeight: 600, color: isWarn ? '#fbbf24' : '#e2e8f0' }}>{s.name}</td>
                      <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace', color: isWarn ? '#fbbf24' : '#94a3b8' }}>{s.lat}</td>
                      <td style={{ padding: '0.7rem 1rem', color: '#06b6d4', fontWeight: 600 }}>{s.throughput}</td>
                      <td style={{ padding: '0.7rem 1rem', fontWeight: 700, color: isWarn ? '#f87171' : '#34d399' }}>{s.err}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
