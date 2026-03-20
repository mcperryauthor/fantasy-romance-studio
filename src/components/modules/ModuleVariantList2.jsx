import React from 'react';
import { VariantContainer } from './VariantContainer';
import { Input } from '../ui/Input';

export const ModuleVariantCharacterDriven = () => (
  <VariantContainer
    title="V5. Character-Driven Reader"
    profile="Deeply invested in character psychology. Prioritizes emotional authenticity, character growth, and internal conflict."
    lowTolerance="Shallow characters, inconsistent emotions, plot driving character instead of character driving plot."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Input label="Did the character feel real?" placeholder="Were their actions messy but understandable?" />
      <Input label="Were their emotions believable?" placeholder="Did their trauma response make sense here?" />
      <Input label="Did their actions make sense?" placeholder="Why did they choose to lie when the truth was easier?" />
      
      <div style={{ marginTop: '16px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Character Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['authentic', 'flat', 'inconsistent', 'compelling'].map(tag => (
            <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'var(--color-charcoal-light)', padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--color-plum-dark)', fontSize: '0.8rem' }}>
              <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </div>
  </VariantContainer>
);

export const ModuleVariantPacingSensitive = () => (
  <VariantContainer
    title="V6. Pacing-Sensitive Reader"
    profile="Highly sensitive to pacing issues. Notices narrative drag immediately. Wants high momentum."
    lowTolerance="Filler, repetition, slow sections, self-indulgent descriptions that stall the plot."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Input label="Where did pacing drop?" placeholder="The entire cart ride across the city felt unnecessary." />
      <Input label="Where did I skim?" placeholder="The political explanation of the three courts." />
      <Input label="Did anything feel repetitive?" placeholder="We already knew she was afraid of the dark; didn't need reminding." />
      
      <div style={{ marginTop: '16px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Pacing Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['dragging', 'tight', 'rushed', 'uneven'].map(tag => (
            <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'var(--color-charcoal-light)', padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--color-plum-dark)', fontSize: '0.8rem' }}>
              <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </div>
  </VariantContainer>
);

export const ModuleVariantProseFocused = () => (
  <VariantContainer
    title="V7. Prose-Focused Reader"
    profile="Pays close attention to writing quality, voice, metaphor, and sentence rhythm. Values distinctive styling."
    lowTolerance="Clunky sentences, generic language, repetitive phrasing, weak verbs, 'telling' instead of 'showing'."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Input label="Did the prose feel distinctive?" placeholder="Did it sound uniquely like this author?" />
      <Input label="Did anything feel generic or flat?" placeholder="Overused phrases like 'let out a breath she didn't know she was holding'." />
      <Input label="Was the writing immersive?" placeholder="Did the sensory details pull me perfectly into the scene?" />
      
      <div style={{ marginTop: '16px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Prose Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['lyrical', 'flat', 'repetitive', 'immersive'].map(tag => (
            <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'var(--color-charcoal-light)', padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--color-plum-dark)', fontSize: '0.8rem' }}>
              <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </div>
  </VariantContainer>
);

export const ModuleVariantBalance = () => (
  <VariantContainer
    title="V8. Fantasy Romance Balance Reader"
    profile="Expects equal strength in both fantasy and romance arcs. Wants both the world stakes and emotional stakes to matter."
    lowTolerance="Romance completely overshadowing the fantasy plot, or world politics completely stalling the romance."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Input label="Did romance and plot support each other?" placeholder="When the assassin attacked, did it actually further their relationship?" />
      <Input label="Did one overpower the other?" placeholder="The plot stopped completely for them to flirt in the library." />
      
      <div style={{ marginTop: '16px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Balance Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['balanced', 'romance-heavy', 'plot-heavy', 'disconnected'].map(tag => (
            <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'var(--color-charcoal-light)', padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--color-plum-dark)', fontSize: '0.8rem' }}>
              <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </div>
  </VariantContainer>
);
