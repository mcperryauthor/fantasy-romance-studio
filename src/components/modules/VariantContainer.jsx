import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EmotionSlider, BetaReactionTag } from './BetaModuleContainer';
import { Input } from '../ui/Input';

// Shared Layout for all Variants to ensure the Base Outputs are included alongside Variant-Specific questions.
export const VariantContainer = ({ title, profile, lowTolerance, children }) => {
  return (
    <Card glow style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', borderTop: '4px solid var(--color-burgundy)' }}>
      {/* Header Area */}
      <div style={{ borderBottom: '1px solid var(--color-plum-dark)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#ffb8b8', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {title}
          <span style={{ fontSize: '0.8rem', padding: '4px 12px', backgroundColor: 'var(--color-charcoal-light)', borderRadius: '16px', color: 'var(--color-text-muted)', border: '1px solid var(--color-plum-dark)' }}>BETA VARIANT</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: 'var(--color-charcoal)', padding: '16px', borderRadius: '8px' }}>
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--color-gold-muted)', marginBottom: '8px' }}>Profile / Craves</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{profile}</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#ff6b81', marginBottom: '8px' }}>Low Tolerance For</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{lowTolerance}</p>
          </div>
        </div>
      </div>

      {/* Base Scores (Required for all variants for Comparison) */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#fff' }}>Base Reader Metrics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
          <EmotionSlider label="Engagement" color="#2ecc71" />
          <EmotionSlider label="Emotional Intensity" color="#ff6b81" />
          <EmotionSlider label="Tension Score" color="#a88b5d" />
          <EmotionSlider label="Confusion Score" color="#ff9f43" />
          <EmotionSlider label="Addictiveness" color="var(--color-burgundy)" />
        </div>
      </div>

      {/* Base Qualitative Fields (Required for all variants) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
         <Input type="textarea" label="Hook Reaction" placeholder="..." style={{ minHeight: '60px' }} />
         <Input type="textarea" label="Ending Reaction" placeholder="..." style={{ minHeight: '60px' }} />
         <Input type="textarea" label="Favorite Moment" placeholder="..." style={{ minHeight: '60px' }} />
         <Input type="textarea" label="Weakest Moment" placeholder="..." style={{ minHeight: '60px' }} />
         <Input type="textarea" label="Skim Points" placeholder="..." style={{ minHeight: '60px' }} />
         <Input type="textarea" label="Confusion Points" placeholder="..." style={{ minHeight: '60px' }} />
      </div>
      <Input type="textarea" label="Overall Impression" placeholder="1-paragraph summary..." style={{ minHeight: '80px' }} />

      {/* VARIANT-SPECIFIC CONTENT PASSED AS CHILDREN */}
      <div style={{ borderTop: '2px dashed var(--color-plum-dark)', paddingTop: '24px', marginTop: '8px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '24px', color: '#fff' }}>Variant-Specific Analysis</h3>
        {children}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button variant="primary">Save {title} Analysis</Button>
      </div>
    </Card>
  );
};
