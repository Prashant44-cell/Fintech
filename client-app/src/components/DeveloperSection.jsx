import React from 'react';
import { Code2, Award, Terminal, Cpu, Shield, ExternalLink, Github, Sparkles } from 'lucide-react';

export default function DeveloperSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Lead Developer Spotlight Card */}
      <div className="glass-panel glow-border" style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 27, 75, 0.8) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)',
            fontSize: '1.75rem',
            fontWeight: '800',
            color: '#ffffff'
          }}>
            P
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>Prashant</h2>
              <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                <Sparkles size={12} /> PROJECT LEAD & CORE DEVELOPER
              </span>
              <span className="badge badge-low" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                v1.0.0 STABLE PRODUCTION
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Architect & Full-Stack Engineer • AI Continuous Identity Verification System
            </p>
          </div>
        </div>

        <p style={{ color: '#d1d5db', fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
          Designed and developed the AI-resistant continuous human identity verification platform featuring sub-50ms continuous trust scoring, edge retina liveness scanning, zero-knowledge Sepolia proof rollups, and strict portal isolation.
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

      {/* System Technical Specifications */}
      <div className="glass-panel">
        <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Terminal size={18} color="#06b6d4" /> Engineering & System Architecture Specs
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '10px' }}>
            <span style={{ color: '#06b6d4', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
              BACKEND ENGINE (Python FastAPI)
            </span>
            <p style={{ color: 'var(--text-muted)' }}>
              Asynchronous FastAPI server running WebSockets (`/ws/trust/{session_id}`), in-memory sliding-window trust decay calculator, PyTorch/ONNX inference simulator, and JWT role verification.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '10px' }}>
            <span style={{ color: '#34d399', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
              FRONTEND PORTALS (React + Vite + Stitch UI)
            </span>
            <p style={{ color: 'var(--text-muted)' }}>
              Decoupled portals running on distinct ports: Student Portal (Port 3000) and Proctor Control Console (Port 3001). Built with real WebCam retina scanning reticle and collapsible sliding sidebar navigation.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '10px' }}>
            <span style={{ color: '#a78bfa', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
              BLOCKCHAIN PROOF LEDGER
            </span>
            <p style={{ color: 'var(--text-muted)' }}>
              Sepolia Testnet identity rollup binding zero-knowledge consent hashes and revocation records off-chain without exposing raw biometrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
