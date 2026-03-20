import React from 'react';
import { Button } from '../components/ui/Button';
import { Download, Printer, Share2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportView = () => {
  const navigate = useNavigate();

  const SectionHeading = ({ number, title }) => (
    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '24px', color: '#1a1a1f', marginTop: '48px', textTransform: 'uppercase', letterSpacing: '1px' }}>
      <span style={{ color: 'var(--color-burgundy)', marginRight: '16px' }}>{number}.</span> {title}
    </h3>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', color: 'var(--color-text-muted)', border: 'none', cursor: 'pointer', outline: 'none' }}>
          <ChevronLeft size={16} /> Back to Workspace
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" style={{ gap: '8px' }}><Share2 size={16} /> Share Report</Button>
          <Button variant="secondary" style={{ gap: '8px' }} onClick={() => window.print()}><Printer size={16} /> Print Report</Button>
          <Button variant="primary" style={{ gap: '8px' }}><Download size={16} /> Download PDF</Button>
        </div>
      </div>

      {/* The Printable Report Document Area */}
      <div style={{ backgroundColor: '#fdfdfd', color: '#1a1a1f', padding: '64px', borderRadius: '4px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', minHeight: '1100px' }}>
        
        {/* 1. Header */}
        <header style={{ borderBottom: '2px solid #2d2d34', paddingBottom: '32px', marginBottom: '32px', textAlign: 'center' }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', color: '#555', marginBottom: '16px' }}>The Editorial Grimoire</h4>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#1a1a1f', marginBottom: '8px', lineHeight: '1.1' }}>Chapter 12: The Blood Tithe</h1>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-burgundy)', fontStyle: 'italic', marginBottom: '24px' }}>Crown of Shadow and Glass</h2>
        </header>

        {/* 2. Style Profile Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9fa', padding: '16px 24px', borderLeft: '4px solid #a88b5d', marginBottom: '32px' }}>
          <div>
            <strong style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#555', display: 'block' }}>Active Style Calibration</strong>
            <span style={{ fontSize: '1.1rem', color: '#1a1a1f', fontWeight: 'bold' }}>Author's Core Style (Dark Luxe)</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#555' }}>Date: <strong>Oct 24, 2026</strong></div>
        </div>

        {/* 3. Overall Scores Dashboard */}
        <SectionHeading number="3" title="Overall Scores Dashboard" />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Overall Score', score: '8.5', color: 'var(--color-burgundy)' },
            { label: 'Prose Quality', score: '9.0', color: '#1a1a1f' },
            { label: 'Romance Tension', score: '7.5', color: '#a88b5d' },
            { label: 'Pacing Health', score: '8.0', color: '#1a1a1f' }
          ].map((item, idx) => (
            <div key={idx} style={{ flex: 1, backgroundColor: '#f4f4f6', padding: '24px 16px', borderRadius: '8px', textAlign: 'center', border: item.color === '#a88b5d' ? `2px solid ${item.color}` : 'none' }}>
              <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: item.color }}>{item.score}</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', color: '#555' }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* 4. Chapter Diagnosis */}
        <SectionHeading number="4" title="Chapter Diagnosis" />
        <p style={{ color: '#333', lineHeight: '1.7', marginBottom: '16px' }}><strong>Core Function:</strong> Rising Action / Escalation</p>
        <p style={{ color: '#333', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '16px' }}>"If removed, we lose the critical establishment of the blood-bound magical limits and the first undeniable instance of protagonist physical cooperation."</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div>
            {/* 5. Strengths */}
            <SectionHeading number="5" title="Strengths" />
            <ul style={{ paddingLeft: '20px', color: '#333', lineHeight: '1.6' }}>
              <li>Beautifully layered lyrical prose during the opening sequence.</li>
              <li>Elara's voice is distinct and sharp.</li>
            </ul>
          </div>
          <div>
            {/* 6. Top Problems */}
            <SectionHeading number="6" title="Top Problems" />
            <ul style={{ paddingLeft: '20px', color: '#333', lineHeight: '1.6' }}>
              <li><strong>Pacing (Critical):</strong> Drags significantly over exposition.</li>
              <li><strong>Romance (Moderate):</strong> Physical tension stalls without progression.</li>
            </ul>
          </div>
        </div>

        {/* 7. Priority Fixes */}
        <SectionHeading number="7" title="Priority Fixes" />
        <ol style={{ paddingLeft: '20px', color: '#333', lineHeight: '1.8', fontSize: '1.1rem' }}>
          <li><strong style={{ color: 'var(--color-burgundy)' }}>[High Impact]</strong> Cut the exposition dump on page 4 and distribute into action.</li>
          <li><strong style={{ color: 'var(--color-burgundy)' }}>[High Impact]</strong> Have him touch the pulse point on her wrist before he speaks, forcing physical reaction.</li>
        </ol>

        {/* 8. Prose Flags */}
        <SectionHeading number="8" title="Prose Flags" />
        <div style={{ marginBottom: '16px', borderLeft: '4px solid #ff6b81', paddingLeft: '16px' }}>
          <p style={{ color: '#777', fontSize: '0.875rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Cliché / Vague Phrase — Sev: Moderate</p>
          <p style={{ fontStyle: 'italic', margin: '8px 0', color: '#111' }}>"She let out a breath she didn't realize she was holding."</p>
          <p style={{ color: '#333' }}>Replace with a specific, embodied physical reaction.</p>
        </div>

        {/* 9. AI-Like Writing Tells */}
        <SectionHeading number="9" title="AI-Like Writing Tells" />
        <div style={{ marginBottom: '16px', borderLeft: '4px solid #a88b5d', paddingLeft: '16px' }}>
          <p style={{ color: '#a88b5d', fontSize: '0.875rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Lyrical Repetition — Approved via Style Profile</p>
          <p style={{ fontStyle: 'italic', margin: '8px 0', color: '#111' }}>"The shadow coiled. The shadow pulsed. The shadow waited."</p>
          <p style={{ color: '#333' }}>Detected as repetitive, but approved by the Style Profile.</p>
        </div>

        {/* 10. Voice Consistency */}
        <SectionHeading number="10" title="Voice Consistency" />
        <p style={{ color: '#333', lineHeight: '1.7' }}><strong>Score: 9/10 (Strong).</strong> The POV remains firmly rooted in Elara's historically documented mistrust. Emotional alignment is rock solid.</p>

        {/* 11 & 12 Romance */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <div>
            <SectionHeading number="11" title="Romance Arc" />
            <p style={{ color: '#333', lineHeight: '1.7' }}><strong>Stage:</strong> Hostile Interdependence.</p>
            <p style={{ color: '#333', lineHeight: '1.7' }}>Progression is slow; they are physically closer but emotionally walled off. Obstacle remains high.</p>
          </div>
          <div>
            <SectionHeading number="12" title="Romance Tension" />
            <p style={{ color: '#333', lineHeight: '1.7' }}><strong>Strongest Moment:</strong> The binding ritual proxy.</p>
            <p style={{ color: '#333', lineHeight: '1.7', color: 'var(--color-burgundy)' }}><strong>Missed Opportunity:</strong> Escalation stalls when dialogue turns purely to logistics; need a micro-expression of vulnerability.</p>
          </div>
        </div>

        {/* 13. Repetition Findings */}
        <SectionHeading number="13" title="Repetition Findings" />
        <p style={{ color: '#333', lineHeight: '1.7' }}>The phrase "the hum in their blood" appears 4 times. Intentional motif, but may require variation on page 15.</p>

        {/* 14. Pacing Breakdown */}
        <SectionHeading number="14" title="Pacing Breakdown" />
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <thead style={{ backgroundColor: '#f4f4f6', borderBottom: '2px solid #ddd' }}>
            <tr><th style={{ padding: '12px', textAlign: 'left' }}>Segment</th><th style={{ padding: '12px' }}>Momentum</th><th style={{ padding: '12px' }}>Tension</th><th style={{ padding: '12px' }}>Drag Risk</th></tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '12px' }}>The Walk to the Throne</td><td style={{ padding: '12px', textAlign: 'center' }}>5</td><td style={{ padding: '12px', textAlign: 'center' }}>7</td><td style={{ padding: '12px', textAlign: 'center' }}>Med</td></tr>
          </tbody>
        </table>

        {/* 15. Emotional Movement */}
        <SectionHeading number="15" title="Emotional Movement" />
        <p style={{ color: '#333', lineHeight: '1.7' }}>Moves effectively from <em>Resigned apathy</em> to <em>Curiosity</em> to <em>Cold, calculating terror</em>.</p>

        {/* 16. ARC Density */}
        <SectionHeading number="16" title="ARC Density" />
        <p style={{ color: '#333', lineHeight: '1.7' }}>Classification: <strong>Balanced</strong> (Working adequately on plot, romance, and character progression levels simultaneously).</p>

        {/* 17. Chapter Purpose */}
        <SectionHeading number="17" title="Chapter Purpose" />
        <p style={{ color: '#333', lineHeight: '1.7' }}>Achieved purpose effectively, though the execution suffered a minor gap during the middle transition.</p>

        {/* 18. World / Lore / Magic */}
        <SectionHeading number="18" title="World / Lore / Magic" />
        <p style={{ color: '#333', lineHeight: '1.7' }}>Solid functional clarity on the binding constraints. No floating "white room" syndrome detected.</p>

        {/* 19. Marketability */}
        <SectionHeading number="19" title="Marketability & Hook" />
        <p style={{ color: '#333', lineHeight: '1.7' }}><strong>Bingeability:</strong> High. The chapter ends on a visceral, threatening promise that propels the reader forward.</p>

        {/* 20. Final Summary */}
        <SectionHeading number="20" title="Final Summary" />
        <div style={{ backgroundColor: '#f9f9fa', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #1a1a1f', marginBottom: '48px' }}>
          <p style={{ color: '#333', lineHeight: '1.8', fontStyle: 'italic' }}>
            A fundamentally strong chapter that hits the necessary narrative beats to escalate the overall story. 
            However, minor execution issues—specifically the reliance on generic physical reactions during the 
            romantic midpoint and a pacing drag during exposition—prevent it from achieving maximum impact. 
            Once the priority fixes are addressed to ground Elara's physical panic, this sequence will be exceptionally strong.
          </p>
        </div>

        {/* ========================================= */}
        {/* BETA READER EXPERIENCE SECTION            */}
        {/* ========================================= */}
        <div style={{ marginTop: '64px', borderTop: '4px solid #1a1a1f', paddingTop: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1a1a1f', marginBottom: '8px' }}>Beta Reader Experience</h2>
          <p style={{ color: '#555', fontStyle: 'italic', marginBottom: '32px' }}>A structured simulation mapping real-time emotional and instinctual reader reactions.</p>
          
          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px' }}>
            <div style={{ flex: 1, backgroundColor: '#f4f4f6', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: '#2ecc71', marginBottom: '8px' }}>8.0</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Engagement</div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#f4f4f6', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: '#ff6b81', marginBottom: '8px' }}>8.5</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Emotional Intensity</div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#f4f4f6', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: '#a88b5d', marginBottom: '8px' }}>9.0</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Addictive Pull</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#1a1a1f', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Reader Reaction Tags</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ padding: '6px 12px', borderRadius: '16px', backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>HOOKED</span>
                <span style={{ padding: '6px 12px', borderRadius: '16px', backgroundColor: '#fce4ec', color: '#c2185b', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>ADDICTIVE TENSION</span>
                <span style={{ padding: '6px 12px', borderRadius: '16px', backgroundColor: '#fff3e0', color: '#e65100', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>SKIMMED MIDDLE</span>
                <span style={{ padding: '6px 12px', borderRadius: '16px', backgroundColor: '#e3f2fd', color: '#1565c0', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>EMOTIONALLY INVESTED</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#1a1a1f', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Confusion & Skimming Points</h4>
              <p style={{ color: '#c2185b', fontWeight: '500', marginBottom: '8px' }}>Skimmed Pages 5-7:</p>
              <p style={{ color: '#333', fontSize: '0.95rem', marginBottom: '16px', fontStyle: 'italic' }}>"I totally checked out during the political history lesson. I just wanted them to get back to the throne room."</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#2d2d34', color: '#fff', padding: '32px', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '16px', color: '#ffb8b8' }}>Unfiltered Reader Impression</h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '24px' }}>
              "Honestly, I couldn't put this down once they got into the same room. The tension is incredibly addictive and watching her try to hide her panic was exquisite. But seriously, the four-page lore dump in the middle completely killed the vibe. I skimmed right past it just to see what he would say next."
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', borderTop: '1px solid #444', paddingTop: '24px' }}>
               <div>
                  <h5 style={{ color: '#2ecc71', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '8px' }}>Strongest Moment</h5>
                  <p style={{ fontSize: '0.9rem', color: '#ccc' }}>When he instinctively shielded her from the glass breaking. My heart actually skipped.</p>
               </div>
               <div>
                  <h5 style={{ color: '#ff6b81', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '8px' }}>Weakest Moment</h5>
                  <p style={{ fontSize: '0.9rem', color: '#ccc' }}>The dialogue felt forced in the hallway—she wouldn't lie about something so obvious.</p>
               </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReportView;
