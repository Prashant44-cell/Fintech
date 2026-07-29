import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsModal({ onAccept }) {
  const [biometricConsent, setBiometricConsent] = useState(false);
  const [monitoringConsent, setMonitoringConsent] = useState(false);
  const [revocationConsent, setRevocationConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const allChecked = biometricConsent && monitoringConsent && revocationConsent;

  const handleSubmit = async () => {
    if (!allChecked) {
      setErrorMsg('You must check all terms and consent boxes to proceed.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/terms/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'stu001',
          user_role: 'student',
          accepted_version: 'v1.0',
          biometric_consent: biometricConsent,
          continuous_monitoring_consent: monitoringConsent,
          revocation_terms_consent: revocationConsent
        })
      });

      const data = await res.json();
      if (res.ok) {
        onAccept(data);
      } else {
        setErrorMsg(data.detail || 'Failed to record terms acceptance');
      }
    } catch (err) {
      console.error(err);
      // Fallback for standalone preview
      onAccept({
        status: 'success',
        user_id: 'stu001',
        consent_hash: '0x948aef2049182390184bceda01239841'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            padding: '1rem',
            background: 'rgba(6, 182, 212, 0.1)',
            borderRadius: '50%',
            marginBottom: '1rem',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}>
            <ShieldCheck size={42} color="#06b6d4" />
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>Terms of Service & Biometric Consent</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Continuous Human Identity Verification System Protocol (v1.0)
          </p>
        </div>

        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid var(--border-color)',
          maxHeight: '260px',
          overflowY: 'auto',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.6'
        }}>
          <h4 style={{ color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Lock size={16} /> 1. Biometric Data Privacy & Local Edge Extraction
          </h4>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            Raw biometric images, audio clips, or facial feature arrays are processed locally on your edge device.
            <strong> NO raw facial or voice data is ever transmitted or stored on backend servers or blockchain networks.</strong> Only mathematical hashes, issuer signatures, and zero-knowledge evidence tokens are used.
          </p>

          <h4 style={{ color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Eye size={16} /> 2. Continuous Session Verification & Trust Scoring
          </h4>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            During active exam or attendance sessions, lightweight signals (liveness, interaction rhythm, device signature) are periodically verified to compute a real-time trust score. If a score decays, step-up verification will be requested.
          </p>

          <h4 style={{ color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <AlertTriangle size={16} /> 3. Institutional Revocation & Device Loss Policy
          </h4>
          <p style={{ color: '#d1d5db' }}>
            Institutions reserve the right to revoke identity credentials if proxy attendance, deepfake impersonation, or stolen devices are detected. Trusted recovery paths are available for legitimate device recovery.
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1.25rem',
            fontSize: '0.85rem'
          }}>
            {errorMsg}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input
              type="checkbox"
              checked={biometricConsent}
              onChange={(e) => setBiometricConsent(e.target.checked)}
              style={{ marginTop: '0.2rem', width: '18px', height: '18px', accentColor: '#06b6d4' }}
            />
            <span>
              I accept the <strong>Zero Raw Biometric Storage policy</strong> and agree to local edge feature extraction.
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input
              type="checkbox"
              checked={monitoringConsent}
              onChange={(e) => setMonitoringConsent(e.target.checked)}
              style={{ marginTop: '0.2rem', width: '18px', height: '18px', accentColor: '#06b6d4' }}
            />
            <span>
              I authorize <strong>Continuous Human Trust Scoring</strong> & step-up verification during active sessions.
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input
              type="checkbox"
              checked={revocationConsent}
              onChange={(e) => setRevocationConsent(e.target.checked)}
              style={{ marginTop: '0.2rem', width: '18px', height: '18px', accentColor: '#06b6d4' }}
            />
            <span>
              I acknowledge the <strong>Institutional Revocation & Audit Log</strong> guidelines.
            </span>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allChecked || isSubmitting}
          className="btn btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            opacity: allChecked ? 1 : 0.5,
            cursor: allChecked ? 'pointer' : 'not-allowed'
          }}
        >
          <CheckCircle2 size={18} />
          {isSubmitting ? 'Recording Consent...' : 'Accept Terms & Sign Credential Wallet'}
        </button>
      </div>
    </div>
  );
}
