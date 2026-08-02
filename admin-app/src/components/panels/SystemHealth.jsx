import React from 'react';
import { Server, Cpu, Database, Wifi } from 'lucide-react';

const SERVICES = [
  { name: 'API Gateway', status: 'healthy', latency: '12ms', rps: '1,403', errRate: '0.01%', cpu: 28, mem: 42, instances: 4, lastDeploy: '2026-07-30' },
  { name: 'Authentication Service', status: 'healthy', latency: '18ms', rps: '622', errRate: '0.02%', cpu: 34, mem: 55, instances: 3, lastDeploy: '2026-07-28' },
  { name: 'Credential Service', status: 'healthy', latency: '24ms', rps: '188', errRate: '0.00%', cpu: 20, mem: 38, instances: 2, lastDeploy: '2026-07-25' },
  { name: 'Trust Engine', status: 'healthy', latency: '84ms', rps: '410', errRate: '0.07%', cpu: 68, mem: 71, instances: 6, lastDeploy: '2026-06-01' },
  { name: 'Risk Engine', status: 'healthy', latency: '72ms', rps: '410', errRate: '0.04%', cpu: 55, mem: 62, instances: 4, lastDeploy: '2026-07-01' },
  { name: 'Policy Engine', status: 'degraded', latency: '310ms', rps: '410', errRate: '1.20%', cpu: 88, mem: 91, instances: 2, lastDeploy: '2026-07-20' },
  { name: 'Audit Service', status: 'healthy', latency: '9ms', rps: '280', errRate: '0.00%', cpu: 12, mem: 24, instances: 2, lastDeploy: '2026-07-22' },
  { name: 'Notification Service', status: 'healthy', latency: '55ms', rps: '140', errRate: '0.10%', cpu: 22, mem: 30, instances: 2, lastDeploy: '2026-07-18' },
  { name: 'Blockchain Connector', status: 'healthy', latency: '420ms', rps: '45', errRate: '0.03%', cpu: 15, mem: 28, instances: 2, lastDeploy: '2026-06-15' },
  { name: 'Database (Primary)', status: 'healthy', latency: '6ms', rps: '4,200', errRate: '0.00%', cpu: 41, mem: 68, instances: 3, lastDeploy: '2026-07-10' },
  { name: 'Cache (Redis)', status: 'healthy', latency: '2ms', rps: '12,000', errRate: '0.00%', cpu: 18, mem: 45, instances: 3, lastDeploy: '2026-07-12' },
  { name: 'Event Queue', status: 'degraded', latency: '180ms', rps: '890', errRate: '0.55%', cpu: 72, mem: 84, instances: 2, lastDeploy: '2026-07-19' },
];

const STATUS_CFG = {
  healthy: { color: '#10b981', shadow: '#10b981', label: 'Healthy', labelColor: '#34d399' },
  degraded: { color: '#f59e0b', shadow: '#f59e0b', label: 'Degraded', labelColor: '#fbbf24' },
  unavailable: { color: '#ef4444', shadow: '#ef4444', label: 'Unavailable', labelColor: '#f87171' },
};

function StatusDot({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.healthy;
  return <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: cfg.color, boxShadow: `0 0 8px ${cfg.shadow}` }} />;
}

function UtilBar({ value, warn = 70, critical = 90 }) {
  const color = value >= critical ? '#ef4444' : value >= warn ? '#f59e0b' : '#10b981';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', minWidth: 50 }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: '0.72rem', fontWeight: 700, color, width: 32 }}>{value}%</span>
    </div>
  );
}

export default function SystemHealth() {
  const degraded = SERVICES.filter(s => s.status === 'degraded').length;
  const unavailable = SERVICES.filter(s => s.status === 'unavailable').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Infrastructure & Service Health</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Real-time operational visibility across all platform services</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 700, background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
            ● {SERVICES.length - degraded - unavailable} Healthy
          </span>
          {degraded > 0 && <span style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 700, background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
            ⚠ {degraded} Degraded
          </span>}
        </div>
      </div>

      {/* Service Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {SERVICES.map(svc => {
          const sCfg = STATUS_CFG[svc.status];
          return (
            <div key={svc.name} className="glass-panel" style={{
              padding: '1.1rem',
              border: `1px solid ${svc.status !== 'healthy' ? `${sCfg.color}50` : 'rgba(255,255,255,0.1)'}`,
              background: svc.status !== 'healthy' ? `${sCfg.color}08` : 'rgba(15,23,42,0.85)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.9rem' }}>{svc.name}</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.15rem' }}>Last Deploy: {svc.lastDeploy}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <StatusDot status={svc.status} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: sCfg.labelColor, textTransform: 'uppercase' }}>{sCfg.label}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem', marginBottom: '0.75rem' }}>
                {[['Latency', svc.latency, svc.status === 'degraded' ? '#fbbf24' : '#94a3b8'],
                  ['RPS', svc.rps, '#06b6d4'],
                  ['Error Rate', svc.errRate, parseFloat(svc.errRate) > 0.5 ? '#f87171' : '#34d399'],
                  ['Instances', svc.instances, '#a78bfa']].map(([k, v, c]) => (
                  <div key={k}>
                    <div style={{ fontSize: '0.65rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: c }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', color: '#475569', width: 28 }}>CPU</span>
                  <UtilBar value={svc.cpu} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', color: '#475569', width: 28 }}>MEM</span>
                  <UtilBar value={svc.mem} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
