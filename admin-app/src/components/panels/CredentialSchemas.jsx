import React, { useState } from 'react';
import { FileCode2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

const SCHEMAS = [
  {
    id: 'SCH-001', name: 'Student Identity Credential', version: 'v2.1', owner: 'Platform',
    fields: ['Student ID', 'Institution', 'Department', 'Program', 'Year', 'Status'],
    created: '2024-01-10', updated: '2026-03-15', status: 'active', clients: 142,
  },
  {
    id: 'SCH-002', name: 'Exam Eligibility Credential', version: 'v1.4', owner: 'Platform',
    fields: ['Student ID', 'Exam ID', 'Eligibility Status', 'Validity Start', 'Validity End', 'Exam Center'],
    created: '2024-02-20', updated: '2025-11-10', status: 'active', clients: 38,
  },
  {
    id: 'SCH-003', name: 'Faculty Identity Credential', version: 'v1.2', owner: 'Platform',
    fields: ['Faculty ID', 'Institution', 'Department', 'Designation', 'Employment Status'],
    created: '2024-04-05', updated: '2025-08-22', status: 'active', clients: 94,
  },
  {
    id: 'SCH-004', name: 'Proctor Session Credential', version: 'v1.0', owner: 'Platform',
    fields: ['Proctor ID', 'Exam ID', 'Session Window', 'Authority Level'],
    created: '2024-06-01', updated: '2024-06-01', status: 'active', clients: 22,
  },
  {
    id: 'SCH-005', name: 'Guest Access Pass', version: 'v0.3', owner: 'Platform',
    fields: ['Guest ID', 'Institution', 'Valid From', 'Valid Until', 'Scope'],
    created: '2025-01-15', updated: '2025-01-15', status: 'draft', clients: 0,
  },
  {
    id: 'SCH-OLD-001', name: 'Student Identity Credential', version: 'v2.0', owner: 'Platform',
    fields: ['Student ID', 'Institution', 'Department', 'Program', 'Year'],
    created: '2024-01-10', updated: '2026-03-14', status: 'deprecated', clients: 0,
  },
];

const STATUS_CFG = {
  active: { bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  draft: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  deprecated: { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
};

export default function CredentialSchemas() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Credential Schemas</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Versioned schema registry for the platform</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> New Schema</button>
      </div>

      {/* Schema Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {SCHEMAS.map(s => {
          const sCfg = STATUS_CFG[s.status] || {};
          const isOpen = expanded === s.id;
          return (
            <div key={s.id} className="glass-panel" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
              <div onClick={() => setExpanded(isOpen ? null : s.id)} style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FileCode2 size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{s.name}</span>
                    <span style={{ padding: '0.15rem 0.5rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.3)' }}>{s.version}</span>
                    <span style={{ padding: '0.15rem 0.5rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{s.status}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                    {s.id} · Owner: {s.owner} · Created: {s.created} · Updated: {s.updated}
                    {s.status === 'active' && <> · <span style={{ color: '#34d399' }}>{s.clients} clients</span></>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }} onClick={e => { e.stopPropagation(); }}>New Version</button>
                  {s.status === 'active' && <button className="btn" onClick={e => { e.stopPropagation(); }} style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>Deprecate</button>}
                </div>
                {isOpen ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
              </div>

              {isOpen && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.2)' }}>
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#64748b', marginBottom: '0.75rem' }}>Schema Fields</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {s.fields.map(f => (
                      <span key={f} style={{ padding: '0.3rem 0.7rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500, background: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.2)' }}>
                        {f}
                      </span>
                    ))}
                    {s.status === 'active' && (
                      <button style={{ padding: '0.3rem 0.7rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, background: 'rgba(16,185,129,0.08)', color: '#34d399', border: '1px dashed rgba(16,185,129,0.3)', cursor: 'pointer' }}>
                        + Add Field
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    ⚠ Schema changes require a new version — existing credentials remain on their original schema version.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
