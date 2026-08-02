import React, { useState } from 'react';
import {
  LayoutDashboard, Building2, UserPlus, Users, Key,
  CreditCard, FileCode2, Monitor, Brain, GitBranch,
  ShieldAlert, AlertOctagon, Gauge, Ban, FileText,
  Server, Cpu, Network, Link2, Package,
  Code2, Plug, Webhook,
  BarChart2, FlaskConical, Layers,
  Receipt, MessageSquare,
  UserCog, Lock, Bell, Settings,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Sparkles
} from 'lucide-react';

const SECTIONS = [
  {
    id: 'overview', label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    id: 'organizations', label: 'Organizations',
    items: [
      { id: 'clients', label: 'Clients', icon: Building2 },
      { id: 'onboarding', label: 'Client Onboarding', icon: UserPlus },
      { id: 'users', label: 'Users & Admins', icon: Users },
      { id: 'issuers', label: 'Issuers', icon: Key },
    ]
  },
  {
    id: 'identity', label: 'Identity Platform',
    items: [
      { id: 'credentials', label: 'Credentials', icon: CreditCard },
      { id: 'schemas', label: 'Credential Schemas', icon: FileCode2 },
      { id: 'sessions', label: 'Live Sessions', icon: Monitor },
      { id: 'trustengine', label: 'Trust Engine', icon: Brain },
      { id: 'trustmodels', label: 'Trust Models', icon: Layers },
      { id: 'policy', label: 'Policy Engine', icon: GitBranch },
    ]
  },
  {
    id: 'security', label: 'Security',
    items: [
      { id: 'soc', label: 'Security Operations', icon: ShieldAlert, badge: '7', badgeColor: '#ef4444' },
      { id: 'incidents', label: 'Incidents', icon: AlertOctagon, badge: '3', badgeColor: '#f59e0b' },
      { id: 'ratelimiting', label: 'Rate Limiting', icon: Gauge },
      { id: 'revocation', label: 'Revocations', icon: Ban },
      { id: 'audit', label: 'Audit & Compliance', icon: FileText },
    ]
  },
  {
    id: 'infrastructure', label: 'Infrastructure',
    items: [
      { id: 'systemhealth', label: 'System Health', icon: Server },
      { id: 'distributed', label: 'Distributed Systems', icon: Network },
      { id: 'blockchain', label: 'Blockchain / Proof', icon: Link2 },
    ]
  },
  {
    id: 'developer', label: 'Developer Platform',
    items: [
      { id: 'api', label: 'API Clients', icon: Code2 },
      { id: 'integrations', label: 'Integrations', icon: Plug },
      { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    ]
  },
  {
    id: 'intelligence', label: 'Intelligence',
    items: [
      { id: 'analytics', label: 'Analytics', icon: BarChart2 },
      { id: 'research', label: 'Research Metrics', icon: FlaskConical },
    ]
  },
  {
    id: 'business', label: 'Business',
    items: [
      { id: 'billing', label: 'Plans & Billing', icon: Receipt },
      { id: 'support', label: 'Support', icon: MessageSquare },
    ]
  },
  {
    id: 'administration', label: 'Administration',
    items: [
      { id: 'team', label: 'Platform Team', icon: UserCog },
      { id: 'config', label: 'System Configuration', icon: Settings },
      { id: 'developer-showcase', label: 'Developer Showcase', icon: Sparkles },
    ]
  },
];

export default function AdminSidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (id) => {
    setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside style={{
      width: isCollapsed ? '72px' : '260px',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'rgba(8, 12, 22, 0.98)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      zIndex: 900,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '4px 0 32px rgba(0,0,0,0.7)',
      overflowX: 'hidden'
    }}>
      {/* Logo Header */}
      <div style={{
        padding: isCollapsed ? '1.1rem 0' : '1.1rem 1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        flexShrink: 0
      }}>
        {!isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #ef4444 0%, #8b5cf6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)', flexShrink: 0
            }}>
              <ShieldAlert size={18} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff', letterSpacing: '-0.02em', display: 'block' }}>
                SUPER<span style={{ color: '#ef4444' }}>ADMIN</span>
              </span>
              <span style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                CallID Platform · Port 3001
              </span>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '8px',
            color: '#64748b',
            padding: '0.4rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: isCollapsed ? '0.5rem 0' : '0.5rem 0.6rem', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {SECTIONS.map((section) => {
          const isSectionCollapsed = collapsedSections[section.id];
          return (
            <div key={section.id} style={{ marginBottom: '0.15rem' }}>
              {/* Section Label */}
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection(section.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.45rem 0.6rem', background: 'none', border: 'none', cursor: 'pointer',
                    marginTop: '0.6rem'
                  }}
                >
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {section.label}
                  </span>
                  {isSectionCollapsed ? <ChevronDown size={12} color="#334155" /> : <ChevronUp size={12} color="#334155" />}
                </button>
              )}
              {isCollapsed && section.items.length > 0 && <div style={{ height: '0.4rem' }} />}

              {/* Section Items */}
              {!isSectionCollapsed && section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      padding: isCollapsed ? '0.65rem 0' : '0.55rem 0.7rem',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      borderRadius: '10px',
                      border: 'none',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.18) 0%, rgba(139, 92, 246, 0.12) 100%)'
                        : 'transparent',
                      color: isActive ? '#f87171' : '#64748b',
                      boxShadow: isActive ? 'inset 0 0 0 1px rgba(239, 68, 68, 0.3)' : 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      marginBottom: '0.05rem',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94a3b8'; } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}
                  >
                    <Icon size={17} style={{ flexShrink: 0 }} color={isActive ? '#ef4444' : undefined} />
                    {!isCollapsed && (
                      <>
                        <span style={{ fontSize: '0.83rem', fontWeight: isActive ? 700 : 500, flex: 1 }}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span style={{
                            fontSize: '0.6rem', fontWeight: 800, padding: '0.12rem 0.42rem',
                            borderRadius: 9999, background: `${item.badgeColor}25`,
                            color: item.badgeColor, border: `1px solid ${item.badgeColor}55`,
                            minWidth: 20, textAlign: 'center'
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <span style={{
                        position: 'absolute', top: 2, right: 2, width: 14, height: 14,
                        borderRadius: '50%', background: item.badgeColor,
                        fontSize: '0.55rem', fontWeight: 800, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {item.badge}
                      </span>
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
        <div style={{
          padding: '0.85rem 1.1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(0, 0, 0, 0.3)',
          fontSize: '0.72rem',
          color: '#334155',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8b5cf6', fontWeight: 700, marginBottom: '0.15rem' }}>
            <Lock size={11} /> SUPER ADMIN TOKEN ACTIVE
          </div>
          <div>Platform v1.0 · Sepolia ZK Rollup</div>
        </div>
      )}
    </aside>
  );
}
