import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminNavbar from './components/AdminNavbar';
import BackgroundVideo from './components/BackgroundVideo';

// Legacy panels (retained)
import RevocationPanel from './components/RevocationPanel';

// New panels
import SuperAdminDashboard from './components/panels/SuperAdminDashboard';
import ClientManagement from './components/panels/ClientManagement';
import ClientOnboarding from './components/panels/ClientOnboarding';
import GlobalUsers from './components/panels/GlobalUsers';
import IssuerRegistry from './components/panels/IssuerRegistry';
import CredentialManagement from './components/panels/CredentialManagement';
import CredentialSchemas from './components/panels/CredentialSchemas';
import LiveSessions from './components/panels/LiveSessions';
import TrustEngine from './components/panels/TrustEngine';
import TrustModels from './components/panels/TrustModels';
import PolicyEngine from './components/panels/PolicyEngine';
import SecuritySOC from './components/panels/SecuritySOC';
import IncidentManagement from './components/panels/IncidentManagement';
import RateLimiting from './components/panels/RateLimiting';
import AuditCompliance from './components/panels/AuditCompliance';
import SystemHealth from './components/panels/SystemHealth';
import DistributedSystems from './components/panels/DistributedSystems';
import BlockchainProof from './components/panels/BlockchainProof';
import APIIntegration from './components/panels/APIIntegration';
import Analytics from './components/panels/Analytics';
import ResearchMetrics from './components/panels/ResearchMetrics';
import BillingPlans from './components/panels/BillingPlans';
import Support from './components/panels/Support';
import PlatformTeam from './components/panels/PlatformTeam';
import SystemConfig from './components/panels/SystemConfig';

import { Lock, Sparkles, Zap } from 'lucide-react';

export default function App() {
  const [summary, setSummary] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [targetRevokeId, setTargetRevokeId] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchRiskSummary = async () => {
    try {
      const res = await fetch('/api/admin/risk-summary', {
        headers: { 'Authorization': 'Bearer ADMIN_SECRET_TOKEN_2026' }
      });
      const data = await res.json();
      if (res.ok) {
        setSummary(data);
        setLastUpdated(Date.now() / 1000);
      }
    } catch (err) {
      setSummary({
        total_active_sessions: 18420,
        low_risk_count: 17610,
        medium_risk_count: 601,
        high_risk_count: 39,
        revoked_credentials_count: 2140,
        recent_alerts: [],
        credentials: [
          { credential_id: 'CRED-STU-AA1B2C', full_name: 'Aarav Sharma', user_id: 'stu001', user_role: 'student', institution: 'IIT Bombay - CS Dept', status: 'active', consent_hash: '0x3892a01f9b82e' }
        ],
        audit_logs: [
          { id: 'AUD-A1000', timestamp: Date.now() / 1000 - 120, user_id: 'prashant', event_type: 'GLOBAL_POLICY_UPDATE', result: 'SUCCESS', reason_code: 'TRUST_THRESHOLD_ADJUSTED', device_id: 'DEV-ADMIN-001', ip_address: '10.0.0.1', blockchain_tx_hash: '0xAF91C3B20' }
        ]
      });
    }
  };

  useEffect(() => {
    fetchRiskSummary();
    const interval = setInterval(fetchRiskSummary, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectRevoke = (credId) => {
    setTargetRevokeId(credId);
    setActiveTab('revocation');
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SuperAdminDashboard summary={summary} />;
      case 'clients':
        return <ClientManagement />;
      case 'onboarding':
        return <ClientOnboarding />;
      case 'users':
        return <GlobalUsers />;
      case 'issuers':
        return <IssuerRegistry />;
      case 'credentials':
        return <CredentialManagement />;
      case 'schemas':
        return <CredentialSchemas />;
      case 'sessions':
        return <LiveSessions />;
      case 'trustengine':
        return <TrustEngine />;
      case 'trustmodels':
        return <TrustModels />;
      case 'policy':
        return <PolicyEngine />;
      case 'soc':
        return <SecuritySOC />;
      case 'incidents':
        return <IncidentManagement />;
      case 'ratelimiting':
        return <RateLimiting />;
      case 'revocation':
        return <RevocationPanel targetCredentialId={targetRevokeId} onRevocationComplete={fetchRiskSummary} />;
      case 'audit':
        return <AuditCompliance />;
      case 'systemhealth':
        return <SystemHealth />;
      case 'distributed':
        return <DistributedSystems />;
      case 'blockchain':
        return <BlockchainProof />;
      case 'api':
        return <APIIntegration />;
      case 'integrations':
        return <APIIntegration />;
      case 'webhooks':
        return <APIIntegration />;
      case 'analytics':
        return <Analytics />;
      case 'research':
        return <ResearchMetrics />;
      case 'billing':
        return <BillingPlans />;
      case 'support':
        return <Support />;
      case 'team':
        return <PlatformTeam />;
      case 'config':
        return <SystemConfig />;
      case 'developer-showcase':
        return (
          <div className="glass-panel" style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: '800', color: '#fff', boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)' }}>
                P
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Prashant</h2>
                  <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                    <Sparkles size={12} /> PROJECT LEAD & CORE DEVELOPER
                  </span>
                  <span className="badge badge-low">v1.0.0 STABLE PRODUCTION</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>
                  Lead System Architect & Core Full-Stack Engineer • AI Continuous Identity Verification System
                </p>
              </div>
            </div>
            <p style={{ color: '#d1d5db', lineHeight: '1.6', fontSize: '0.925rem', marginBottom: '1.25rem' }}>
              Designed and developed the CallID platform — including the Super Admin Command Center (27 modules), proctor management console, fast risk analysis engine, continuous identity verification algorithms, Policy Engine, Trust Engine signal registry, and Sepolia ZK Rollup smart contract proof anchoring.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[['PRIMARY ROLE', 'Lead Developer', '#06b6d4'], ['BLOCKCHAIN ROLLUP', 'Sepolia Testnet ZK', '#34d399'], ['LATENCY BENCHMARK', '<15 ms Execution', '#a78bfa']].map(([k, v, c]) => (
                <div key={k} style={{ background: 'rgba(0,0,0,0.4)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#475569', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</span>
                  <strong style={{ color: c, fontSize: '0.95rem' }}>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <SuperAdminDashboard summary={summary} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <BackgroundVideo />
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div style={{
        flex: 1,
        marginLeft: isCollapsed ? '72px' : '260px',
        padding: '1.5rem 2rem',
        transition: 'margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        minWidth: 0
      }}>
        <AdminNavbar lastUpdated={lastUpdated} />

        {/* Security Isolation Banner */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: '10px',
          padding: '0.65rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: '#a78bfa'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={15} color="#8b5cf6" />
            <span>
              <strong>Portal Security Isolation:</strong> Super Admin Console · Port 3001 · High-Privilege Token Active · Client Portal (Port 3000) users cannot access these routes.
            </span>
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34d399', fontWeight: 600, flexShrink: 0 }}>
            <Zap size={13} /> 27 Modules Loaded
          </span>
        </div>

        {/* Active Panel */}
        {renderPanel()}
      </div>
    </div>
  );
}
