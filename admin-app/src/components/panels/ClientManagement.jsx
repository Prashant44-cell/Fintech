import React, { useState } from 'react';
import { Building2, Eye, Ban, AlertTriangle, ChevronRight, X, Globe, Calendar, Users, CreditCard, Activity, ShieldAlert } from 'lucide-react';

const CLIENTS = [
  { id: 'CLIENT-IIT-001', name: 'IIT Bombay', type: 'University', country: 'India', admin: 'Dr. Sharma', users: 28400, creds: 26800, sessions: 3240, plan: 'Enterprise', status: 'active', created: '2024-01-15' },
  { id: 'CLIENT-DU-002', name: 'Delhi University', type: 'University', country: 'India', admin: 'Prof. Mehra', users: 182000, creds: 171000, sessions: 18200, plan: 'Enterprise', status: 'active', created: '2024-02-08' },
  { id: 'CLIENT-UPSC-003', name: 'UPSC Authority', type: 'Exam Authority', country: 'India', admin: 'Mr. Pillai', users: 945000, creds: 920000, sessions: 0, plan: 'Enterprise', status: 'active', created: '2024-03-21' },
  { id: 'CLIENT-VIT-004', name: 'VIT Vellore', type: 'University', country: 'India', admin: 'Dr. Suresh', users: 44000, creds: 41500, sessions: 1880, plan: 'Institution', status: 'active', created: '2024-04-10' },
  { id: 'CLIENT-NIT-005', name: 'NIT Trichy', type: 'University', country: 'India', admin: 'Prof. Kumar', users: 12000, creds: 11400, sessions: 740, plan: 'Institution', status: 'trial', created: '2025-06-01' },
  { id: 'CLIENT-BITS-006', name: 'BITS Pilani', type: 'University', country: 'India', admin: 'Dr. Nair', users: 16800, creds: 15900, sessions: 892, plan: 'Institution', status: 'active', created: '2024-05-18' },
  { id: 'CLIENT-SC-007', name: 'St. Columbus School', type: 'School', country: 'India', admin: 'Mrs. Patel', users: 2400, creds: 2200, sessions: 80, plan: 'Starter', status: 'active', created: '2025-01-20' },
  { id: 'CLIENT-GRE-008', name: 'GRE Board India', type: 'Exam Authority', country: 'India', admin: 'Mr. Verma', users: 380000, creds: 355000, sessions: 0, plan: 'Enterprise', status: 'suspended', created: '2024-07-04' },
];

const STATUS_CFG = {
  active: { bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  trial: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  suspended: { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.4)' },
  restricted: { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  deactivated: { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.active;
  return (
    <span style={{ padding: '0.2rem 0.65rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', ...cfg }}>
      {status}
    </span>
  );
}

function ClientProfile({ client, onClose }) {
  const usageStats = [
    { label: 'Users', value: client.users.toLocaleString(), icon: Users, color: '#06b6d4' },
    { label: 'Credentials', value: client.creds.toLocaleString(), icon: CreditCard, color: '#8b5cf6' },
    { label: 'Active Sessions', value: client.sessions.toLocaleString(), icon: Activity, color: '#10b981' },
    { label: 'API Requests', value: '14.2K / hr', icon: Activity, color: '#f59e0b' },
    { label: 'Storage Used', value: '48.2 GB', icon: ShieldAlert, color: '#a78bfa' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(11, 15, 25, 0.97)', backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20,
        width: '100%', maxWidth: 680, maxHeight: '85vh', overflowY: 'auto',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8)'
      }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
              {client.name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{client.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{client.id}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#94a3b8', padding: '0.4rem', cursor: 'pointer', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* General */}
          <section>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '0.75rem' }}>General</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {[
                ['Type', client.type], ['Country', client.country], ['Primary Admin', client.admin],
                ['Plan', client.plan], ['Status', client.status], ['Created', client.created]
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem 0.85rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0', marginTop: '0.15rem' }}>{v}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Usage */}
          <section>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '0.75rem' }}>Usage</h4>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {usageStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} style={{ flex: '1 1 120px', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 10, border: `1px solid ${s.color}22` }}>
                    <Icon size={16} color={s.color} style={{ marginBottom: '0.3rem' }} />
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{s.value}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Security */}
          <section>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '0.75rem' }}>Security</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
              {[['High-Risk Events', '3', '#ef4444'], ['Open Alerts', '1', '#f59e0b'], ['Revocations', '12', '#a78bfa'], ['Failed Verifs', '28', '#f87171']].map(([k, v, c]) => (
                <div key={k} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: c }}>{v}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{k}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Admin Actions */}
          <section>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '0.75rem' }}>Admin Actions</h4>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {['View Client', 'Suspend', 'Restrict', 'Change Plan', 'Reset Admin', 'View Usage', 'View Security'].map((act) => (
                <button key={act} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}>{act}</button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function ClientManagement() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? CLIENTS : CLIENTS.filter(c => c.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Client / Institution Management</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>{CLIENTS.length} registered institutions</p>
        </div>
        <button className="btn btn-primary">+ Onboard New Institution</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['all', 'active', 'trial', 'suspended', 'restricted'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600,
            textTransform: 'capitalize', cursor: 'pointer', border: '1px solid',
            background: filter === f ? 'rgba(139,92,246,0.2)' : 'transparent',
            color: filter === f ? '#c4b5fd' : '#94a3b8',
            borderColor: filter === f ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)'
          }}>{f === 'all' ? `All (${CLIENTS.length})` : f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Institution</th><th>Client ID</th><th>Type</th><th>Country</th>
                <th>Admin</th><th>Users</th><th>Sessions</th><th>Plan</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', color: '#fff', flexShrink: 0 }}>
                        {c.name[0]}
                      </div>
                      <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{c.id}</td>
                  <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{c.type}</td>
                  <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{c.country}</td>
                  <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{c.admin}</td>
                  <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{c.users.toLocaleString()}</td>
                  <td style={{ color: c.sessions > 0 ? '#34d399' : '#475569' }}>{c.sessions.toLocaleString()}</td>
                  <td><span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#a78bfa' }}>{c.plan}</span></td>
                  <td><StatusBadge status={c.status} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem' }} onClick={e => e.stopPropagation()}>
                      <button className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }} onClick={() => setSelected(c)}>
                        <Eye size={12} /> View
                      </button>
                      {c.status === 'active' && (
                        <button className="btn" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.35)' }}>
                          <Ban size={12} /> Suspend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <ClientProfile client={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
