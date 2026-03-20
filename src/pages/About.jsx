import React from 'react';

const About = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '100px' }}>
      <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>About The Editorial Grimoire</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
        This is a structured manuscript review and developmental editing workspace built specifically for fantasy romance, romantasy, dark fantasy romance, and emotionally intense commercial fiction.
      </p>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', lineHeight: '1.8', marginTop: '24px' }}>
        Our purpose is to help authors review chapters in a highly organized way, score core storytelling categories, track prose issues, and compare the work against intentional voice choices without relying on automated AI writing generation.
      </p>
    </div>
  );
};

export default About;
