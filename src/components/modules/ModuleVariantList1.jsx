import React from 'react';
import { VariantContainer } from './VariantContainer';
import { Input } from '../ui/Input';

export const ModuleVariantDarkRomance = () => (
  <VariantContainer
    title="V1. Dark Romance Obsession Reader"
    profile="Loves possessive, obsessive, dangerous love interests. Craves intensity, control, emotional volatility, psychological tension, and power imbalance."
    lowTolerance="Soft romance, safe dynamics, lack of dominance or obsession."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Input label="Was the love interest dangerous enough?" placeholder="Did he feel like an actual threat, or just brooding?" />
      <Input label="Did the tension feel consuming or mild?" placeholder="Was it suffocatingly intense?" />
      <Input label="Did I feel emotionally overwhelmed (in a good way)?" placeholder="Did the power dynamics spike my anxiety?" />
      
      <div style={{ marginTop: '16px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Dark Romance Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['obsessive', 'consuming', 'dangerous', 'tame', 'underwhelming'].map(tag => (
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

export const ModuleVariantWorldImmersion = () => (
  <VariantContainer
    title="V2. Romantasy World Immersion Reader"
    profile="Loves rich worldbuilding, immersive fantasy settings, lore, politics, and complex magic systems."
    lowTolerance="Vague worldbuilding, confusing lore, shallow settings, 'white room' syndrome."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Input label="Did the world feel alive?" placeholder="Were there sensory details that grounded the magic?" />
      <Input label="Was I grounded in the setting?" placeholder="Could I visualize the room and the atmosphere?" />
      <Input label="Did anything confuse me about the world?" placeholder="Wait, how does the magic system actually work here?" />
      
      <div style={{ marginTop: '16px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Immersion Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['immersive', 'vague', 'confusing', 'richly built', 'underdeveloped'].map(tag => (
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

export const ModuleVariantSlowBurn = () => (
  <VariantContainer
    title="V3. Slow Burn Romance Reader"
    profile="Loves gradual tension, emotional buildup, longing, restraint, and delayed gratification."
    lowTolerance="Instant attraction, rushed romance, unearned physical escalation."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Input label="Did the tension build naturally?" placeholder="Did it feel earned or forced?" />
      <Input label="Did anything feel rushed?" placeholder="Did they touch too soon?" />
      <Input label="Was the longing strong enough?" placeholder="Could I feel how much they wanted to cross the room but couldn't?" />
      
      <div style={{ marginTop: '16px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Slow Burn Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['slow burn', 'rushed', 'satisfying tension', 'weak buildup'].map(tag => (
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

export const ModuleVariantBookTok = () => (
  <VariantContainer
    title="V4. BookTok Viral Reader"
    profile="Reads for addictive, high-impact moments. Loves quotable lines, emotional spikes, visual aesthetics."
    lowTolerance="Slow openings, low engagement, forgettable prose, boring midpoints."
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Input label="Would I screenshot or quote this?" placeholder="Paste the line that would go on an aesthetic video..." />
      <Input label="Would this chapter's trope go viral?" placeholder="E.g., 'Who did this to you?' moment executed perfectly." />
      <Input label="Where would I scroll away?" placeholder="The exact moment I would close the app or the book..." />
      
      <div style={{ marginTop: '16px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Viral Tags</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['viral', 'forgettable', 'addictive', 'scroll-risk'].map(tag => (
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
