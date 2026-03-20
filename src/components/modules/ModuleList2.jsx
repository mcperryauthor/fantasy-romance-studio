import React from 'react';
import { ModuleContainer } from './ModuleContainer';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const ChecklistGrid = ({ items }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
    {items.map(item => (
      <label key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '0.9rem' }}>
        <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)', marginTop: '4px' }} />
        {item}
      </label>
    ))}
  </div>
);

export const ModuleProseFlags = () => (
  <ModuleContainer title="5. Prose Flags" purpose="Log line-level or paragraph-level execution errors.">
    <div style={{ marginBottom: '16px' }}>
      <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Common Prose Patterns to Watch For</h4>
      <ChecklistGrid items={[
        'Awkward phrasing', 'Overwritten lines', 'Underwritten lines', 'Vague language', 
        'Cliché phrasing', 'Weak verbs', 'Adjective stacking', 'Redundant phrasing', 'Tonal inconsistency'
      ]} />
    </div>

    <div style={{ borderLeft: '3px solid var(--color-plum-border)', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '1.1rem' }}>Log Issue</h4>
      <Input type="textarea" label="Flagged Text" placeholder="Paste the problematic line here..." style={{ minHeight: '80px' }} />
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Issue Type</label>
          <select style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
            <option>Awkward phrasing</option><option>Overwritten lines</option><option>Cliché</option><option>Redundancy</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Severity</label>
          <select style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
            <option>Minor</option><option>Moderate</option><option>Significant</option>
          </select>
        </div>
      </div>
      <Input type="textarea" label="Revision Suggestion" placeholder="How to rewrite or correct..." style={{ minHeight: '80px' }} />
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}><Button variant="secondary" size="sm">+ Add Another Prose Flag</Button></div>
    </div>
  </ModuleContainer>
);

export const ModuleAITells = () => (
  <ModuleContainer title="6. AI-Like Writing Tells" purpose="Identify patterns commonly found in flattened, generated, or artificial-sounding prose.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
      <div>
        <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--color-burgundy)' }}>Sentence Patterns</h4>
        <ChecklistGrid items={['Repetitive openings', 'Repetitive structure', 'Uniform sentence length', 'Overuse of em dashes', 'Predictable contrast phrasing']} />
      </div>
      <div>
        <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--color-gold-muted)' }}>Prose Patterns</h4>
        <ChecklistGrid items={['Vague emotional language', 'Generic intensity words', 'Abstract emotion without specificity', 'Recycled imagery', 'Empty atmosphere']} />
      </div>
      <div>
        <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--color-text-main)' }}>Voice & Romance Patterns</h4>
        <ChecklistGrid items={['Interchangeable voice', 'Templated reactions', 'Detached narration', 'Repeated attraction phrasing', 'Stagnant tension loops']} />
      </div>
      <div>
        <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#ff9f43' }}>Fantasy Patterns</h4>
        <ChecklistGrid items={['Generic fantasy language', 'Empty grandeur', 'Aesthetic-only worldbuilding']} />
      </div>
    </div>

    <div style={{ borderTop: '1px solid var(--color-plum-dark)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '1.1rem' }}>Flag Pattern</h4>
      <Input type="textarea" label="Example" placeholder="Paste the artificial-sounding text here..." style={{ minHeight: '80px' }} />
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Severity</label>
          <select style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
            <option>Minor</option><option>Moderate</option><option>Significant</option>
          </select>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: '22px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ accentColor: 'var(--color-gold-muted)', width: '18px', height: '18px' }} />
            <span style={{ fontWeight: '500' }}>Likely Intentional</span>
          </label>
        </div>
      </div>
      <Input type="textarea" label="Revision Note" placeholder="How to rewrite to be more human, grounded, and specific..." style={{ minHeight: '80px' }} />
    </div>
  </ModuleContainer>
);

export const ModuleVoiceConsistency = () => (
  <ModuleContainer title="7. Voice Consistency" purpose="Evaluate whether the POV character sounds distinct, aligned, and non-intrusive.">
    <Input type="textarea" label="POV Voice Description" placeholder="Expected voice traits from Style Profile..." style={{ minHeight: '80px' }} />
    <h4 style={{ fontSize: '1rem', marginBottom: '12px', marginTop: '16px' }}>Voice Health Checklist</h4>
    <ChecklistGrid items={[
      'Distinct voice', 'Consistent tone', 'Character-rooted narration', 
      'No modern intrusion', 'Emotional alignment'
    ]} />
    <Input type="textarea" label="Consistency Issues Logged" placeholder="Note moments where the character sounded like someone else or modern slang leaked in..." style={{ minHeight: '120px', marginTop: '24px' }} />
    <Input type="textarea" label="Comparison to Style Profile Notes" placeholder="Does this match their historical dialogue pattern?" style={{ minHeight: '80px' }} />
  </ModuleContainer>
);
