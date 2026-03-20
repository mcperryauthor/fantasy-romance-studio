import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Download } from 'lucide-react';

/* Import all 17 modules */
import { ModuleHighLevel, ModuleStrengths, ModuleTopProblems, ModulePriorityFixes } from '../components/modules/ModuleList1';
import { ModuleProseFlags, ModuleAITells, ModuleVoiceConsistency } from '../components/modules/ModuleList2';
import { ModuleRomanceArc, ModuleRomanceTension, ModuleRepetitionScan } from '../components/modules/ModuleList3';
import { ModulePacingBreakdown, ModuleEmotionalMovement, ModuleArcDensity, ModuleChapterPurpose } from '../components/modules/ModuleList4';
import { ModuleMarketability, ModuleWorldLoreMagic, ModuleFinalSummary } from '../components/modules/ModuleList5';

/* Import 13 Beta Modules */
import { ModuleBetaLiveReaction, ModuleBetaHook, ModuleBetaImmersion, ModuleBetaCharacterConnection, ModuleBetaRomanceExperience } from '../components/modules/ModuleBetaList1';
import { ModuleBetaPacing, ModuleBetaConfusion, ModuleBetaObsession, ModuleBetaSkim, ModuleBetaFavorite } from '../components/modules/ModuleBetaList2';
import { ModuleBetaLeastEffective, ModuleBetaEndingReaction, ModuleBetaOverallImpression } from '../components/modules/ModuleBetaList3';

/* Import 9 Beta Variants */
import { ModuleVariantDarkRomance, ModuleVariantWorldImmersion, ModuleVariantSlowBurn, ModuleVariantBookTok } from '../components/modules/ModuleVariantList1';
import { ModuleVariantCharacterDriven, ModuleVariantPacingSensitive, ModuleVariantProseFocused, ModuleVariantBalance } from '../components/modules/ModuleVariantList2';
import { ModuleVariantComparison } from '../components/modules/ModuleVariantComparison';

const ReviewWorkspace = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('1. High-Level Chapter Diagnosis');

  const modules = [
    { id: '1. High-Level Chapter Diagnosis', component: <ModuleHighLevel /> },
    { id: '2. Strengths', component: <ModuleStrengths /> },
    { id: '3. Top Problems', component: <ModuleTopProblems /> },
    { id: '4. Priority Fixes', component: <ModulePriorityFixes /> },
    { id: '5. Prose Flags', component: <ModuleProseFlags /> },
    { id: '6. AI-Like Writing Tells', component: <ModuleAITells /> },
    { id: '7. Voice Consistency', component: <ModuleVoiceConsistency /> },
    { id: '8. Romance Arc', component: <ModuleRomanceArc /> },
    { id: '9. Romance Tension', component: <ModuleRomanceTension /> },
    { id: '10. Repetition Scan', component: <ModuleRepetitionScan /> },
    { id: '11. Pacing Breakdown', component: <ModulePacingBreakdown /> },
    { id: '12. Emotional Movement', component: <ModuleEmotionalMovement /> },
    { id: '13. Arc Density', component: <ModuleArcDensity /> },
    { id: '14. Chapter Purpose', component: <ModuleChapterPurpose /> },
    { id: '15. Marketability / Hook', component: <ModuleMarketability />, type: 'editorial' },
    { id: '16. World / Lore / Magic', component: <ModuleWorldLoreMagic />, type: 'editorial' },
    { id: '17. Final Summary', component: <ModuleFinalSummary />, type: 'editorial' },
    { id: 'B1. Live Reaction Tracker', component: <ModuleBetaLiveReaction />, type: 'beta' },
    { id: 'B2. Hook & Opening Reaction', component: <ModuleBetaHook />, type: 'beta' },
    { id: 'B3. Immersion Check', component: <ModuleBetaImmersion />, type: 'beta' },
    { id: 'B4. Character Connection', component: <ModuleBetaCharacterConnection />, type: 'beta' },
    { id: 'B5. Romance Experience', component: <ModuleBetaRomanceExperience />, type: 'beta' },
    { id: 'B6. Pacing Experience', component: <ModuleBetaPacing />, type: 'beta' },
    { id: 'B7. Confusion & Clarity', component: <ModuleBetaConfusion />, type: 'beta' },
    { id: 'B8. Obsession Check', component: <ModuleBetaObsession />, type: 'beta' },
    { id: 'B9. Skim Detection', component: <ModuleBetaSkim />, type: 'beta' },
    { id: 'B10. Favorite Moments', component: <ModuleBetaFavorite />, type: 'beta' },
    { id: 'B11. Least Effective Moments', component: <ModuleBetaLeastEffective />, type: 'beta' },
    { id: 'B12. Ending Reaction', component: <ModuleBetaEndingReaction />, type: 'beta' },
    { id: 'B13. Overall Reader Impression', component: <ModuleBetaOverallImpression />, type: 'beta' },
    { id: 'V1. Dark Romance Reader', component: <ModuleVariantDarkRomance />, type: 'variant' },
    { id: 'V2. World Immersion Reader', component: <ModuleVariantWorldImmersion />, type: 'variant' },
    { id: 'V3. Slow Burn Reader', component: <ModuleVariantSlowBurn />, type: 'variant' },
    { id: 'V4. BookTok Viral Reader', component: <ModuleVariantBookTok />, type: 'variant' },
    { id: 'V5. Character-Driven Reader', component: <ModuleVariantCharacterDriven />, type: 'variant' },
    { id: 'V6. Pacing-Sensitive Reader', component: <ModuleVariantPacingSensitive />, type: 'variant' },
    { id: 'V7. Prose-Focused Reader', component: <ModuleVariantProseFocused />, type: 'variant' },
    { id: 'V8. Balance Reader', component: <ModuleVariantBalance />, type: 'variant' },
    { id: 'V9. Variant Comparison', component: <ModuleVariantComparison />, type: 'variant' },
  ];

  const activeComponent = modules.find(m => m.id === activeModule)?.component;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', marginTop: '-var(--spacing-lg)' }}>
      {/* Sticky Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--color-plum-dark)', marginBottom: 'var(--spacing-md)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Chapter 12: The Blood Tithe</h1>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.875rem' }}>
            <span className="text-muted">Crown of Shadow and Glass</span>
            <span className="text-muted">•</span>
            <span className="text-gold" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
               Style Profile: Author's Core Style (Dark Luxe)
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="ghost">Save Workspace</Button>
          <Button variant="primary" onClick={() => navigate('/report/1')} style={{ gap: '8px' }}><Download size={16} /> Generate Report</Button>
        </div>
      </div>

      {/* 3-Panel Workspace */}
      <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flex: 1, minHeight: 0 }}>
        
        {/* Left Nav */}
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', paddingRight: '8px' }}>
          
          <h3 className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', marginTop: '8px' }}>Editorial Review</h3>
          {modules.filter(m => m.type === 'editorial').map(mod => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                backgroundColor: activeModule === mod.id ? 'var(--color-charcoal)' : 'transparent',
                border: activeModule === mod.id ? '1px solid var(--color-burgundy)' : '1px solid transparent',
                borderRadius: '8px', color: activeModule === mod.id ? '#fff' : 'var(--color-text-muted)',
                textAlign: 'left', fontWeight: activeModule === mod.id ? '600' : '400',
                fontSize: '0.9rem', transition: 'all 0.2s', width: '100%'
              }}
            >
              {mod.id.split('. ')[1]}
            </button>
          ))}

          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', marginTop: '24px', color: '#ffb8b8' }}>Beta Simulation</h3>
          {modules.filter(m => m.type === 'beta').map(mod => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                backgroundColor: activeModule === mod.id ? 'rgba(255, 107, 129, 0.1)' : 'transparent',
                border: activeModule === mod.id ? '1px solid #ff6b81' : '1px solid transparent',
                borderRadius: '8px', color: activeModule === mod.id ? '#fff' : 'var(--color-text-muted)',
                textAlign: 'left', fontWeight: activeModule === mod.id ? '600' : '400',
                fontSize: '0.9rem', transition: 'all 0.2s', width: '100%'
              }}
            >
              {mod.id.split('. ')[1]}
            </button>
          ))}

          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', marginTop: '24px', color: '#a88b5d' }}>Variant Scenarios</h3>
          {modules.filter(m => m.type === 'variant').map(mod => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                backgroundColor: activeModule === mod.id ? 'rgba(168, 139, 93, 0.1)' : 'transparent',
                border: activeModule === mod.id ? '1px solid #a88b5d' : '1px solid transparent',
                borderRadius: '8px', color: activeModule === mod.id ? '#fff' : 'var(--color-text-muted)',
                textAlign: 'left', fontWeight: activeModule === mod.id ? '600' : '400',
                fontSize: '0.9rem', transition: 'all 0.2s', width: '100%'
              }}
            >
              {mod.id.split('. ')[1]}
            </button>
          ))}
        </div>

        {/* Center Panel (Active Module) */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '16px' }}>
          {activeComponent}
        </div>

        {/* Right Summary Panel */}
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', overflowY: 'auto' }}>
          <Card>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Chapter Scorecard</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Global Health</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: '600', color: '#fff' }}>--/10</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Prose & Voice</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: '600', color: '#fff' }}>--/10</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-gold-muted)' }}>Romance Tension</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: '600', color: 'var(--color-gold-muted)' }}>7.5</span>
              </div>
            </div>
            
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-plum-dark)' }}>
              <h4 className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '12px' }}>Workspace Activity</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Badge variant="gray">17 Modules</Badge>
                <Badge variant="red">3 High Priority</Badge>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ReviewWorkspace;
