import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import TermsModal from './components/TermsModal';
import BackgroundVideo from './components/BackgroundVideo';

// Panels
import ClientDashboard from './components/panels/ClientDashboard';
import UsersPanel from './components/panels/UsersPanel';
import CredentialsPanel from './components/panels/CredentialsPanel';
import LiveSessionsPanel from './components/panels/LiveSessionsPanel';
import TrustDetail from './components/panels/TrustDetail';
import AttendancePanel from './components/panels/AttendancePanel';
import ExamSecurity from './components/panels/ExamSecurity';
import AccessControl from './components/panels/AccessControl';
import RiskAlerts from './components/panels/RiskAlerts';
import AuditLogs from './components/panels/AuditLogs';
import RecoveryRevocation from './components/panels/RecoveryRevocation';
import AnalyticsPanel from './components/panels/AnalyticsPanel';
import IntegrationsPanel from './components/panels/IntegrationsPanel';
import SecuritySettings from './components/panels/SecuritySettings';
import InstitutionSettings from './components/panels/InstitutionSettings';

// Legacy components retained for direct access if needed
import WalletCard from './components/WalletCard';
import TrustScoreBadge from './components/TrustScoreBadge';
import LivenessCheck from './components/LivenessCheck';
import StepUpChallenge from './components/StepUpChallenge';
import ProfileView from './components/ProfileView';

import { ShieldCheck, Lock, AlertOctagon, Sparkles } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [consentData, setConsentData] = useState(null);
  const [credential, setCredential] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [trustResult, setTrustResult] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isRevoked, setIsRevoked] = useState(false);
  
  // Sidebar state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSessionForTrust, setSelectedSessionForTrust] = useState(null);

  const wsRef = useRef(null);

  const handleAuthSuccess = (data) => {
    setAuthData(data);
    setIsAuthenticated(true);
    setCredential(data.credential);
    initializeSession(data.id_token);
  };

  const initializeSession = async (token) => {
    try {
      const res = await fetch('/api/auth/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : undefined
        },
        body: JSON.stringify({
          user_id: credential?.user_id || 'stu001',
          device_id: 'DEV-STUDENT-MACBOOK-01',
          ip_address: '192.168.1.45',
          user_agent: navigator.userAgent
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSessionId(data.session_id);
        connectWebSocket(data.session_id);
      }
    } catch (err) {
      console.error('Session start error:', err);
      const mockSession = 'SES-STU-882940';
      setSessionId(mockSession);
    }
  };

  const connectWebSocket = (sesId) => {
    const wsUrl = `ws://${window.location.hostname}:8000/ws/trust/${sesId}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      setTrustResult(result);
      if (result.recommended_action === 'revoke') {
        setIsRevoked(true);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    wsRef.current = ws;
  };

  const handleTermsAccepted = (data) => {
    setConsentData(data);
    setTermsAccepted(true);
  };

  const handleSignalUpdate = (signals) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(signals));
    }
  };

  const handleStepUpResolved = (passed) => {
    if (passed) {
      setTrustResult((prev) => ({
        ...prev,
        trust_score: 92.0,
        risk_level: 'low',
        reasons: ['STEP_UP_CHALLENGE_PASSED', 'HIGH_LIVENESS_CONFIRMED']
      }));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setTermsAccepted(false);
    setCredential(null);
    if (wsRef.current) wsRef.current.close();
  };

  const handleViewTrustDetail = (session) => {
    setSelectedSessionForTrust(session);
    setActiveTab('trust');
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ClientDashboard trustResult={trustResult} sessionId={sessionId} credential={credential} />;
      case 'users':
        return <UsersPanel />;
      case 'credentials':
        return <CredentialsPanel />;
      case 'sessions':
        return <LiveSessionsPanel onViewTrust={handleViewTrustDetail} />;
      case 'trust':
        return <TrustDetail session={selectedSessionForTrust} />;
      case 'attendance':
        return <AttendancePanel />;
      case 'exam':
        return <ExamSecurity />;
      case 'access':
        return <AccessControl />;
      case 'alerts':
        return <RiskAlerts />;
      case 'audit':
        return <AuditLogs />;
      case 'recovery':
        return <RecoveryRevocation />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'integrations':
        return <IntegrationsPanel />;
      case 'security-settings':
        return <SecuritySettings />;
      case 'institution':
        return <InstitutionSettings />;
      default:
        return <ClientDashboard trustResult={trustResult} sessionId={sessionId} credential={credential} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Background Fullscreen Video & Overlay */}
      <BackgroundVideo />

      {/* Web3 Signup / Login Modal */}
      {!isAuthenticated && <AuthModal onAuthSuccess={handleAuthSuccess} />}

      {/* Onboarding Terms & Privacy Modal */}
      {isAuthenticated && !termsAccepted && (
        <TermsModal onAccept={handleTermsAccepted} />
      )}

      {/* Sliding Collapsible Sidebar */}
      {isAuthenticated && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onLogout={handleLogout}
          userProfile={credential}
        />
      )}

      {/* Main Content Viewport */}
      {isAuthenticated && (
        <div style={{
          flex: 1,
          marginLeft: isCollapsed ? '72px' : '252px',
          padding: '1.5rem 2rem',
          transition: 'margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Top Header */}
          <header style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                padding: '0.55rem',
                background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(59,130,246,0.2) 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(6,182,212,0.4)'
              }}>
                <ShieldCheck size={24} color="#06b6d4" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                  NMIT Bangalore Identity Portal
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>
                  CallID Institutional Platform • Port 3000 • Continuous Identity Assurance
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem', borderRadius: 9999, background: 'rgba(6,182,212,0.1)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Lock size={12} /> CLIENT INSTITUTION ISOLATED
              </span>
            </div>
          </header>

          {/* Revocation Alert */}
          {isRevoked && (
            <div className="glass-panel" style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <AlertOctagon size={32} color="#ef4444" />
              <div>
                <h3 style={{ color: '#f87171', fontSize: '1.1rem' }}>CREDENTIAL REVOKED BY INSTITUTION ADMIN</h3>
                <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}>
                  Your session has been restricted due to administrative revocation on Sepolia Blockchain.
                </p>
              </div>
            </div>
          )}

          {/* Render Active Panel */}
          {renderPanel()}
        </div>
      )}
    </div>
  );
}
