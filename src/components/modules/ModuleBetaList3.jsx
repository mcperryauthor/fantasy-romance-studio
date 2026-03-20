import React, { useState } from 'react';
import { BetaModuleContainer, EmotionSlider } from './BetaModuleContainer';
import { Input } from '../ui/Input';

export const ModuleBetaLeastEffective = () => (
  <BetaModuleContainer title="B11. Least Effective Moments" purpose="Log the weakest, slowest, or most awkward points in the chapter.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
      <Input type="textarea" label="Weakest Scene" placeholder="The entire conversation with the guard felt unnecessary." style={{ minHeight: '80px' }} />
      <Input type="textarea" label="Most Boring Section" placeholder="The four-page explanation of the political court structure." style={{ minHeight: '80px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input type="textarea" label="Least Believable Moment" placeholder="That she wouldn't immediately recognize his voice." style={{ minHeight: '80px', marginBottom: 0 }} />
        <Input type="textarea" label="Repetitive Elements" placeholder="She commented on his golden eyes three times in one page." style={{ minHeight: '80px', marginBottom: 0 }} />
      </div>
    </div>
  </BetaModuleContainer>
);

export const ModuleBetaEndingReaction = () => {
  const [val, setVal] = useState(8);
  return (
    <BetaModuleContainer title="B12. Ending Reaction" purpose="Capture the emotional resonance of the chapter's final hook.">
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
          <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)', transform: 'scale(1.2)' }} />
          Did the ending hook me?
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
          <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)', transform: 'scale(1.2)' }} />
          Would I turn the page right now?
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Ending Strength Score: <strong style={{ color: 'var(--color-burgundy)' }}>{val}/10</strong></label>
        <input type="range" min="1" max="10" value={val} onChange={e => setVal(e.target.value)} style={{ accentColor: 'var(--color-burgundy)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input type="textarea" label="What worked" placeholder="The sudden cliffhanger revelation..." style={{ minHeight: '100px' }} />
        <Input type="textarea" label="What needs improvement" placeholder="The tension diffused right before the actual ending..." style={{ minHeight: '100px' }} />
      </div>
    </BetaModuleContainer>
  );
};

export const ModuleBetaOverallImpression = () => {
  const [val, setVal] = useState(7);
  return (
    <BetaModuleContainer title="B13. Overall Reader Impression" purpose="Provide the definitive, unfiltered emotional response to the entire chapter.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Overall Enjoyment Score: <strong style={{ color: 'var(--color-burgundy)' }}>{val}/10</strong></label>
        <input type="range" min="1" max="10" value={val} onChange={e => setVal(e.target.value)} style={{ accentColor: 'var(--color-burgundy)' }} />
      </div>
      
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Would I recommend this chapter?</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Would I keep reading the book?</label>
        </div>
      </div>

      <Input type="textarea" label="1-Paragraph Reader Reaction" placeholder="Overall, I was totally gripped by the tension between the main characters, but the middle section bogged down with too much lore dumping that made my eyes glaze over..." style={{ minHeight: '150px' }} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
        <div style={{ padding: '16px', backgroundColor: 'rgba(46, 204, 113, 0.05)', borderLeft: '3px solid #2ecc71', borderRadius: '4px' }}>
          <Input type="textarea" label="Biggest Strength" placeholder="The tension during the fight scene..." style={{ minHeight: '80px', marginBottom: 0 }} />
        </div>
        <div style={{ padding: '16px', backgroundColor: 'rgba(255, 159, 67, 0.05)', borderLeft: '3px solid #ff9f43', borderRadius: '4px' }}>
          <Input type="textarea" label="Biggest Issue" placeholder="Pacing dragging heavily in the middle..." style={{ minHeight: '80px', marginBottom: 0 }} />
        </div>
      </div>
    </BetaModuleContainer>
  );
};
