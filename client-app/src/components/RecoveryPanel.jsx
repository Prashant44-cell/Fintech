import React, { useState } from 'react';
import { LifeBuoy, ShieldAlert, CheckCircle, Smartphone } from 'lucide-react';

export default function RecoveryPanel() {
  const [recovered, setRecovered] = useState(false);
  const [trustedContactCode, setTrustedContactCode] = useState('');

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    if (trustedContactCode.trim()) {
      setRecovered(true);
    }
  };

  return (
    <div className="glass-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <LifeBuoy size={22} color="#06b6d4" />
        <div>
          <h3 style={{ fontSize: '1.1rem' }}>Identity Recovery & Device Loss</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Institutional trusted recovery path</p>
        </div>
      </div>

      {recovered ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '1rem',
          borderRadius: '10px',
          color: '#34d399',
          fontSize: '0.875rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', fontWeight: '600' }}>
            <CheckCircle size={18} /> Institutional Recovery Verified!
          </div>
          Your identity wallet has been re-bound to this active device. Previous stolen device session tokens were invalidated.
        </div>
      ) : (
        <form onSubmit={handleRecoverySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Enter institutional emergency backup recovery token or trusted contact approval code:
          </span>
          <input
            type="text"
            placeholder="e.g. REC-8892-IITB"
            value={trustedContactCode}
            onChange={(e) => setTrustedContactCode(e.target.value)}
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--border-color)',
              padding: '0.75rem',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-mono)'
            }}
          />
          <button type="submit" className="btn btn-secondary" style={{ width: 'fit-content' }}>
            <Smartphone size={16} /> Recover Credential Wallet
          </button>
        </form>
      )}
    </div>
  );
}
