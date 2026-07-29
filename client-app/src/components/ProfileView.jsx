import React from 'react';
import { User, Building2, ShieldCheck, Key, Smartphone, Hash, CheckCircle2 } from 'lucide-react';

export default function ProfileView({ credential, userProfile }) {
  const profile = userProfile || {
    full_name: credential?.full_name || 'Aarav Sharma',
    username: credential?.username || 'aarav_sharma',
    user_id: credential?.user_id || 'stu001',
    user_key: credential?.user_key || 'USR-KEY-98F2A1B7E20948AF',
    institution: credential?.institution || 'IIT Bombay - Computer Science Dept',
    department: credential?.department || 'Computer Science & Cybersecurity',
    user_role: credential?.user_role || 'student',
    consent_hash: credential?.consent_hash || '0x948aef2049182390184bceda01239841',
    retina_vector_hash: credential?.retina_vector_hash || '0x8f3b201948aeef12093847aef',
    biometric_enabled: credential?.biometric_enabled ?? true
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-panel glow-border">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              fontWeight: '800',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
            }}>
              {profile.full_name[0]}
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>{profile.full_name}</h2>
              <span style={{ color: '#10b981', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={15} /> Active Verifiable Student Identity • @{profile.username || 'aarav_sharma'}
              </span>
            </div>
          </div>

          <div style={{
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            padding: '0.5rem 0.85rem',
            borderRadius: '12px',
            textAlign: 'right'
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>ASSIGNED UNIQUE USER KEY</span>
            <code className="mono-font" style={{ color: '#38bdf8', fontWeight: '700', fontSize: '0.85rem' }}>
              {profile.user_key}
            </code>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <User size={14} /> USER ID
            </span>
            <strong style={{ fontSize: '1rem', color: '#ffffff' }}>{profile.user_id}</strong>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <Key size={14} /> ROLE ASSIGNMENT
            </span>
            <strong style={{ fontSize: '1rem', color: '#06b6d4', textTransform: 'capitalize' }}>
              {profile.user_role}
            </strong>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <Building2 size={14} /> INSTITUTION & DEPT
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{profile.institution}</span>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <Smartphone size={14} /> TRUSTED ATTESTED DEVICE
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>DEV-MACBOOK-PRO-01</span>
          </div>
        </div>

        {/* Retina / Biometric Security Settings */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '14px', marginTop: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="#06b6d4" /> Retina Biometric Security & Credentials
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>BIOMETRIC STATUS</span>
              <strong style={{ color: profile.biometric_enabled ? '#34d399' : '#f87171' }}>
                {profile.biometric_enabled ? '✓ ENROLLED & ACTIVE' : 'DISABLED'}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>RETINA VECTOR VECTOR HASH</span>
              <code className="mono-font" style={{ color: '#a78bfa', fontSize: '0.775rem' }}>
                {profile.retina_vector_hash}
              </code>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
            <Hash size={14} /> SEPOLIA BLOCKCHAIN CONSENT PROOF
          </span>
          <code className="mono-font" style={{ color: '#06b6d4', fontSize: '0.8rem', wordBreak: 'break-all' }}>
            {profile.consent_hash}
          </code>
        </div>
      </div>
    </div>
  );
}
