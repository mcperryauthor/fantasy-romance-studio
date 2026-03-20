import React from 'react';
import { Card } from '../ui/Card';

const BarScore = ({ label, score, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
    <div style={{ width: '100px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{label}</div>
    <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--color-charcoal-light)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${score * 10}%`, backgroundColor: color }}></div>
    </div>
    <div style={{ width: '24px', fontSize: '0.8rem', fontWeight: 'bold' }}>{score}</div>
  </div>
);

export const ModuleVariantComparison = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div style={{ borderBottom: '1px solid var(--color-plum-dark)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#ffb8b8' }}>V9. Variant Comparison Dashboard</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Side-by-side analysis of how different reader demographics responded to this chapter.</p>
      </div>

      {/* Insight Synthesis Panel */}
      <Card glow style={{ border: '1px solid var(--color-burgundy)' }}>
        <div style={{ position: 'absolute', top: '-12px', left: '24px', backgroundColor: 'var(--color-burgundy)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>System Synthesis</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
          <div>
            <h4 style={{ fontSize: '1rem', color: '#2ecc71', marginBottom: '12px' }}>What ALL readers agree on</h4>
            <ul style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li>The opening hook is universally effective.</li>
              <li>The prose feels deeply immersive and 'Dark Luxe'.</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ff6b81', marginBottom: '12px' }}>Where readers disagree</h4>
            <ul style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li><strong>Pacing Reader</strong> hated the mid-chapter lore dump; <strong>Immersion Reader</strong> loved it and wanted more.</li>
              <li><strong>Slow Burn Reader</strong> felt the tension built nicely; <strong>BookTok Reader</strong> thought the midpoint was boring.</li>
            </ul>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-plum-dark)' }}>
          <div>
            <h4 style={{ fontSize: '1rem', color: '#a88b5d', marginBottom: '12px' }}>Biggest strengths across audiences</h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>The tension between the leads during the dialogue sequence. It successfully drove both the plot and the romance forward simultaneously, satisfying the Balance Reader.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ff9f43', marginBottom: '12px' }}>Biggest risks across audiences</h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>The high complexity of the magic system explanation. It risks losing the viral/BookTok audience who are seeking immediate emotional gratification over mechanical rules.</p>
          </div>
        </div>
      </Card>

      {/* Side-by-Side Comparison */}
      <h3 style={{ fontSize: '1.25rem', marginTop: '16px', color: '#fff' }}>Reader Scoring Comparison</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        
        <div style={{ backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', borderTop: '3px solid #ff6b81' }}>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '16px' }}>Dark Romance Obsession</h4>
          <BarScore label="Engagement" score={9} color="#2ecc71" />
          <BarScore label="Intensity" score={9} color="#ff6b81" />
          <BarScore label="Tension" score={8} color="#a88b5d" />
          <p style={{ fontSize: '0.8rem', fontStyle: 'italic', marginTop: '16px', color: 'var(--color-text-muted)' }}>"Loved the physical proximity near the ending. Hoped for more psychological danger in the beginning."</p>
        </div>

        <div style={{ backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', borderTop: '3px solid #3498db' }}>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '16px' }}>Pacing-Sensitive Reader</h4>
          <BarScore label="Engagement" score={5} color="#2ecc71" />
          <BarScore label="Intensity" score={6} color="#ff6b81" />
          <BarScore label="Tension" score={6} color="#a88b5d" />
          <p style={{ fontSize: '0.8rem', fontStyle: 'italic', marginTop: '16px', color: 'var(--color-text-muted)' }}>"Felt dragged down by the huge block of text explaining the history of the three courts."</p>
        </div>

        <div style={{ backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', borderTop: '3px solid #9b59b6' }}>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '16px' }}>World Immersion Reader</h4>
          <BarScore label="Engagement" score={8} color="#2ecc71" />
          <BarScore label="Intensity" score={7} color="#ff6b81" />
          <BarScore label="Tension" score={7} color="#a88b5d" />
          <p style={{ fontSize: '0.8rem', fontStyle: 'italic', marginTop: '16px', color: 'var(--color-text-muted)' }}>"The lore integration in the middle was fascinating, but I was slightly confused by the blood-tithe rules."</p>
        </div>

      </div>
    </div>
  );
};
