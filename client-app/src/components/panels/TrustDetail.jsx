import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const TRUST_SIGNALS = [
  { signal: 'Credential Validity', result: 'Valid', score: 25, max: 25, color: '#10b981', icon: '✓' },
  { signal: 'Device Trust', result: '96%', score: 20, max: 20, color: '#10b981', icon: '✓' },
  { signal: 'Human Presence (Liveness)', result: '98%', score: 20, max: 20, color: '#10b981', icon: '✓' },
  { signal: 'Behavioral Match', result: '89%', score: 13, max: 15, color: '#06b6d4', icon: '~' },
  { signal: 'Context (Location/Time)', result: 'On-Campus / Exam Hours', score: 10, max: 10, color: '#10b981', icon: '✓' },
  { signal: 'Network Integrity', result: 'VPN Detected', score: 3, max: 10, color: '#f59e0b', icon: '⚠' },
];

const EVENTS = [
  { time: '14:01:12', event: 'Credential verified', delta: +25, color: '#34d399', reason: 'Valid credential on Sepolia blockchain' },
  { time: '14:01:14', event: 'Trusted device recognized', delta: +20, color: '#34d399', reason: 'Device fingerprint matches registered device' },
  { time: '14:01:16', event: 'Liveness check passed', delta: +20, color: '#34d399', reason: 'Human presence confidence: 98%' },
  { time: '14:01:20', event: 'Behavioral baseline match', delta: +13, color: '#34d399', reason: 'Typing pattern within normal variance' },
  { time: '14:01:21', event: 'Network: VPN detected', delta: -7, color: '#f87171', reason: 'Traffic routed through VPN exit node' },
  { time: '14:10:05', event: 'Behavioral anomaly — brief', delta: -5, color: '#fbbf24', reason: 'Unusual mouse movement pattern for 45 seconds' },
  { time: '14:10:55', event: 'Behavior returned to normal', delta: +4, color: '#34d399', reason: 'Pattern reverted within baseline range' },
];

const FINAL_SCORE = TRUST_SIGNALS.reduce((a, b) => a + b.score, 0);

export default function TrustDetail({ session }) {
  const user = session || { user: 'Aarav Sharma', id: 'STU-2841', sessionId: 'SES-AA1B2C', risk: 'trusted', trust: FINAL_SCORE };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Trust Detail</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Session: <span style={{ fontFamily: 'monospace', color: '#a78bfa' }}>{user.sessionId}</span> · User: <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{user.user}</span></p>
        </div>
        <div style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '0.65rem 1rem', fontSize: '0.8rem', color: '#22d3ee' }}>
          ⚠ <strong>Prototype Trust Model</strong> — Score weights are research estimates, not validated per IEEE FAR/FRR standards. Do not use for enforcement decisions.
        </div>
      </div>

      {/* Overall Score */}
      <div className="glass-panel" style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.05))', border: '1px solid rgba(16,185,129,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: FINAL_SCORE >= 80 ? '#10b981' : FINAL_SCORE >= 60 ? '#06b6d4' : FINAL_SCORE >= 40 ? '#f59e0b' : '#ef4444', lineHeight: 1 }}>{FINAL_SCORE}</div>
            <div style={{ fontSize: '1rem', color: '#64748b' }}>/100</div>
            <div style={{ marginTop: '0.4rem', fontWeight: 700, color: '#34d399', fontSize: '0.85rem' }}>● TRUSTED</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <div style={{ height: '100%', width: `${FINAL_SCORE}%`, background: 'linear-gradient(90deg, #10b981, #06b6d4)', borderRadius: 7, transition: 'width 1s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
              <span>0 — High Risk</span><span>40 — Step-Up</span><span>60 — Monitor</span><span>80 — Trusted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signal Breakdown + Evidence Timeline side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Signal Breakdown */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1.1rem' }}>Signal Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {TRUST_SIGNALS.map(sig => (
              <div key={sig.signal}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, width: 16, textAlign: 'center', color: sig.color }}>{sig.icon}</span>
                    <span style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>{sig.signal}</span>
                  </div>
                  <div style={{ display: 'flex', align: 'center', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{sig.result}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: sig.color }}>{sig.score}/{sig.max}</span>
                  </div>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(sig.score / sig.max) * 100}%`, background: sig.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Change Timeline */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1.1rem' }}>Why Trust Changed</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {EVENTS.map((ev, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, boxShadow: `0 0 7px ${ev.color}`, marginTop: 5 }} />
                  {i < EVENTS.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.08)', minHeight: 22, marginBottom: 2 }} />}
                </div>
                <div style={{ paddingBottom: i < EVENTS.length - 1 ? '0.7rem' : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#64748b' }}>{ev.time}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.78rem', color: ev.delta > 0 ? '#34d399' : '#f87171' }}>
                      {ev.delta > 0 ? '+' : ''}{ev.delta}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>{ev.event}</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: '0.1rem' }}>{ev.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {['Request Verification', 'Restrict Access', 'Terminate Session', 'View Audit Log'].map(a => (
          <button key={a} className={a === 'Terminate Session' ? 'btn' : 'btn btn-secondary'} style={a === 'Terminate Session' ? { background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)' } : { fontSize: '0.85rem' }}>
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}
