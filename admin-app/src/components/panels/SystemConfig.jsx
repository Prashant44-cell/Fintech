import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';

const CONFIG_TABS = ['Authentication', 'Trust', 'Credential', 'Infrastructure', 'Security', 'Privacy'];

const CONFIGS = {
  Authentication: [
    { key: 'session_duration', label: 'Session Duration', value: '8 hours', type: 'select', options: ['1 hour', '4 hours', '8 hours', '24 hours'] },
    { key: 'mfa_requirement', label: 'MFA Requirement', value: 'Required for all admins', type: 'select', options: ['Required for all admins', 'Required for Super Admin', 'Optional'] },
    { key: 'token_expiry', label: 'Token Expiration', value: '1 hour', type: 'select', options: ['15 min', '30 min', '1 hour', '4 hours'] },
    { key: 'passkey_enabled', label: 'Passkey / FIDO2 Support', value: 'Enabled', type: 'select', options: ['Enabled', 'Disabled'] },
    { key: 'suspicious_login', label: 'Suspicious Login Detection', value: 'Enabled', type: 'select', options: ['Enabled', 'Disabled'] },
  ],
  Trust: [
    { key: 'default_policy', label: 'Default Trust Policy', value: 'Monitor below 60', type: 'select', options: ['Monitor below 60', 'Step-up below 60', 'Step-up below 70'] },
    { key: 'stepup_threshold', label: 'Step-Up Threshold', value: '60', type: 'select', options: ['50', '60', '70', '80'] },
    { key: 'high_risk_threshold', label: 'High-Risk Threshold', value: '40', type: 'select', options: ['30', '40', '50'] },
    { key: 'eval_interval', label: 'Trust Evaluation Interval', value: '10 seconds', type: 'select', options: ['5 seconds', '10 seconds', '30 seconds', '60 seconds'] },
  ],
  Credential: [
    { key: 'default_validity', label: 'Default Validity Period', value: '12 months', type: 'select', options: ['6 months', '12 months', '24 months', 'Custom'] },
    { key: 'revocation_mode', label: 'Revocation Mode', value: 'Immediate + Blockchain', type: 'select', options: ['Immediate + Blockchain', 'Immediate only', 'Delayed (5 min)'] },
    { key: 'schema_versioning', label: 'Schema Versioning', value: 'Required', type: 'select', options: ['Required', 'Optional', 'Disabled'] },
  ],
  Infrastructure: [
    { key: 'request_timeout', label: 'Request Timeout', value: '30 seconds', type: 'select', options: ['10 seconds', '30 seconds', '60 seconds'] },
    { key: 'max_retries', label: 'Max Retries', value: '3', type: 'select', options: ['1', '2', '3', '5'] },
    { key: 'cache_ttl', label: 'Cache TTL', value: '5 minutes', type: 'select', options: ['1 min', '5 min', '15 min', '60 min'] },
    { key: 'queue_policy', label: 'Queue Policy', value: 'FIFO with priority', type: 'select', options: ['FIFO', 'FIFO with priority', 'Priority only'] },
  ],
  Security: [
    { key: 'rate_limit_login', label: 'Login Rate Limit', value: '5 attempts / 5 min', type: 'text', placeholder: 'attempts / window' },
    { key: 'admin_ip_policy', label: 'Admin IP Policy', value: 'Allowlist enforced', type: 'select', options: ['Allowlist enforced', 'Any IP', 'VPN required'] },
    { key: 'session_timeout', label: 'Idle Session Timeout', value: '30 minutes', type: 'select', options: ['10 min', '30 min', '60 min', '4 hours'] },
    { key: 'privileged_reauth', label: 'Privileged Action Re-Auth', value: 'Required', type: 'select', options: ['Required', 'Optional'] },
  ],
  Privacy: [
    { key: 'retention_period', label: 'Audit Log Retention', value: '7 years', type: 'select', options: ['1 year', '3 years', '5 years', '7 years', 'Indefinite'] },
    { key: 'biometric_storage', label: 'Biometric Data Storage', value: 'None — hashes only', type: 'select', options: ['None — hashes only'] },
    { key: 'session_pseudonymization', label: 'Session Pseudonymization', value: 'Enabled', type: 'select', options: ['Enabled', 'Disabled'] },
    { key: 'regional_config', label: 'Regional Data Residency', value: 'India (Mumbai)', type: 'select', options: ['India (Mumbai)', 'Singapore', 'EU (Frankfurt)', 'US East'] },
  ],
};

export default function SystemConfig() {
  const [tab, setTab] = useState('Authentication');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const configs = CONFIGS[tab] || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>System Configuration</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Platform-wide settings — versioned and audit-logged on every change</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" style={{ background: saved ? 'linear-gradient(135deg,#10b981,#06b6d4)' : undefined }}>
          <Save size={16} /> {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#fbbf24' }}>
        ⚠ Critical setting changes are versioned, require audit confirmation, and may require dual-approval for global policies. Changes take effect after the next evaluation cycle.
      </div>

      {/* Config Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.25rem', flexWrap: 'wrap' }}>
        {CONFIG_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.45rem 1.1rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600,
            cursor: 'pointer', border: 'none',
            background: tab === t ? 'rgba(139,92,246,0.25)' : 'transparent',
            color: tab === t ? '#c4b5fd' : '#94a3b8'
          }}>{t}</button>
        ))}
      </div>

      {/* Config Settings */}
      <div className="glass-panel">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}>
          {configs.map(cfg => (
            <div key={cfg.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{cfg.label}</div>
                <div style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.15rem' }}>{cfg.key}</div>
              </div>
              {cfg.type === 'select' ? (
                <select defaultValue={cfg.value} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#e2e8f0', padding: '0.45rem 0.75rem', fontSize: '0.85rem', minWidth: 200 }}>
                  {cfg.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input defaultValue={cfg.value} placeholder={cfg.placeholder} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#e2e8f0', padding: '0.45rem 0.75rem', fontSize: '0.85rem', minWidth: 200, outline: 'none' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
