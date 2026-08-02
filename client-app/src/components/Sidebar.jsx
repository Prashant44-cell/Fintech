import React, { useState } from 'react';
import {
  LayoutDashboard, Users, CreditCard, Monitor, ShieldCheck,
  GraduationCap, ClipboardList, Key,
  ShieldAlert, FileText, RotateCcw,
  BarChart2, FlaskConical,
  Plug, UserCog, Lock, Settings, Building2,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  LogOut, Layers
} from 'lucide-react';

const SECTIONS = [
  {
    id: 'overview', label: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }]
  },
  {
    id: 'identity', label: 'Identity',
    items: [
      { id: 'users', label: 'Users', icon: Users },
      { id: 'credentials', label: 'Credentials', icon: CreditCard },
      { id: 'sessions', label: 'Live Sessions', icon: Monitor },
      { id: 'trust', label: 'Trust Details', icon: ShieldCheck },
    ]
  },
  {
    id: 'operations', label: 'Institution Operations',
    items: [
      { id: 'attendance', label: 'Attendance', icon: ClipboardList },
      { id: 'exam', label: 'Exam Security', icon: GraduationCap },
      { id: 'access', label: 'Access Control', icon: Key },
    ]
  },
  {
    id: 'security', label: 'Security',
    items: [
      { id: 'alerts', label: 'Risk & Alerts', icon: ShieldAlert, badge: '5', badgeColor: '#ef4444' },
      { id: 'audit', label: 'Audit Logs', icon: FileText },
      { id: 'recovery', label: 'Recovery & Revocation', icon: RotateCcw },
    ]
  },
  {
    id: 'intelligence', label: 'Intelligence',
    items: [
      { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    ]
  },
  {
    id: 'platform', label: 'Platform',
    items: [
      { id: 'integrations', label: 'Integrations', icon: Plug },
      { id: 'security-settings', label: 'Security Policies', icon: Lock },
      { id: 'institution', label: 'Institution Settings', icon: Building2 },
    ]
  },
];

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, onLogout, userProfile }) {
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (id) => {
    setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside style={{
      width: isCollapsed ? '72px' : '252px',
      height: '100vh',
      position: 'fixed',
      top: 0, left: 0,
      background: 'rgba(8, 14, 28, 0.97)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      zIndex: 900,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '4px 0 32px rgba(0,0,0,0.7)',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: isCollapsed ? '1rem 0' : '1rem 1rem',
        display: 'flex', alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0
      }}>
        {!isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(6,182,212,0.45)', flexShrink: 0 }}>
              <ShieldCheck size={18} color="#fff" />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', letterSpacing: '-0.02em', display: 'block' }}>
                CALL<span style={{ color: '#06b6d4' }}>ID</span>
              </span>
              <span style={{ fontSize: '0.58rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Institution Portal · Port 3000
              </span>
            </div>
          </div>
        )}
        <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, color: '#64748b', padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: isCollapsed ? '0.5rem 0' : '0.5rem 0.55rem', display: 'flex', flexDirection: 'column' }}>
        {SECTIONS.map(section => {
          const isSectionCollapsed = collapsedSections[section.id];
          return (
            <div key={section.id} style={{ marginBottom: '0.1rem' }}>
              {!isCollapsed && (
                <button onClick={() => toggleSection(section.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.55rem', background: 'none', border: 'none', cursor: 'pointer', marginTop: '0.55rem' }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{section.label}</span>
                  {isSectionCollapsed ? <ChevronDown size={11} color="#334155" /> : <ChevronUp size={11} color="#334155" />}
                </button>
              )}
              {isCollapsed && <div style={{ height: '0.35rem' }} />}

              {!isSectionCollapsed && section.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} title={isCollapsed ? item.label : undefined} style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '0.65rem', padding: isCollapsed ? '0.6rem 0' : '0.52rem 0.65rem',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    borderRadius: 10, border: 'none',
                    background: isActive ? 'linear-gradient(135deg,rgba(6,182,212,0.2),rgba(139,92,246,0.12))' : 'transparent',
                    color: isActive ? '#38bdf8' : '#64748b',
                    boxShadow: isActive ? 'inset 0 0 0 1px rgba(6,182,212,0.35)' : 'none',
                    cursor: 'pointer', textAlign: 'left', marginBottom: '0.03rem',
                    transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94a3b8'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}
                  >
                    <Icon size={16} style={{ flexShrink: 0 }} color={isActive ? '#06b6d4' : undefined} />
                    {!isCollapsed && (
                      <>
                        <span style={{ fontSize: '0.82rem', fontWeight: isActive ? 700 : 500, flex: 1 }}>{item.label}</span>
                        {item.badge && (
                          <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: 9999, background: `${item.badgeColor}22`, color: item.badgeColor, border: `1px solid ${item.badgeColor}50`, minWidth: 18, textAlign: 'center' }}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', color: '#fff' }}>
              {userProfile?.full_name ? userProfile.full_name[0] : 'A'}
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', display: 'block' }}>{userProfile?.full_name || 'Admin'}</span>
              <span style={{ fontSize: '0.65rem', color: '#10b981' }}>● Sepolia Verified</span>
            </div>
          </div>
          <button onClick={onLogout} title="Log Out" style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.3rem', borderRadius: 6, display: 'flex' }}>
            <LogOut size={15} />
          </button>
        </div>
      )}
    </aside>
  );
}
