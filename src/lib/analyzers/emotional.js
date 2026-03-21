/**
 * Developmental Emotional State Analyzer
 * Extracts State, Pressure, and Behavior changes globally.
 */

// STATE Lexicons (Redefined by PRIORITY: Pressure, Loss of Power, Shame, Destabilization)
const STATE_CONTROL = ['control', 'fine', 'mask', 'numb', 'stoic', 'hold back', 'swallow', 'tight', 'ignore', 'pressure', 'composure', 'steady', 'focus', 'shallow'];
const STATE_SAFETY = ['safe', 'warm', 'comfort', 'peace', 'belong', 'protected', 'relief'];
const STATE_STABILITY = ['grounded', 'sure', 'certain', 'expected', 'routine', 'normal'];
const STATE_DESIRE = ['want', 'need', 'crave', 'burn', 'ache', 'desire', 'hunger', 'drawn', 'pull'];

const STATE_SHAME = ['shame', 'humiliation', 'worthless', 'fool', 'stupid', 'abomination', 'mistake', 'pathetic', 'laugh', 'flush', 'heat', 'embarrass'];
const STATE_LOSS_CONTROL = ['panic', 'overpowered', 'trapped', 'loss', 'fail', 'forced', 'submit', 'yield', 'cornered'];
const STATE_THREAT = ['threatened', 'fear', 'terrified', 'danger', 'shatter', 'ruin', 'blood', 'pain', 'cruel', 'harsh', 'vulnerable', 'exposed', 'monster'];
const STATE_DESTABILIZATION = ['confused', 'shaken', 'torn', 'uncertain', 'wild', 'restless', 'heavy', 'edge', 'shock', 'destabilized', 'cracked', 'shatter', 'tremble'];

// BEHAVIORAL SHIFT Lexicons (Physical/Internal actions)
const BEHAVIOR_MOVEMENT = ['freeze', 'froze', 'run', 'ran', 'retreat', 'step back', 'submit', 'yield', 'flinch', 'shrank', 'turn away'];
const BEHAVIOR_POWER = ['overpowered', 'trapped', 'pinned', 'forced', 'held', 'destabilized', 'fall', 'kneel', 'submit'];
const BEHAVIOR_INTERACTION = ['silence', 'confront', 'defy', 'comply', 'involuntary', 'shaking', 'breath hitched', 'swallow hard', 'gasp', 'hold back'];

function countLexicon(text, lex) {
    return lex.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
}

function extractPrimaryState(text) {
    const counts = {
        'Control': countLexicon(text, STATE_CONTROL),
        'Safety': countLexicon(text, STATE_SAFETY),
        'Stability': countLexicon(text, STATE_STABILITY),
        'Desire': countLexicon(text, STATE_DESIRE),
        'Shame': countLexicon(text, STATE_SHAME),
        'Loss of Control': countLexicon(text, STATE_LOSS_CONTROL),
        'Threat Exposure': countLexicon(text, STATE_THREAT),
        'Destabilization': countLexicon(text, STATE_DESTABILIZATION)
    };

    let maxState = 'Neutral';
    let maxCount = 0;
    
    for (const [state, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            maxState = state;
        }
    }
    
    // Fallbacks if tied at 0
    if (maxCount === 0) {
        if (text.includes('fear') || text.includes('panic') || text.includes('monster')) return 'Threat Exposure';
        if (text.includes('fine') || text.includes('ignore') || text.includes('swallow')) return 'Control';
        if (text.includes('worthless') || text.includes('abomination')) return 'Shame';
        if (text.includes('shatter') || text.includes('shake')) return 'Destabilization';
    }
    
    return maxState;
}

export function scanEmotionalArc(chapter) {
    const text = chapter.rawText || '';
    const textLower = text.toLowerCase();
    
    const paragraphs = textLower.split(/\n\s*\n|\n/).filter(p => p.trim());
    const sentences = chapter.sentences || text.match(/[^.!?]+[.!?]+/g) || [];
    
    // Evaluate 4 points: 0%, 33%, 66%, 100%
    const pLen = paragraphs.length;
    let arcPoints = [];
    if (pLen > 8) {
        arcPoints.push(extractPrimaryState(paragraphs.slice(0, Math.floor(pLen * 0.25)).join(' ')));
        arcPoints.push(extractPrimaryState(paragraphs.slice(Math.floor(pLen * 0.25), Math.floor(pLen * 0.5)).join(' ')));
        arcPoints.push(extractPrimaryState(paragraphs.slice(Math.floor(pLen * 0.5), Math.floor(pLen * 0.75)).join(' ')));
        arcPoints.push(extractPrimaryState(paragraphs.slice(Math.floor(pLen * 0.75)).join(' ')));
    } else {
        const openingText = paragraphs.slice(0, Math.max(1, Math.floor(pLen * 0.5))).join(' ');
        const closingText = paragraphs.slice(-Math.max(1, Math.floor(pLen * 0.5))).join(' ');
        arcPoints = [extractPrimaryState(openingText), extractPrimaryState(closingText)];
    }
    
    // Clean up adjacent duplicates
    let finalArc = arcPoints.filter((s, i) => i === 0 || s !== arcPoints[i-1]);
    
    // --- END-STATE VALIDATION RULE (Control vs Suppression) ---
    // If the character suffered emotional damage earlier in the chapter,
    // they cannot simply return to 'Control'. They are masking.
    const hasDamage = finalArc.some(s => ['Shame', 'Loss of Control', 'Destabilization', 'Threat Exposure'].includes(s));
    if (hasDamage && finalArc[finalArc.length - 1] === 'Control') {
        finalArc[finalArc.length - 1] = 'Masked Instability';
    }
    
    const entryState = finalArc[0] || 'Neutral';
    const exitState = finalArc[finalArc.length - 1] || 'Neutral';
    
    // Detect Behavior Change
    const behaviorHits = 
        countLexicon(textLower, BEHAVIOR_MOVEMENT) + 
        countLexicon(textLower, BEHAVIOR_POWER) + 
        countLexicon(textLower, BEHAVIOR_INTERACTION);
        
    const hasBehaviorChange = behaviorHits > 0;
    
    const flags = [];
    let arcStage = 'Flatline';
    
    const isNegative = finalArc.some(s => s === 'Loss of Control' || s === 'Destabilization' || s === 'Threat Exposure' || s === 'Shame');
    const opensPositive = (entryState === 'Control' || entryState === 'Safety' || entryState === 'Stability');
    
    if (opensPositive && isNegative) {
        arcStage = 'Negative';
    } else if (finalArc.length === 1 || entryState === exitState) {
        arcStage = `Static (${entryState})`;
        flags.push({
            type: 'Stagnant Emotional State',
            severity: -15,
            message: `The chapter opens and closes in ${entryState} with no structural paradigm shift.`,
            suggestedFix: 'Introduce external pressure to force Destabilization or Loss of Control.',
            text: `Entry: ${entryState} -> Exit: ${exitState}`
        });
    } else {
        arcStage = 'Transitional';
    }
    
    // Flag missing behavior changes
    if (!hasBehaviorChange) {
        flags.push({
            type: 'Missing Behavior Shift',
            severity: -20,
            message: 'Emotion changes but behavior does not. Reaction is strictly internal.',
            suggestedFix: 'Force a Physical Reaction (flinch), Power Shift (trapped), or Movement (run).',
            text: 'Zero behavior markers detected in scene.'
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
        breakdown: { 'Behavior Changes': behaviorHits },
        arcStage,
        start: entryState,
        end: exitState,
        formattedArc: finalArc.join(' \u2192 '),
        entryEmotion: entryState,
        exitEmotion: exitState,
        behaviorChange: hasBehaviorChange ? 'YES' : 'NO'
    };
}
