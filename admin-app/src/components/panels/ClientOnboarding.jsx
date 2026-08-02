import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Organization', desc: 'Basic institution details' },
  { id: 2, label: 'Administrator', desc: 'Primary admin account' },
  { id: 3, label: 'Identity Config', desc: 'Credentials & roles' },
  { id: 4, label: 'Security Policy', desc: 'Trust & session rules' },
  { id: 5, label: 'Integration', desc: 'API, SSO, LMS' },
  { id: 6, label: 'Review & Create', desc: 'Confirm & generate ID' },
];

function StepIndicator({ currentStep, setStep }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '2rem' }}>
      {STEPS.map((step, i) => {
        const done = currentStep > step.id;
        const active = currentStep === step.id;
        return (
          <React.Fragment key={step.id}>
            <div
              onClick={() => step.id < currentStep && setStep(step.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: step.id < currentStep ? 'pointer' : 'default', minWidth: 80 }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? '#10b981' : active ? 'linear-gradient(135deg,#8b5cf6,#06b6d4)' : 'rgba(255,255,255,0.06)',
                border: done ? 'none' : active ? 'none' : '1px solid rgba(255,255,255,0.15)',
                fontSize: '0.85rem', fontWeight: 700, color: '#fff',
                boxShadow: active ? '0 0 20px rgba(139,92,246,0.5)' : 'none'
              }}>
                {done ? <CheckCircle2 size={16} /> : step.id}
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: active ? 700 : 500, color: active ? '#c4b5fd' : done ? '#34d399' : '#64748b', marginTop: '0.4rem', textAlign: 'center', lineHeight: 1.2 }}>
                {step.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? '#10b981' : 'rgba(255,255,255,0.08)', marginBottom: '1rem' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Field({ label, type = 'text', placeholder, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {type === 'select' ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={{
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
          color: '#e2e8f0', padding: '0.6rem 0.85rem', fontSize: '0.9rem'
        }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
          color: '#e2e8f0', padding: '0.6rem 0.85rem', fontSize: '0.9rem', outline: 'none'
        }} />
      )}
    </div>
  );
}

export default function ClientOnboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    orgName: '', orgType: 'University', domain: '', country: 'India', timezone: 'Asia/Kolkata',
    adminName: '', adminEmail: '', adminRole: 'Institution Admin', authSetup: 'MFA + Passkey',
    credTypes: ['Student Identity', 'Exam Eligibility'], roles: ['Student', 'Faculty', 'Proctor'], depts: '',
    minTrust: '80', sessionDuration: '8 hours', stepUpRule: 'Trust < 60 on exam access', recoveryPolicy: 'Email OTP + Admin',
    apiEnabled: true, ssoEnabled: false, lmsEnabled: true, sisEnabled: false, attendanceEnabled: true,
  });
  const [created, setCreated] = useState(null);

  const f = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleCreate = () => {
    const tenantId = 'TENANT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setCreated({ tenantId, ...form });
  };

  if (created) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 600, margin: '0 auto' }}>
      <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 0 30px rgba(16,185,129,0.5)' }}>
          <CheckCircle2 size={40} color="#fff" />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Institution Created!</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{created.orgName} has been onboarded to the CallID platform.</p>
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 12, padding: '1rem', border: '1px solid rgba(16,185,129,0.3)', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unique Tenant ID</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399', fontFamily: 'monospace', marginTop: '0.25rem' }}>{created.tenantId}</div>
        </div>
        <button className="btn btn-primary" onClick={() => { setCreated(null); setStep(1); }}>Onboard Another Institution</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Client Onboarding</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Multi-tenant institution setup wizard</p>
      </div>

      <div className="glass-panel">
        <StepIndicator currentStep={step} setStep={setStep} />

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 600 }}>
            <Field label="Institution Name" placeholder="e.g. IIT Bombay" value={form.orgName} onChange={f('orgName')} />
            <Field label="Type" type="select" value={form.orgType} onChange={f('orgType')} options={['University', 'College', 'School', 'Exam Authority', 'Enterprise']} />
            <Field label="Domain" placeholder="iitb.ac.in" value={form.domain} onChange={f('domain')} />
            <Field label="Country" type="select" value={form.country} onChange={f('country')} options={['India', 'USA', 'UK', 'Singapore', 'UAE']} />
            <Field label="Timezone" type="select" value={form.timezone} onChange={f('timezone')} options={['Asia/Kolkata', 'UTC', 'America/New_York', 'Europe/London']} />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 600 }}>
            <Field label="Admin Name" placeholder="Dr. Arun Kumar" value={form.adminName} onChange={f('adminName')} />
            <Field label="Admin Email" type="email" placeholder="admin@institution.edu" value={form.adminEmail} onChange={f('adminEmail')} />
            <Field label="Role" type="select" value={form.adminRole} onChange={f('adminRole')} options={['Institution Admin', 'Security Officer', 'Credential Issuer', 'Proctor']} />
            <Field label="Auth Setup" type="select" value={form.authSetup} onChange={f('authSetup')} options={['MFA + Passkey', 'TOTP', 'Email OTP', 'SSO + MFA']} />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 600 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Credential Types</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Student Identity', 'Exam Eligibility', 'Faculty ID', 'Admin Credential', 'Guest Pass'].map(ct => (
                  <button key={ct} onClick={() => f('credTypes')(form.credTypes.includes(ct) ? form.credTypes.filter(x => x !== ct) : [...form.credTypes, ct])}
                    style={{ padding: '0.35rem 0.75rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: form.credTypes.includes(ct) ? 'rgba(139,92,246,0.2)' : 'transparent', color: form.credTypes.includes(ct) ? '#c4b5fd' : '#64748b', borderColor: form.credTypes.includes(ct) ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)' }}>
                    {ct}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>User Roles</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Student', 'Faculty', 'Proctor', 'Admin', 'Guest'].map(r => (
                  <button key={r} onClick={() => f('roles')(form.roles.includes(r) ? form.roles.filter(x => x !== r) : [...form.roles, r])}
                    style={{ padding: '0.35rem 0.75rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: form.roles.includes(r) ? 'rgba(6,182,212,0.15)' : 'transparent', color: form.roles.includes(r) ? '#22d3ee' : '#64748b', borderColor: form.roles.includes(r) ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.1)' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Departments (comma-separated)" placeholder="CS, EE, Mech, MBA" value={form.depts} onChange={f('depts')} />
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 600 }}>
            <Field label="Minimum Trust Score" type="select" value={form.minTrust} onChange={f('minTrust')} options={['60', '70', '80', '90', '100']} />
            <Field label="Session Duration" type="select" value={form.sessionDuration} onChange={f('sessionDuration')} options={['2 hours', '4 hours', '8 hours', '24 hours']} />
            <Field label="Step-Up Rule" placeholder="Trust < 60 on exam_access" value={form.stepUpRule} onChange={f('stepUpRule')} />
            <Field label="Recovery Policy" type="select" value={form.recoveryPolicy} onChange={f('recoveryPolicy')} options={['Email OTP + Admin', 'Admin Only', 'SMS OTP', 'Biometric Reset']} />
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 600 }}>
            {[['API Integration', 'apiEnabled'], ['SSO (SAML / OIDC)', 'ssoEnabled'], ['LMS (Moodle / Canvas)', 'lmsEnabled'], ['SIS', 'sisEnabled'], ['Attendance System', 'attendanceEnabled']].map(([label, key]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '0.85rem 1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>{label}</span>
                <button onClick={() => f(key)(!form[key])} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', background: form[key] ? 'linear-gradient(90deg,#10b981,#06b6d4)' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'all 0.2s' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: form[key] ? 23 : 3, transition: 'left 0.2s' }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <div style={{ maxWidth: 580 }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>Review Institution Setup</h3>
              {[
                ['Institution', form.orgName || '—'],
                ['Type', form.orgType], ['Domain', form.domain || '—'], ['Country', form.country],
                ['Admin', form.adminName || '—'], ['Auth', form.authSetup],
                ['Credential Types', form.credTypes.join(', ')],
                ['Min Trust', `${form.minTrust}%`], ['Session', form.sessionDuration],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>{k}</span>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button className="btn btn-secondary" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}>← Back</button>
          {step < 6
            ? <button className="btn btn-primary" onClick={() => setStep(s => Math.min(6, s + 1))}>Continue <ChevronRight size={16} /></button>
            : <button className="btn btn-primary" onClick={handleCreate} style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)' }}>✓ Create Institution</button>
          }
        </div>
      </div>
    </div>
  );
}
