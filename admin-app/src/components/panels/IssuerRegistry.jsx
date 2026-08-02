import React from 'react';
import { Key, ShieldCheck, RotateCcw } from 'lucide-react';

const ISSUERS = [
  { id: 'ISR-001', org: 'IIT Bombay', dept: 'Office of Registrar', key: '0x04A1B2C3…', types: ['Student Identity'], status: 'authorized', created: '2024-01-15', keyExpiry: '2026-01-15', lastActivity: '14:09 today' },
  { id: 'ISR-002', org: 'IIT Bombay', dept: 'Exam Department', key: '0x05D4E5F6…', types: ['Exam Eligibility'], status: 'authorized', created: '2024-01-15', keyExpiry: '2026-01-15', lastActivity: '12:40 today' },
  { id: 'ISR-003', org: 'Delhi University', dept: 'Office of Registrar', key: '0x06G7H8I9…', types: ['Student Identity', 'Faculty ID'], status: 'authorized', created: '2024-02-08', keyExpiry: '2026-02-08', lastActivity: '11:30 today' },
  { id: 'ISR-004', org: 'UPSC Authority', dept: 'Exam Division', key: '0x07J0K1L2…', types: ['Exam Eligibility'], status: 'authorized', created: '2024-03-21', keyExpiry: '2026-03-21', lastActivity: '08:22 today' },
  { id: 'ISR-005', org: 'VIT Vellore', dept: 'HR & Registrar', key: '0x08M3N4O5…', types: ['Student Identity', 'Faculty ID'], status: 'key_expiring', created: '2024-04-10', keyExpiry: '2026-08-15', lastActivity: '09:55 today' },
  { id: 'ISR-006', org: 'GRE Board India', dept: 'Examination Dept.', key: '0x09P6Q7R8…', types: ['Exam Eligibility'], status: 'suspended', created: '2024-07-04', keyExpiry: '2026-07-04', lastActivity: '—' },
  { id: 'ISR-007', org: 'NIT Trichy', dept: 'Office of Registrar', key: '0x10S9T0U1…', types: ['Student Identity'], status: 'authorized', created: '2025-06-01', keyExpiry: '2027-06-01', lastActivity: '10:12 today' },
];

const STATUS_CFG = {
  authorized: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  key_expiring: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  suspended: { bg: 'rgba(239,68,68,0.12)', color: '#f87171', border: 'rgba(239,68,68,0.35)' },
  revoked: { bg: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: 'rgba(100,116,139,0.25)' },
};

export default function IssuerRegistry() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Issuer Registry</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Authorized credential issuers — public key and permission management</p>
        </div>
        <button className="btn btn-primary"><Key size={16} /> Authorize New Issuer</button>
      </div>

      {/* Warning for expiring keys */}
      <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        ⚠ 1 issuer key expiring within 14 days — rotate before expiry to prevent credential issuance failure.
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Issuer ID</th><th>Organization</th><th>Department</th><th>Public Key</th>
                <th>Credential Types</th><th>Status</th><th>Created</th><th>Key Expiry</th><th>Last Activity</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ISSUERS.map(iss => {
                const sCfg = STATUS_CFG[iss.status] || {};
                return (
                  <tr key={iss.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#a78bfa' }}>{iss.id}</td>
                    <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.875rem' }}>{iss.org}</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{iss.dept}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{iss.key}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {iss.types.map(t => (
                          <span key={t} style={{ padding: '0.1rem 0.4rem', borderRadius: 6, fontSize: '0.65rem', fontWeight: 600, background: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{iss.status.replace('_', ' ')}</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{iss.created}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: iss.status === 'key_expiring' ? '#fbbf24' : '#64748b' }}>{iss.keyExpiry}</td>
                    <td style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{iss.lastActivity}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>View</button>
                        {iss.status !== 'suspended' && (
                          <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)' }}>
                            <RotateCcw size={11} /> Rotate
                          </button>
                        )}
                        {iss.status === 'authorized' && (
                          <button className="btn" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Suspend</button>
                        )}
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
