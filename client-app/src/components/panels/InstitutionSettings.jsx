import React, { useState } from 'react';
import { Building2, UserCog, Plus } from 'lucide-react';

const TEAM = [
  { name: 'Anitha V.', id: 'ADM-001', role: 'Administrator', email: 'anitha@nmit.ac.in', mfa: 'TOTP', status: 'active', lastLogin: '30 min ago' },
  { name: 'Dr. Suresh Kumar', id: 'ADM-002', role: 'Security Officer', email: 'suresh@nmit.ac.in', mfa: 'TOTP', status: 'active', lastLogin: '9 hr ago' },
  { name: 'Rekha Sharma', id: 'ADM-003', role: 'Credential Issuer', email: 'rekha@nmit.ac.in', mfa: 'Email OTP', status: 'active', lastLogin: '2 days ago' },
  { name: 'Anoop P.', id: 'ADM-004', role: 'Proctor', email: 'anoop@nmit.ac.in', mfa: 'TOTP', status: 'active', lastLogin: '8:30 AM today' },
  { name: 'Deepa Nair', id: 'ADM-005', role: 'Viewer', email: 'deepa@nmit.ac.in', mfa: 'None', status: 'active', lastLogin: '3 days ago' },
];

const ROLE_CFG = {
  'Administrator': { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  'Security Officer': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'Credential Issuer': { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  'Proctor': { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'Viewer': { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
};

const DEPARTMENTS = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Science', 'Mathematics', 'Physics', 'Chemistry'];

export default function InstitutionSettings() {
  const [activeSection, setActiveSection] = useState('institution');
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Institution Settings</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Institution profile, departments, and team management</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" style={{ background: saved ? 'linear-gradient(135deg,#10b981,#06b6d4)' : undefined }}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.25rem', width: 'fit-content' }}>
        {[['institution', 'Institution Info'], ['team', 'Team & Roles']].map(([id, label]) => (
          <button key={id} onClick={() => setActiveSection(id)} style={{ padding: '0.45rem 1.1rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: activeSection === id ? 'rgba(6,182,212,0.18)' : 'transparent', color: activeSection === id ? '#22d3ee' : '#94a3b8' }}>{label}</button>
        ))}
      </div>

      {activeSection === 'institution' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={16} color="#06b6d4" /> Institution Profile
            </h3>
            {[
              ['Institution Name', 'NMIT Bangalore', 'text'],
              ['Institution ID', 'CLIENT-NMIT-004', 'text'],
              ['Primary Domain', 'nmit.ac.in', 'text'],
              ['Primary Administrator', 'Anitha V.', 'text'],
              ['Support Email', 'support@nmit.ac.in', 'email'],
              ['Timezone', 'Asia/Kolkata (IST)', 'text'],
              ['Academic Year', '2026–27', 'text'],
            ].map(([label, def, type]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
                <input defaultValue={def} type={type} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#e2e8f0', padding: '0.5rem 0.75rem', fontSize: '0.875rem', outline: 'none' }} />
              </div>
            ))}
          </div>

          <div className="glass-panel">
            <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '1rem' }}>Departments</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {DEPARTMENTS.map(d => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0.85rem', background: 'rgba(0,0,0,0.3)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>{d}</span>
                  <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.72rem' }}>Edit</button>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary" style={{ fontSize: '0.78rem' }}><Plus size={13} /> Add Department</button>
          </div>
        </div>
      )}

      {activeSection === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#22d3ee' }}>
            ℹ Roles follow least-privilege. Administrators can manage team but not bypass security policies without Security Officer approval.
          </div>

          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Team Members</h3>
              <button className="btn btn-primary" style={{ fontSize: '0.75rem' }}><UserCog size={14} /> Add Member</button>
            </div>
            <div className="table-container">
              <table>
                <thead><tr><th>Name</th><th>User ID</th><th>Role</th><th>Email</th><th>MFA</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
                <tbody>
                  {TEAM.map(u => {
                    const rCfg = ROLE_CFG[u.role] || {};
                    return (
                      <tr key={u.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: rCfg.bg, border: `1px solid ${rCfg.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', color: rCfg.color }}>
                              {u.name[0]}
                            </div>
                            <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#a78bfa' }}>{u.id}</td>
                        <td><span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.18rem 0.55rem', borderRadius: 9999, background: rCfg.bg, color: rCfg.color, border: `1px solid ${rCfg.color}40` }}>{u.role}</span></td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.email}</td>
                        <td style={{ fontSize: '0.8rem', fontWeight: 600, color: u.mfa === 'None' ? '#f87171' : '#22d3ee' }}>{u.mfa}</td>
                        <td><span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#34d399' }}>● {u.status}</span></td>
                        <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{u.lastLogin}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
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

          {/* Role Legend */}
          <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
            <h4 style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Roles & Permissions</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.entries(ROLE_CFG).map(([role, cfg]) => (
                <span key={role} style={{ padding: '0.3rem 0.75rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, background: cfg.bg, color: cfg.color }}>{role}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
