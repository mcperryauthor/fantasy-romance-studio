import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const NewReview = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState('Full Diagnostic');

  const reviewModes = [
    'Full Diagnostic', 'Developmental Review', 'Prose Review', 'Romance Arc Review', 
    'Pacing Review', 'Voice Consistency Review', 'Repetition Review', 
    'AI-Like Pattern Review', 'Marketability / Hook Review'
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xl)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>New Chapter Review</h1>
          <p className="text-muted">Start a structured review for a new chapter.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
          <Button variant="primary" onClick={() => navigate('/workspace/new')}>Start Review</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
        {/* Main Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card>
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)' }}>Manuscript Metadata</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 var(--spacing-md)' }}>
              <Input label="Manuscript Title" placeholder="e.g. Crown of Shadow and Glass" />
              <Input label="Series Title (Optional)" placeholder="e.g. The Immortal King" />
              <Input label="Chapter Title" placeholder="e.g. The Blood Tithe" />
              <Input label="Chapter Number" type="number" placeholder="12" />
              <Input label="POV Character" placeholder="e.g. Elara" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-md)' }}>
                <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Draft Stage</label>
                <select style={{ backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: 'var(--color-text-main)', fontFamily: 'var(--font-sans)', outline: 'none' }}>
                  <option>First Draft</option>
                  <option>Developmental Edit</option>
                  <option>Line Edit</option>
                  <option>Final Polish</option>
                </select>
              </div>
            </div>
            <Input label="Subgenre / Tags" placeholder="e.g. Dark Romantasy, Enemies to Lovers, Slow Burn" />
          </Card>

          <Card>
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)' }}>Chapter Text Overview</h2>
            <Input label="Optional Chapter Summary" type="textarea" placeholder="Briefly describe what happens in this chapter..." />
            <Input label="Manuscript Excerpt or Full Text" type="textarea" placeholder="Paste the chapter text here for review..." style={{ minHeight: '300px' }} />
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card glow>
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Configuration</h2>
            
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Linked Style Profile</label>
              <select style={{ width: '100%', backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', borderRadius: 'var(--radius-sm)', padding: '12px', color: 'var(--color-text-main)', fontFamily: 'var(--font-sans)', outline: 'none' }}>
                <option>Author's Core Style (Dark Luxe)</option>
                <option>High Fantasy Epic Outline</option>
                <option>Create New Profile...</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-gold-muted)', marginTop: '8px' }}>Review will be calibrated against this profile's rules.</p>
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Review Mode Defaults</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {reviewModes.map(mode => (
                  <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
                    <input 
                      type="radio" 
                      name="reviewMode" 
                      checked={activeMode === mode}
                      onChange={() => setActiveMode(mode)}
                      style={{ accentColor: 'var(--color-burgundy)' }}
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewReview;
