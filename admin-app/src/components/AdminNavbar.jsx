import React from 'react';
import { ShieldAlert, Server, Lock, Cpu, Activity } from 'lucide-react';

export default function AdminNavbar({ lastUpdated }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '1.25rem',
      borderBottom: '1px solid var(--border-color)',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          padding: '0.65rem',
          background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(139,92,246,0.2) 100%)',
          borderRadius: '14px',
          border: '1px solid rgba(239,68,68,0.4)'
        }}>
          <ShieldAlert size={28} color="#ef4444" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Server & Proctor Control Console</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
            Administrative Session Takeover Monitor • Server Portal (Port 3001)
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <Lock size={12} /> SERVER PORTAL (PORT 3001) ONLY
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.75rem',
          color: '#10b981',
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '0.35rem 0.75rem',
          borderRadius: '20px'
        }}>
          <Activity size={13} /> Live Sync: {lastUpdated ? new Date(lastUpdated * 1000).toLocaleTimeString() : 'Active'}
        </div>
      </div>
    </header>
  );
}
