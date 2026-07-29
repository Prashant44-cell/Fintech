import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import TermsModal from './components/TermsModal';
import WalletCard from './components/WalletCard';
import TrustScoreBadge from './components/TrustScoreBadge';
import LivenessCheck from './components/LivenessCheck';
import StepUpChallenge from './components/StepUpChallenge';
import RecoveryPanel from './components/RecoveryPanel';
import ProfileView from './components/ProfileView';
import BackgroundVideo from './components/BackgroundVideo';
import { ShieldCheck, Lock, AlertOctagon } from 'lucide-react';

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
      <div style={{
        flex: 1,
        marginLeft: isAuthenticated ? (isCollapsed ? '80px' : '260px') : '0px',
        padding: '1.75rem 2rem',
        transition: 'margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Top Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '1.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              padding: '0.65rem',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(59,130,246,0.2) 100%)',
              borderRadius: '14px',
              border: '1px solid rgba(6,182,212,0.4)'
            }}>
              <ShieldCheck size={28} color="#06b6d4" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                {activeTab === 'dashboard' && 'Dashboard & Continuous Trust Scoring'}
                {activeTab === 'retina' && 'Live WebCam Retina & Iris Scan'}
                {activeTab === 'wallet' && 'Sepolia Identity Wallet & Proofs'}
                {activeTab === 'profile' && 'User Profile & Credential Claims'}
                {activeTab === 'settings' && 'Privacy Controls & Settings'}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                Client Student Portal • Port 3000 • Sepolia Testnet Zero-Knowledge Identity
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-low" style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>
              <Lock size={12} /> PORTAL ISOLATION ACTIVE
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

        {/* Tab Render Views */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="dashboard-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <WalletCard credential={credential} consentHash={consentData?.consent_hash} isRevoked={isRevoked} />
                <TrustScoreBadge trustResult={trustResult} isConnected={isConnected} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <LivenessCheck onSignalUpdate={handleSignalUpdate} sessionStatus={trustResult} />
                {trustResult?.risk_level === 'medium' && (
                  <StepUpChallenge sessionId={sessionId} onChallengeResolved={handleStepUpResolved} />
                )}
                <RecoveryPanel />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'retina' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <LivenessCheck onSignalUpdate={handleSignalUpdate} sessionStatus={trustResult} />
          </div>
        )}

        {activeTab === 'wallet' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <WalletCard credential={credential} consentHash={consentData?.consent_hash} isRevoked={isRevoked} />
            <RecoveryPanel />
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ProfileView credential={credential} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Biometric Privacy & Revocation Controls</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                You have active consent recorded for Zero Raw Biometric Storage on Sepolia Testnet.
              </p>
              <button onClick={handleLogout} className="btn btn-warning">
                Revoke Consent & Terminate Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
