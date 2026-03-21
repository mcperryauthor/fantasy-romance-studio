/**
 * Developmental Emotional State Analyzer
 * Extracts State, Pressure, and Behavior changes globally.
 */

// STATE Lexicons
const STATE_CONTROL = ['control', 'fine', 'mask', 'numb', 'stoic', 'calm', 'steady', 'safe', 'hide', 'ignore'];
const STATE_SAFETY = ['safe', 'warm', 'comfort', 'peace', 'belong', 'protected', 'relief'];
const STATE_STABILITY = ['steady', 'grounded', 'sure', 'certain', 'expected', 'routine', 'normal'];
const STATE_DESIRE = ['want', 'need', 'crave', 'burn', 'ache', 'desire', 'hunger', 'drawn', 'pull'];

const STATE_LOSS_CONTROL = ['shame', 'humiliation', 'panic', 'worthless', 'destabilized', 'overpowered', 'trapped', 'loss', 'fail'];
const STATE_THREAT = ['threatened', 'fear', 'terrified', 'danger', 'shatter', 'ruin', 'blood', 'pain', 'cruel', 'harsh'];
const STATE_DESTABILIZATION = ['confused', 'torn', 'uncertain', 'wild', 'restless', 'heavy', 'edge', 'shock', 'sudden'];
const STATE_RESISTANCE = ['don\'t', 'stop', 'back', 'no', 'fight', 'refuse', 'resist', 'defiance', 'anger'];

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
        'Loss of Control': countLexicon(text, STATE_LOSS_CONTROL),
        'Threat': countLexicon(text, STATE_THREAT),
        'Destabilization': countLexicon(text, STATE_DESTABILIZATION),
        'Resistance': countLexicon(text, STATE_RESISTANCE)
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
        if (text.includes('fear') || text.includes('panic')) return 'Threat';
        if (text.includes('fine') || text.includes('ignore')) return 'Control';
    }
    
    return maxState;
}

export function scanEmotionalArc(chapter) {
    const text = chapter.rawText || '';
    const textLower = text.toLowerCase();
    
    const paragraphs = textLower.split(/\n\s*\n|\n/).filter(p => p.trim());
    const sentences = chapter.sentences || text.match(/[^.!?]+[.!?]+/g) || [];
    
    // ENTRY STATE = First 2-3 paragraphs (or first ~8 sentences)
    const openingText = paragraphs.slice(0, Math.max(3, Math.floor(paragraphs.length * 0.15))).join(' ');
    // EXIT STATE = Condition after final interaction
    const closingText = paragraphs.slice(-Math.max(3, Math.floor(paragraphs.length * 0.15))).join(' ');
    
    const entryState = extractPrimaryState(openingText);
    const exitState = extractPrimaryState(closingText);
    
    // Detect Behavior Change
    const behaviorHits = 
        countLexicon(textLower, BEHAVIOR_MOVEMENT) + 
        countLexicon(textLower, BEHAVIOR_POWER) + 
        countLexicon(textLower, BEHAVIOR_INTERACTION);
        
    const hasBehaviorChange = behaviorHits > 0;
    
    const flags = [];
    let arcStage = 'Flatline';
    
    // State-Based Arc Classification Fix
    if ((entryState === 'Control' && exitState === 'Loss of Control') ||
        (entryState === 'Control' && exitState === 'Destabilization')) {
        arcStage = 'Negative Arc (Control \u2192 Destabilization)';
    } else if (entryState === 'Safety' && (exitState === 'Threat' || exitState === 'Destabilization')) {
        arcStage = 'Negative Arc (Safety \u2192 Threat)';
    } else if (entryState === 'Stability' && exitState === 'Destabilization') {
        arcStage = 'Negative Arc (Stability \u2192 Destabilization)';
    } else if ((entryState === 'Desire' && exitState === 'Resistance') || 
               (entryState === 'Resistance' && (exitState === 'Desire' || exitState === 'Loss of Control'))) {
        arcStage = 'Push-Pull Arc (Desire \u2194 Resistance)';
    } else if (entryState === exitState) {
        arcStage = `Static Arc (${entryState})`;
        flags.push({
            type: 'Stagnant Emotional State',
            severity: -15,
            message: `The chapter opens and closes in ${entryState} with no structural paradigm shift.`,
            suggestedFix: 'Introduce external pressure to force Destabilization or Loss of Control.',
            text: `Entry: ${entryState} -> Exit: ${exitState}`
        });
    } else {
        arcStage = `${entryState} \u2192 ${exitState}`;
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
        entryEmotion: entryState,
        exitEmotion: exitState,
        behaviorChange: hasBehaviorChange ? 'YES' : 'NO'
    };
}
