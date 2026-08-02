import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Eye } from 'lucide-react';

const THREAT_TYPES = [
  { name: 'Session Hijacking', count: 3, color: '#ef4444' },
  { name: 'Credential Misuse', count: 8, color: '#f87171' },
  { name: 'Proxy Suspicion', count: 14, color: '#fbbf24' },
  { name: 'Deepfake Suspicion', count: 2, color: '#f59e0b' },
  { name: 'Device Compromise', count: 1, color: '#ef4444' },
  { name: 'Replay Attack', count: 0, color: '#64748b' },
  { name: 'Brute Force', count: 22, color: '#f59e0b' },
  { name: 'Verification Abuse', count: 5, color: '#fbbf24' },
  { name: 'API Abuse', count: 11, color: '#f59e0b' },
  { name: 'Suspicious Admin Activity', count: 1, color: '#ef4444' },
];

const ALERTS = [
  { id: 'ALT-7712A', time: '14:12:05', client: 'IIT Bombay', threat: 'Session Hijacking', severity: 'critical', confidence: '94%', session: 'SES-77A12B', status: 'investigating', assigned: 'Kavita M.' },
  { id: 'ALT-7698B', time: '14:09:33', client: 'UPSC Authority', threat: 'Deepfake Suspicion', severity: 'high', confidence: '87%', session: 'SES-33C044', status: 'triage', assigned: 'Unassigned' },
  { id: 'ALT-7685C', time: '14:07:11', client: 'NIT Trichy', threat: 'Proxy Suspicion', severity: 'medium', confidence: '78%', session: 'SES-98F2E1', status: 'detected', assigned: 'Unassigned' },
  { id: 'ALT-7670D', time: '13:58:22', client: 'VIT Vellore', threat: 'Brute Force', severity: 'high', confidence: '99%', session: 'SES-EF1C72', status: 'contained', assigned: 'Rahul S.' },
  { id: 'ALT-7654E', time: '13:45:04', client: 'BITS Pilani', threat: 'API Abuse', severity: 'medium', confidence: '82%', session: 'SES-GH2A03', status: 'resolved', assigned: 'Amit T.' },
  { id: 'ALT-7640F', time: '13:30:59', client: 'Delhi University', threat: 'Credential Misuse', severity: 'high', confidence: '91%', session: 'SES-AB5D91', status: 'triage', assigned: 'Kavita M.' },
];

const SEVERITY_CFG = {
  critical: { bg: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'rgba(239,68,68,0.5)' },
  high: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.4)' },
  medium: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.35)' },
  low: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
};

const WORKFLOW_STEPS = ['Detected', 'Triage', 'Investigating', 'Contained', 'Resolved'];

const WORKFLOW_CFG = {
  detected: { color: '#f87171', step: 0 },
  triage: { color: '#fbbf24', step: 1 },
  investigating: { color: '#a78bfa', step: 2 },
  contained: { color: '#22d3ee', step: 3 },
  resolved: { color: '#34d399', step: 4 },
};

function WorkflowBadge({ status }) {
  const cfg = WORKFLOW_CFG[status] || { color: '#64748b', step: 0 };
  return (
    <span style={{ padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'capitalize', background: `${cfg.color}22`, color: cfg.color, border: `1px solid ${cfg.color}55` }}>
      {status}
    </span>
  );
}

export default function SecuritySOC() {
  const [selected, setSelected] = useState(null);
  const totalThreats = THREAT_TYPES.reduce((a, b) => a + b.count, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Security Operations Center</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Active threat detection, triage, and incident response</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 700, background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)' }}>
            ● {totalThreats} Active Threats
          </span>
        </div>
      </div>

      {/* Active Threats Grid */}
      <div className="glass-panel">
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Active Threat Categories</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
          {THREAT_TYPES.map(t => (
            <div key={t.name} style={{
              background: t.count > 0 ? `${t.color}12` : 'rgba(0,0,0,0.2)',
              border: `1px solid ${t.count > 0 ? `${t.color}40` : 'rgba(255,255,255,0.05)'}`,
              borderRadius: 10, padding: '0.75rem 0.85rem'
            }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: t.count > 0 ? t.color : '#475569' }}>{t.count}</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem', lineHeight: 1.3 }}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="glass-panel" style={{ padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {WORKFLOW_STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: ALERTS.some(a => WORKFLOW_CFG[a.status]?.step === i) ? '#c4b5fd' : '#475569', whiteSpace: 'nowrap' }}>
                {step}
                <span style={{ marginLeft: '0.35rem', padding: '0.1rem 0.45rem', borderRadius: 9999, fontSize: '0.65rem', background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
                  {ALERTS.filter(a => WORKFLOW_CFG[a.status]?.step === i).length}
                </span>
              </span>
              {i < WORKFLOW_STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.08)', margin: '0 0.5rem' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Alert Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Alert Table</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Alert ID</th><th>Time</th><th>Client</th><th>Threat</th><th>Severity</th>
                <th>Confidence</th><th>Session</th><th>Status</th><th>Assigned To</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ALERTS.map(a => {
                const sCfg = SEVERITY_CFG[a.severity] || {};
                return (
                  <tr key={a.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#a78bfa' }}>{a.id}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>{a.time}</td>
                    <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.85rem' }}>{a.client}</td>
                    <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{a.threat}</td>
                    <td><span style={{ padding: '0.2rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{a.severity}</span></td>
                    <td style={{ fontWeight: 700, color: '#fbbf24' }}>{a.confidence}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#94a3b8' }}>{a.session}</td>
                    <td><WorkflowBadge status={a.status} /></td>
                    <td style={{ fontSize: '0.82rem', color: a.assigned === 'Unassigned' ? '#f87171' : '#94a3b8' }}>{a.assigned}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>Investigate</button>
                        {a.severity === 'critical' && <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Contain</button>}
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
