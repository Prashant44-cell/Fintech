import React, { useState } from 'react';
import { Zap, ShieldAlert } from 'lucide-react';

const SESSIONS = [
  { user: 'Aarav Sharma', id: 'STU-2841', sessionId: 'SES-AA1B2C', device: 'MacBook Pro 2023', ip: '192.168.1.45', network: 'On-Campus Wi-Fi', loginTime: '14:01:12', duration: '18 min', credStatus: 'Valid', trust: 94, risk: 'trusted', activity: 'Submitting Assignment', lastUpdate: '14:18:47', signals: { credential: true, device: true, humanPresence: true, behavior: true, network: true } },
  { user: 'Priya Iyer', id: 'STU-1042', sessionId: 'SES-BB2C3D', device: 'Unknown Device', ip: '10.44.22.11', network: 'Unknown Network', loginTime: '13:45:05', duration: '41 min', credStatus: 'Valid', trust: 39, risk: 'high', activity: 'Exam Portal — Step-Up Pending', lastUpdate: '14:05:11', signals: { credential: true, device: false, humanPresence: false, behavior: false, network: false } },
  { user: 'Rohan Mehta', id: 'STU-7810', sessionId: 'SES-CC3D4E', device: 'DELL Laptop — 2021', ip: '192.168.2.77', network: 'On-Campus Wi-Fi', loginTime: '12:30:01', duration: '1 hr 49 min', credStatus: 'Valid', trust: 58, risk: 'monitoring', activity: 'LMS — Lecture Notes', lastUpdate: '14:10:55', signals: { credential: true, device: true, humanPresence: true, behavior: false, network: true } },
  { user: 'Dr. Suresh Kumar', id: 'FAC-0044', sessionId: 'SES-DD4E5F', device: 'Dell XPS 15 — 2022', ip: '192.168.1.22', network: 'On-Campus Ethernet', loginTime: '09:00:00', duration: '5 hr 19 min', credStatus: 'Valid', trust: 88, risk: 'trusted', activity: 'Grading Portal — Active', lastUpdate: '14:19:02', signals: { credential: true, device: true, humanPresence: true, behavior: true, network: true } },
  { user: 'Arjun Nair', id: 'STU-9901', sessionId: 'SES-EE5F6G', device: 'MacBook Air M2', ip: '192.168.3.88', network: 'On-Campus Wi-Fi', loginTime: '14:00:44', duration: '19 min', credStatus: 'Valid', trust: 97, risk: 'trusted', activity: 'Library Research Portal', lastUpdate: '14:18:55', signals: { credential: true, device: true, humanPresence: true, behavior: true, network: true } },
];

const RISK_CFG = {
  trusted: { color: '#10b981', label: 'Trusted', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  monitoring: { color: '#06b6d4', label: 'Monitoring', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
  stepup: { color: '#f59e0b', label: 'Step-Up', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  high: { color: '#ef4444', label: 'High Risk', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)' },
};

const SIG_LABELS = ['credential', 'device', 'humanPresence', 'behavior', 'network'];
const SIG_DISPLAY = ['Credential', 'Device Trust', 'Human Presence', 'Behavior', 'Network'];

function SignalBadge({ ok, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: 8, background: ok ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.12)', border: `1px solid ${ok ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.3)'}` }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: ok ? '#10b981' : '#ef4444', display: 'inline-block' }} />
      <span style={{ fontSize: '0.68rem', fontWeight: 600, color: ok ? '#34d399' : '#f87171' }}>{label}</span>
    </div>
  );
}

export default function LiveSessionsPanel({ onViewTrust }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Live Sessions</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Continuous trust monitoring — who is active and should they be trusted?</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ padding: '0.3rem 0.75rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.35)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981', display: 'inline-block' }} /> {SESSIONS.length} Active Sessions
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {SESSIONS.map(ses => {
          const rCfg = RISK_CFG[ses.risk] || {};
          const isExpanded = selected === ses.sessionId;
          return (
            <div key={ses.sessionId} className="glass-panel" style={{ padding: 0, overflow: 'hidden', border: `1px solid ${ses.risk === 'high' ? 'rgba(239,68,68,0.3)' : ses.risk === 'monitoring' ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
              {/* Session Row */}
              <div style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.25rem' }} onClick={() => setSelected(isExpanded ? null : ses.sessionId)}>
                {/* Avatar */}
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${rCfg.color}30`, border: `2px solid ${rCfg.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', color: rCfg.color, flexShrink: 0 }}>
                  {ses.user[0]}
                </div>

                {/* User info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{ses.user}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{ses.id}</span>
                    <span style={{ padding: '0.12rem 0.45rem', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', ...rCfg }}>{rCfg.label}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                    {ses.device} · {ses.network} · Login: {ses.loginTime} ({ses.duration}) · {ses.activity}
                  </div>
                </div>

                {/* Trust Score */}
                <div style={{ textAlign: 'center', flexShrink: 0, minWidth: 80 }}>
                  <div style={{ fontSize: '1.7rem', fontWeight: 800, color: ses.trust >= 80 ? '#34d399' : ses.trust >= 60 ? '#22d3ee' : ses.trust >= 40 ? '#fbbf24' : '#f87171', lineHeight: 1 }}>{ses.trust}</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trust Score</div>
                </div>

                {/* Signals mini */}
                <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                  {SIG_LABELS.map((sig, i) => (
                    <div key={sig} title={SIG_DISPLAY[i]} style={{ width: 10, height: 10, borderRadius: '50%', background: ses.signals[sig] ? '#10b981' : '#ef4444', boxShadow: `0 0 5px ${ses.signals[sig] ? '#10b981' : '#ef4444'}` }} />
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  <button className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.35rem 0.7rem' }} onClick={() => onViewTrust && onViewTrust(ses)}>Trust Detail</button>
                  <button className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.35rem 0.7rem' }}>Step-Up</button>
                  <button className="btn" style={{ fontSize: '0.72rem', padding: '0.35rem 0.7rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>Terminate</button>
                </div>
              </div>

              {/* Expanded Trust Signals */}
              {isExpanded && (
                <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                    {SIG_LABELS.map((sig, i) => <SignalBadge key={sig} ok={ses.signals[sig]} label={`${SIG_DISPLAY[i]}: ${ses.signals[sig] ? '✓ Verified' : '✗ Failed'}`} />)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
                    {[['Session ID', ses.sessionId], ['IP Address', ses.ip], ['Credential', ses.credStatus], ['Last Trust Update', ses.lastUpdate]].map(([k, v]) => (
                      <div key={k} style={{ background: 'rgba(0,0,0,0.35)', borderRadius: 8, padding: '0.55rem 0.75rem' }}>
                        <div style={{ fontSize: '0.65rem', color: '#475569', textTransform: 'uppercase' }}>{k}</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', marginTop: '0.15rem', fontFamily: k === 'Session ID' || k === 'IP Address' ? 'monospace' : undefined }}>{v}</div>
                      </div>
                    ))}
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
