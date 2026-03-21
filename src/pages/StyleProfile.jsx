import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Upload, FileText, Check, Settings } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { parseManuscript, analyzeManuscript, buildManuscriptStats } from '../lib/devAnalyzer';

const StyleProfile = () => {
  const navigate = useNavigate();
  const { manuscriptTitle, rawText, saveProject } = useProject();
  
  const [activeTab, setActiveTab] = useState('calibration');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [povInput, setPovInput] = useState('Elowyn, Killian, Lysander, Ronin');
  const [liInput, setLiInput] = useState('Killian, Lysander, Ronin');
  const [voiceNotesInput, setVoiceNotesInput] = useState('');

  const handleFileUpload = (e) => {
    if (e.target.files?.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const parseVoiceNotesToProfiles = (text, knownCharacters) => {
    if (!text || !text.trim()) return {};
    const profiles = {};
    const stopWords = new Set(['the','and','a','to','of','in','i','is','that','it','on','you','this','for','but','with','as','he','she','they','her','him','his','hers','their','theirs','we','us','our','ours','me','my','mine','yourself','myself', 'like', 'how', 'what', 'when', 'where', 'why', 'who', 'which', 'than', 'then', 'too', 'very', 'not', 'no', 'out', 'into', 'up', 'down', 'over', 'under', 'from', 'about', 'some', 'any', 'all', 'more', 'most', 'such', 'only', 'same', 'will', 'say', 'says']);
    let currentCharacter = null;
    const lines = text.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;
      
      const charMatch = knownCharacters.find(c => c.toLowerCase() === trimmed.toLowerCase() || trimmed.toLowerCase().startsWith(c.toLowerCase() + ':'));
      if (charMatch) {
        currentCharacter = charMatch;
        if (!profiles[currentCharacter]) profiles[currentCharacter] = { keywords: [], traits: [] };
      } else if (currentCharacter) {
        const words = trimmed.replace(/[.,:;+→"“'”()\-]/g, ' ').split(/\s+/);
        words.forEach(w => {
          const word = w.toLowerCase().trim();
          if (word.length > 3 && !stopWords.has(word) && !knownCharacters.find(n => n.toLowerCase() === word)) {
             if (profiles[currentCharacter].keywords.length < 40) {
                if (!profiles[currentCharacter].keywords.includes(word)) {
                   profiles[currentCharacter].keywords.push(word);
                }
             }
          }
        });
      }
    });
    return Object.keys(profiles).length > 0 ? profiles : undefined;
  };

  const handleAnalyzeAndEnter = async () => {
    if (!rawText) {
      alert("No raw manuscript text found. Please upload a file first.");
      navigate('/');
      return;
    }
    
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 60));
    
    try {
      const povCharacters = povInput.split(',').map(s => s.trim()).filter(Boolean);
      const loveInterests = liInput.split(',').map(s => s.trim()).filter(Boolean);
      const dynamicVoiceProfiles = parseVoiceNotesToProfiles(voiceNotesInput, [...povCharacters, ...loveInterests]);
      const settings = { povCharacters, loveInterests, povVoiceProfiles: dynamicVoiceProfiles, sensitivity: 3 };

      const parsedChapters = parseManuscript(rawText, settings);
      const analyzed = analyzeManuscript(parsedChapters, settings);
      const stats = buildManuscriptStats(analyzed, settings);
      
      saveProject(manuscriptTitle, analyzed, stats);
      navigate('/workspace');
    } catch (err) {
      console.error(err);
      alert('Error during manuscript analysis: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
        <Button variant="primary" size="lg" onClick={handleAnalyzeAndEnter} disabled={isAnalyzing}>
          {isAnalyzing ? 'Running Editorial Analysis...' : 'Analyze & Enter Studio'}
        </Button>
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
              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)' }}>Cast Definition</h2>
              <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.875rem' }}>Define the characters the parsing engine should specifically track for Point-of-View and Romance arcs. (Comma separated)</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Input 
                  label="Primary POV Characters" 
                  value={povInput} 
                  onChange={e => setPovInput(e.target.value)} 
                  placeholder="Elowyn, Killian, Lysander..." 
                />
                <Input 
                  label="Love Interests" 
                  value={liInput} 
                  onChange={e => setLiInput(e.target.value)} 
                  placeholder="Killian, Lysander, Ronin..." 
                />
              </div>
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
                
                <input 
                  type="file" 
                  id="style-upload" 
                  multiple 
                  style={{ display: 'none' }} 
                  onChange={handleFileUpload} 
                />
                
                <label htmlFor="style-upload">
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '36px', padding: '0 16px', borderRadius: '4px', border: '1px solid var(--color-plum-border)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-text-main)', transition: 'background-color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-plum-dark)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    Browse Files
                  </div>
                </label>
                
                {uploadedFiles.length > 0 && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    {uploadedFiles.map((fileName, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-obsidian)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', border: '1px solid var(--color-gold-muted)' }}>
                        <FileText size={14} className="text-gold" />
                        {fileName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Voice Notes</h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', marginBottom: '16px', lineHeight: '1.5' }}>
                Paste your character bibles directly here to actively calibrate the Voice Consistency engine! 
                <strong> Format requirement:</strong> The character's name MUST be on its own line (or at the start of a line ending in a colon). The engine will automatically extract all subsequent emotional and behavioral keywords for that character until it hits the next name.
              </div>
              <Input type="textarea" value={voiceNotesInput} onChange={e => setVoiceNotesInput(e.target.value)} placeholder={`Example Format:

Katrina
Voice Type: Conversational, blunt, transparent
Keywords: chaotic, instinct, truth, raw, mess

Miles:
Core Tone: Rational, steady, disciplined
Traits: logical, calm, quiet dominance
`} style={{ minHeight: '200px' }} />
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
