import React from 'react';
import { Card } from '../ui/Card';

const SectionHeader = ({ title }) => (
  <h3 style={{ color: 'var(--color-gold)', margin: '0 0 16px', fontSize: '1.2rem', fontWeight: 500 }}>{title}</h3>
);

const StatCard = ({ label, value, subtext, color = 'var(--color-ivory-muted)' }) => (
  <div style={{ backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
    <div style={{ fontSize: '2rem', fontWeight: 600, color, marginBottom: '4px' }}>{value}</div>
    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    {subtext && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginTop: '4px' }}>{subtext}</div>}
  </div>
);

const CoreRuleBanner = ({ rule }) => (
  <div style={{ padding: '12px 16px', backgroundColor: 'rgba(212, 175, 55, 0.05)', borderLeft: '3px solid var(--color-gold)', marginBottom: '24px', borderRadius: '0 8px 8px 0' }}>
    <div style={{ fontSize: '0.75rem', color: 'var(--color-gold-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: 600 }}>🔥 Core System Rule</div>
    <div style={{ fontSize: '0.95rem', color: 'var(--color-ivory)', fontStyle: 'italic' }}>"{rule}"</div>
  </div>
);

const RewriteCard = ({ flag, onSelect, isActive }) => {
  const isHigh = flag.severity < -10 || flag.severity >= 3 || flag.severity === 'high';
  const isMed = flag.severity >= -10 && flag.severity <= -5 || flag.severity === 2 || flag.severity === 'medium';
  const color = isHigh ? '#ff6b81' : isMed ? '#FFB86B' : 'var(--color-gold-muted)';
  
  return (
    <div 
      onClick={() => onSelect && onSelect(flag)}
      style={{ 
        backgroundColor: isActive ? 'rgba(201, 135, 76, 0.1)' : 'var(--color-obsidian)', 
        border: `1px solid ${isActive ? 'var(--color-gold)' : color + '40'}`, 
        borderLeft: `3px solid ${isActive ? 'var(--color-gold)' : color}`, 
        borderRadius: '4px', 
        padding: '16px', 
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isActive ? 'translateX(-4px)' : 'none'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ fontWeight: 600, color: isActive ? 'var(--color-gold)' : color, fontSize: '0.95rem' }}>{flag.type}</div>
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-dim)', backgroundColor: 'var(--color-charcoal-light)', padding: '2px 8px', borderRadius: '12px' }}>
          {isHigh ? 'High Severity' : isMed ? 'Medium' : 'Low'}
        </div>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--color-ivory)', marginBottom: '12px' }}>{flag.message || flag.msg || flag.reason}</div>
      {(flag.text || flag.phrase || flag.sentence) && (
        <div style={{ backgroundColor: 'var(--color-charcoal-light)', padding: '8px 12px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '12px', borderLeft: '2px solid var(--color-plum-dark)' }}>
          "... {flag.text || flag.phrase || flag.sentence} ..."
        </div>
      )}
      {flag.suggestedFix && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#4cA87a', fontWeight: 600 }}>💡 Quick Fix:</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-ivory-muted)' }}>{flag.suggestedFix}</span>
        </div>
      )}
    </div>
  );
};

// ─── TABS ─────────────────────────────────────────────────────────────

export const ModuleChapterPurpose = ({ chapter, onSelectFlag, activeFlag }) => {
  const p = chapter?.analysis?.purpose;
  if (!p) return <Card glow>No structural data available for this chapter.</Card>;
  
  return (
    <Card glow>
      <SectionHeader title="Chapter Purpose Detector" />
      <CoreRuleBanner rule="If a chapter can be removed without changing the story, it gets flagged." />
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Purpose Score" value={`${p.score || 0}/100`} color={p.score < 50 ? '#ff6b81' : 'var(--color-gold)'} subtext={p.executionLevel === 'Failed' ? 'Filler Chapter' : 'Execution level'} />
        <StatCard label="Primary Purpose" value={p.primaryPurpose || 'None'} color="var(--color-ivory)" subtext={p.allPurposes?.length > 1 ? `+ ${p.allPurposes.length - 1} secondary` : ''} />
      </div>

      <div>
        <h4 style={{ color: 'var(--color-gold-muted)', marginBottom: '16px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Rewrite Suggestions Panel</h4>
        {p.flags?.length > 0 ? (
          p.flags.map((f, i) => <RewriteCard key={i} flag={f} onSelect={onSelectFlag} isActive={activeFlag === f} />)
        ) : (
          <div style={{ color: '#4cA87a', fontSize: '0.9rem' }}>✓ Chapter purpose is clear and well-executed.</div>
        )}
      </div>
    </Card>
  );
};

export const ModulePacing = ({ chapter, onSelectFlag, activeFlag }) => {
  const p = chapter?.analysis?.pacing;
  if (!p) return <Card glow>No pacing data available.</Card>;
  
  return (
    <Card glow>
      <SectionHeader title="Narrative Flow & Momentum" />
      <CoreRuleBanner rule="Pacing is the balance between movement and weight. Too much of either kills momentum." />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Pacing Score" value={`${p.score || 0}/100`} color={p.score < 60 ? '#ffb8b8' : '#4cA87a'} />
        <StatCard label="Action Blocks" value={`${p.actionPct || 0}%`} color="var(--color-ivory)" />
        <StatCard label="Introspection" value={`${p.introspectPct || 0}%`} color="var(--color-ivory)" />
        <StatCard label="Exposition" value={`${chapter?.analysis?.exposition?.density || 'N/A'}`} color="var(--color-ivory)" />
        <StatCard label="Romance Flow" value={`${p.interactionReactionResponse ? 'Cyclic' : 'Static'}`} color="var(--color-burgundy)" />
      </div>

      <div>
        <h4 style={{ color: 'var(--color-gold-muted)', marginBottom: '16px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Rewrite Suggestions Panel</h4>
        {p.flags?.length > 0 ? (
          p.flags.map((f, i) => <RewriteCard key={i} flag={f} onSelect={onSelectFlag} isActive={activeFlag === f} />)
        ) : (
          <div style={{ color: '#4cA87a', fontSize: '0.9rem' }}>✓ Narrative momentum is balanced. No drag or rush detected.</div>
        )}
      </div>


    </Card>
  );
};

export const ModuleRomanceTension = ({ chapter, onSelectFlag, activeFlag }) => {
  const r = chapter?.analysis?.romance;
  if (!r) return <Card glow>No romance data available.</Card>;
  
  return (
    <Card glow>
      <SectionHeader title="Scene Chemistry & Tension" />
      <CoreRuleBanner rule="Attraction is not tension. Tension requires resistance, uncertainty, and delayed payoff." />

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Romance Tension Score" value={`${r.score || 0}/100`} color={r.score > 70 ? '#ff6b81' : 'var(--color-ivory)'} />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ color: 'var(--color-gold-muted)', marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Tension by Character (This Chapter)</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {r.byCharacter && Object.entries(r.byCharacter).map(([name, data]) => (
            <div key={name} style={{ backgroundColor: 'var(--color-charcoal-light)', border: '1px solid var(--color-plum-dark)', padding: '12px 16px', borderRadius: '8px', minWidth: '160px' }}>
              <div style={{ color: '#ffb8b8', fontWeight: 600, marginBottom: '4px' }}>{name}</div>
              <div style={{ fontSize: '1.2rem', color: 'var(--color-ivory)' }}>{data.tension}</div>
            </div>
          ))}
          {(!r.byCharacter || Object.keys(r.byCharacter).length === 0) && (
             <div style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem', fontStyle: 'italic' }}>No registered love interests detected in this scene.</div>
          )}
        </div>
      </div>

      <div>
        <h4 style={{ color: 'var(--color-gold-muted)', marginBottom: '16px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Rewrite Suggestions Panel</h4>
        {r.flags?.length > 0 ? (
          r.flags.map((f, i) => <RewriteCard key={i} flag={f} onSelect={onSelectFlag} isActive={activeFlag === f} />)
        ) : (
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>No active romantic tension issues flagged in this chapter.</div>
        )}
      </div>
    </Card>
  );
};

export const ModuleAITells = ({ chapter, onSelectFlag, activeFlag }) => {
  const ai = chapter?.analysis?.aiPatterns;
  if (!ai) return <Card glow>No AI Pattern data available.</Card>;
  
  return (
    <Card glow>
      <SectionHeader title="AI Tells Detector (Subsurface)" />
      <CoreRuleBanner rule="Flagging over-explained emotional metaphors, unearned scene symmetry, and micro-phrase clustering." />

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="AI Match Confidence" value={`${ai.confidence || 0}%`} color={ai.confidence > 50 ? '#ffb8b8' : '#4cA87a'} />
        <StatCard label="Pattern Density" value={ai.flags?.length || 0} />
      </div>

      <div>
        <h4 style={{ color: 'var(--color-gold-muted)', marginBottom: '16px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Rewrite Suggestions Panel</h4>
        {ai.flags?.length > 0 ? (
          ai.flags.map((f, i) => <RewriteCard key={i} flag={{...f, sentence: f.text}} onSelect={onSelectFlag} isActive={activeFlag?.sentence === f.text || activeFlag === f} />)
        ) : (
          <div style={{ color: '#4cA87a', fontSize: '0.9rem' }}>✓ No deep-structure AI patterns detected.</div>
        )}
      </div>
      

    </Card>
  );
};

export const ModuleConspiracyThread = ({ chapter, onSelectFlag, activeFlag }) => {
  const c = chapter?.analysis?.conspiracy;
  if (!c) return <Card glow>No conspiracy data available.</Card>;
  return (
    <Card glow>
      <SectionHeader title="Conspiracy & Mystery Density" />
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
         <StatCard label="Lore Density" value={c.score || 0} color="var(--color-gold)" />
         <StatCard label="Active Arc Phase" value={c.phase === 'inactive' ? '—' : c.phase} />
      </div>

      <div style={{ backgroundColor: 'var(--color-charcoal-light)', padding: '20px', borderRadius: '8px', border: '1px solid var(--color-gold-muted)' }}>
        <h4 style={{ color: 'var(--color-gold)', margin: '0 0 12px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>Detected Subplot Echoes</h4>
        {c.subplots?.filter(sp => sp.mentions > 0).length > 0 ? (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {c.subplots.filter(sp => sp.mentions > 0).map((m, i) => (
              <span key={i} style={{ padding: '4px 10px', backgroundColor: 'var(--color-obsidian)', border: '1px solid var(--color-gold-muted)', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--color-ivory)' }}>
                 {m.type} ({m.mentions})
              </span>
            ))}
          </div>
        ) : (
          <div style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem', fontStyle: 'italic' }}>No significant mystery elements detected.</div>
        )}
      </div>
      <div>
        {c.flags?.map((f, i) => (
           <div 
             key={i} 
             onClick={() => onSelectFlag && onSelectFlag(f)}
             className="clickable-flag"
             style={{ 
               marginTop: '12px', padding: '12px', backgroundColor: activeFlag === f ? 'rgba(201, 135, 76, 0.1)' : 'var(--color-obsidian)', 
               border: `1px solid ${activeFlag === f ? 'var(--color-gold)' : 'transparent'}`,
               borderLeft: '3px solid var(--color-gold)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--color-ivory)', cursor: 'pointer',
               transition: 'all 0.2s', transform: activeFlag === f ? 'translateX(-4px)' : 'none'
             }}
           >
             {f.msg}
           </div>
        ))}
      </div>
    </Card>
  );
};

export const ModulePOVVoice = ({ chapter, onSelectFlag, activeFlag }) => {
  const pov = chapter?.analysis?.povVoice;
  if (!pov) {
     return (
       <Card glow>
         <SectionHeader title={`Voice Consistency Check: ${chapter.pov || 'Unknown'}`} />
         <div style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem', fontStyle: 'italic', backgroundColor: 'var(--color-charcoal-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-plum-dark)' }}>
           No Voice Profile data is currently available for <strong>{chapter.pov || 'this character'}</strong>. 
           <br/><br/>
           Voice Consistency tracking requires a configured Semantic Dictionary (Lexicon) to measure narrative drift and character bleeding. You can set this up in the Style Profile configuration.
         </div>
       </Card>
     );
  }
  
  return (
    <Card glow>
      <SectionHeader title={`Voice Consistency Check: ${pov.pov}`} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Voice Cohesion" value={pov.voiceStrength || 'Weak'} color={pov.voiceStrength === 'Strong' ? '#4cA87a' : pov.voiceStrength === 'Moderate' ? 'var(--color-gold)' : '#c24f4f'} />
        <StatCard label="Vocabulary Hits" value={pov.voiceScore || 0} />
      </div>
      
      {pov.contaminations && pov.contaminations.length > 0 ? (
        <div style={{ padding: '20px', backgroundColor: 'rgba(194, 79, 79, 0.1)', borderRadius: '8px', border: '1px solid rgba(194, 79, 79, 0.3)' }}>
          <h4 style={{ color: '#ffb8b8', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span> Narrative Drift Detected
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pov.contaminations.map((c, i) => (
              <div key={i} style={{ backgroundColor: 'var(--color-obsidian)', padding: '12px', borderLeft: '3px solid #c24f4f', borderRadius: '4px' }}>
                <span style={{ fontSize: '0.9rem' }}>Bleed from <strong>{c.from}</strong></span>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '6px', fontStyle: 'italic' }}>
                  Suspicious terms: {c.hits?.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '16px', backgroundColor: 'rgba(76, 168, 122, 0.1)', borderRadius: '8px', border: '1px solid rgba(76, 168, 122, 0.3)', color: '#4cA87a' }}>✓ Strong single-POV semantic integrity.</div>
      )}
    </Card>
  );
};

export const ModuleProse = ({ chapter, onSelectFlag, activeFlag }) => {
  const issues = chapter?.analysis?.prose?.issues || [];
  return (
    <Card glow>
      <SectionHeader title="Prose Pattern Scanner" />
      <div>
        {issues.map((issue, i) => (
           <RewriteCard key={i} flag={{...issue, type: 'Prose Pattern', severity: issue.severity || 2, text: issue.phrase || issue.sentence, message: issue.reason || issue.msg}} onSelect={onSelectFlag} isActive={activeFlag?.sentenceIndex === issue.sentenceIndex || activeFlag === issue} />
        ))}
        {issues.length === 0 && <div style={{ color: '#4cA87a', fontSize: '0.9rem' }}>✓ Clean prose detected.</div>}
      </div>
    </Card>
  );
};

export const ModuleEmotionalMovement = ({ chapter, onSelectFlag, activeFlag }) => {
  const e = chapter?.analysis?.emotional;
  if (!e) return <Card glow>No emotional tracing data available.</Card>;
  return (
    <Card glow>
      <SectionHeader title="Emotional Arc Tracing" />
      <CoreRuleBanner rule="Emotions must shift within a scene. A scene that starts and ends on the exact same emotional note is structurally flat." />
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Emotional Movement" value={e.shifted ? 'Dynamic' : 'Static'} color={e.shifted ? '#4cA87a' : '#ffb8b8'} />
        <StatCard label="Starting Tone" value={e.start} />
        <StatCard label="Ending Tone" value={e.end} />
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <h4 style={{ color: 'var(--color-gold-muted)', marginBottom: '16px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Rewrite Suggestions Panel</h4>
        {e.flags?.length > 0 ? (
          e.flags.map((f, i) => <RewriteCard key={i} flag={{...f, type: 'Emotional Arc', severity: -5, message: f.msg}} onSelect={onSelectFlag} isActive={activeFlag === f} />)
        ) : (
          <div style={{ color: '#4cA87a', fontSize: '0.9rem' }}>✓ Emotional movement is effectively traced.</div>
        )}
      </div>
    </Card>
  );
};

export const ModuleOutOfPlace = ({ chapter, onSelectFlag, activeFlag }) => {
  const oop = chapter?.analysis?.outOfPlace || [];
  return (
    <Card glow>
      <SectionHeader title="Anachronism & Slips" />
      <div>
        {oop.map((o, i) => (
           <RewriteCard key={i} flag={{type: 'Anachronism', severity: -5, message: o.reason, sentence: o.sentence}} onSelect={onSelectFlag} isActive={activeFlag?.sentence === o.sentence} />
        ))}
        {oop.length === 0 && <div style={{ color: '#4cA87a', fontSize: '0.9rem' }}>✓ No modern colloquialisms or generic slips detected.</div>}
      </div>
    </Card>
  );
};
