import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Settings = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Preferences & Settings</h1>
        <p className="text-muted">Manage your editorial defaults and workspace configuration.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <Card>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Review Defaults</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Default Review Mode</label>
              <select style={{ width: '100%', backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', borderRadius: 'var(--radius-sm)', padding: '12px', color: 'var(--color-text-main)', outline: 'none' }}>
                <option>Full Diagnostic</option>
                <option>Developmental Review</option>
                <option>Prose Review</option>
              </select>
            </div>
            <div>
              <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Default Style Profile</label>
              <select style={{ width: '100%', backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', borderRadius: 'var(--radius-sm)', padding: '12px', color: 'var(--color-text-main)', outline: 'none' }}>
                <option>Author's Core Style (Dark Luxe)</option>
                <option>None (Strict Ruleset)</option>
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Export Preferences</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-burgundy)', width: '18px', height: '18px' }} />
              Include 'AI-Like Writing Tells' section in exported PDFs
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-burgundy)', width: '18px', height: '18px' }} />
              Include circular score indicators in print layouts
            </label>
          </div>
        </Card>
      </div>
      
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="primary">Save Preferences</Button>
      </div>
    </div>
  );
};

export default Settings;
