import React, { useState } from 'react';
import { GitBranch, Plus, ToggleLeft, ToggleRight } from 'lucide-react';

const POLICIES = [
  { id: 'POL-001', name: 'Exam Access Step-Up', scope: 'Global', condition: 'trust < 60 AND action = exam_access', action: 'Step-Up', priority: 1, status: 'active', version: 'v1.2' },
  { id: 'POL-002', name: 'Unknown Device Monitor', scope: 'Global', condition: 'device = unknown AND credential = valid', action: 'Monitor', priority: 2, status: 'active', version: 'v1.0' },
  { id: 'POL-003', name: 'High Risk Block', scope: 'Global', condition: 'trust < 30 AND session_age > 5min', action: 'Block', priority: 3, status: 'active', version: 'v2.0' },
  { id: 'POL-004', name: 'UPSC Strict Verification', scope: 'Institution', condition: 'client = UPSC AND liveness_confidence < 95', action: 'Step-Up', priority: 1, status: 'active', version: 'v1.1' },
  { id: 'POL-005', name: 'VPN Detection Notify', scope: 'Global', condition: 'network = vpn_exit_node', action: 'Notify', priority: 4, status: 'active', version: 'v1.0' },
  { id: 'POL-006', name: 'Trial Client Low Trust', scope: 'Institution', condition: 'client.plan = trial AND trust < 50', action: 'Restrict', priority: 2, status: 'inactive', version: 'v0.1' },
  { id: 'POL-007', name: 'Exam Window Restrict', scope: 'Resource', condition: 'resource = exam_submit AND trust < 70', action: 'Step-Up', priority: 2, status: 'active', version: 'v1.0' },
];

const ACTION_CFG = {
  'Allow': { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  'Monitor': { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  'Step-Up': { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  'Restrict': { bg: 'rgba(239,68,68,0.12)', color: '#fca5a5', border: 'rgba(239,68,68,0.3)' },
  'Block': { bg: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'rgba(239,68,68,0.45)' },
  'Notify': { bg: 'rgba(139,92,246,0.12)', color: '#c4b5fd', border: 'rgba(139,92,246,0.3)' },
};

const SCOPE_CFG = {
  'Global': { color: '#a78bfa' },
  'Institution': { color: '#22d3ee' },
  'Resource': { color: '#fbbf24' },
  'User Type': { color: '#34d399' },
};

export default function PolicyEngine() {
  const [policies, setPolicies] = useState(POLICIES);

  const toggle = (id) => setPolicies(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Policy Engine</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Rule-based decisions: trust evidence → access action</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> New Policy Rule</button>
      </div>

      <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#fbbf24' }}>
        ⚠ Global scope policies require Security Admin approval before activation. High-impact policy changes are audit-logged with dual-approval enforcement.
      </div>

      {/* Policy Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Policy ID</th><th>Name</th><th>Scope</th><th>Condition</th><th>Action</th>
                <th>Priority</th><th>Version</th><th>Status</th><th>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {policies.map(p => {
                const aCfg = ACTION_CFG[p.action] || {};
                const sCfg = SCOPE_CFG[p.scope] || {};
                return (
                  <tr key={p.id} style={{ opacity: p.status === 'inactive' ? 0.55 : 1 }}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#a78bfa' }}>{p.id}</td>
                    <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.875rem' }}>{p.name}</td>
                    <td><span style={{ fontSize: '0.78rem', fontWeight: 600, color: sCfg.color }}>{p.scope}</span></td>
                    <td>
                      <code style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(0,0,0,0.35)', padding: '0.15rem 0.5rem', borderRadius: 6, fontFamily: 'monospace', display: 'block', maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.condition}
                      </code>
                    </td>
                    <td><span style={{ padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, ...aCfg }}>{p.action}</span></td>
                    <td style={{ fontWeight: 700, color: p.priority === 1 ? '#f87171' : p.priority === 2 ? '#fbbf24' : '#94a3b8', textAlign: 'center' }}>P{p.priority}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#64748b' }}>{p.version}</td>
                    <td>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: p.status === 'active' ? '#34d399' : '#64748b' }}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => toggle(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.status === 'active' ? '#34d399' : '#64748b', display: 'flex', alignItems: 'center' }}>
                        {p.status === 'active' ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Legend */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#64748b', marginBottom: '0.75rem' }}>Action Types</h4>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {Object.entries(ACTION_CFG).map(([action, cfg]) => (
            <span key={action} style={{ padding: '0.3rem 0.75rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 700, ...cfg }}>{action}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
