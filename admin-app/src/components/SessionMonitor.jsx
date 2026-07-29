import React, { useState } from 'react';
import { Activity, ShieldAlert, Monitor, Eye, Edit, UserX, Trash2, CheckCircle2, X } from 'lucide-react';

export default function SessionMonitor({ summary, onSelectRevoke, onRefresh }) {
  const credentials = summary?.credentials || [];
  
  // Selected user for View or Edit modal
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEditOpen = (user) => {
    setEditUser(user);
    setEditForm({
      user_id: user.user_id,
      full_name: user.full_name,
      user_role: user.user_role,
      institution: user.institution,
      status: user.status
    });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ADMIN_SECRET_TOKEN_2026'
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setEditUser(null);
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleSuspend = async (userId) => {
    try {
      const res = await fetch('/api/admin/users/suspend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ADMIN_SECRET_TOKEN_2026'
        },
        body: JSON.stringify({
          user_id: userId,
          reason: 'Administrative risk freeze triggered by proctor'
        })
      });
      if (res.ok && onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to suspend user:', err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm(`Are you sure you want to permanently delete user ${userId}?`)) return;
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ADMIN_SECRET_TOKEN_2026'
        }
      });
      if (res.ok && onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Monitor size={18} color="#8b5cf6" /> Registered Users & Admin Control Table
          </h3>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Manage active user profiles, unique user keys, roles, and security actions.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#c4b5fd', background: 'rgba(139, 92, 246, 0.15)', padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          {credentials.length} Total Users Enrolled
        </span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User & Avatar</th>
              <th>Unique Profile Key</th>
              <th>Role</th>
              <th>Institution & Dept</th>
              <th>Status</th>
              <th>Retina Vector Hash</th>
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {credentials.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  No users currently registered in the database.
                </td>
              </tr>
            ) : (
              credentials.map((cred) => (
                <tr key={cred.credential_id || cred.user_id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: '#fff'
                      }}>
                        {cred.full_name ? cred.full_name[0] : 'U'}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#ffffff' }}>{cred.full_name}</div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>@{cred.username || cred.user_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="mono-font" style={{ color: '#06b6d4', fontWeight: '600', fontSize: '0.775rem' }}>
                    {cred.user_key || `USR-KEY-${cred.credential_id}`}
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>
                    <span className="badge" style={{ background: cred.user_role === 'proctor' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(6, 182, 212, 0.2)', color: cred.user_role === 'proctor' ? '#c4b5fd' : '#38bdf8' }}>
                      {cred.user_role}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.825rem' }}>{cred.institution}</td>
                  <td>
                    <span className={`badge ${cred.status === 'active' ? 'badge-low' : cred.status === 'suspended' ? 'badge-medium' : 'badge-high'}`}>
                      {cred.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="mono-font" style={{ fontSize: '0.75rem', color: '#a78bfa' }}>
                    {cred.retina_vector_hash ? cred.retina_vector_hash.substring(0, 16) + '...' : '0x8f3b201948...'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {/* View Action */}
                      <button
                        onClick={() => setViewUser(cred)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
                        title="View Profile Details"
                      >
                        <Eye size={13} /> View
                      </button>

                      {/* Edit Action */}
                      <button
                        onClick={() => handleEditOpen(cred)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem', color: '#38bdf8' }}
                        title="Edit User"
                      >
                        <Edit size={13} /> Edit
                      </button>

                      {/* Suspend Action */}
                      {cred.status === 'active' && (
                        <button
                          onClick={() => handleSuspend(cred.user_id)}
                          className="btn btn-warning"
                          style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
                          title="Suspend Session"
                        >
                          <UserX size={13} /> Suspend
                        </button>
                      )}

                      {/* Delete / Revoke Action */}
                      <button
                        onClick={() => handleDelete(cred.user_id)}
                        className="btn btn-danger"
                        style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
                        title="Delete / Revoke User"
                      >
                        <Trash2 size={13} /> Revoke
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: View Profile */}
      {viewUser && (
        <div className="modal-overlay" onClick={() => setViewUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem' }}>User Profile Telemetry & Key</h3>
              <button onClick={() => setViewUser(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.85rem', borderRadius: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>ASSIGNED UNIQUE USER PROFILE KEY</span>
                <code className="mono-font" style={{ color: '#06b6d4', fontWeight: '700', fontSize: '0.9rem' }}>
                  {viewUser.user_key || `USR-KEY-${viewUser.credential_id}`}
                </code>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>FULL NAME</span>
                  <strong>{viewUser.full_name}</strong>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>ROLE</span>
                  <strong style={{ textTransform: 'capitalize', color: '#8b5cf6' }}>{viewUser.user_role}</strong>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>INSTITUTION & DEPARTMENT</span>
                <span>{viewUser.institution}</span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>RETINA VECTOR HASH</span>
                <code className="mono-font" style={{ color: '#a78bfa' }}>
                  {viewUser.retina_vector_hash || '0x8f3b201948aeef12093847aef'}
                </code>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>SEPOLIA BLOCKCHAIN CONSENT PROOF</span>
                <code className="mono-font" style={{ color: '#34d399', wordBreak: 'break-all', fontSize: '0.75rem' }}>
                  {viewUser.consent_hash}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit User */}
      {editUser && (
        <div className="modal-overlay" onClick={() => setEditUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem' }}>Edit User Profile & Role</h3>
              <button onClick={() => setEditUser(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>FULL NAME</label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', padding: '0.65rem', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>ROLE</label>
                <select
                  value={editForm.user_role}
                  onChange={(e) => setEditForm({ ...editForm, user_role: e.target.value })}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', padding: '0.65rem', borderRadius: '8px', color: '#fff' }}
                >
                  <option value="student">Student</option>
                  <option value="proctor">Proctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>STATUS</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', padding: '0.65rem', borderRadius: '8px', color: '#fff' }}
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="revoked">Revoked</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                Save Profile Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
