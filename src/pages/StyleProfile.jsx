import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Upload, FileText, Check, Settings } from 'lucide-react';

const StyleProfile = () => {
  const [activeTab, setActiveTab] = useState('calibration');

  const ToggleRow = ({ label, description, defaultChecked = false }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--color-plum-dark)' }}>
      <div>
        <div style={{ fontWeight: '500', marginBottom: '4px' }}>{label}</div>
        <div className="text-muted" style={{ fontSize: '0.875rem', maxWidth: '400px' }}>{description}</div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <input type="checkbox" defaultChecked={defaultChecked} style={{ width: '18px', height: '18px', accentColor: 'var(--color-burgundy)' }} />
      </label>
    </div>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xl)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Style & Voice Calibration</h1>
          <p className="text-muted">Define your intentional styling to prevent false flags in the review engine.</p>
        </div>
        <Button variant="primary">Save Profile</Button>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: 'var(--spacing-lg)' }}>
        <Button variant={activeTab === 'calibration' ? 'primary' : 'ghost'} onClick={() => setActiveTab('calibration')}>Definition & Calibration</Button>
        <Button variant={activeTab === 'summary' ? 'primary' : 'ghost'} onClick={() => setActiveTab('summary')}>Calibration Summary</Button>
      </div>

      {activeTab === 'calibration' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-xl)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <Card>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={20} className="text-burgundy" /> Stylistic Parameters
              </h2>
              <ToggleRow label="Lyrical prose is intentional" description="Do not over-flag poetic repetition or heavy styling as AI-like." defaultChecked />
              <ToggleRow label="Repeated motif language is intentional" description="Allow specific symbolic words (e.g., shadow, pulse, ash) to recur heavily." defaultChecked />
              <ToggleRow label="Occasional fragments are intentional" description="Permit fragmented sentences for pacing and impact." defaultChecked />
              <ToggleRow label="Emotionally intense interiority is intentional" description="Do not flag prolonged periods of character introspection or melodrama." defaultChecked />
              <ToggleRow label="Heightened romantic language is intentional" description="Allow intense bodily reactions and hyperbolic attraction without marking it generic." defaultChecked />
              <ToggleRow label="Long flowing sentence structures are intentional" description="Do not flag run-on sentences if rhythmically structured." />
            </Card>

            <Card>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)' }}>Vocabulary Allow/Block Lists</h2>
              <Input label="Preferred / Allowed Phrases (Comma separated)" placeholder="darkness coiled, tether, obsidian, the hum in their blood..." />
              <Input label="Banned / Cliché Phrases to Auto-Flag" placeholder="he let out a breath he didn't realize he was holding, eyes flashed, cerulean orbs..." />
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <Card glow>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)' }}>Upload References</h2>
              <div style={{ border: '1px dashed var(--color-plum-border)', borderRadius: 'var(--radius-md)', padding: '32px', textAlign: 'center', backgroundColor: 'var(--color-charcoal-light)' }}>
                <Upload size={32} className="text-muted" style={{ margin: '0 auto 16px' }} />
                <div style={{ fontWeight: '500', marginBottom: '8px' }}>Upload Style Guide or Sample</div>
                <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '16px' }}>PDF, DOCX, or TXT</div>
                <Button variant="secondary" size="sm">Browse Files</Button>
              </div>
            </Card>

            <Card>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Voice Notes</h2>
              <Input type="textarea" placeholder="Character voices sound like... The narrative tone is generally..." style={{ minHeight: '150px' }} />
            </Card>
          </div>
        </div>
      ) : (
        <Card glow>
          <div style={{ padding: 'var(--spacing-md)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '32px', textAlign: 'center', borderBottom: '1px solid var(--color-plum-dark)', paddingBottom: '16px' }}>Active Profile: Author's Core Style (Dark Luxe)</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
              <div>
                <h3 className="text-gold" style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Accepted Stylistic Tendencies</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={18} className="text-gold" /> <span>Lyrical and heavy repetition is allowed.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={18} className="text-gold" /> <span>Fragments are permitted for tension.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={18} className="text-gold" /> <span>Heightened romantic/sensory physical states will bypass generic AI checks.</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-burgundy" style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Reviewer Strictness Zones</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><FileText size={18} className="text-burgundy" /> <span>Flag passive voice strictly.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><FileText size={18} className="text-burgundy" /> <span>Flag cliché banned listed items immediately.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><FileText size={18} className="text-burgundy" /> <span>Ensure POV distinctiveness rules remain rigid.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StyleProfile;
