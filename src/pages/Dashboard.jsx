import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BookOpen, FileText, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const statCardStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const iconContainerStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--color-obsidian)',
    border: '1px solid var(--color-plum-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-gold-muted)',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-xl)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Studio Dashboard</h1>
          <p className="text-muted">Welcome to the Revision Studio. Start a new chapter review below.</p>
        </div>
        <Button onClick={() => navigate('/new-review')}>+ New Chapter Review</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
        <Card glow>
          <div style={statCardStyle}>
            <div style={iconContainerStyle}><BookOpen size={24} /></div>
            <div>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>0</div>
              <div className="text-muted" style={{ fontSize: '0.875rem' }}>Chapters Reviewed</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={statCardStyle}>
            <div style={iconContainerStyle}><Clock size={24} /></div>
            <div>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>0</div>
              <div className="text-muted" style={{ fontSize: '0.875rem' }}>Priority Revisions</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={statCardStyle}>
            <div style={iconContainerStyle}><FileText size={24} /></div>
            <div>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>0</div>
              <div className="text-muted" style={{ fontSize: '0.875rem' }}>Reports Ready</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={statCardStyle}>
            <div style={iconContainerStyle}><CheckCircle size={24} /></div>
            <div>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>--</div>
              <div className="text-muted" style={{ fontSize: '0.875rem' }}>Avg. Tension Score</div>
            </div>
          </div>
        </Card>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>Recent Chapter Reviews</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <Card padding="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', border: '1px dashed var(--color-plum-dark)', backgroundColor: 'transparent', boxShadow: 'none' }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>No chapter reviews have been generated yet.</p>
          <Button variant="secondary" onClick={() => navigate('/new-review')}>Start Your First Review</Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
