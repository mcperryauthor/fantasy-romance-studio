import React from 'react';
import { Button } from '../components/ui/Button';
import { Download, Printer, Share2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { analyzeManuscript } from '../lib/devAnalyzer';

const ReportView = () => {
  const navigate = useNavigate();
  const { manuscriptTitle, chapters, stats } = useProject();

  const SectionHeading = ({ number, title }) => (
    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '24px', color: '#1a1a1f', marginTop: '48px', textTransform: 'uppercase', letterSpacing: '1px' }}>
      <span style={{ color: 'var(--color-burgundy)', marginRight: '16px' }}>{number}.</span> {title}
    </h3>
  );

  if (!chapters || chapters.length === 0) {
    return (
      <div style={{ maxWidth: '1000px', margin: '64px auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#fff' }}>No Manuscript Data Found</h2>
        <Button variant="primary" onClick={() => navigate(-1)} style={{ marginTop: '24px' }}>Return to Workspace</Button>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // JIT Re-hydration: If the browser is serving a cached manuscript from before the 40-module refactor,
  // we dynamically run the analyzer on it right here so the PDF generator has the correct data schema.
  let activeChapters = chapters;
  if (chapters && chapters.length > 0 && chapters[0].analysis) {
     if (chapters[0].analysis.pacing?.actionPct === undefined || chapters[0].analysis.emotional?.arcStage === undefined) {
         try {
             activeChapters = analyzeManuscript(chapters, stats?.settings || {});
         } catch(e) { console.error("JIT re-analysis failed", e); }
     }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', color: 'var(--color-text-muted)', border: 'none', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '1rem' }}>
          <ChevronLeft size={16} /> Back to Workspace
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" style={{ gap: '8px' }} onClick={() => window.print()}><Printer size={16} /> Print Report</Button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fdfdfd', color: '#1a1a1f', padding: '64px', borderRadius: '4px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', minHeight: '1100px', fontFamily: 'var(--font-sans)' }}>
        <header style={{ borderBottom: '2px solid #2d2d34', paddingBottom: '32px', marginBottom: '32px', textAlign: 'center' }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', color: '#555', marginBottom: '16px' }}>The Editorial Grimoire</h4>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#1a1a1f', marginBottom: '8px', lineHeight: '1.1' }}>{manuscriptTitle || "Manuscript Analysis"}</h1>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#7b2c3a', fontStyle: 'italic', marginBottom: '24px' }}>Comprehensive Developmental Report</h2>
        </header>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9fa', padding: '16px 24px', borderLeft: '4px solid #a88b5d', marginBottom: '32px' }}>
          <div>
             <strong style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#555', display: 'block' }}>Manuscript Stats</strong>
             <span style={{ fontSize: '1.1rem', color: '#1a1a1f', fontWeight: 'bold' }}>{stats?.totalWords?.toLocaleString() || 0} words • {chapters.length} chapters</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#555' }}>Date Generated: <strong>{currentDate}</strong></div>
        </div>

        <SectionHeading number="1" title="Global Health Dashboard" />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Avg Purpose Score', score: activeChapters.length ? Math.round(activeChapters.reduce((s,c)=>s+(c.analysis?.purpose?.score||0),0)/activeChapters.length) + '/100' : 'N/A', color: '#7b2c3a' },
            { label: 'Avg Pacing Score', score: activeChapters.length ? Math.round(activeChapters.reduce((s,c)=>s+(c.analysis?.pacing?.score||0),0)/activeChapters.length) + '/100' : 'N/A', color: '#1a1a1f' },
            { label: 'Avg Romance Score', score: activeChapters.length ? Math.round(activeChapters.reduce((s,c)=>s+(c.analysis?.romance?.score||0),0)/activeChapters.length) + '/100' : 'N/A', color: '#a88b5d' },
            { label: 'AI Pattern Density', score: stats?.aiDensityLabel || 'N/A', color: '#1a1a1f' }
          ].map((item, idx) => (
            <div key={idx} style={{ flex: 1, backgroundColor: '#f4f4f6', padding: '24px 16px', borderRadius: '8px', textAlign: 'center', border: item.color === '#a88b5d' ? `2px solid ${item.color}` : 'none' }}>
              <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: item.color }}>{item.score}</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', color: '#555' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <SectionHeading number="2" title="Point of View Distribution" />
        <div style={{ marginBottom: '32px' }}>
           {stats?.povDist && Object.entries(stats.povDist).map(([pov, count]) => (
              <div key={pov} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #eee' }}>
                 <strong style={{ color: '#111' }}>{pov}</strong>
                 <span>{count} chapters ({Math.round(count / chapters.length * 100)}%)</span>
              </div>
           ))}
        </div>

        <SectionHeading number="3" title="Chapter-by-Chapter Breakdown" />
        {activeChapters.map((chapter, index) => {
           const a = chapter.analysis;
           if (!a) return null;

           return (
             <div key={index} style={{ marginBottom: '48px', paddingBottom: '32px', borderBottom: '2px solid #ddd' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1f', marginBottom: '16px' }}>{chapter.title}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: '#555', marginBottom: '24px' }}>
                   <span><strong>POV:</strong> {chapter.pov || 'Unknown'}</span>
                   <span><strong>Words:</strong> {chapter.wordCount?.toLocaleString() || 0}</span>
                   <span><strong>Purpose:</strong> {a.purpose?.label || 'N/A'}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '24px' }}>
                   
                   {/* Pacing & Structure */}
                   <div style={{ backgroundColor: '#f9f9fa', padding: '16px', borderRadius: '8px' }}>
                     <h5 style={{ fontSize: '1rem', color: '#7b2c3a', marginBottom: '12px', borderBottom: '1px solid rgba(123,44,58,0.2)', paddingBottom: '4px' }}>Pacing & Structure</h5>
                     <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Flow:</strong> {a.pacing?.flowPattern || 'Balanced'}</p>
                     <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Action:</strong> {a.pacing?.actionPct || 0}% | <strong>Dialogue:</strong> {a.pacing?.dialogueRatio || 0}% | <strong>Introspection:</strong> {a.pacing?.introspectPct || 0}%</p>
                     <ul style={{ paddingLeft: '20px', margin: '8px 0', fontSize: '0.9rem', color: '#333' }}>
                        {a.pacing?.flags?.map((f, i) => <li key={`pf-${i}`} style={{ marginBottom: '4px' }}>{f.msg || f.message}</li>)}
                        {a.purpose?.flags?.map((f, i) => <li key={`cf-${i}`} style={{ marginBottom: '4px' }}>{f.msg || f.message}</li>)}
                     </ul>
                   </div>

                   {/* Emotion & Romance */}
                   <div style={{ backgroundColor: '#f9f9fa', padding: '16px', borderRadius: '8px' }}>
                     <h5 style={{ fontSize: '1rem', color: '#a88b5d', marginBottom: '12px', borderBottom: '1px solid rgba(168,139,93,0.3)', paddingBottom: '4px' }}>Character & Romance</h5>
                     <p style={{ margin: '4px 0', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Emotional Arc:</strong> {a.emotional?.start || '?'} → {a.emotional?.end || '?'}</p>
                     <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Romance Flow:</strong> {a.pacing?.interactionReactionResponse ? "Cyclic (Action → Reaction)" : "Stalled"} | <strong>Push-Pull:</strong> {a.pacing?.pushPullPresent ? "Yes" : "No"}</p>
                     <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                       <strong>Active Romantic Tension:</strong>{' '}
                       {a.romance?.byCharacter && Object.keys(a.romance.byCharacter).length > 0 
                          ? Object.entries(a.romance.byCharacter).map(([n, d]) => `${n} (${d.tension}/10)`).join(', ') 
                          : 'No love interests detected.'}
                     </p>
                     <ul style={{ paddingLeft: '20px', margin: '8px 0', fontSize: '0.9rem', color: '#333' }}>
                        {a.emotional?.flags?.map((f, i) => <li key={`ef-${i}`} style={{ marginBottom: '4px' }}>{f.msg || f.message}</li>)}
                        {a.romance?.flags?.map((f, i) => <li key={`rf-${i}`} style={{ marginBottom: '4px' }}>{f.msg || f.message}</li>)}
                     </ul>
                   </div>

                </div>

                {/* Exposition & Lore Delivery */}
                <div style={{ marginTop: '24px', backgroundColor: '#f9f9fa', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #555' }}>
                   <h5 style={{ fontSize: '1rem', color: '#111', marginBottom: '12px', borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>Exposition & Lore Delivery</h5>
                   <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '16px' }}>
                       <div>
                           <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Density:</strong> {a.exposition?.density || 'Unknown'}</p>
                           <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Distribution:</strong> Integrated: {a.exposition?.integratedCount || 0} | Passive: {a.exposition?.passiveCount || 0} | Info Dumps: {a.exposition?.infoDumpCount || 0}</p>
                           <ul style={{ paddingLeft: '20px', margin: '8px 0', fontSize: '0.9rem', color: '#333' }}>
                              {a.exposition?.flags?.map((f, i) => <li key={`exf-${i}`} style={{ marginBottom: '4px' }}>{f.msg || f.message}</li>)}
                           </ul>
                       </div>
                       <div>
                           <p style={{ margin: '4px 0', fontSize: '0.9em', fontWeight: 'bold' }}>Romance Impact</p>
                           <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Tension Maintained: {a.exposition?.romanceImpact?.tensionMaintained ? 'Yes' : 'No'}</p>
                           <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Explanation Replaced Emotion: {a.exposition?.romanceImpact?.explanationReplacingEmotion ? 'Yes' : 'No'}</p>
                       </div>
                   </div>
                </div>

                {/* Conspiracy & Lore */}
                {a.conspiracy && a.conspiracy.flags?.length > 0 && (
                  <div style={{ marginTop: '24px' }}>
                     <h5 style={{ fontSize: '1rem', color: '#111', marginBottom: '8px' }}>Conspiracy & Plot Secrets</h5>
                     <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>Active Phase: <strong>{a.conspiracy.phase}</strong></p>
                     <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#333' }}>
                        {a.conspiracy.flags.map((f, i) => <li key={`cnf-${i}`} style={{ marginBottom: '4px' }}>{f.msg}</li>)}
                     </ul>
                  </div>
                )}

                {/* Prose & AI Tells */}
                {((a.prose?.issues && a.prose.issues.length > 0) || (a.aiPatterns?.flags && a.aiPatterns.flags.length > 0) || (a.outOfPlace && a.outOfPlace.length > 0)) && (
                   <div style={{ marginTop: '24px', borderLeft: '3px solid #ccc', paddingLeft: '16px' }}>
                      <h5 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>Line-Level Editorial Flags</h5>
                      
                      {a.prose?.issues?.slice(0, 5).map((f, i) => (
                         <div key={`p-${i}`} style={{ marginBottom: '8px', fontSize: '0.9rem', lineHeight: '1.4' }}>
                            <span style={{ color: '#c24f4f', fontWeight: 'bold' }}>[Prose]</span> <span style={{ fontStyle: 'italic', backgroundColor: '#f0f0f0', padding: '0 4px', borderRadius: '3px' }}>"{f.phrase || f.sentence}"</span> — {f.reason || f.msg}
                         </div>
                      ))}
                      
                      {a.outOfPlace?.slice(0, 5).map((f, i) => (
                         <div key={`oop-${i}`} style={{ marginBottom: '8px', fontSize: '0.9rem', lineHeight: '1.4' }}>
                            <span style={{ color: '#a88b5d', fontWeight: 'bold' }}>[Anachronism]</span> <span style={{ fontStyle: 'italic', backgroundColor: '#f0f0f0', padding: '0 4px', borderRadius: '3px' }}>"{f.sentence}"</span> — {f.reason || f.msg}
                         </div>
                      ))}

                      {a.aiPatterns?.flags?.slice(0, 5).map((f, i) => (
                         <div key={`ai-${i}`} style={{ marginBottom: '8px', fontSize: '0.9rem', lineHeight: '1.4' }}>
                            <span style={{ color: '#555', fontWeight: 'bold' }}>[Structure Tell]</span> <span style={{ fontStyle: 'italic', backgroundColor: '#f0f0f0', padding: '0 4px', borderRadius: '3px' }}>"{f.text}"</span> — {f.message} <br/><span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '24px' }}>→ Suggestion: {f.suggestedFix}</span>
                         </div>
                      ))}
                      
                      {((a.prose?.issues?.length || 0) + (a.outOfPlace?.length || 0) + (a.aiPatterns?.flags?.length || 0)) > 15 && (
                         <div style={{ fontSize: '0.85rem', color: '#888', fontStyle: 'italic', marginTop: '8px' }}>
                           + {((a.prose?.issues?.length || 0) + (a.outOfPlace?.length || 0) + (a.aiPatterns?.flags?.length || 0)) - 15} additional minor line edits omitted from summary.
                         </div>
                      )}
                   </div>
                )}

             </div>
           );
        })}

        <footer style={{ marginTop: '64px', textAlign: 'center', fontSize: '0.85rem', color: '#999', borderTop: '1px solid #eee', paddingTop: '24px' }}>
           Generated automatically by The Editorial Grimoire Developmental Engine.
        </footer>
      </div>
    </div>
  );
};

export default ReportView;
