import React, { useState } from 'react';
import { MessageSquare, AlertOctagon } from 'lucide-react';

const TICKETS = [
  { id: 'TKT-4821', client: 'NIT Trichy', category: 'Integration', priority: 'high', created: '2026-08-01 12:05', assigned: 'Amit Tiwari', status: 'open', title: 'LMS webhook retry loop causing rate limit' },
  { id: 'TKT-4820', client: 'VIT Vellore', category: 'Credential', priority: 'medium', created: '2026-08-01 10:30', assigned: 'Deepa Nair', status: 'in-progress', title: 'Batch credential issuance failing for semester upload' },
  { id: 'TKT-4819', client: 'IIT Bombay', category: 'Identity', priority: 'low', created: '2026-07-31 18:22', assigned: 'Amit Tiwari', status: 'in-progress', title: 'User unable to complete liveness check on iPad iOS 18.2' },
  { id: 'TKT-4818', client: 'Delhi University', category: 'Security', priority: 'critical', created: '2026-07-31 14:10', assigned: 'Kavita Menon', status: 'escalated', title: 'Suspicious login from unrecognized device — escalate to SOC' },
  { id: 'TKT-4817', client: 'BITS Pilani', category: 'Technical', priority: 'medium', created: '2026-07-31 09:40', assigned: 'Rahul Singh', status: 'resolved', title: 'Admin console 500 error on audit log export' },
  { id: 'TKT-4816', client: 'UPSC Authority', category: 'Billing', priority: 'low', created: '2026-07-30 11:00', assigned: 'Unassigned', status: 'open', title: 'Invoice discrepancy for July API usage report' },
];

const PRIORITY_CFG = {
  critical: { bg: 'rgba(239,68,68,0.18)', color: '#f87171', border: 'rgba(239,68,68,0.45)' },
  high: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.35)' },
  medium: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  low: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
};

const STATUS_CFG = {
  open: { color: '#f87171' },
  'in-progress': { color: '#fbbf24' },
  escalated: { color: '#f59e0b' },
  resolved: { color: '#34d399' },
  closed: { color: '#64748b' },
};

const CAT_COLOR = {
  Security: '#ef4444', Integration: '#8b5cf6', Credential: '#06b6d4',
  Identity: '#10b981', Technical: '#a78bfa', Billing: '#f59e0b', Verification: '#22d3ee',
};

export default function Support() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? TICKETS : TICKETS.filter(t => t.category === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Support & Client Issues</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Platform-wide support ticket management</p>
        </div>
        <button className="btn btn-primary"><MessageSquare size={16} /> New Ticket</button>
      </div>

      <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <AlertOctagon size={14} /> Security-category tickets are automatically escalated to the Security Operations Center.
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('all')} style={{ padding: '0.35rem 0.85rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: filter === 'all' ? 'rgba(139,92,246,0.2)' : 'transparent', color: filter === 'all' ? '#c4b5fd' : '#94a3b8', borderColor: filter === 'all' ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)' }}>
          All ({TICKETS.length})
        </button>
        {Object.keys(CAT_COLOR).map(cat => {
          const count = TICKETS.filter(t => t.category === cat).length;
          if (count === 0) return null;
          return (
            <button key={cat} onClick={() => setFilter(cat)} style={{ padding: '0.35rem 0.85rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: filter === cat ? `${CAT_COLOR[cat]}20` : 'transparent', color: filter === cat ? CAT_COLOR[cat] : '#94a3b8', borderColor: filter === cat ? `${CAT_COLOR[cat]}50` : 'rgba(255,255,255,0.1)' }}>
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Ticket Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Ticket ID</th><th>Title</th><th>Institution</th><th>Category</th><th>Priority</th><th>Created</th><th>Assigned</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(t => {
                const pCfg = PRIORITY_CFG[t.priority] || {};
                const stCfg = STATUS_CFG[t.status] || {};
                return (
                  <tr key={t.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{t.id}</td>
                    <td style={{ fontSize: '0.82rem', color: '#e2e8f0', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{t.client}</td>
                    <td>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 6, background: `${CAT_COLOR[t.category] || '#64748b'}18`, color: CAT_COLOR[t.category] || '#94a3b8', border: `1px solid ${CAT_COLOR[t.category] || '#64748b'}40` }}>
                        {t.category}
                      </span>
                    </td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...pCfg }}>{t.priority}</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{t.created}</td>
                    <td style={{ fontSize: '0.8rem', color: t.assigned === 'Unassigned' ? '#f87171' : '#94a3b8' }}>{t.assigned}</td>
                    <td><span style={{ fontSize: '0.78rem', fontWeight: 700, color: stCfg.color, textTransform: 'capitalize' }}>{t.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>View</button>
                        {t.category === 'Security' && <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>→ SOC</button>}
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
