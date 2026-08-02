import React, { useState } from 'react';
import { CreditCard, Search, TrendingUp, TrendingDown } from 'lucide-react';

const CRED_KPI = [
  { label: 'Total Issued', value: '3,872,450', color: '#06b6d4', trend: '+8.1K today', up: true },
  { label: 'Active', value: '3,614,200', color: '#10b981', trend: '+7.4K today', up: true },
  { label: 'Expired', value: '214,110', color: '#f59e0b', trend: '+350 today', up: true },
  { label: 'Suspended', value: '41,900', color: '#a78bfa', trend: '-22 today', up: false },
  { label: 'Revoked', value: '2,140', color: '#ef4444', trend: '+5 today', up: true },
];

const CREDENTIALS = [
  { id: 'CRED-STU-AA1B2C', client: 'IIT Bombay', user: 'USR-STU-28401', type: 'Student Identity', issuer: 'Registrar', issued: '2025-08-01', expiry: '2026-08-01', status: 'active', proof: 'anchored' },
  { id: 'CRED-EXM-BB3D4E', client: 'UPSC Authority', user: 'USR-EXM-94521', type: 'Exam Eligibility', issuer: 'Exam Dept.', issued: '2026-07-15', expiry: '2026-07-31', status: 'expired', proof: 'anchored' },
  { id: 'CRED-STU-CC5F6G', client: 'Delhi University', user: 'USR-STU-11290', type: 'Student Identity', issuer: 'Registrar', issued: '2025-09-10', expiry: '2026-09-10', status: 'active', proof: 'pending' },
  { id: 'CRED-FAC-DD7H8I', client: 'VIT Vellore', user: 'USR-FAC-4401', type: 'Faculty ID', issuer: 'HR Dept.', issued: '2024-06-01', expiry: '2026-06-01', status: 'active', proof: 'anchored' },
  { id: 'CRED-STU-EE9J0K', client: 'NIT Trichy', user: 'USR-STU-7810', type: 'Student Identity', issuer: 'Registrar', issued: '2025-07-20', expiry: '2026-07-20', status: 'suspended', proof: 'anchored' },
  { id: 'CRED-STU-FF1L2M', client: 'BITS Pilani', user: 'USR-STU-15920', type: 'Student Identity', issuer: 'Registrar', issued: '2025-10-05', expiry: '2026-10-05', status: 'active', proof: 'failed' },
  { id: 'CRED-GRP-GG3N4O', client: 'GRE Board India', user: 'USR-EXM-380012', type: 'Exam Eligibility', issuer: 'GRE Dept.', issued: '2026-01-10', expiry: '2026-01-10', status: 'revoked', proof: 'anchored' },
];

const STATUS_CFG = {
  active: { bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  expired: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  suspended: { bg: 'rgba(139,92,246,0.12)', color: '#c4b5fd', border: 'rgba(139,92,246,0.3)' },
  revoked: { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.4)' },
};

const PROOF_CFG = {
  anchored: { color: '#34d399', label: '✓ Anchored' },
  pending: { color: '#fbbf24', label: '⟳ Pending' },
  failed: { color: '#f87171', label: '✗ Failed' },
};

export default function CredentialManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = CREDENTIALS.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) || c.client.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Global Credential Management</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Platform-wide credential ecosystem</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary">Manage Schemas</button>
          <button className="btn btn-primary">Issue Credential</button>
        </div>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {CRED_KPI.map(k => (
          <div key={k.label} className="glass-panel" style={{ flex: 1, padding: '1rem', borderLeft: `3px solid ${k.color}` }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{k.value}</div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', marginTop: '0.2rem', letterSpacing: '0.05em' }}>{k.label}</div>
            <div style={{ fontSize: '0.7rem', color: k.up ? '#34d399' : '#f87171', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {k.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID, client, type…" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', padding: '0.55rem 0.85rem 0.55rem 2.25rem', fontSize: '0.875rem', outline: 'none' }} />
        </div>
        {['all', 'active', 'expired', 'suspended', 'revoked'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600,
            textTransform: 'capitalize', cursor: 'pointer', border: '1px solid',
            background: filter === f ? 'rgba(139,92,246,0.2)' : 'transparent',
            color: filter === f ? '#c4b5fd' : '#94a3b8',
            borderColor: filter === f ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)'
          }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Credential ID</th><th>Client</th><th>User Ref</th><th>Type</th>
                <th>Issuer</th><th>Issued</th><th>Expiry</th><th>Status</th><th>Proof</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const sCfg = STATUS_CFG[c.status] || {};
                const pCfg = PROOF_CFG[c.proof] || {};
                return (
                  <tr key={c.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{c.id}</td>
                    <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.85rem' }}>{c.client}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>{c.user}</td>
                    <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{c.type}</td>
                    <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{c.issuer}</td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>{c.issued}</td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>{c.expiry}</td>
                    <td><span style={{ padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{c.status}</span></td>
                    <td style={{ fontSize: '0.78rem', color: pCfg.color, fontWeight: 600 }}>{pCfg.label}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.68rem', padding: '0.25rem 0.5rem' }}>View</button>
                        {c.status === 'active' && <button className="btn" style={{ fontSize: '0.68rem', padding: '0.25rem 0.5rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Revoke</button>}
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
