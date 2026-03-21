/**
 * Developmental Emotional Stance Analyzer
 * Maps character internal defense mechanisms and vulnerability progression.
 */

const STANCE_SHIELD = ['ignore', 'fine', 'nothing', 'mask', 'cold', 'numb', 'push away', 'wall', 'pretend', 'distant', 'safe', 'control', 'shut', 'block'];
const STANCE_CRACK = ['hesitate', 'falter', 'crack', 'slip', 'realize', 'maybe', 'ache', 'beneath', 'exposed', 'raw', 'sudden', 'stare', 'wonder'];
const STANCE_YIELD = ['give in', 'surrender', 'want', 'need', 'let it', 'truth', 'finally', 'break', 'close my eyes', 'lean into', 'desire', 'crave', 'belong'];
const STANCE_BACKLASH = ['mistake', 'distance', 'pull away', 'run', 'hide', 'danger', "shouldn't", 'regret', 'panic', 'close off', 'fear', 'terrified', 'turn away'];

const PHYSIOLOGY_ACTIVE = ['shaking', 'trembling', 'flushed', 'clenched', 'jaw tightened', 'heart raced', 'pulse hammered', 'swallowed hard', 'tears', 'sob', 'flinch', 'shrank', 'nausea', 'bile', 'breath hitched', 'gasp'];
const PHYSIOLOGY_PASSIVE = ['relaxed', 'eased', 'shoulders dropped', 'smile', 'laugh', 'smooth', 'loose', 'calm', 'steady'];

function countLexicon(text, lex) {
    return lex.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
}

function extractStance(text) {
    const shieldHits = countLexicon(text, STANCE_SHIELD);
    const crackHits = countLexicon(text, STANCE_CRACK) + countLexicon(text, PHYSIOLOGY_ACTIVE) * 0.5; 
    const yieldHits = countLexicon(text, STANCE_YIELD) + countLexicon(text, PHYSIOLOGY_PASSIVE);
    const backlashHits = countLexicon(text, STANCE_BACKLASH) + countLexicon(text, PHYSIOLOGY_ACTIVE);

    const max = Math.max(shieldHits, crackHits, yieldHits, backlashHits);
    if (max === 0) return 'Guarded / Neutral';
    if (max === shieldHits) return 'Shielded (Defensive)';
    if (max === backlashHits) return 'Backlash (Retreat/Fear)';
    if (max === yieldHits) return 'Yielding (Acceptance)';
    return 'Cracking (Vulnerability)';
}

export function scanEmotionalArc(chapter) {
    const text = chapter.rawText || '';
    const textLower = text.toLowerCase();
    const sentences = chapter.sentences || text.match(/[^.!?]+[.!?]+/g) || [];
    
    const flags = [];
    
    const openingNode = sentences.slice(0, Math.max(8, Math.floor(sentences.length * 0.2))).join(' ').toLowerCase();
    const climaxNode = sentences.slice(-Math.max(8, Math.floor(sentences.length * 0.2))).join(' ').toLowerCase();
    
    const entryStance = extractStance(openingNode);
    const exitStance = extractStance(climaxNode);
    
    const hasPhysiology = countLexicon(textLower, PHYSIOLOGY_ACTIVE) + countLexicon(textLower, PHYSIOLOGY_PASSIVE) > 0;

    let arcStage = 'Static Guard';
    
    if (entryStance === exitStance) {
        if (entryStance.includes('Shielded')) {
            flags.push({
                type: 'Armor Lock (Stagnant)',
                severity: -15,
                message: 'Character begins and ends defensive without cracking.',
                suggestedFix: 'Introduce an external pressure that forces them to falter.',
                text: `Stance: ${entryStance} -> ${exitStance}`
            });
            arcStage = 'Flatline (Armor Locked)';
        } else if (entryStance.includes('Cracking') || entryStance.includes('Yielding')) {
            flags.push({
                type: 'Unresolved Vulnerability',
                severity: -5,
                message: 'Character remains in a vulnerable state without a paradigm resolution or retreat.',
                suggestedFix: 'Force them to build a new shield or fully accept the vulnerability.',
                text: `Stance: ${entryStance} -> ${exitStance}`
            });
            arcStage = 'Suspended Vulnerability';
        } else {
             arcStage = 'Static (No Stance Shift)';
        }
    } else {
        if (entryStance.includes('Shielded') && (exitStance.includes('Cracking') || exitStance.includes('Yielding'))) {
            arcStage = 'Vulnerability Revealed (Growth)';
        } else if (entryStance.includes('Yielding') && exitStance.includes('Backlash')) {
            arcStage = 'Regret / Push-Pull Retreat';
        } else if (entryStance.includes('Cracking') && exitStance.includes('Shielded')) {
            arcStage = 'Retreat to Armor (Regression)';
        } else {
            arcStage = `${entryStance.split(' ')[0]} -> ${exitStance.split(' ')[0]}`;
        }
    }

    if (!hasPhysiology && entryStance !== 'Guarded / Neutral') {
        flags.push({
            type: 'Telling Emotion',
            severity: -15,
            message: 'Emotional stance detected but zero physiological "show" markers found.',
            suggestedFix: 'Anchor the internal realization to a specific bodily reaction (pulse, breath, jaw).',
            text: 'Action required: Add physiological grounding.'
        });
    }

    let totalScore = 100;
    flags.forEach(f => {
        totalScore += (f.severity > 0 ? 0 : f.severity);
    });

    const finalScore = Math.max(0, Math.min(100, totalScore));

    return {
        score: finalScore,
        flags: flags,
        breakdown: { 'Arc Stability': 1 },
        arcStage,
        entryEmotion: entryStance,
        exitEmotion: exitStance
    };
}
