import React, { useState } from 'react';
import { BetaModuleContainer } from './BetaModuleContainer';
import { Input } from '../ui/Input';

export const ModuleBetaPacing = () => (
  <BetaModuleContainer title="B6. Pacing Experience" purpose="Evaluate narrative velocity from a reader's perspective.">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Overall Pacing Tag</label>
      <div style={{ display: 'flex', gap: '12px' }}>
        {['dragging', 'balanced', 'fast', 'rushed'].map(tag => (
          <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'var(--color-charcoal-light)', padding: '8px 16px', borderRadius: '4px', border: '1px solid var(--color-plum-dark)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            <input type="radio" name="pacingTag" style={{ accentColor: 'var(--color-burgundy)' }} />
            {tag}
          </label>
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)', marginBottom: '24px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did anything feel slow?</label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did I actively skim anything?</label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did I unconsciously speed up my reading speed?</label>
    </div>

    <Input type="textarea" label="Where did I speed up?" placeholder="The entire fight sequence had me flying through pages..." style={{ minHeight: '80px' }} />
    <Input type="textarea" label="Exact moment pacing dropped" placeholder="When they sat down to discuss the map for three pages..." style={{ minHeight: '80px' }} />
  </BetaModuleContainer>
);

export const ModuleBetaConfusion = () => (
  <BetaModuleContainer title="B7. Confusion & Clarity" purpose="Track mental roadblocks and frustrating ambiguity.">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Severity of Confusion</label>
      <select style={{ padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
        <option>None - Perfectly Clear</option>
        <option>Mild Confusion (Figured it out quickly)</option>
        <option>Moderate Confusion (Had to re-read)</option>
        <option>Major Confusion (Lost the thread completely)</option>
      </select>
    </div>

    <Input type="textarea" label="What confused me overall" placeholder="General confusion about who was standing where..." style={{ minHeight: '80px' }} />
    <Input type="textarea" label="What I had to reread" placeholder="Page 4, paragraph 2 describing the spell mechanics..." style={{ minHeight: '80px' }} />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <Input type="textarea" label="Unclear Lore / Worldbuilding" placeholder="The difference between 'blood-bound' and 'soul-bound' isn't clear..." style={{ minHeight: '80px' }} />
      <Input type="textarea" label="Unclear Character Motivations" placeholder="Why did she lie about the dagger? It didn't make sense..." style={{ minHeight: '80px' }} />
    </div>
  </BetaModuleContainer>
);

export const ModuleBetaObsession = () => {
  const [val, setVal] = useState(8);
  return (
    <BetaModuleContainer title="B8. Obsession / Addictiveness Check" purpose="Evaluate the absolute gripping power of the narrative.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Addictiveness Score: <strong style={{ color: 'var(--color-burgundy)' }}>{val}/10</strong></label>
        <input type="range" min="1" max="10" value={val} onChange={e => setVal(e.target.value)} style={{ accentColor: 'var(--color-burgundy)' }} />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Addictive Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['can\'t stop reading', 'addictive', 'bingeable', 'mildly engaging', 'forgettable'].map(tag => (
            <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'var(--color-charcoal-light)', padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--color-plum-dark)', fontSize: '0.8rem' }}>
              <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} />
              {tag}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)', marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did I feel compelled to keep reading?</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did I immediately want to turn the page at the end?</label>
      </div>

      <Input type="textarea" label="Where did I get hooked hardest?" placeholder="When he finally dropped the mask and revealed his true intentions..." style={{ minHeight: '100px' }} />
    </BetaModuleContainer>
  );
};

export const ModuleBetaSkim = () => (
  <BetaModuleContainer title="B9. Skim Detection" purpose="Identify sections where the reader lost interest and fast-forwarded.">
    <div style={{ padding: '16px', backgroundColor: 'rgba(255, 107, 129, 0.05)', borderLeft: '3px solid #ff6b81', marginBottom: '24px' }}>
      <Input type="textarea" label="Where I started skimming" placeholder="Pages 5 through 7 during the history lesson..." style={{ minHeight: '80px', marginBottom: 0 }} />
    </div>

    <div style={{ marginBottom: '16px' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Why I skimmed (Select all that apply)</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {['Too much description', 'Repetition', 'Low tension', 'Confusion / Too convoluted', 'Lack of stakes'].map(tag => (
          <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ accentColor: '#ff6b81', transform: 'scale(1.2)' }} />
            {tag}
          </label>
        ))}
      </div>
    </div>
    <Input type="textarea" label="Detailed skimming reason" placeholder="I didn't need a three-page description of the dress before she even left the room..." style={{ minHeight: '80px' }} />
  </BetaModuleContainer>
);

export const ModuleBetaFavorite = () => (
  <BetaModuleContainer title="B10. Favorite Moments" purpose="Log the absolute best, most impactful sections of the chapter.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
      <Input type="textarea" label="Standout Lines" placeholder="'I would burn this world to ash before I let them touch you...'" style={{ minHeight: '60px' }} />
      <Input type="textarea" label="Strongest Scene" placeholder="The confrontation in the library." style={{ minHeight: '60px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input type="textarea" label="Most Emotional Moment" placeholder="Her realization that she was betrayed." style={{ minHeight: '80px', marginBottom: 0 }} />
        <Input type="textarea" label="Best Tension Moment" placeholder="When he stepped into her personal space and refused to move." style={{ minHeight: '80px', marginBottom: 0 }} />
      </div>
    </div>
  </BetaModuleContainer>
);
