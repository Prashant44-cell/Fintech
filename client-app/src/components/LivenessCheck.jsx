import React, { useState, useEffect, useRef } from 'react';
import { Camera, Eye, RefreshCw, ShieldAlert, VideoOff, CheckCircle2 } from 'lucide-react';

export default function LivenessCheck({ onSignalUpdate, sessionStatus }) {
  const [livenessScore, setLivenessScore] = useState(0.95);
  const [behaviorScore, setBehaviorScore] = useState(0.90);
  const [deviceScore, setDeviceScore] = useState(1.0);
  const [contextScore, setContextScore] = useState(0.95);
  const [simulatedAttack, setSimulatedAttack] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt to access user webcam for Retina & Liveness Verification
    async function setupWebcam() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: 'user' }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setHasCameraPermission(true);
        } else {
          setCameraError('WebCam API not supported in this browser mode.');
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable:', err);
        setCameraError('Webcam access fallback mode active.');
      }
    }

    setupWebcam();

    return () => {
      // Cleanup camera stream on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    onSignalUpdate({
      liveness_sig: livenessScore,
      behavior_sig: behaviorScore,
      device_sig: deviceScore,
      context_sig: contextScore
    });
  }, [livenessScore, behaviorScore, deviceScore, contextScore]);

  const handleSimulateDeepfake = () => {
    setSimulatedAttack(true);
    setLivenessScore(0.25);
    setBehaviorScore(0.30);
  };

  const handleResetNormal = () => {
    setSimulatedAttack(false);
    setLivenessScore(0.95);
    setBehaviorScore(0.90);
    setDeviceScore(1.0);
    setContextScore(0.95);
  };

  return (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Camera size={18} color="#06b6d4" /> Live WebCam Retina & Iris Scan Engine
        </h3>
        <span style={{
          fontSize: '0.75rem',
          color: hasCameraPermission ? '#10b981' : '#f59e0b',
          background: hasCameraPermission ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
          padding: '0.2rem 0.65rem',
          borderRadius: '12px',
          border: `1px solid ${hasCameraPermission ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`
        }}>
          {hasCameraPermission ? 'Live Camera Feed Active' : 'Edge Reticle Active'}
        </span>
      </div>

      {/* WebCam / Retina Reticle Viewport */}
      <div style={{
        position: 'relative',
        height: '240px',
        background: '#040711',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${simulatedAttack ? '#ef4444' : 'rgba(6, 182, 212, 0.4)'}`,
        boxShadow: simulatedAttack ? '0 0 25px rgba(239, 68, 68, 0.5)' : '0 0 20px rgba(6, 182, 212, 0.25)',
        marginBottom: '1.25rem'
      }}>
        {/* Real Video Feed Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: hasCameraPermission ? 'block' : 'none',
            transform: 'scaleX(-1)' // Mirror view
          }}
        />

        {/* Fallback Graphics if Camera unavailable */}
        {!hasCameraPermission && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Eye size={56} color={simulatedAttack ? '#ef4444' : '#06b6d4'} style={{ opacity: 0.85 }} />
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#ffffff', fontWeight: '700' }}>
              RETINA & IRIS TARGETING ENGINE
            </div>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {cameraError || 'Align eyes with central crosshairs'}
            </span>
          </div>
        )}

        {/* Laser Reticle & Target Scanning Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Outer Target Circle */}
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: `2px dashed ${simulatedAttack ? '#ef4444' : '#06b6d4'}`,
            animation: 'spin 12s linear infinite',
            opacity: 0.85
          }}></div>

          {/* Inner Retina Crosshair */}
          <div style={{
            position: 'absolute',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: `2px solid ${simulatedAttack ? '#ef4444' : '#10b981'}`,
            boxShadow: `0 0 15px ${simulatedAttack ? '#ef4444' : '#10b981'}`
          }}></div>

          {/* Scanning Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: simulatedAttack ? '#ef4444' : '#06b6d4',
            boxShadow: `0 0 10px ${simulatedAttack ? '#ef4444' : '#06b6d4'}`,
            animation: 'retinaScan 2.5s ease-in-out infinite'
          }}></div>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes retinaScan {
            0% { top: 5%; }
            50% { top: 92%; }
            100% { top: 5%; }
          }
        `}</style>

        {/* Status Tag Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          padding: '0.4rem 0.75rem',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem'
        }}>
          <span style={{ color: simulatedAttack ? '#ef4444' : '#34d399', fontWeight: '700' }}>
            {simulatedAttack ? '⚠️ ATTACK: SYNTHETIC DEEPFAKE DETECTED' : '✓ RETINA & PUPIL REFLEX VERIFIED'}
          </span>
          <span className="mono-font" style={{ color: 'var(--text-muted)' }}>
            FPS: 60 | ZERO-RAW-STORAGE
          </span>
        </div>
      </div>

      {/* Signal Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
            <span>Retina & Liveness Signal</span>
            <span className="mono-font" style={{ color: livenessScore < 0.6 ? '#ef4444' : '#10b981' }}>
              {(livenessScore * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={livenessScore}
            onChange={(e) => setLivenessScore(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#06b6d4' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
            <span>Behavioral Rhythm Signal</span>
            <span className="mono-font" style={{ color: behaviorScore < 0.6 ? '#ef4444' : '#10b981' }}>
              {(behaviorScore * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={behaviorScore}
            onChange={(e) => setBehaviorScore(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#06b6d4' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={handleSimulateDeepfake}
          className="btn btn-warning"
          style={{ flex: 1, fontSize: '0.825rem', padding: '0.6rem' }}
        >
          <ShieldAlert size={15} /> Simulate Deepfake Attack
        </button>
        <button
          onClick={handleResetNormal}
          className="btn btn-secondary"
          style={{ flex: 1, fontSize: '0.825rem', padding: '0.6rem' }}
        >
          <RefreshCw size={15} /> Reset Normal Signal
        </button>
      </div>
    </div>
  );
}
