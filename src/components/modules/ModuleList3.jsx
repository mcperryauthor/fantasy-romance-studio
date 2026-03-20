import React from 'react';
import { ModuleContainer } from './ModuleContainer';
import { Input } from '../ui/Input';

export const ModuleRomanceArc = () => (
  <ModuleContainer title="8. Romance Arc" purpose="Track the progression and emotional shift of the central relationship.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: '16px' }}>
      <Input label="Current Stage of Relationship" placeholder="e.g. Reluctant Allies, Hostile Interdependence..." />
      <Input label="Progression from Previous Chapter" placeholder="e.g. Removed physical barrier, confessed a secret..." />
      <Input label="Obstacle Strength" placeholder="e.g. High - She still believes he killed her brother." />
      <Input label="Emotional Shift" placeholder="e.g. Shift from pure resentment to fearful curiosity." />
    </div>
    
    <div style={{ borderTop: '1px solid var(--color-plum-dark)', paddingTop: '24px' }}>
      <h4 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Add Note</h4>
      <Input type="textarea" placeholder="Detailed notes on how the relationship evolved in this chapter..." style={{ minHeight: '120px' }} />
    </div>
  </ModuleContainer>
);

export const ModuleRomanceTension = () => (
  <ModuleContainer title="9. Romance Tension" purpose="Evaluate the effectiveness and type of tension present in the scenes.">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--spacing-lg)' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Tension Type</label>
      <select style={{ backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: 'var(--color-text-main)', outline: 'none' }}>
        <option>Emotional</option>
        <option>Physical</option>
        <option>Psychological</option>
        <option>Mixed</option>
        <option>None</option>
      </select>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
      <Input type="textarea" label="Strongest Moment" placeholder="Paste or describe the most effective tension beat..." style={{ minHeight: '80px' }} />
      <div style={{ padding: '16px', backgroundColor: 'rgba(123, 44, 58, 0.05)', borderLeft: '3px solid var(--color-burgundy)' }}>
        <Input type="textarea" label="Weakest Moment" placeholder="Where did the tension deflate?" style={{ minHeight: '80px', marginBottom: 0 }} />
      </div>
      <Input type="textarea" label="Missed Escalation Opportunity" placeholder="How could the tension have been pushed further here?" style={{ minHeight: '80px' }} />
    </div>
  </ModuleContainer>
);

export const ModuleRepetitionScan = () => (
  <ModuleContainer title="10. Repetition Scan" purpose="Detect and evaluate recurring elements loop.">
    {['Words', 'Phrases', 'Sentence Structures', 'Imagery'].map(category => (
      <div key={category} style={{ marginBottom: '32px' }}>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-gold-muted)', borderBottom: '1px solid var(--color-plum-dark)', paddingBottom: '8px' }}>Tracking: {category}</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', alignItems: 'flex-start' }}>
            <Input label="Item Logged" placeholder="e.g. 'shadow coiled'..." />
            <Input label="Frequency" type="number" placeholder="4" />
            <Input label="Location Note" placeholder="Pg 12, 14, 15" />
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Intentionality</label>
              <select style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
                <option>Accidental / Lazy</option>
                <option>Intentional Motif</option>
                <option>Requires Variation</option>
              </select>
            </div>
            <div style={{ flex: 2 }}>
              <Input label="Variation Suggestion (If replacing)" placeholder="e.g. Try referencing the physical cold rather than just visual 'shadow'..." />
            </div>
          </div>
        </div>
      </div>
    ))}
  </ModuleContainer>
);
