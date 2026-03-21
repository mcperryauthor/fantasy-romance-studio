import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useProject } from '../context/ProjectContext';
import ManuscriptDashboard from '../components/ManuscriptDashboard';
import { analysisModules } from '../data/modulesConfig';
import { Edit3 } from 'lucide-react';

const ReviewWorkspace = () => {
  const navigate = useNavigate();
  const { manuscriptTitle, chapters, stats, rawText, clearProject } = useProject();
  
  const [activeChapterIndex, setActiveChapterIndex] = useState(null); // null = Dashboard
  const [activeModule, setActiveModule] = useState('purpose');
  const [activeFlag, setActiveFlag] = useState(null);

  const handleNewProject = () => {
    if (window.confirm("Are you sure you want to start a new project? This will clear your current manuscript data.")) {
      clearProject();
      navigate('/');
    }
  };

  if (!chapters || chapters.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0a0909', color: '#fff' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-muted)', marginBottom: '16px' }}>No Manuscript Loaded</h2>
        <Button variant="primary" onClick={() => navigate('/')}>Return to Upload</Button>
      </div>
    );
  }

  const activeChapter = activeChapterIndex !== null ? chapters.find(c => c.index === activeChapterIndex) : null;
  const ActiveComponent = analysisModules.find(m => m.id === activeModule)?.component || analysisModules[0].component;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0a0909', color: 'var(--color-text-main)', fontFamily: 'var(--font-sans)', width: '100%' }}>
      
      {/* 1. TOP HEADER */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', backgroundColor: 'rgba(10, 9, 9, 0.95)', borderBottom: '1px solid var(--color-plum-dark)', height: '52px', flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-gold-muted)' }}>
            The Editorial Grimoire
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 500 }}>{manuscriptTitle}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{stats?.totalWords?.toLocaleString() || 0} words · {chapters.length} chapters</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-burgundy)', opacity: 0.8, marginRight: '8px' }}>✓ Autosaved local</span>
          <Button variant="ghost" onClick={() => navigate('/report/1')} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>↓ Export Report</Button>
        </div>
      </header>

      {/* 2. BODY LAYOUT */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT SIDEBAR (Chapters) */}
        <aside style={{ width: '240px', backgroundColor: 'var(--color-charcoal)', borderRight: '1px solid var(--color-plum-dark)', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
          
          <div style={{ padding: '16px 0 8px' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', padding: '0 16px', marginBottom: '8px' }}>Overview</div>
            <button 
              onClick={() => setActiveChapterIndex(null)} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 16px', background: activeChapterIndex === null ? 'rgba(168, 139, 93, 0.1)' : 'none', border: 'none', borderLeft: `2px solid ${activeChapterIndex === null ? 'var(--color-gold-muted)' : 'transparent'}`, color: activeChapterIndex === null ? '#fff' : 'var(--color-text-muted)', fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ color: 'var(--color-gold-muted)' }}>◈</span> Manuscript Dashboard
            </button>
          </div>

          <div style={{ padding: '16px 0' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', padding: '0 16px', marginBottom: '8px' }}>Chapters</div>
            
            {chapters.map(ch => {
              const isActive = activeChapterIndex === ch.index;
              const povCharacters = Object.keys(stats?.povDist || {});
              const getColor = (idx) => ['#9D6FA8', '#c24f4f', '#4f7ec2', '#4cA87a', '#c9874c', '#BFA05A', '#A85A8B'][idx % 7];
              const povIndex = povCharacters.indexOf(ch.pov);
              const povColor = povIndex >= 0 ? getColor(povIndex) : 'var(--color-gold-muted)';
              
              return (
                <button 
                  key={ch.index}
                  onClick={() => setActiveChapterIndex(ch.index)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 16px', background: isActive ? 'var(--color-plum-glow)' : 'none', border: 'none', borderLeft: `2px solid ${isActive ? 'var(--color-burgundy)' : 'transparent'}`, color: isActive ? '#fff' : 'var(--color-text-muted)', fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span title={`POV: ${ch.pov || 'Unclear'}`} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: povColor, flexShrink: 0 }} />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ch.title}</span>
                  {ch.analysis?.prose?.length > 0 && <span style={{ fontSize: '0.65rem', color: 'var(--color-burgundy)' }}>{ch.analysis.prose.length}</span>}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', padding: '24px 16px', borderTop: '1px solid var(--color-plum-dark)' }}>
            <Button 
              variant="secondary" 
              onClick={handleNewProject}
              style={{ width: '100%', fontSize: '0.8rem', padding: '8px', color: 'var(--color-burgundy)', borderColor: 'rgba(123,44,58,0.3)', backgroundColor: 'transparent' }}
            >
              ⟲ Start New Project
            </Button>
          </div>
        </aside>

        {/* 3. MAIN AREA & SIDEBAR */}
        {activeChapterIndex === null ? (
          <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#0a0909', boxShadow: 'inset 0 0 100px rgba(123, 44, 58, 0.03)' }}>
            <ManuscriptDashboard chapters={chapters} stats={stats} />
          </main>
        ) : (
          <>
            {/* MAIN AREA: TECHNICAL DASHBOARD */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0a0909', overflowY: 'hidden' }}>
               {/* 1. Header with Chapter Title */}
               <div style={{ padding: '16px 32px', borderBottom: '1px solid var(--color-plum-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-charcoal)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {activeChapter.pov && (
                      <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600, backgroundColor: 'rgba(168, 139, 93, 0.15)', color: 'var(--color-gold-muted)', border: '1px solid rgba(168, 139, 93, 0.3)' }}>{activeChapter.pov} POV</span>
                     )}
                    <h1 style={{ fontFamily: 'var(--font-serif)', margin: 0, fontSize: '1.25rem', color: '#fff' }}>{activeChapter.title}</h1>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    <span>{activeChapter.wordCount?.toLocaleString()} words</span>
                  </div>
               </div>

               {/* Horizontal Tabs */}
               <nav style={{ padding: '0 32px', borderBottom: '1px solid var(--color-plum-dark)', display: 'flex', gap: '16px', overflowX: 'auto', flexShrink: 0, backgroundColor: 'var(--color-charcoal)' }}>
                 {analysisModules.map(mod => (
                    <button
                       key={mod.id}
                       onClick={() => { setActiveModule(mod.id); setActiveFlag(null); }}
                       style={{ background: 'none', border: 'none', borderBottom: activeModule === mod.id ? '2px solid var(--color-gold-muted)' : '2px solid transparent', color: activeModule === mod.id ? '#fff' : 'var(--color-text-dim)', fontSize: '0.8rem', fontWeight: 500, padding: '12px 4px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s', marginBottom: '-1px' }}
                    >
                       {mod.title}
                    </button>
                 ))}
               </nav>

               <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                  <ActiveComponent chapter={activeChapter} onSelectFlag={setActiveFlag} activeFlag={activeFlag} />
               </div>

               {/* Extracted Text Viewer */}
               <div style={{ flexShrink: 0, borderTop: '1px solid var(--color-plum-dark)', backgroundColor: 'var(--color-charcoal)', height: '220px', padding: '20px 32px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-muted)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>
                     Extracted Manuscript Text
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#0a0909', borderRadius: '4px', padding: '16px', border: '1px solid rgba(123, 44, 58, 0.2)', fontFamily: 'var(--font-serif)', fontSize: '0.95rem', lineHeight: 1.6, color: activeFlag ? '#fff' : 'var(--color-text-muted)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}>
                     {activeFlag ? (
                        <>
                           <div style={{ marginBottom: '8px', fontSize: '0.7rem', color: 'var(--color-burgundy)', fontWeight: 'bold', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                              Target: {activeFlag.type}
                           </div>
                           <div dangerouslySetInnerHTML={{ __html: `"${activeFlag.text || 'No specific text fragment provided for this flag.'}"` }} />
                           {activeFlag.suggestedFix && (
                              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(168, 139, 93, 0.2)', fontSize: '0.85rem', color: '#a88b5d', fontFamily: 'var(--font-sans)' }}>
                                 <strong>Rewrite Strategy:</strong> {activeFlag.suggestedFix}
                              </div>
                           )}
                        </>
                     ) : (
                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontStyle: 'italic', opacity: 0.6 }}>
                           Select a penalty card from the breakdown above to isolate the manuscript text that triggered it.
                        </div>
                     )}
                  </div>
               </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewWorkspace;
