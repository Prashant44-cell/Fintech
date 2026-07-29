import React from 'react';
import { 
  LayoutDashboard, 
  Eye, 
  ShieldCheck, 
  User, 
  Code2, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed, 
  onLogout,
  userProfile 
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard & Trust', icon: LayoutDashboard },
    { id: 'retina', label: 'Retina & Liveness Scan', icon: Eye },
    { id: 'wallet', label: 'Identity Wallet & Chain', icon: ShieldCheck },
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'settings', label: 'Privacy & Settings', icon: Settings },
  ];

  return (
    <aside style={{
      width: isCollapsed ? '80px' : '260px',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 900,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '4px 0 24px rgba(0,0,0,0.5)'
    }}>
      {/* Brand Header */}
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
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
            }}>
              <ShieldCheck size={20} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#ffffff', letterSpacing: '-0.02em', display: 'block' }}>
                STITCH<span style={{ color: '#06b6d4' }}>ID</span>
              </span>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Continuous Human AI
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
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu Navigation Items */}
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
                  ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)' 
                  : 'transparent',
                color: isActive ? '#38bdf8' : '#94a3b8',
                boxShadow: isActive ? 'inset 0 0 0 1px rgba(6, 182, 212, 0.4)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                justifyContent: isCollapsed ? 'center' : 'flex-start'
              }}
            >
              <Icon size={20} color={isActive ? '#06b6d4' : '#94a3b8'} />
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
                  background: 'rgba(139, 92, 246, 0.2)',
                  color: '#c4b5fd',
                  border: '1px solid rgba(139, 92, 246, 0.4)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      {!isCollapsed && (
        <div style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#06b6d4',
              color: '#000',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem'
            }}>
              {userProfile?.full_name ? userProfile.full_name[0] : 'A'}
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffffff', display: 'block' }}>
                {userProfile?.full_name || 'Aarav Sharma'}
              </span>
              <span style={{ fontSize: '0.725rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                ● Sepolia Verified
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Log Out"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              padding: '0.35rem',
              borderRadius: '6px'
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
    </aside>
  );
}
