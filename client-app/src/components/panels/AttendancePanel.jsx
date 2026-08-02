import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const OVERVIEW_STATS = [
  { label: "Today's Sessions", value: '1,840', color: '#06b6d4' },
  { label: 'Students Expected', value: '1,800', color: '#8b5cf6' },
  { label: 'Attendance Verified', value: '1,712', color: '#10b981' },
  { label: 'Verification Required', value: '64', color: '#f59e0b' },
  { label: 'Proxy Suspicions', value: '12', color: '#fbbf24' },
  { label: 'Failed Verification', value: '28', color: '#ef4444' },
];

const RECORDS = [
  { student: 'Aarav Sharma', id: 'STU-2841', course: 'CS401 — AI & ML', classTime: '09:00 AM', date: '2026-08-01', credential: true, device: true, humanVerif: true, trust: 94, result: 'confirmed' },
  { student: 'Priya Iyer', id: 'STU-1042', course: 'EC301 — VLSI Design', classTime: '09:30 AM', date: '2026-08-01', credential: true, device: false, humanVerif: false, trust: 39, result: 'verification_required' },
  { student: 'Rohan Mehta', id: 'STU-7810', course: 'ME201 — Thermodynamics', classTime: '10:00 AM', date: '2026-08-01', credential: true, device: true, humanVerif: true, trust: 58, result: 'monitoring' },
  { student: 'Arjun Nair', id: 'STU-9901', course: 'IS401 — Database Systems', classTime: '09:00 AM', date: '2026-08-01', credential: true, device: true, humanVerif: true, trust: 97, result: 'confirmed' },
  { student: 'Divya Prasad', id: 'STU-4411', course: 'CS401 — AI & ML', classTime: '09:00 AM', date: '2026-08-01', credential: true, device: true, humanVerif: false, trust: 55, result: 'verification_required' },
  { student: 'Suraj Bhat', id: 'STU-6620', course: 'ME201 — Thermodynamics', classTime: '10:00 AM', date: '2026-08-01', credential: true, device: false, humanVerif: false, trust: 21, result: 'proxy_suspicion' },
  { student: 'Kavya Reddy', id: 'STU-5529', course: 'CV101 — Engineering Mechanics', classTime: '11:00 AM', date: '2026-08-01', credential: true, device: false, humanVerif: false, trust: 12, result: 'proxy_suspicion' },
  { student: 'Megha Rao', id: 'STU-8801', course: 'IS401 — Database Systems', classTime: '09:00 AM', date: '2026-08-01', credential: true, device: true, humanVerif: true, trust: 91, result: 'confirmed' },
];

const RESULT_CFG = {
  confirmed: { color: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', label: 'Attendance Confirmed' },
  monitoring: { color: '#22d3ee', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', label: 'Monitoring' },
  verification_required: { color: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', label: 'Verification Required' },
  proxy_suspicion: { color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', label: 'Proxy Suspicion' },
};

function Tick({ ok }) {
  return ok
    ? <CheckCircle2 size={15} color="#10b981" />
    : <XCircle size={15} color="#ef4444" />;
}

export default function AttendancePanel() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? RECORDS : RECORDS.filter(r => r.result === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Attendance</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Identity-verified attendance — detect potential proxy attendance</p>
        </div>
        <button className="btn btn-secondary">Export Today</button>
      </div>

      {/* Proxy Warning Banner */}
      <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#fbbf24' }}>
        ⚠ Proxy suspicion flags are <strong>evidence indicators</strong>, not conclusions. A trust model result does not establish fraud. Manual review and institutional policy must determine action.
      </div>

      {/* Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
        {OVERVIEW_STATS.map(s => (
          <div key={s.label} className="glass-panel" style={{ padding: '0.85rem 1rem', borderLeft: `3px solid ${s.color}` }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>{s.value}</div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.2rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {['all', 'confirmed', 'monitoring', 'verification_required', 'proxy_suspicion'].map(f => {
          const rCfg = RESULT_CFG[f] || {};
          return (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.35rem 0.8rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: filter === f ? (rCfg.bg || 'rgba(6,182,212,0.15)') : 'transparent', color: filter === f ? (rCfg.color || '#22d3ee') : '#94a3b8', borderColor: filter === f ? (rCfg.border || 'rgba(6,182,212,0.4)') : 'rgba(255,255,255,0.1)' }}>
              {f === 'all' ? 'All' : f === 'verification_required' ? 'Verif. Required' : f === 'proxy_suspicion' ? 'Proxy Suspicion' : f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? RECORDS.length : RECORDS.filter(r => r.result === f).length})
            </button>
          );
        })}
      </div>

      {/* Attendance Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Student</th><th>ID</th><th>Course</th><th>Time</th><th>Credential</th><th>Device</th><th>Human Verif.</th><th>Trust</th><th>Attendance Result</th></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const rCfg = RESULT_CFG[r.result] || {};
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{r.student}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{r.id}</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{r.course}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>{r.classTime}</td>
                    <td style={{ textAlign: 'center' }}><Tick ok={r.credential} /></td>
                    <td style={{ textAlign: 'center' }}><Tick ok={r.device} /></td>
                    <td style={{ textAlign: 'center' }}><Tick ok={r.humanVerif} /></td>
                    <td>
                      <span style={{ fontWeight: 700, color: r.trust >= 80 ? '#34d399' : r.trust >= 60 ? '#22d3ee' : r.trust >= 40 ? '#fbbf24' : '#f87171' }}>{r.trust}</span>
                      <span style={{ color: '#475569', fontSize: '0.72rem' }}>/100</span>
                    </td>
                    <td>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 700, ...rCfg }}>{rCfg.label}</span>
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
