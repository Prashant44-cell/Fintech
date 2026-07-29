import React, { useState } from 'react';
import { FileText, Filter, Download, ExternalLink } from 'lucide-react';

export default function AuditLogTable({ auditLogs }) {
  const [filterType, setFilterType] = useState('ALL');

  const logs = auditLogs || [];
  const filteredLogs = filterType === 'ALL' 
    ? logs 
    : logs.filter(l => l.event_type === filterType || l.result === filterType);

  const exportAuditLogCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Audit ID,Timestamp,User ID,Event Type,Result,Reason Code,Device ID,IP,Tx Hash"]
      .concat(filteredLogs.map(l => 
        `${l.id},${new Date(l.timestamp*1000).toISOString()},${l.user_id},${l.event_type},${l.result},${l.reason_code},${l.device_id},${l.ip_address},${l.blockchain_tx_hash}`
      )).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `identity_audit_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} color="#06b6d4" /> Immutable Security Audit Logs (Off-Chain Proof Ledger)
        </h3>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}>
            <Filter size={14} color="var(--text-muted)" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-color)',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.8rem'
              }}
            >
              <option value="ALL">All Event Types</option>
              <option value="TERMS_ACCEPTED">Terms Accepted</option>
              <option value="CREDENTIAL_ISSUED">Credential Issued</option>
              <option value="TRUST_SCORE_EVALUATED">Trust Score Evaluated</option>
              <option value="STEP_UP_VERIFICATION">Step-Up Verification</option>
              <option value="CREDENTIAL_REVOKED">Credential Revoked</option>
            </select>
          </div>

          <button onClick={exportAuditLogCSV} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
            <Download size={14} /> Export Audit Log CSV
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>Time</th>
              <th>User ID</th>
              <th>Event Type</th>
              <th>Result</th>
              <th>Reason Code</th>
              <th>Device & IP</th>
              <th>Blockchain TX Hash</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  No audit logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="mono-font" style={{ fontSize: '0.75rem', color: '#a78bfa' }}>{log.id}</td>
                  <td style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    {new Date(log.timestamp * 1000).toLocaleTimeString()}
                  </td>
                  <td style={{ fontWeight: '600' }}>{log.user_id}</td>
                  <td className="mono-font" style={{ fontSize: '0.775rem', color: '#06b6d4' }}>{log.event_type}</td>
                  <td>
                    <span className={`badge ${
                      log.result === 'SUCCESS' || log.result === 'PASSED' || log.result === 'ALLOW' ? 'badge-low' :
                      log.result === 'STEP_UP' ? 'badge-medium' : 'badge-high'
                    }`}>
                      {log.result}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: '#d1d5db' }}>{log.reason_code}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {log.device_id} ({log.ip_address})
                  </td>
                  <td className="mono-font" style={{ fontSize: '0.725rem', color: '#38bdf8' }}>
                    {log.blockchain_tx_hash ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        {log.blockchain_tx_hash.substring(0, 14)}... <ExternalLink size={11} />
                      </span>
                    ) : 'Pending'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
