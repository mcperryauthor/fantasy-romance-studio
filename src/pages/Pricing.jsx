import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Pricing = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', paddingTop: '64px' }}>
      <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Premium Editorial Access</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '64px' }}>
        Unlock unlimited chapter reviews, custom style calibrations, and exportable PDFs.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Standard</h2>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold-muted)', marginBottom: '24px' }}>$19<span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/mo</span></div>
          <ul style={{ listStyle: 'none', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <li>✓ Unlimited Chapter Reviews</li>
            <li>✓ 1 Style Profile Calibration</li>
            <li>✓ Development & Pacing Modules</li>
          </ul>
          <Button variant="secondary" style={{ width: '100%' }}>Choose Standard</Button>
        </Card>

        <Card glow style={{ border: '1px solid var(--color-burgundy)' }}>
           <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-burgundy)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>Most Popular</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Studio Pro</h2>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: '#fff', marginBottom: '24px' }}>$39<span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/mo</span></div>
          <ul style={{ listStyle: 'none', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <li>✓ Unlimited Chapter Reviews</li>
            <li>✓ Unlimited Style Profiles</li>
            <li>✓ Advanced Darkness/Tension Tracking</li>
            <li>✓ Exportable Premium PDF Reports</li>
          </ul>
          <Button variant="primary" style={{ width: '100%' }}>Choose Pro</Button>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
