import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { extractTextFromFile } from '../lib/fileExtractor';
import { parseManuscript } from '../lib/devAnalyzer';

const Landing = () => {
  const navigate = useNavigate();
  const { setRawText, setParsedChapters, setManuscriptTitle } = useProject();
  const fileInputRef = useRef(null);
  
  const [preset, setPreset] = useState('darkluxe');
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');

  const processFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setProgressMsg('Reading file...');
    try {
      const text = await extractTextFromFile(file, (msg) => setProgressMsg(msg));
      setRawText(text);
      
      const fileTitle = file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
      setManuscriptTitle(fileTitle);
      
      navigate('/style-profile');
    } catch (err) {
      console.error(err);
      alert(`Error reading file: ${err.message}`);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (loading) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!loading) setIsHovering(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsHovering(false);
  };

  const PRESETS = [
    { id: 'darkluxe', label: 'Dark Luxe Core' },
    { id: 'romantasy', label: 'Dark Fantasy / Romantasy' },
    { id: 'gothic', label: 'Gothic Horror' },
    { id: 'academy', label: 'Academy Fantasy' },
  ];

  const FEATURES = [
    { icon: '📖', title: 'Chapter by Chapter', desc: 'Purpose, emotional movement, and editorial flags for every chapter.' },
    { icon: '💕', title: 'Romance Tracking', desc: 'Monitor tension through the unique mechanics of fantasy romance.' },
    { icon: '🔍', title: 'Conspiracy Map', desc: 'Track foreshadowing, suspicion escalation, and dramatic reveals.' },
    { icon: '🎭', title: 'POV Voice Guard', desc: "Ensure your multiple POV characters don't drift into each other's style." },
    { icon: '📊', title: 'Pacing Visualization', desc: 'See narrative architecture: dialogue, action, and introspection density.' },
    { icon: '✍️', title: 'Revision Workspace', desc: 'A dedicated, distraction-free environment for deep structural edits.' },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      backgroundColor: 'var(--color-obsidian)', color: 'var(--color-text-main)',
      fontFamily: 'var(--font-sans)', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(123,44,58,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(168,139,93,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '24px 40px',
        position: 'relative', zIndex: 10
      }}>
        <div style={{ width: '28px', height: '28px', border: '2px solid var(--color-gold-muted)', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-burgundy)' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-gold-muted)', lineHeight: 1 }}>
          The Editorial Grimoire
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginLeft: '12px', paddingBottom: '2px' }}>
          Developmental Editor
        </span>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '0 20px 80px', position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', width: '100%'
      }}>
        
        {/* Hero */}
        <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '48px', maxWidth: '700px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: '24px' }}>
            Your Story,<br />
            <em style={{ color: 'var(--color-burgundy)', fontStyle: 'italic' }}>Editorially Sharp</em>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
            A private developmental workspace for <strong style={{ color: 'var(--color-gold-muted)', fontWeight: 600 }}>Fantasy Romance</strong> manuscripts.
            Upload your draft to receive deep structural, pacing, and tension analysis — without touching your voice.
          </p>
        </div>

        {/* Upload Zone */}
        <div 
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            width: '100%', maxWidth: '760px', padding: '60px 40px',
            backgroundColor: isHovering ? 'rgba(44, 40, 44, 0.8)' : 'var(--color-charcoal)',
            border: `2px dashed ${isHovering ? 'var(--color-gold-muted)' : 'var(--color-plum-dark)'}`,
            borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            cursor: loading ? 'wait' : 'pointer', transition: 'all 0.3s ease', marginBottom: '32px',
            boxShadow: isHovering ? '0 0 40px rgba(168, 139, 93, 0.1)' : 'none'
          }}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".txt,.docx,.pdf" 
            style={{ display: 'none' }} 
            data-testid="file-upload-input"
          />
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
              <div style={{ 
                width: '40px', height: '40px', border: '3px solid rgba(168,139,93,0.3)', 
                borderTopColor: 'var(--color-gold-muted)', borderRadius: '50%', 
                animation: 'spin 1s linear infinite', marginBottom: '24px' 
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>{progressMsg}</p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>This may take a minute for large manuscripts</span>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '24px', opacity: isHovering ? 1 : 0.7, transform: isHovering ? 'translateY(-4px)' : 'none', transition: 'all 0.3s' }}>
                <svg width="48" height="48" viewBox="0 0 44 44" fill="none">
                  <path d="M22 6v28M22 6l-8 8M22 6l8 8" stroke="var(--color-gold-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 34v4a2 2 0 002 2h26a2 2 0 002-2v-4" stroke="var(--color-gold-muted)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>Drop your manuscript here</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>or click to browse</p>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>.docx · .pdf · .txt · up to 200k words</span>
            </>
          )}
        </div>

        {/* Paste Zone */}
        <div style={{ width: '100%', maxWidth: '760px', marginBottom: '32px', display: 'flex', flexDirection: 'column' }}>
           <textarea 
             placeholder="Or paste an experimental chapter directly here..."
             style={{ 
               width: '100%', height: '120px', backgroundColor: 'var(--color-charcoal)', 
               border: '1px solid var(--color-plum-dark)', borderRadius: '8px', 
               padding: '16px', color: '#fff', fontFamily: 'var(--font-sans)', 
               resize: 'y', outline: 'none', marginBottom: '12px'
             }}
             id="paste-zone"
           />
           <button 
             onClick={() => {
               const text = document.getElementById('paste-zone').value;
               if (!text.trim()) return;
               setLoading(true);
               setProgressMsg('Processing pasted text...');
               setTimeout(() => {
                 setRawText(text);
                 setManuscriptTitle('Pasted Chapter Test');
                 navigate('/style-profile');
                 setLoading(false);
               }, 500);
             }}
             style={{
               alignSelf: 'flex-end', backgroundColor: 'var(--color-burgundy)', color: '#fff', 
               border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer',
               fontWeight: 600
             }}
             disabled={loading}
           >
             Analyze Pasted Text
           </button>
        </div>

        {/* Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '80px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Project preset:</span>
          {PRESETS.map(p => (
            <button
              key={p.id}
              onClick={() => setPreset(p.id)}
              style={{
                background: preset === p.id ? 'var(--color-charcoal)' : 'transparent',
                border: `1px solid ${preset === p.id ? 'var(--color-gold-muted)' : 'var(--color-plum-dark)'}`,
                color: preset === p.id ? 'var(--color-gold-muted)' : 'var(--color-text-muted)',
                padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', cursor: 'pointer',
                transition: 'all 0.2s', fontWeight: preset === p.id ? 500 : 400
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%'
        }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              backgroundColor: 'var(--color-charcoal)', border: '1px solid var(--color-plum-dark)',
              borderRadius: '12px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '1.5rem', filter: 'grayscale(0.5) sepia(1) hue-rotate(-50deg) saturate(2)' }}>{f.icon}</span>
              <div>
                <strong style={{ display: 'block', fontSize: '1rem', color: '#fff', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>{f.title}</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '24px', fontSize: '0.75rem', color: 'var(--color-text-dim)',
        borderTop: '1px solid var(--color-plum-dark)', position: 'relative', zIndex: 10,
        backgroundColor: 'rgba(10, 9, 9, 0.8)', textTransform: 'uppercase', letterSpacing: '1px'
      }}>
        All processing happens in your browser. Your manuscript never leaves your device.
      </footer>
    </div>
  );
};

export default Landing;
