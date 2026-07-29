import React from 'react';
import { Users, ShieldCheck, AlertTriangle, AlertOctagon, UserX } from 'lucide-react';

export default function RiskOverview({ summary }) {
  const activeSessions = summary?.total_active_sessions ?? 1;
  const lowRisk = summary?.low_risk_count ?? 1;
  const medRisk = summary?.medium_risk_count ?? 0;
  const highRisk = summary?.high_risk_count ?? 0;
  const revokedCount = summary?.revoked_credentials_count ?? 0;

  return (
    <div className="metrics-grid">
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '12px', color: '#06b6d4' }}>
          <Users size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>ACTIVE LIVE SESSIONS</span>
          <strong style={{ fontSize: '1.6rem', color: '#ffffff' }}>{activeSessions}</strong>
        </div>
      </div>

      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', color: '#10b981' }}>
          <ShieldCheck size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>TRUSTED (LOW RISK)</span>
          <strong style={{ fontSize: '1.6rem', color: '#34d399' }}>{lowRisk}</strong>
        </div>
      </div>

      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '12px', color: '#f59e0b' }}>
          <AlertTriangle size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>STEP-UP PENDING</span>
          <strong style={{ fontSize: '1.6rem', color: '#fbbf24' }}>{medRisk}</strong>
        </div>
      </div>

      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '12px', color: '#ef4444' }}>
          <UserX size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>REVOKED CREDENTIALS</span>
          <strong style={{ fontSize: '1.6rem', color: '#f87171' }}>{revokedCount}</strong>
        </div>
      </div>
    </div>
  );
}
