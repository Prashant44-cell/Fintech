import React, { useState } from 'react';
import { GraduationCap, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

const EXAM_STATS = [
  { label: 'Active Exams', value: '3', color: '#8b5cf6' },
  { label: 'Students Online', value: '840', color: '#06b6d4' },
  { label: 'Verified Students', value: '812', color: '#10b981' },
  { label: 'Verification Required', value: '18', color: '#f59e0b' },
  { label: 'High-Risk Sessions', value: '7', color: '#ef4444' },
  { label: 'Terminated Sessions', value: '2', color: '#f87171' },
];

const STUDENTS = [
  {
    name: 'Aarav Sharma', id: 'STU-2841', examId: 'EXAM-CS401-2026',
    credential: true, humanPresence: true, device: true, trust: 94,
    started: '09:00:12', duration: '1 hr 18 min', risk: 'trusted', lastVerif: '09:00',
    timeline: [
      { time: '09:00', event: 'Credential verified', type: 'pass' },
      { time: '09:01', event: 'Human presence confirmed — 98%', type: 'pass' },
      { time: '09:32', event: 'Behavioral anomaly detected', type: 'warn' },
      { time: '09:32', event: 'Trust: 94 → 67 (behavior shift)', type: 'warn' },
      { time: '09:33', event: 'Step-up verification requested', type: 'info' },
      { time: '09:34', event: 'Step-up passed — liveness confirmed', type: 'pass' },
      { time: '09:34', event: 'Trust restored: 67 → 91', type: 'pass' },
    ]
  },
  {
    name: 'Priya Iyer', id: 'STU-1042', examId: 'EXAM-EC301-2026',
    credential: true, humanPresence: false, device: false, trust: 39,
    started: '09:30:05', duration: '47 min', risk: 'high', lastVerif: '10:14',
    timeline: [
      { time: '09:30', event: 'Credential verified', type: 'pass' },
      { time: '09:31', event: 'Unknown device detected', type: 'warn' },
      { time: '09:31', event: 'Trust: 80 → 55 (unknown device)', type: 'warn' },
      { time: '09:32', event: 'Liveness check failed × 2', type: 'fail' },
      { time: '09:33', event: 'Trust: 55 → 39 (liveness failure)', type: 'fail' },
      { time: '09:33', event: 'Step-up requested — pending response', type: 'info' },
    ]
  },
  {
    name: 'Arjun Nair', id: 'STU-9901', examId: 'EXAM-IS401-2026',
    credential: true, humanPresence: true, device: true, trust: 97,
    started: '09:00:44', duration: '1 hr 18 min', risk: 'trusted', lastVerif: '09:01',
    timeline: [
      { time: '09:00', event: 'Credential verified', type: 'pass' },
      { time: '09:01', event: 'Human presence confirmed — 99%', type: 'pass' },
      { time: '09:01', event: 'Trusted device recognized', type: 'pass' },
      { time: '09:01', event: 'Trust established: 97', type: 'pass' },
    ]
  },
];

const RISK_CFG = {
  trusted: { color: '#10b981', label: 'Trusted' },
  monitoring: { color: '#06b6d4', label: 'Monitoring' },
  high: { color: '#ef4444', label: 'High Risk' },
};

const T_CFG = {
  pass: { color: '#34d399' },
  warn: { color: '#fbbf24' },
  fail: { color: '#f87171' },
  info: { color: '#22d3ee' },
};

export default function ExamSecurity() {
  const [selected, setSelected] = useState('STU-2841');
  const detail = STUDENTS.find(s => s.id === selected);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Exam Security</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Continuous identity assurance during examination sessions</p>
        </div>
        <span style={{ padding: '0.4rem 0.9rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.35)' }}>
          ● 3 Exams Live
        </span>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
        {EXAM_STATS.map(s => (
          <div key={s.label} className="glass-panel" style={{ padding: '0.85rem 1rem', borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.2rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Student List + Detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.25rem' }}>
        {/* Student Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {STUDENTS.map(stu => {
            const rCfg = RISK_CFG[stu.risk];
            const isActive = selected === stu.id;
            return (
              <div key={stu.id} onClick={() => setSelected(stu.id)} className="glass-panel" style={{ padding: '0.9rem 1rem', cursor: 'pointer', border: `1px solid ${isActive ? rCfg.color + '55' : 'rgba(255,255,255,0.08)'}`, background: isActive ? `${rCfg.color}10` : 'rgba(15,23,42,0.85)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{stu.name}</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{stu.id}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: stu.trust >= 80 ? '#34d399' : stu.trust >= 40 ? '#fbbf24' : '#f87171' }}>{stu.trust}</div>
                    <div style={{ fontSize: '0.6rem', color: '#475569' }}>Trust</div>
                  </div>
                </div>
                <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.25rem' }}>
                  {[stu.credential, stu.humanPresence, stu.device].map((ok, i) => (
                    <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: ok ? '#10b981' : '#ef4444', display: 'inline-block' }} />
                  ))}
                  <span style={{ fontSize: '0.68rem', color: '#64748b', marginLeft: 2 }}>Cred · Human · Device</span>
                </div>
                <span style={{ display: 'inline-block', marginTop: '0.4rem', fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.45rem', borderRadius: 9999, color: rCfg.color, background: `${rCfg.color}18`, border: `1px solid ${rCfg.color}40` }}>{rCfg.label}</span>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Header */}
            <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>{detail.name}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>{detail.id} · {detail.examId}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {[['Credential', detail.credential], ['Human Presence', detail.humanPresence], ['Device', detail.device]].map(([k, v]) => (
                    <div key={k} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '0.5rem' }}>
                      <div>{v ? <CheckCircle2 size={18} color="#10b981" /> : <XCircle size={18} color="#ef4444" />}</div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.2rem' }}>{k}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {[['Started', detail.started], ['Duration', detail.duration], ['Risk', RISK_CFG[detail.risk]?.label]].map(([k, v]) => (
                    <div key={k} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '0.5rem' }}>
                      <div style={{ fontWeight: 700, color: k === 'Risk' ? RISK_CFG[detail.risk]?.color : '#e2e8f0', fontSize: '0.85rem' }}>{v}</div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.15rem' }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Timeline */}
            <div className="glass-panel">
              <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginBottom: '1rem' }}>Security Timeline</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {detail.timeline.map((ev, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 9, height: 9, borderRadius: '50%', background: T_CFG[ev.type].color, boxShadow: `0 0 8px ${T_CFG[ev.type].color}`, marginTop: 4 }} />
                      {i < detail.timeline.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.07)', minHeight: 20, marginBottom: 2 }} />}
                    </div>
                    <div style={{ paddingBottom: i < detail.timeline.length - 1 ? '0.75rem' : 0 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: T_CFG[ev.type].color, fontWeight: 700, marginRight: '0.5rem' }}>{ev.time}</span>
                      <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{ev.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Request Verification', 'Restrict Access', 'Flag for Review', 'Terminate Session'].map(a => (
                <button key={a} className={a === 'Terminate Session' ? 'btn' : 'btn btn-secondary'} style={a === 'Terminate Session' ? { background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)' } : {}}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
