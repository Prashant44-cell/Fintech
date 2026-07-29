import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function StepUpChallenge({ sessionId, onChallengeResolved }) {
  const [challengeType] = useState('liveness_blink');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resultMsg, setResultMsg] = useState(null);

  const handlePerformChallenge = async (simulatePass = true) => {
    setIsVerifying(true);
    setResultMsg(null);

    try {
      const res = await fetch('/api/auth/step-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId || 'SES-DEMO-001',
          challenge_type: challengeType,
          challenge_response: simulatePass ? 'SUCCESS' : 'FAILED',
          device_sig: 'DEV-ATTESTED-01'
        })
      });

      const data = await res.json();
      setResultMsg(data.message);
      if (simulatePass) {
        onChallengeResolved(true);
      } else {
        onChallengeResolved(false);
      }
    } catch (err) {
      console.error(err);
      if (simulatePass) {
        setResultMsg('Step-up verification passed. Trust score restored to 92%.');
        onChallengeResolved(true);
      } else {
        setResultMsg('Challenge failed. Session locked down.');
        onChallengeResolved(false);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="glass-panel" style={{ border: '1px solid rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <AlertTriangle size={24} color="#f59e0b" />
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#fbbf24' }}>Step-Up Verification Required</h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Trust score decayed below high confidence threshold. Complete challenge to continue session.
          </p>
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.35rem' }}>
          CHALLENGE INSTRUCTION: Blink Twice & Turn Head Slightly Right
        </div>
        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
          This active challenge verifies live human responsiveness against pre-recorded synthetic deepfakes.
        </span>
      </div>

      {resultMsg && (
        <div style={{
          padding: '0.75rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          background: resultMsg.includes('passed') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: resultMsg.includes('passed') ? '#34d399' : '#f87171'
        }}>
          {resultMsg}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={() => handlePerformChallenge(true)}
          disabled={isVerifying}
          className="btn btn-success"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <CheckCircle2 size={16} /> Complete Challenge (Pass)
        </button>
        <button
          onClick={() => handlePerformChallenge(false)}
          disabled={isVerifying}
          className="btn btn-secondary"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <XCircle size={16} /> Fail Challenge (Simulate Proxy)
        </button>
      </div>
    </div>
  );
}
