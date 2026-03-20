import React, { useState } from 'react';
import { BetaModuleContainer, EmotionSlider, BetaReactionTag } from './BetaModuleContainer';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const ModuleBetaLiveReaction = () => (
  <BetaModuleContainer title="B1. Live Reaction Tracker" purpose="Simulate real-time emotional and engagement tracking across the chapter.">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {[1, 2].map(seg => (
        <div key={seg} style={{ backgroundColor: 'var(--color-charcoal)', padding: '24px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#ffb8b8' }}>Reading Segment {seg}</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <EmotionSlider label="Engagement Level" color="#2ecc71" />
            <EmotionSlider label="Emotional Intensity" color="#ff6b81" />
            <EmotionSlider label="Confusion Level" color="#ff9f43" />
            <EmotionSlider label="Tension Level" color="#a88b5d" />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Reaction Tags</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['hooked', 'intrigued', 'emotionally invested', 'confused', 'bored', 'skimming', 'overwhelmed', 'obsessed', 'frustrated', 'satisfied'].map(tag => (
                <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'var(--color-charcoal-light)', padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--color-plum-dark)', fontSize: '0.8rem' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} />
                  {tag}
                </label>
              ))}
            </div>
          </div>
          
          <Input type="textarea" label="What I felt here" placeholder="Furious at him, but also kind of into it..." style={{ minHeight: '60px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input type="textarea" label="What pulled me in" placeholder="The eye contact across the room..." style={{ minHeight: '60px', marginBottom: 0 }} />
            <Input type="textarea" label="What lost me" placeholder="The suddenly long explanation about the treaty..." style={{ minHeight: '60px', marginBottom: 0 }} />
          </div>
        </div>
      ))}
      <Button variant="secondary" style={{ alignSelf: 'flex-start' }}>+ Add Segment</Button>
    </div>
  </BetaModuleContainer>
);

export const ModuleBetaHook = () => (
  <BetaModuleContainer title="B2. Hook & Opening Reaction" purpose="Capture the immediate emotional reaction to the chapter's first beats.">
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '16px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
        <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)', transform: 'scale(1.2)' }} />
        Did the opening hook me?
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
        <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)', transform: 'scale(1.2)' }} />
        Would I keep reading?
      </label>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>How quickly did I get invested?</label>
      <select style={{ padding: '12px', backgroundColor: 'var(--color-charcoal-light)', color: '#fff', border: '1px solid var(--color-plum-dark)', borderRadius: '4px' }}>
        <option>First Paragraph</option>
        <option>First Page</option>
        <option>Took a while</option>
        <option>Never did</option>
      </select>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <Input type="textarea" label="What worked" placeholder="Loved the sudden physical proximity..." style={{ minHeight: '80px' }} />
      <Input type="textarea" label="What didn't" placeholder="The info-dump in paragraph two..." style={{ minHeight: '80px' }} />
    </div>
    <Input type="textarea" label="What's missing" placeholder="I needed to know where they were standing relative to the door..." style={{ minHeight: '80px' }} />
  </BetaModuleContainer>
);

export const ModuleBetaImmersion = () => (
  <BetaModuleContainer title="B3. Immersion Check" purpose="Track visual and sensory grounding in the scene.">
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Was I grounded in the world?</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did anything pull me out?</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did the setting feel real?</label>
      </div>
    </div>
    
    <Input type="textarea" label="Immersion Breaks" placeholder="When I suddenly realized I didn't know what room they were in..." style={{ minHeight: '80px' }} />
    <Input type="textarea" label="Confusing Elements" placeholder="Wait, how does the magic door work again?" style={{ minHeight: '80px' }} />
    <Input type="textarea" label="Overly abstract sections" placeholder="The metaphor about the 'ocean of stars' lasted way too long..." style={{ minHeight: '80px' }} />
  </BetaModuleContainer>
);

export const ModuleBetaCharacterConnection = () => (
  <BetaModuleContainer title="B4. Character Connection" purpose="Assess the emotional bond between the reader and the POV.">
    <EmotionSlider label="Connection Level" color="#2ecc71" />
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', margin: '24px 0' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did I connect with the POV?</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did their emotions feel real?</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did their reactions make sense?</label>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <Input type="textarea" label="Where connection was strongest" placeholder="When she finally snapped back at him." style={{ minHeight: '100px' }} />
      <Input type="textarea" label="Where it weakened" placeholder="When she cried over the ruined dress, it felt petty." style={{ minHeight: '100px' }} />
    </div>
  </BetaModuleContainer>
);

export const ModuleBetaRomanceExperience = () => (
  <BetaModuleContainer title="B5. Romance Experience" purpose="Evaluate the visceral impact of the romantic chemistry and tension.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
      <EmotionSlider label="Chemistry Rating" color="#ff6b81" />
      <EmotionSlider label="Tension Rating" color="#a88b5d" />
    </div>

    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '24px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did I feel the chemistry?</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did I believe the attraction?</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} /> Did tension build (vs repeat)?</label>
      </div>
    </div>

    <div style={{ marginBottom: '16px' }}>
      <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Romance Tags</label>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['addictive', 'slow burn', 'repetitive', 'flat', 'intense', 'frustrating (good)', 'frustrating (bad)'].map(tag => (
          <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'var(--color-charcoal-light)', padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--color-plum-dark)', fontSize: '0.8rem' }}>
            <input type="checkbox" style={{ accentColor: 'var(--color-burgundy)' }} />
            {tag}
          </label>
        ))}
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <Input type="textarea" label="Best romantic moment" placeholder="When he instinctively shielded her from the glass..." style={{ minHeight: '100px' }} />
      <Input type="textarea" label="Weakest romantic moment" placeholder="The dialogue felt forced in the hallway..." style={{ minHeight: '100px' }} />
    </div>
  </BetaModuleContainer>
);
