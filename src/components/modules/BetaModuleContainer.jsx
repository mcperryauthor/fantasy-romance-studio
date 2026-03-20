import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const BetaModuleContainer = ({ title, purpose, hideScore = false, children }) => {
  const [useProfile, setUseProfile] = useState(false);
  const [score, setScore] = useState(5);

  return (
    <Card glow style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      {/* Header Area */}
      <div style={{ borderBottom: '1px solid var(--color-plum-dark)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#ffb8b8' }}>{title}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>"{purpose}"</p>
      </div>

      {/* Style Profile Integration */}
      <div style={{ backgroundColor: 'rgba(123, 44, 58, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--color-burgundy)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '8px' }}>
          <input 
            type="checkbox" 
            checked={useProfile} 
            onChange={(e) => setUseProfile(e.target.checked)} 
            style={{ width: '18px', height: '18px', accentColor: 'var(--color-burgundy)' }}
          />
          <span style={{ fontWeight: '500', color: 'var(--color-gold-muted)' }}>Respect Author Style Profile</span>
        </label>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginLeft: '30px', fontStyle: 'italic' }}>
          {useProfile ? 'Reader assumes stylistic choices are intentional (reduces false criticism of voice).' : 'Reader reacts critically to unfamiliar stylistic choices.'}
        </p>
      </div>

      {/* Main Content (Fields & Checklists passed as children) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        {children}
      </div>

      {/* Save Action */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', borderTop: '1px solid var(--color-plum-dark)', paddingTop: '16px' }}>
        <Button variant="primary">Log Reader Reaction</Button>
      </div>
    </Card>
  );
};

export const BetaReactionTag = ({ children, color = 'var(--color-burgundy)' }) => (
  <span style={{ 
    display: 'inline-block', padding: '6px 12px', borderRadius: '16px', 
    backgroundColor: `${color}22`, color: color, fontSize: '0.8rem', 
    fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', border: `1px solid ${color}55`
  }}>
    {children}
  </span>
);

export const EmotionSlider = ({ label, color = 'var(--color-burgundy)' }) => {
  const [val, setVal] = useState(5);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>{label}: <strong style={{ color: color }}>{val}/10</strong></label>
      <input type="range" min="1" max="10" value={val} onChange={e => setVal(e.target.value)} style={{ accentColor: color }} />
    </div>
  );
};
