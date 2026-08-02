import React, { useState } from 'react';
import { AlertOctagon, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';

const INCIDENTS = [
  {
    id: 'INC-2048', title: 'Coordinated Brute Force — Delhi University', client: 'Delhi University',
    severity: 'high', started: '2026-08-01 13:28', detected: '2026-08-01 13:30',
    affectedUsers: 37, affectedSessions: 22, attackType: 'Brute Force / Credential Stuffing',
    assigned: 'Kavita Menon', status: 'contained',
    rootCause: 'Credential list purchased from underground market; automated tool targeting student accounts.',
    resolution: 'Rate limiter + CAPTCHA triggered. All compromised sessions terminated. Client notified at 13:42.',
    timeline: [
      { time: '13:28', event: 'Attack started — 37 login attempts per minute' },
      { time: '13:29', event: 'Rate limiter triggered — IPs flagged' },
      { time: '13:30', event: 'Trust Engine detected anomaly — risk escalated to HIGH' },
      { time: '13:31', event: 'Sessions restricted; step-up issued to affected users' },
      { time: '13:33', event: 'Policy Engine blocked 12 accounts' },
      { time: '13:42', event: 'Client (Delhi University) notified via webhook + email' },
      { time: '13:55', event: 'Incident contained — 0 active threat sessions' },
    ]
  },
  {
    id: 'INC-2047', title: 'Deepfake Suspicion — UPSC Exam Attempt', client: 'UPSC Authority',
    severity: 'critical', started: '2026-08-01 10:04', detected: '2026-08-01 10:06',
    affectedUsers: 1, affectedSessions: 1, attackType: 'Deepfake / AI-Generated Face',
    assigned: 'Kavita Menon', status: 'resolved',
    rootCause: 'Candidate used AI-generated video feed to bypass liveness detection.',
    resolution: 'Session terminated. Credential revoked. Forwarded to UPSC exam integrity team.',
    timeline: [
      { time: '10:04', event: 'Exam session started — candidate connected' },
      { time: '10:06', event: 'Liveness module detected synthetic face artifacts (confidence: 87%)' },
      { time: '10:07', event: 'Session flagged — step-up verification issued' },
      { time: '10:09', event: 'Step-up failed — session terminated' },
      { time: '10:11', event: 'Credential revoked. Blockchain proof logged.' },
      { time: '10:15', event: 'UPSC Authority notified. Incident closed.' },
    ]
  },
  {
    id: 'INC-2046', title: 'API Abuse — Unusual Request Spike', client: 'NIT Trichy',
    severity: 'medium', started: '2026-07-31 22:05', detected: '2026-07-31 22:10',
    affectedUsers: 0, affectedSessions: 0, attackType: 'API Abuse / Rate Limit Evasion',
    assigned: 'Amit Tiwari', status: 'resolved',
    rootCause: 'Misconfigured LMS integration causing retry loops on credential verification endpoint.',
    resolution: 'LMS webhook updated. Rate limit exception granted for 1 hour. Resolved after fix.',
    timeline: [
      { time: '22:05', event: '870 req/min on /verify endpoint — 8× normal traffic' },
      { time: '22:10', event: 'Rate limit triggered — 320 requests blocked' },
      { time: '22:12', event: 'Support engineer contacted NIT admin' },
      { time: '22:35', event: 'LMS integration patched by institution' },
      { time: '22:40', event: 'Traffic normalized. Incident resolved.' },
    ]
  },
];

const SEVERITY_CFG = {
  critical: { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.4)' },
  high: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.35)' },
  medium: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  low: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
};

const STATUS_CFG = {
  investigating: { color: '#a78bfa' },
  contained: { color: '#22d3ee' },
  resolved: { color: '#34d399' },
  open: { color: '#f87171' },
};

export default function IncidentManagement() {
  const [expanded, setExpanded] = useState('INC-2048');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Incident Management</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Correlated security incidents — multi-event investigation tracking</p>
        </div>
        <button className="btn btn-primary"><AlertOctagon size={16} /> Create Incident</button>
      </div>

      {INCIDENTS.map(inc => {
        const sCfg = SEVERITY_CFG[inc.severity] || {};
        const stCfg = STATUS_CFG[inc.status] || {};
        const isOpen = expanded === inc.id;
        return (
          <div key={inc.id} className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Header Row */}
            <div onClick={() => setExpanded(isOpen ? null : inc.id)} style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ minWidth: 110, fontFamily: 'monospace', fontWeight: 800, color: '#a78bfa', fontSize: '0.95rem' }}>{inc.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{inc.title}</span>
                  <span style={{ padding: '0.15rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{inc.severity}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: stCfg.color }}>{inc.status}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                  {inc.client} · {inc.attackType} · Started: {inc.started} · Assigned: {inc.assigned}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#f87171', fontSize: '1.1rem' }}>{inc.affectedUsers}</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Users</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#fbbf24', fontSize: '1.1rem' }}>{inc.affectedSessions}</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Sessions</div>
                </div>
              </div>
              {isOpen ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
            </div>

            {isOpen && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '1.25rem', background: 'rgba(0,0,0,0.2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.85rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>Root Cause</div>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>{inc.rootCause}</p>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.85rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>Resolution</div>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>{inc.resolution}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['View Audit Trail', 'Notify Client', 'Generate Report'].map(a => (
                      <button key={a} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>{a}</button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Incident Timeline</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {inc.timeline.map((ev, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 8px #8b5cf6', marginTop: 4 }} />
                          {i < inc.timeline.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(139,92,246,0.25)', minHeight: 20, marginBottom: 2 }} />}
                        </div>
                        <div style={{ paddingBottom: i < inc.timeline.length - 1 ? '0.75rem' : 0 }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#8b5cf6', fontWeight: 700, marginRight: '0.5rem' }}>{ev.time}</span>
                          <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{ev.event}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
