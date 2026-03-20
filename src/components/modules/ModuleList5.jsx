import React from 'react';
import { ModuleContainer } from './ModuleContainer';
import { Input } from '../ui/Input';

export const ModuleMarketability = () => (
  <ModuleContainer title="15. Marketability / Hook" purpose="Assess the commercial readability, addictive progression, and hook factors.">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Opening Hook Strength</label>
        <select style={{ padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
          <option>In Medias Res / Immediate Action</option>
          <option>High Concept Thought / Curiosity</option>
          <option>Atmospheric Slow Build</option>
          <option>Weak / Info-dump Opening</option>
        </select>
      </div>
      
      <Input type="textarea" label="Strongest Line / Quote" placeholder="A line that sells the book's voice or trope..." style={{ minHeight: '80px' }} />
      
      <div style={{ padding: '16px', backgroundColor: 'rgba(123, 44, 58, 0.05)', borderLeft: '3px solid var(--color-burgundy)' }}>
        <Input type="textarea" label="Scroll-Away / Put-Down Risk Point" placeholder="Where is a reader most likely to close the book? Why?" style={{ minHeight: '80px', marginBottom: 0 }} />
      </div>
      
      <Input type="textarea" label="Bingeability Note" placeholder="Does the chapter ending propel the reader into the next? How?" style={{ minHeight: '80px' }} />
    </div>
  </ModuleContainer>
);

export const ModuleWorldLoreMagic = () => (
  <ModuleContainer title="16. World / Lore / Magic" purpose="Evaluate the functional clarity and immersion of fantastical elements.">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Immersion Level</label>
      <select style={{ padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
        <option>Visceral & Grounded</option>
        <option>Adequate</option>
        <option>Floating / White Room</option>
        <option>Info-dump Heavy</option>
      </select>
    </div>
    
    <Input type="textarea" label="Worldbuilding Clarity Issues" placeholder="List any terms introduced without context, or setting details that lacked sensory anchoring..." style={{ minHeight: '100px' }} />
    <Input type="textarea" label="Confusion Points (Lore & Magic)" placeholder="Where did the magic system rules feel fuzzy or convenient?" style={{ minHeight: '100px' }} />
  </ModuleContainer>
);

export const ModuleFinalSummary = () => (
  <ModuleContainer title="17. Final Summary" purpose="Provide the definitive wrap-up before proceeding to line edits and the final report.">
    <Input type="textarea" label="Overall Diagnosis Paragraph" placeholder="A high-level synthesis of this chapter's health..." style={{ minHeight: '150px' }} />
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginTop: '8px' }}>
      <Input type="textarea" label="Biggest Strength" placeholder="The single most successful element..." style={{ minHeight: '80px' }} />
      <Input type="textarea" label="Biggest Weakness" placeholder="The single most damaging flaw..." style={{ minHeight: '80px' }} />
    </div>
    
    <div style={{ marginTop: '16px', padding: '24px', backgroundColor: 'var(--color-charcoal-light)', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
      <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-text-heading)' }}>Top 3 Revision Priorities</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><span style={{ color: 'var(--color-gold-muted)', fontWeight: 'bold' }}>1.</span> <Input placeholder="E.g. Cut the exposition dump directly into action." style={{ flex: 1, marginBottom: 0 }} /></div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><span style={{ color: 'var(--color-gold-muted)', fontWeight: 'bold' }}>2.</span> <Input placeholder="..." style={{ flex: 1, marginBottom: 0 }} /></div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><span style={{ color: 'var(--color-gold-muted)', fontWeight: 'bold' }}>3.</span> <Input placeholder="..." style={{ flex: 1, marginBottom: 0 }} /></div>
      </div>
    </div>
  </ModuleContainer>
);
