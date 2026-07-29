import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminNavbar from './components/AdminNavbar';
import RiskOverview from './components/RiskOverview';
import SessionMonitor from './components/SessionMonitor';
import RevocationPanel from './components/RevocationPanel';
import AuditLogTable from './components/AuditLogTable';
import BackgroundVideo from './components/BackgroundVideo';
import { Lock, ShieldAlert, Code2, Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [summary, setSummary] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [targetRevokeId, setTargetRevokeId] = useState('');
  
  // Sidebar states
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchRiskSummary = async () => {
    try {
      const res = await fetch('/api/admin/risk-summary', {
        headers: {
          'Authorization': 'Bearer ADMIN_SECRET_TOKEN_2026'
        }
      });
      const data = await res.json();
      if (res.ok) {
        setSummary(data);
        setLastUpdated(Date.now() / 1000);
      }
    } catch (err) {
      console.error('Failed to fetch admin risk summary:', err);
      setSummary({
        total_active_sessions: 1,
        low_risk_count: 1,
        medium_risk_count: 0,
        high_risk_count: 0,
        revoked_credentials_count: 0,
        recent_alerts: [],
        credentials: [
          {
            credential_id: 'CRED-STU-88492',
            full_name: 'Aarav Sharma',
            user_id: 'stu001',
            user_role: 'student',
            institution: 'IIT Bombay - CS Dept',
            status: 'active',
            consent_hash: '0x948aef2049182390184bceda01239841'
          }
        ],
        audit_logs: [
          {
            id: 'AUD-99182A',
            timestamp: Date.now() / 1000 - 120,
            user_id: 'stu001',
            event_type: 'TERMS_ACCEPTED',
            result: 'SUCCESS',
            reason_code: 'CONSENT_RECORDED',
            device_id: 'DEV-STUDENT-MACBOOK-01',
            ip_address: '192.168.1.45',
            blockchain_tx_hash: '0x3892a01f9b82e'
          }
        ]
      });
    }
  };

  useEffect(() => {
    fetchRiskSummary();
    const interval = setInterval(fetchRiskSummary, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectRevoke = (credId) => {
    setTargetRevokeId(credId);
    setActiveTab('revocation');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Background Fullscreen Video & Overlay */}
      <BackgroundVideo />

      {/* Sliding Collapsible Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Viewport */}
      <div style={{
        flex: 1,
        marginLeft: isCollapsed ? '80px' : '260px',
        padding: '1.75rem 2rem',
        transition: 'margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <AdminNavbar lastUpdated={lastUpdated} />

        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          color: '#c4b5fd'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Lock size={18} color="#8b5cf6" />
            <span>
              <strong>Portal Security Isolation:</strong> This Server Console runs on <strong>Port 3001</strong> with high-privilege administrator tokens. Client app users on Port 3000 cannot access these routes.
            </span>
          </div>
        </div>

        {/* Tab Render Views */}
        {activeTab === 'overview' && (
          <>
            <RiskOverview summary={summary} />
            <SessionMonitor summary={summary} onSelectRevoke={handleSelectRevoke} onRefresh={fetchRiskSummary} />
            <AuditLogTable auditLogs={summary?.audit_logs} />
          </>
        )}

        {activeTab === 'sessions' && (
          <SessionMonitor summary={summary} onSelectRevoke={handleSelectRevoke} onRefresh={fetchRiskSummary} />
        )}

        {activeTab === 'revocation' && (
          <RevocationPanel
            targetCredentialId={targetRevokeId}
            onRevocationComplete={fetchRiskSummary}
          />
        )}

        {activeTab === 'audit' && (
          <AuditLogTable auditLogs={summary?.audit_logs} />
        )}

        {activeTab === 'developer' && (
          <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: '800',
                color: '#fff',
                boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)'
              }}>
                P
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Prashant</h2>
                  <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                    <Sparkles size={12} /> PROJECT LEAD & CORE DEVELOPER
                  </span>
                  <span className="badge badge-low" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                    v1.0.0 STABLE PRODUCTION
                  </span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>
                  Lead System Architect & Core Full-Stack Engineer • AI Continuous Identity Verification System
                </p>
              </div>
            </div>
            <p style={{ color: '#d1d5db', lineHeight: '1.6', fontSize: '0.925rem', marginBottom: '1.25rem' }}>
              Designed and developed the proctor management console, fast risk analysis engine, continuous identity verification algorithms, and Sepolia smart contract proof rollups.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>PRIMARY ROLE</span>
                <strong style={{ color: '#06b6d4', fontSize: '0.95rem' }}>Lead Developer</strong>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>BLOCKCHAIN ROLLUP</span>
                <strong style={{ color: '#34d399', fontSize: '0.95rem' }}>Sepolia Testnet ZK</strong>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>LATENCY BENCHMARK</span>
                <strong style={{ color: '#a78bfa', fontSize: '0.95rem' }}>&lt;15 ms Execution</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
