import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const ModuleContainer = ({ title, purpose, hideScore = false, children }) => {
  const [useProfile, setUseProfile] = useState(false);
  const [score, setScore] = useState(5);
  const [status, setStatus] = useState('Stable');

  const statusColors = {
    'Strong': '#2ecc71',
    'Stable': 'var(--color-text-main)',
    'Needs Work': 'var(--color-gold-muted)',
    'Weak': '#ff9f43',
    'Critical': '#ff6b81'
  };

  return (
    <Card glow style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      {/* Header Area */}
      <div style={{ borderBottom: '1px solid var(--color-plum-dark)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{title}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{purpose}</p>
      </div>

      {/* Style Profile Integration */}
      <div style={{ backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '8px' }}>
          <input 
            type="checkbox" 
            checked={useProfile} 
            onChange={(e) => setUseProfile(e.target.checked)} 
            style={{ width: '18px', height: '18px', accentColor: 'var(--color-burgundy)' }}
          />
          <span style={{ fontWeight: '500' }}>Compare against Style Profile</span>
        </label>
        <p style={{ fontSize: '0.875rem', color: useProfile ? 'var(--color-gold-muted)' : 'var(--color-text-muted)', marginLeft: '30px', fontStyle: 'italic' }}>
          {useProfile ? 'Review in context of intentional voice choices.' : 'Strict evaluation mode.'}
        </p>
      </div>

      {/* Main Content (Fields & Checklists passed as children) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        {children}
      </div>

      {/* Global Scoring System (Some modules like Problems may hide this) */}
      {!hideScore && (
        <div style={{ borderTop: '1px solid var(--color-plum-dark)', paddingTop: '24px', marginTop: '8px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Module Score (1-10)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input 
                type="range" min="1" max="10" value={score} onChange={(e) => setScore(e.target.value)} 
                style={{ flex: 1, accentColor: 'var(--color-burgundy)' }}
              />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 'bold', width: '32px', textAlign: 'center' }}>{score}</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Status Tag</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: '100%', backgroundColor: 'var(--color-charcoal-light)', border: `1px solid ${statusColors[status]}`, borderRadius: 'var(--radius-sm)', padding: '10px', color: statusColors[status], fontWeight: '600', outline: 'none' }}
            >
              <option value="Strong">Strong</option>
              <option value="Stable">Stable</option>
              <option value="Needs Work">Needs Work</option>
              <option value="Weak">Weak</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      )}

      {/* Save Action */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button variant="primary">Save Module Progress</Button>
      </div>
    </Card>
  );
};
