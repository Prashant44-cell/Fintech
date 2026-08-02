import React from 'react';
import { UserCog, CheckCircle2, XCircle } from 'lucide-react';

const TEAM = [
  { id: 'USR-SA-001', name: 'Prashant', role: 'Super Admin', email: 'prashant@callid.io', mfa: 'Passkey', status: 'active', lastLogin: '8 min ago' },
  { id: 'USR-SEC-002', name: 'Kavita Menon', role: 'Security Admin', email: 'kavita@callid.io', mfa: 'TOTP', status: 'active', lastLogin: '22 min ago' },
  { id: 'USR-OPS-003', name: 'Rahul Singh', role: 'Operations Admin', email: 'rahul@callid.io', mfa: 'TOTP', status: 'active', lastLogin: '9 hr ago' },
  { id: 'USR-SUP-004', name: 'Amit Tiwari', role: 'Support Engineer', email: 'amit@callid.io', mfa: 'TOTP', status: 'active', lastLogin: '1 hr ago' },
  { id: 'USR-AUD-005', name: 'Deepa Nair', role: 'Auditor', email: 'deepa@callid.io', mfa: 'Email OTP', status: 'active', lastLogin: '2 days ago' },
  { id: 'USR-DEV-006', name: 'Siddharth Rao', role: 'Developer', email: 'siddharth@callid.io', mfa: 'TOTP', status: 'active', lastLogin: '5 hr ago' },
];

const PERMISSIONS = [
  { label: 'View Clients', sa: true, sec: true, ops: true, sup: true, aud: true, dev: false },
  { label: 'View Security Alerts', sa: true, sec: true, ops: 'limited', sup: false, aud: true, dev: false },
  { label: 'Terminate Session', sa: true, sec: true, ops: false, sup: false, aud: false, dev: false },
  { label: 'Change Trust Policy', sa: true, sec: 'limited', ops: false, sup: false, aud: false, dev: false },
  { label: 'Manage Billing', sa: true, sec: false, ops: 'limited', sup: 'limited', aud: false, dev: false },
  { label: 'View Audit Logs', sa: true, sec: true, ops: 'limited', sup: false, aud: true, dev: false },
  { label: 'Revoke Issuer', sa: true, sec: 'approval', ops: false, sup: false, aud: false, dev: false },
  { label: 'Disable Client', sa: true, sec: 'approval', ops: false, sup: false, aud: false, dev: false },
  { label: 'API Management', sa: true, sec: false, ops: true, sup: false, aud: false, dev: true },
  { label: 'Change Crypto Config', sa: 'dual-approval', sec: false, ops: false, sup: false, aud: false, dev: false },
];

const ROLES = ['Super Admin', 'Security Admin', 'Ops Admin', 'Support', 'Auditor', 'Developer'];
const ROLE_KEYS = ['sa', 'sec', 'ops', 'sup', 'aud', 'dev'];
const ROLE_COLORS = {
  'Super Admin': '#ef4444', 'Security Admin': '#f59e0b', 'Operations Admin': '#8b5cf6',
  'Support Engineer': '#10b981', 'Auditor': '#06b6d4', 'Developer': '#a78bfa',
};

function PermCell({ val }) {
  if (val === true) return <CheckCircle2 size={16} color="#10b981" />;
  if (val === false) return <XCircle size={16} color="#475569" />;
  return <span style={{ fontSize: '0.68rem', fontWeight: 700, color: val === 'dual-approval' ? '#f59e0b' : val === 'approval' ? '#fbbf24' : '#22d3ee', background: val === 'dual-approval' ? 'rgba(245,158,11,0.1)' : 'rgba(6,182,212,0.1)', padding: '0.1rem 0.4rem', borderRadius: 6, border: `1px solid ${val === 'dual-approval' ? 'rgba(245,158,11,0.3)' : 'rgba(6,182,212,0.25)'}` }}>{val}</span>;
}

export default function PlatformTeam() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Platform Team & Permissions</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Least privilege enforcement for platform administrators</p>
        </div>
        <button className="btn btn-primary"><UserCog size={16} /> Add Team Member</button>
      </div>

      <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#fbbf24' }}>
        ⚠ Super Admin access should be restricted to the minimum necessary. Sensitive actions (Revoke Issuer, Disable Client, Change Crypto Config) require dual-approval authorization.
      </div>

      {/* Team Members */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Platform Team</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Name</th><th>User ID</th><th>Role</th><th>Email</th><th>MFA</th><th>Status</th><th>Last Login</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {TEAM.map(u => {
                const roleColor = ROLE_COLORS[u.role] || '#94a3b8';
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${roleColor}30`, border: `1px solid ${roleColor}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', color: roleColor }}>
                          {u.name[0]}
                        </div>
                        <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#a78bfa' }}>{u.id}</td>
                    <td><span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.18rem 0.55rem', borderRadius: 9999, background: `${roleColor}18`, color: roleColor, border: `1px solid ${roleColor}40` }}>{u.role}</span></td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.email}</td>
                    <td style={{ fontSize: '0.8rem', color: '#22d3ee', fontWeight: 600 }}>{u.mfa}</td>
                    <td><span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#34d399' }}>● {u.status}</span></td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{u.lastLogin}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>View</button>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>Change Role</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Permission Matrix</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Permission</th>
                {ROLES.map(r => <th key={r} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map(p => (
                <tr key={p.label}>
                  <td style={{ fontWeight: 500, color: '#e2e8f0', fontSize: '0.85rem' }}>{p.label}</td>
                  {ROLE_KEYS.map(rk => (
                    <td key={rk} style={{ textAlign: 'center', padding: '0.65rem 1rem' }}>
                      <PermCell val={p[rk]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
