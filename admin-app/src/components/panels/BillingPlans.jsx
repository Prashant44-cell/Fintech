import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

const PLANS = [
  { name: 'Starter', price: '₹4,999/mo', users: 'Up to 5,000', creds: 'Up to 5,000', api: '10K req/mo', sessions: 'Up to 100 concurrent', support: 'Email', color: '#06b6d4', popular: false },
  { name: 'Institution', price: '₹24,999/mo', users: 'Up to 100,000', creds: 'Unlimited', api: '500K req/mo', sessions: 'Up to 5,000 concurrent', support: 'Priority + Slack', color: '#8b5cf6', popular: true },
  { name: 'Enterprise', price: 'Custom', users: 'Unlimited', creds: 'Unlimited', api: 'Unlimited', sessions: 'Unlimited', support: 'Dedicated SLA', color: '#10b981', popular: false },
];

const FEATURES = ['Credential Issuance', 'Trust Engine', 'Real-Time Sessions', 'Blockchain Proof', 'API Access', 'Admin Console', 'SSO Integration', 'Custom Policies', 'SLA Guarantee', 'On-Premise Option'];

const PLAN_MATRIX = {
  'Credential Issuance': [true, true, true],
  'Trust Engine': [true, true, true],
  'Real-Time Sessions': ['100', '5,000', 'Unlimited'],
  'Blockchain Proof': [true, true, true],
  'API Access': ['10K/mo', '500K/mo', 'Unlimited'],
  'Admin Console': [true, true, true],
  'SSO Integration': [false, true, true],
  'Custom Policies': [false, true, true],
  'SLA Guarantee': ['99.5%', '99.9%', '99.99%'],
  'On-Premise Option': [false, false, true],
};

const BILLING = [
  { client: 'IIT Bombay', plan: 'Enterprise', users: '28,400', api: '48.2K rps', cycle: 'Annual', status: 'paid', amount: '₹2.4L/mo' },
  { client: 'Delhi University', plan: 'Enterprise', users: '182,000', api: '22.4K rps', cycle: 'Annual', status: 'paid', amount: '₹8.8L/mo' },
  { client: 'VIT Vellore', plan: 'Institution', users: '44,000', api: '18.1K rps', cycle: 'Monthly', status: 'paid', amount: '₹24,999/mo' },
  { client: 'NIT Trichy', plan: 'Institution', users: '12,000', api: '8.8K rps', cycle: 'Monthly', status: 'trial', amount: '₹0 (Trial)' },
  { client: 'St. Columbus School', plan: 'Starter', users: '2,400', api: '1.2K rps', cycle: 'Monthly', status: 'paid', amount: '₹4,999/mo' },
  { client: 'GRE Board India', plan: 'Enterprise', users: '380,000', api: '0', cycle: 'Annual', status: 'suspended', amount: '₹0 (Suspended)' },
];

const STATUS_CFG = {
  paid: { color: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  trial: { color: '#22d3ee', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
  overdue: { color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)' },
  suspended: { color: '#94a3b8', bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.25)' },
};

export default function BillingPlans() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Plans & Billing</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.2rem' }}>Platform pricing tiers and institutional billing management</p>
      </div>

      <div style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#22d3ee' }}>
        ℹ Billing module is modular — can be disabled for research prototype deployments. All values are example data.
      </div>

      {/* Plan Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {PLANS.map((plan, i) => (
          <div key={plan.name} className="glass-panel" style={{
            position: 'relative', overflow: 'hidden',
            border: `1px solid ${plan.color}40`,
            background: plan.popular ? `${plan.color}08` : 'rgba(15,23,42,0.85)'
          }}>
            {plan.popular && (
              <div style={{ position: 'absolute', top: 12, right: -22, background: plan.color, color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 1.8rem', transform: 'rotate(40deg)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Popular
              </div>
            )}
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: plan.color, marginBottom: '0.3rem' }}>{plan.name}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>{plan.price}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              {[['Users', plan.users], ['Credentials', plan.creds], ['API', plan.api], ['Sessions', plan.sessions], ['Support', plan.support]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: '#64748b' }}>{k}</span>
                  <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="btn" style={{ width: '100%', justifyContent: 'center', background: `${plan.color}22`, color: plan.color, border: `1px solid ${plan.color}55`, fontWeight: 700, fontSize: '0.82rem' }}>
              {plan.name === 'Enterprise' ? 'Contact Sales' : `Select ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Client Billing Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Client Billing</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Institution</th><th>Plan</th><th>Users</th><th>API Volume</th><th>Billing Cycle</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {BILLING.map(b => {
                const sCfg = STATUS_CFG[b.status] || {};
                return (
                  <tr key={b.client}>
                    <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{b.client}</td>
                    <td><span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#a78bfa' }}>{b.plan}</span></td>
                    <td style={{ color: '#94a3b8' }}>{b.users}</td>
                    <td style={{ color: '#94a3b8' }}>{b.api}</td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.cycle}</td>
                    <td style={{ fontWeight: 700, color: '#e2e8f0' }}>{b.amount}</td>
                    <td><span style={{ padding: '0.18rem 0.55rem', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', ...sCfg }}>{b.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>Invoice</button>
                        <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.22rem 0.45rem' }}>Change Plan</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
