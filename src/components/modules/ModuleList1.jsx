import React from 'react';
import { ModuleContainer } from './ModuleContainer';
import { Input } from '../ui/Input';

export const ModuleHighLevel = () => (
  <ModuleContainer title="1. High-Level Chapter Diagnosis" purpose="Identify the core function of the chapter and assess its fundamental effectiveness.">
    <Input label="One-Sentence Chapter Summary" placeholder="e.g. Elara discovers the blood tithe's true cost during the ritual." />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Core Function</label>
        <select style={{ backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: 'var(--color-text-main)', outline: 'none' }}>
          <option>Inciting Incident</option>
          <option>Rising Action / Escalation</option>
          <option>Midpoint / Reversal</option>
          <option>Dark Night of the Soul</option>
          <option>Climax</option>
          <option>Resolution / Denouement</option>
          <option>Transitional / Resting</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Does this chapter change the story state?</label>
        <select style={{ backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: 'var(--color-text-main)', outline: 'none' }}>
          <option>Yes — Significantly</option>
          <option>Yes — Minorly</option>
          <option>No — Stagnant</option>
        </select>
      </div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginTop: '8px' }}>
      <div style={{ padding: '16px', backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', borderRadius: 'var(--radius-md)' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '1rem', color: 'var(--color-text-heading)' }}>Functional Checklist</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Moves plot forward</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Moves romance forward</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Reveals character</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Increases tension</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Sets up future conflict</label>
        </div>
      </div>
      <Input type="textarea" label="If this chapter were removed, what would be lost?" placeholder="Force an honest evaluation of the chapter's necessity..." style={{ minHeight: '120px' }} />
    </div>
  </ModuleContainer>
);

export const ModuleStrengths = () => (
  <ModuleContainer title="2. Strengths" purpose="Identify what is working well so it is not accidentally edited out." hideScore>
    {[1, 2, 3].map(i => (
      <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: i !== 3 ? '1px solid var(--color-plum-dark)' : 'none' }}>
        <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold-muted)', fontWeight: 'bold' }}>{i}</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input label="Core Strength" placeholder="e.g. The visceral description of the throne room..." />
          <Input label="Why it works" placeholder="e.g. Grounded Elara's sensory limitations in a new way." />
        </div>
      </div>
    ))}
  </ModuleContainer>
);

export const ModuleTopProblems = () => (
  <ModuleContainer title="3. Top Problems" purpose="Log the most significant issues that need addressing before line edits." hideScore>
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', gap: '16px', paddingBottom: '16px', borderBottom: i !== 5 ? '1px solid var(--color-plum-dark)' : 'none' }}>
        <Input label={`Issue ${i}`} placeholder="e.g. Pacing drags during the exposition monologue on page 4." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Category</label>
          <select style={{ padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
            <option>Pacing</option><option>Romance</option><option>Prose</option><option>Voice</option><option>Plot</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Severity</label>
          <select style={{ padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
            <option>Minor</option><option>Moderate</option><option>Significant</option><option>Critical</option>
          </select>
        </div>
      </div>
    ))}
  </ModuleContainer>
);

export const ModulePriorityFixes = () => (
  <ModuleContainer title="4. Priority Fixes" purpose="Establish a clear, actionable hierarchy for the revision process." hideScore>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'var(--color-charcoal-light)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-plum-border)' }}>
          <span style={{ cursor: 'grab', color: 'var(--color-text-muted)' }}>☰</span>
          <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--color-burgundy)', fontWeight: 'bold' }}>{i}</span>
          <div style={{ flex: 1 }}><Input placeholder="Actionable revision instruction..." style={{ marginBottom: 0 }} /></div>
          <select style={{ padding: '8px 12px', backgroundColor: 'var(--color-obsidian)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
            <option>High Impact</option><option>Med Impact</option><option>Low Impact</option>
          </select>
        </div>
      ))}
    </div>
  </ModuleContainer>
);
