import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [transformStyle, setTransformStyle] = useState('rotateX(0deg) rotateY(0deg) scale(1)');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const cardRef = useRef(null);
  const videoRef = useRef(null);

  // Handle 3D Mouse Hover Tilt & Glare Effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const px = Math.round((x / rect.width) * 100);
    const py = Math.round((y / rect.height) * 100);
    setMousePos({ x: px, y: py });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setTransformStyle(`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.015)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('rotateX(0deg) rotateY(0deg) scale(1)');
    setMousePos({ x: 50, y: 50 });
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current && videoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = clickPosition * videoRef.current.duration;
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const slides = [
    {
      id: 0,
      title: 'Continuous Biometric AI',
      desc: 'Real-time eye & iris tracking ensuring uninterrupted user authentication.',
      icon: Eye,
      tag: 'ACTIVE MONITORING'
    },
    {
      id: 1,
      title: 'Sepolia ZK Identity',
      desc: 'Zero-Knowledge proofs posted on Sepolia testnet protecting raw biometrics.',
      icon: Lock,
      tag: 'BLOCKCHAIN PROOF'
    },
    {
      id: 2,
      title: 'Automated Risk Scoring',
      desc: 'Continuous risk score calculations with step-up verification triggers.',
      icon: Activity,
      tag: 'DYNAMIC SCORE'
    },
    {
      id: 3,
      title: 'Instant Admin Revocation',
      desc: 'Institutional smart contract access control with instant session termination.',
      icon: ShieldCheck,
      tag: 'SECURITY PROTOCOL'
    }
  ];

  return (
    <div className="hero-section-container">
      <div className="hero-perspective-wrapper">
        <div 
          ref={cardRef}
          className="hero-card-3d"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transformStyle,
            '--mouse-x': `${mousePos.x}%`,
            '--mouse-y': `${mousePos.y}%`
          }}
        >
          <div className="hero-card-glare" />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.25rem',
            position: 'relative',
            zIndex: 10,
            transform: 'translateZ(30px)'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', padding: '0.35rem 0.85rem', borderRadius: '30px', marginBottom: '0.75rem' }}>
                <Sparkles size={14} color="#a78bfa" />
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#c4b5fd', letterSpacing: '0.05em' }}>
                  ADMIN SHOWCASE & HERO DEMO
                </span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '900', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Continuous Biometric Identity & Zero-Knowledge Security
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem', maxWidth: '650px' }}>
                Hover over the video presentation card to trigger 3D parallax tilt, glare lighting, and explore interactive feature slides.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-low" style={{ backdropFilter: 'blur(10px)' }}>
                <div className="pulse-dot" /> LIVE HERO VIDEO
              </span>
            </div>
          </div>

          <div className="video-frame-container">
            <div className="video-badge-top-left">
              <ShieldCheck size={16} color="#a78bfa" />
              <span>STITCH ID • ADMIN HERO SHOWCASE</span>
            </div>

            <div className="video-badge-top-right">
              <div className="pulse-dot" />
              <span>SEPOLIA ENCRYPTED</span>
            </div>

            <video
              ref={videoRef}
              className="video-element"
              src="/Hero page.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
            />

            <div className="video-overlay-bar">
              <button onClick={togglePlay} className="video-control-btn" title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
              </button>

              <div className="video-progress-bar" onClick={handleSeek} title="Seek Video">
                <div className="video-progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <button onClick={toggleMute} className="video-control-btn" title={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button onClick={toggleFullScreen} className="video-control-btn" title="Fullscreen">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          <div className="hero-marquee-wrapper" style={{ transform: 'translateZ(25px)' }}>
            <div className="hero-marquee-track">
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#10b981" /> REAL-TIME IRIS LIVENESS</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#8b5cf6" /> SEPOLIA SMART CONTRACT PROOFS</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#06b6d4" /> CONTINUOUS TRUST SCORING</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#f59e0b" /> ZERO RAW BIOMETRIC STORAGE</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#10b981" /> AUTOMATED STEP-UP CHALLENGE</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#10b981" /> REAL-TIME IRIS LIVENESS</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#8b5cf6" /> SEPOLIA SMART CONTRACT PROOFS</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#06b6d4" /> CONTINUOUS TRUST SCORING</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#f59e0b" /> ZERO RAW BIOMETRIC STORAGE</span>
              <span className="hero-marquee-item"><CheckCircle2 size={16} color="#10b981" /> AUTOMATED STEP-UP CHALLENGE</span>
            </div>
          </div>

          <div className="hero-slider-container" style={{ transform: 'translateZ(35px)' }}>
            {slides.map((slide) => {
              const Icon = slide.icon;
              const isActive = activeSlide === slide.id;
              return (
                <div
                  key={slide.id}
                  className={`hero-slide-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveSlide(slide.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{
                      padding: '0.4rem',
                      borderRadius: '8px',
                      background: isActive ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      color: isActive ? '#c4b5fd' : '#94a3b8'
                    }}>
                      <Icon size={18} />
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', color: isActive ? '#a78bfa' : '#64748b' }}>
                      {slide.tag}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: isActive ? '#ffffff' : '#cbd5e1', marginBottom: '0.25rem' }}>
                    {slide.title}
                  </h4>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {slide.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
