import React, { useState } from 'react';
import { Search, Eye, ShieldOff, RotateCcw, X } from 'lucide-react';

const USERS = [
  { id: 'STU-2841', name: 'Aarav Sharma', email: 'aarav@nmit.ac.in', phone: '+91 98765 43210', type: 'Student', dept: 'Computer Science', year: '3rd Year', status: 'active', credStatus: 'active', trust: 94, lastLogin: '14:08 today', lastVerif: '14:08 today', devices: 2, created: '2024-08-01' },
  { id: 'STU-1042', name: 'Priya Iyer', email: 'priya@nmit.ac.in', phone: '+91 87654 32109', type: 'Student', dept: 'Electronics', year: '2nd Year', status: 'active', credStatus: 'active', trust: 39, lastLogin: '13:52 today', lastVerif: '13:52 today', devices: 1, created: '2025-08-01' },
  { id: 'STU-7810', name: 'Rohan Mehta', email: 'rohan@nmit.ac.in', phone: '+91 76543 21098', type: 'Student', dept: 'Mechanical', year: '4th Year', status: 'active', credStatus: 'active', trust: 58, lastLogin: '12:30 today', lastVerif: '12:30 today', devices: 3, created: '2023-08-01' },
  { id: 'FAC-0044', name: 'Dr. Suresh Kumar', email: 'suresh@nmit.ac.in', phone: '+91 65432 10987', type: 'Faculty', dept: 'Mathematics', year: '—', status: 'active', credStatus: 'active', trust: 42, lastLogin: '09:00 today', lastVerif: '09:00 today', devices: 2, created: '2020-07-15' },
  { id: 'STU-5529', name: 'Kavya Reddy', email: 'kavya@nmit.ac.in', phone: '+91 54321 09876', type: 'Student', dept: 'Civil', year: '1st Year', status: 'suspended', credStatus: 'suspended', trust: 12, lastLogin: '11:00 today', lastVerif: '—', devices: 1, created: '2026-08-01' },
  { id: 'STU-9901', name: 'Arjun Nair', email: 'arjun@nmit.ac.in', phone: '+91 43210 98765', type: 'Student', dept: 'Information Science', year: '3rd Year', status: 'active', credStatus: 'active', trust: 97, lastLogin: '14:01 today', lastVerif: '14:01 today', devices: 2, created: '2024-08-01' },
  { id: 'PRO-001', name: 'Anitha V.', email: 'anitha@nmit.ac.in', phone: '+91 32109 87654', type: 'Proctor', dept: 'Exam Cell', year: '—', status: 'active', credStatus: 'active', trust: 88, lastLogin: '08:30 today', lastVerif: '08:30 today', devices: 1, created: '2022-01-01' },
  { id: 'STU-3312', name: 'Vikram Singh', email: 'vikram@nmit.ac.in', phone: '+91 21098 76543', type: 'Student', dept: 'Computer Science', year: '2nd Year', status: 'active', credStatus: 'revoked', trust: 0, lastLogin: '2026-07-20', lastVerif: '2026-07-20', devices: 0, created: '2025-08-01' },
];

const STATUS_CFG = {
  active: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  suspended: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  revoked: { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.4)' },
  expired: { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
};

function TrustBar({ value }) {
  const c = value >= 80 ? '#10b981' : value >= 60 ? '#06b6d4' : value >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
      <div style={{ width: 52, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: c, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: c }}>{value}</span>
    </div>
  );
}

function UserProfile({ user, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: 'rgba(11,15,25,0.97)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, width: '100%', maxWidth: 620, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(0,0,0,0.8)' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
              {user.name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{user.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{user.id} · {user.type}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#94a3b8', padding: '0.4rem', cursor: 'pointer', display: 'flex' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Identity */}
          <section>
            <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: '0.75rem' }}>Identity</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {[['Email', user.email], ['Phone', user.phone], ['Department', user.dept], ['Year/Semester', user.year], ['Institution', 'NMIT Bangalore'], ['Account Created', user.created]].map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem 0.85rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.68rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#e2e8f0', marginTop: '0.1rem' }}>{v}</div>
                </div>
              ))}
            </div>
          </section>
          {/* Account */}
          <section>
            <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: '0.75rem' }}>Account</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
              {[['Last Login', user.lastLogin, '#94a3b8'], ['Last Verified', user.lastVerif, '#94a3b8'], ['Devices', user.devices, '#06b6d4'], ['Cred Status', user.credStatus, STATUS_CFG[user.credStatus]?.color || '#94a3b8'], ['Trust Score', user.trust, user.trust >= 80 ? '#34d399' : '#f87171']].map(([k, v, c]) => (
                <div key={k} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: c, marginTop: '0.15rem' }}>{v}</div>
                </div>
              ))}
            </div>
          </section>
          {/* Actions */}
          <section>
            <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: '0.75rem' }}>Actions</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['View Profile', 'Verify Identity', 'Suspend', 'Revoke Credential', 'Reset / Recover'].map(a => (
                <button key={a} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}>{a}</button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function UsersPanel() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase()) || u.dept.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ? true : filter === 'high-risk' ? u.trust < 40 : u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Users</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>All registered identities — {USERS.length} total</p>
        </div>
        <button className="btn btn-primary">+ Register User</button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, ID, department…" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.55rem 0.85rem 0.55rem 2.25rem', fontSize: '0.875rem', outline: 'none' }} />
        </div>
        {['all', 'active', 'suspended', 'revoked', 'high-risk'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize', cursor: 'pointer', border: '1px solid', background: filter === f ? 'rgba(6,182,212,0.15)' : 'transparent', color: filter === f ? '#22d3ee' : '#94a3b8', borderColor: filter === f ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.1)' }}>
            {f === 'high-risk' ? 'High Risk' : f}
          </button>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>User</th><th>ID</th><th>Type</th><th>Department</th><th>Status</th><th>Credential</th><th>Trust</th><th>Last Login</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const sCfg = STATUS_CFG[u.status] || {};
                const cCfg = STATUS_CFG[u.credStatus] || {};
                return (
                  <tr key={u.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(u)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#fff', flexShrink: 0 }}>
                          {u.name[0]}
                        </div>
                        <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.875rem' }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{u.id}</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{u.type}</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{u.dept}</td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{u.status}</span></td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...cCfg }}>{u.credStatus}</span></td>
                    <td><TrustBar value={u.trust} /></td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{u.lastLogin}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }} onClick={() => setSelected(u)}><Eye size={10} /> View</button>
                        {u.status === 'active' && <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>Suspend</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selected && <UserProfile user={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
