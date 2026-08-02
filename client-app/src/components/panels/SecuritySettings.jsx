import React, { useState } from 'react';
import { Lock, Save, ToggleRight, ToggleLeft } from 'lucide-react';

const SECURITY_POLICIES = [
  { key: 'min_trust_score', label: 'Minimum Trust Score', value: '75', type: 'number', unit: '/100', desc: 'Sessions below this trust score are flagged for review' },
  { key: 'stepup_threshold', label: 'Step-Up Threshold', value: '65', type: 'number', unit: '/100', desc: 'Trust score below which step-up verification is triggered' },
  { key: 'critical_threshold', label: 'Critical Risk Threshold', value: '40', type: 'number', unit: '/100', desc: 'Trust score below which session is restricted or terminated' },
  { key: 'session_timeout', label: 'Session Timeout', value: '8 hours', type: 'select', options: ['1 hour', '4 hours', '8 hours', '24 hours'] },
  { key: 'device_limit', label: 'Registered Device Limit', value: '3', type: 'select', options: ['1', '2', '3', '5', 'Unlimited'] },
  { key: 'verif_frequency', label: 'Verification Frequency', value: 'Every 30 min', type: 'select', options: ['Every 5 min', 'Every 15 min', 'Every 30 min', 'Every hour', 'On suspicious event only'] },
  { key: 'recovery_policy', label: 'Recovery Policy', value: 'Admin approval required', type: 'select', options: ['Admin approval required', 'Automatic with hardware key', 'Manual only'] },
];

const RATE_LIMITS = [
  { label: 'Login Attempts / User', value: '5 per 5 min' },
  { label: 'Verification Requests / Min', value: '10' },
  { label: 'Recovery Attempts / Day', value: '3' },
  { label: 'API Requests / Client', value: '1000 per min' },
  { label: 'Failed Challenge Cooldown', value: '15 min' },
];

const PRIVACY = [
  { key: 'data_retention', label: 'Data Retention Period', value: '3 years', type: 'select', options: ['1 year', '2 years', '3 years', '5 years', '7 years'] },
  { key: 'audit_retention', label: 'Audit Log Retention', value: '5 years', type: 'select', options: ['2 years', '5 years', '7 years', 'Indefinite'] },
  { key: 'local_processing', label: 'Local Processing Required', type: 'toggle', value: true, desc: 'Biometric signals processed on-device before transmission' },
  { key: 'analytics_opt_in', label: 'Platform Analytics', type: 'toggle', value: true, desc: 'Contribute aggregated anonymized data to model improvement' },
  { key: 'consent_tracking', label: 'Explicit Consent Tracking', type: 'toggle', value: true, desc: 'Track and record consent events for every data use' },
];

export default function SecuritySettings() {
  const [activeSection, setActiveSection] = useState('security');
  const [toggles, setToggles] = useState({ local_processing: true, analytics_opt_in: true, consent_tracking: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const togglePrivacy = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Security & System Settings</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Trust thresholds, rate limiting, and privacy configuration</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" style={{ background: saved ? 'linear-gradient(135deg,#10b981,#06b6d4)' : undefined }}>
          <Save size={15} /> {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.25rem', width: 'fit-content' }}>
        {[['security', 'Security Policies'], ['rate', 'Rate Limiting'], ['privacy', 'Privacy']].map(([id, label]) => (
          <button key={id} onClick={() => setActiveSection(id)} style={{ padding: '0.45rem 1.1rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: activeSection === id ? 'rgba(239,68,68,0.18)' : 'transparent', color: activeSection === id ? '#f87171' : '#94a3b8' }}>{label}</button>
        ))}
      </div>

      {activeSection === 'security' && (
        <div className="glass-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 620 }}>
            {SECURITY_POLICIES.map(cfg => (
              <div key={cfg.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{cfg.label}</div>
                  {cfg.desc && <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.15rem' }}>{cfg.desc}</div>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {cfg.type === 'number' ? (
                    <input defaultValue={cfg.value} style={{ width: 72, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#f87171', padding: '0.4rem 0.65rem', fontSize: '0.95rem', fontWeight: 800, textAlign: 'center', outline: 'none' }} />
                  ) : (
                    <select defaultValue={cfg.value} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#e2e8f0', padding: '0.4rem 0.65rem', fontSize: '0.85rem', minWidth: 180 }}>
                      {cfg.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                  )}
                  {cfg.unit && <span style={{ color: '#475569', fontSize: '0.78rem' }}>{cfg.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'rate' && (
        <div className="glass-panel">
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '1rem' }}>Rate Limiting Configuration</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 560 }}>
            {RATE_LIMITS.map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 500 }}>{r.label}</span>
                <input defaultValue={r.value} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#a78bfa', padding: '0.35rem 0.65rem', fontSize: '0.85rem', textAlign: 'right', outline: 'none', width: 140 }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'privacy' && (
        <div className="glass-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 620 }}>
            {PRIVACY.map(cfg => (
              <div key={cfg.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{cfg.label}</div>
                  {cfg.desc && <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.15rem' }}>{cfg.desc}</div>}
                </div>
                {cfg.type === 'toggle' ? (
                  <button onClick={() => togglePrivacy(cfg.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: toggles[cfg.key] ? '#34d399' : '#64748b', display: 'flex', alignItems: 'center' }}>
                    {toggles[cfg.key] ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
                  </button>
                ) : (
                  <select defaultValue={cfg.value} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#e2e8f0', padding: '0.4rem 0.65rem', fontSize: '0.85rem', minWidth: 140 }}>
                    {cfg.options?.map(o => <option key={o}>{o}</option>)}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
