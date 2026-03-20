import React from 'react';
import { ModuleContainer } from './ModuleContainer';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const ModulePacingBreakdown = () => (
  <ModuleContainer title="11. Pacing Breakdown" purpose="Break the chapter into segments to map momentum and drag risks.">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {[1, 2].map(seg => (
        <div key={seg} style={{ backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            Segment {seg}
            <Button variant="ghost" size="sm" style={{ color: '#ff6b81' }}>Remove</Button>
          </h4>
          
          <Input label="Segment Label / Hook" placeholder="e.g. The Walk to the Throne Room" />
          <Input label="Narrative Purpose" placeholder="e.g. Establish the scale of the palace and raise anxiety." />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Momentum (1-10)</label>
              <input type="number" min="1" max="10" placeholder="5" style={{ padding: '12px', backgroundColor: 'var(--color-obsidian)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Tension (1-10)</label>
              <input type="number" min="1" max="10" placeholder="7" style={{ padding: '12px', backgroundColor: 'var(--color-obsidian)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Drag Risk</label>
              <select style={{ padding: '12px', backgroundColor: 'var(--color-obsidian)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
          </div>
        </div>
      ))}
      <Button variant="secondary" style={{ alignSelf: 'flex-start' }}>+ Add Segment</Button>
    </div>
  </ModuleContainer>
);

export const ModuleEmotionalMovement = () => (
  <ModuleContainer title="12. Emotional Movement" purpose="Track the POV character's internal state evolution.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
      <Input label="Starting Emotion" placeholder="e.g. Resigned apathy." />
      <Input label="Midpoint Emotion" placeholder="e.g. Spiking panic mixed with morbid curiosity." />
      <Input label="Ending Emotion" placeholder="e.g. Cold, calculating terror." />
      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-plum-dark)' }}>
        <Input type="textarea" label="Key Shifts" placeholder="What specific action caused the shift from apathy to panic?" style={{ minHeight: '100px' }} />
      </div>
    </div>
  </ModuleContainer>
);

export const ModuleArcDensity = () => (
  <ModuleContainer title="13. Arc Density" purpose="Ensure the chapter is working on multiple layers simultaneously.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Plot Movement</label>
        <input type="range" min="1" max="10" style={{ accentColor: 'var(--color-burgundy)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Romance Movement</label>
        <input type="range" min="1" max="10" style={{ accentColor: 'var(--color-burgundy)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Character Movement</label>
        <input type="range" min="1" max="10" style={{ accentColor: 'var(--color-burgundy)' }} />
      </div>
    </div>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Final Classification</label>
      <select style={{ padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
        <option>Balanced (Working on multiple levels)</option>
        <option>Thin (Only pushing one element)</option>
        <option>Dense (Overloaded, hard to digest)</option>
      </select>
    </div>
  </ModuleContainer>
);

export const ModuleChapterPurpose = () => (
  <ModuleContainer title="14. Chapter Purpose" purpose="Compare the intended goal of the chapter against its executed reality.">
    <Input type="textarea" label="Intended Purpose" placeholder="What did you want this chapter to accomplish?" style={{ minHeight: '100px' }} />
    <Input type="textarea" label="Achieved Purpose" placeholder="Read honestly—what did the chapter ACTUALLY accomplish?" style={{ minHeight: '100px' }} />
    <Input type="textarea" label="Effectiveness Notes / Gaps" placeholder="Where did the execution fall short of the intent?" style={{ minHeight: '100px' }} />
  </ModuleContainer>
);
