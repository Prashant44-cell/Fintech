import React, { useState } from 'react';
import { Shield, Search, ChevronDown } from 'lucide-react';

const USERS = [
  { id: 'USR-SA-001', name: 'Prashant', org: 'CallID Platform', role: 'Super Admin', status: 'active', mfa: 'Passkey', lastLogin: '2026-08-01 08:12', created: '2024-01-01', activity: '2 min ago' },
  { id: 'USR-SEC-002', name: 'Kavita Menon', org: 'CallID Platform', role: 'Security Admin', status: 'active', mfa: 'TOTP', lastLogin: '2026-08-01 07:45', created: '2024-03-10', activity: '18 min ago' },
  { id: 'USR-OPS-003', name: 'Rahul Singh', org: 'CallID Platform', role: 'Operations Admin', status: 'active', mfa: 'TOTP', lastLogin: '2026-07-31 22:30', created: '2024-04-22', activity: '9 hr ago' },
  { id: 'USR-AUD-004', name: 'Deepa Nair', org: 'CallID Platform', role: 'Auditor', status: 'active', mfa: 'Email OTP', lastLogin: '2026-07-30 14:00', created: '2024-05-15', activity: '2 days ago' },
  { id: 'USR-SUP-005', name: 'Amit Tiwari', org: 'CallID Platform', role: 'Support Engineer', status: 'active', mfa: 'TOTP', lastLogin: '2026-08-01 06:50', created: '2024-06-01', activity: '1 hr ago' },
  { id: 'USR-ADM-010', name: 'Dr. Sharma', org: 'IIT Bombay', role: 'Institution Admin', status: 'active', mfa: 'Passkey', lastLogin: '2026-08-01 09:00', created: '2024-01-15', activity: '4 min ago' },
  { id: 'USR-SEC-011', name: 'Priya Iyer', org: 'IIT Bombay', role: 'Security Officer', status: 'active', mfa: 'TOTP', lastLogin: '2026-08-01 08:30', created: '2024-01-15', activity: '30 min ago' },
  { id: 'USR-ISS-012', name: 'Rajesh Gupta', org: 'Delhi University', role: 'Credential Issuer', status: 'active', mfa: 'TOTP', lastLogin: '2026-07-31 18:00', created: '2024-02-08', activity: '14 hr ago' },
  { id: 'USR-PRO-013', name: 'Sonal Verma', org: 'UPSC Authority', role: 'Proctor', status: 'suspended', mfa: 'None', lastLogin: '2026-07-20 10:00', created: '2024-03-21', activity: '12 days ago' },
  { id: 'USR-ADM-014', name: 'Kumar Pillai', org: 'VIT Vellore', role: 'Institution Admin', status: 'active', mfa: 'Email OTP', lastLogin: '2026-08-01 07:15', created: '2024-04-10', activity: '1 hr ago' },
];

const ROLE_COLORS = {
  'Super Admin': { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.4)' },
  'Security Admin': { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.35)' },
  'Operations Admin': { bg: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: 'rgba(139,92,246,0.35)' },
  'Auditor': { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  'Support Engineer': { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  'Institution Admin': { bg: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
  'Security Officer': { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.25)' },
  'Credential Issuer': { bg: 'rgba(6,182,212,0.08)', color: '#67e8f9', border: 'rgba(6,182,212,0.25)' },
  'Proctor': { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
};

function RoleBadge({ role }) {
  const cfg = ROLE_COLORS[role] || {};
  return <span style={{ padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, ...cfg }}>{role}</span>;
}

export default function GlobalUsers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'platform', 'institution'];
  const PLATFORM_ROLES = ['Super Admin', 'Security Admin', 'Operations Admin', 'Auditor', 'Support Engineer'];

  const filtered = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase()) || u.org.toLowerCase().includes(search.toLowerCase());
    const matchCat = filter === 'all' ? true : filter === 'platform' ? PLATFORM_ROLES.includes(u.role) : !PLATFORM_ROLES.includes(u.role);
    return matchSearch && matchCat;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Global Users & Administrators</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Platform-level and institutional accounts</p>
        </div>
        <button className="btn btn-primary">+ Add User</button>
      </div>

      {/* Filters + Search */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, ID, organization…" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.55rem 0.85rem 0.55rem 2.25rem', fontSize: '0.875rem', outline: 'none' }} />
        </div>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '0.45rem 1rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600,
            textTransform: 'capitalize', cursor: 'pointer', border: '1px solid',
            background: filter === c ? 'rgba(139,92,246,0.2)' : 'transparent',
            color: filter === c ? '#c4b5fd' : '#94a3b8',
            borderColor: filter === c ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)'
          }}>{c === 'all' ? 'All Users' : c === 'platform' ? 'Platform Users' : 'Client Admins'}</button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th><th>User ID</th><th>Organization</th><th>Role</th>
                <th>Status</th><th>MFA</th><th>Last Login</th><th>Last Activity</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#fff', flexShrink: 0 }}>
                        {u.name[0]}
                      </div>
                      <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.875rem' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{u.id}</td>
                  <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{u.org}</td>
                  <td><RoleBadge role={u.role} /></td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 600, color: u.status === 'active' ? '#34d399' : '#f87171' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: u.status === 'active' ? '#10b981' : '#ef4444', display: 'inline-block' }} />
                      {u.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: u.mfa !== 'None' ? '#22d3ee' : '#f87171' }}>
                    {u.mfa === 'None' ? '⚠ None' : <><Shield size={12} style={{ marginRight: 4 }} />{u.mfa}</>}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>{u.lastLogin}</td>
                  <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{u.activity}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      {['View', 'Suspend', 'Reset'].map(a => (
                        <button key={a} className="btn btn-secondary" style={{ fontSize: '0.68rem', padding: '0.25rem 0.5rem' }}>{a}</button>
                      ))}
                    </div>
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
