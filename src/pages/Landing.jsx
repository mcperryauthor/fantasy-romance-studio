import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="full-page" style={{ 
      background: 'linear-gradient(to bottom, var(--color-obsidian) 0%, #100b12 100%)',
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(123, 44, 58, 0.15) 0%, transparent 50%)',
    }}>
      <header style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '700' }}>
          The Editorial Grimoire
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button variant="primary" onClick={() => navigate('/style-profile')}>Enter Studio</Button>
        </div>
      </header>
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '24px', textAlign: 'center', maxWidth: '800px', lineHeight: '1.1' }}>
          A revision studio built for <span className="text-burgundy">fantasy romance</span> authors.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '40px', textAlign: 'center', maxWidth: '600px' }}>
          Track pacing, tension, voice, and prose with a system designed for romantasy and emotionally intense commercial fiction.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/style-profile')}>Start Your First Review</Button>
          <Button variant="outline" size="lg">Explore the Method</Button>
        </div>
      </main>
    </div>
  );
};

export default Landing;
