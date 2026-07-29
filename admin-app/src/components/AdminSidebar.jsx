import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Code2,
  Sparkles
} from 'lucide-react';

export default function AdminSidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed 
}) {
  const menuItems = [
    { id: 'overview', label: 'Risk Overview & Alerts', icon: Activity },
    { id: 'sessions', label: 'Live Session Monitor', icon: Users },
    { id: 'revocation', label: 'Emergency Invalidation', icon: ShieldAlert, badge: 'ADMIN' },
    { id: 'audit', label: 'Immutable Audit Logs', icon: FileText },
    { id: 'developer', label: 'Developer Showcase', icon: Code2 },
  ];

  return (
    <aside style={{
      width: isCollapsed ? '80px' : '260px',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'rgba(11, 15, 25, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 900,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '4px 0 24px rgba(0,0,0,0.6)'
    }}>
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {!isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ef4444 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)'
            }}>
              <ShieldAlert size={20} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#ffffff', letterSpacing: '-0.02em', display: 'block' }}>
                ADMIN<span style={{ color: '#ef4444' }}>CONSOLE</span>
              </span>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Server Portal (3001)
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#94a3b8',
            padding: '0.4rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '12px',
                border: 'none',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)' 
                  : 'transparent',
                color: isActive ? '#f87171' : '#94a3b8',
                boxShadow: isActive ? 'inset 0 0 0 1px rgba(239, 68, 68, 0.4)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                justifyContent: isCollapsed ? 'center' : 'flex-start'
              }}
            >
              <Icon size={20} color={isActive ? '#ef4444' : '#94a3b8'} />
              {!isCollapsed && (
                <span style={{ fontSize: '0.9rem', fontWeight: isActive ? '700' : '500', flex: 1 }}>
                  {item.label}
                </span>
              )}
              {!isCollapsed && item.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '6px',
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  border: '1px solid rgba(239, 68, 68, 0.4)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.3)',
          fontSize: '0.775rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#a78bfa', fontWeight: '700', marginBottom: '0.2rem' }}>
            <Lock size={13} /> HIGH-PRIVILEGE ROLE
          </div>
          Server Admin Token Active
        </div>
      )}
    </aside>
  );
}
