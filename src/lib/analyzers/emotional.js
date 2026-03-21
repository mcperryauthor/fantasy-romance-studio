/**
 * Character Emotional Arc Integrity Analyzer
 * Implements an 8-step heuristic protocol to detect authentic emotional progression, 
 * behavior validation, and belief shifts across scenes and chapters.
 */

// STEP 1: Lexicons for Emotional Baselines & Shifts
const FEAR_KW = ['fear', 'afraid', 'terrified', 'dread', 'panic', 'worry', 'anxious', 'scared', 'hide', 'avoid', 'run', 'escape'];
const DESIRE_KW = ['want', 'need', 'crave', 'desire', 'wish', 'hope', 'yearn', 'longing', 'ache', 'hunger', 'thirst'];
const WOUND_KW = ['pain', 'hurt', 'memory', 'past', 'scar', 'trauma', 'grief', 'loss', 'betrayal', 'broken', 'shatter'];

const TRIGGER_KW = ['because', 'suddenly', 'forced', 'until', 'when', 'realized', 'saw', 'revealed', 'heard', 'struck', 'hit', 'pushed', 'pull'];
const BEHAVIOR_KW = ['decided', 'chose', 'stepped', 'moved', 'grabbed', 'reached', 'pulled', 'pushed', 'turned', 'ran', 'fought', 'kissed', 'struck', 'stopped', 'stood'];
const INTENSITY_KW = ['more', 'so much', 'too much', 'overwhelming', 'burning', 'raging', 'screaming', 'shaking', 'trembling'];

const BELIEF_EARLY_KW = ["won't", "can't", "don't", 'never', 'impossible', 'refuse', 'stop'];
const BELIEF_LATE_KW = ['maybe', 'want', 'need', "shouldn't", 'could', 'what if', 'perhaps', 'try'];

const POSITIVE_EMOTIONS = ['calm', 'hopeful', 'warm', 'safe', 'brave', 'determined', 'strong', 'loved', 'alive', 'peace', 'relief'];
const NEGATIVE_EMOTIONS = ['angry', 'furious', 'terrified', 'broken', 'cold', 'numb', 'lost', 'alone', 'despair', 'panic', 'shame'];
const PUSHPULL_EMOTIONS = ['confused', 'torn', 'uncertain', 'aching', 'restless', 'tempted', 'drawn', 'guilty', 'wild'];

function extractPrimaryEmotion(text) {
    const pHits = POSITIVE_EMOTIONS.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
    const nHits = NEGATIVE_EMOTIONS.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
    const ppHits = PUSHPULL_EMOTIONS.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
    
    if (pHits === 0 && nHits === 0 && ppHits === 0) return 'Neutral';
    if (pHits > nHits && pHits > ppHits) return POSITIVE_EMOTIONS.find(kw => text.includes(kw)) || 'Hopeful';
    if (nHits > pHits && nHits > ppHits) return NEGATIVE_EMOTIONS.find(kw => text.includes(kw)) || 'Angry';
    return PUSHPULL_EMOTIONS.find(kw => text.includes(kw)) || 'Confused';
}

function capitalize(s) {
    if (!s || s.length === 0) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function scanEmotionalArc(chapter) {
    const text = chapter.rawText || '';
    const textLower = text.toLowerCase();
    const sentences = chapter.sentences || text.match(/[^.!?]+[.!?]+/g) || [];
    
    const flags = [];
    const emittedRules = new Set();
    
    // STEP 2: Scene-Level Emotional Tracking (Entry vs Exit)
    const first10 = sentences.slice(0, Math.max(5, Math.floor(sentences.length * 0.1))).join(' ').toLowerCase();
    const last10 = sentences.slice(-Math.max(5, Math.floor(sentences.length * 0.1))).join(' ').toLowerCase();
    const midBody = sentences.slice(Math.max(5, Math.floor(sentences.length * 0.1)), -Math.max(5, Math.floor(sentences.length * 0.1))).join(' ').toLowerCase();
    
    const entryEmotionRaw = extractPrimaryEmotion(first10);
    const exitEmotionRaw = extractPrimaryEmotion(last10);
    
    const entryEmotion = capitalize(entryEmotionRaw);
    const exitEmotion = capitalize(exitEmotionRaw);
    
    const triggerHits = TRIGGER_KW.reduce((s, kw) => s + (midBody.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
    const behaviorHits = BEHAVIOR_KW.reduce((s, kw) => s + (last10.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
    const intensityHits = INTENSITY_KW.reduce((s, kw) => s + (textLower.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);

    let arcStage = 'Flatline';
    
    // Core Rules Eval
    if (entryEmotion === exitEmotion && intensityHits === 0) {
        flags.push({
            type: 'Flatline Scene',
            severity: -15,
            message: 'Entry Emotion = Exit Emotion. Character shows no internal shift.',
            suggestedFix: 'Introduce a disruption or pressure that forces a reaction.',
            text: `Start: ${entryEmotion} -> End: ${exitEmotion}`
        });
        arcStage = 'Flatline (No Change)';
    } else if (entryEmotion === exitEmotion && intensityHits > 3 && behaviorHits === 0) {
        flags.push({
            type: 'False Progression',
            severity: -10,
            message: 'Only emotional intensity increases (e.g. angry -> more angry) with no behavioral shift.',
            suggestedFix: 'Force the character to make a new decision based on this intensity.',
            text: `Intensity triggers: ${intensityHits}, Behavioral triggers: 0`
        });
        arcStage = 'False Arc (Stated not enacted)';
    } else if (entryEmotion !== exitEmotion && behaviorHits === 0) {
        // STEP 4: Behavior Validation
        flags.push({
            type: 'Unrealized Emotion',
            severity: -15,
            message: 'Emotion changes but behavior does not. Emotion is not grounded in action.',
            suggestedFix: 'Show the character speaking differently, making a choice, or moving.',
            text: `Shifted to ${exitEmotion} but zero behavioral markers detected.`
        });
        arcStage = 'Unrealized Shift';
    } else if (entryEmotion !== exitEmotion && triggerHits === 0) {
        flags.push({
            type: 'Missing Pressure',
            severity: -10,
            message: 'Emotional shift occurred without a clear narrative trigger or disruption.',
            suggestedFix: 'Provide an external push (new information, a threat, or an action by another).',
            text: `Start: ${entryEmotion} -> End: ${exitEmotion}`
        });
        arcStage = 'Unearned Shift';
    } else if (entryEmotion !== exitEmotion && behaviorHits > 0) {
        // STEP 3: Classification
        if (POSITIVE_EMOTIONS.includes(exitEmotionRaw)) arcStage = 'Positive Shift (Growth / Connection)';
        else if (NEGATIVE_EMOTIONS.includes(exitEmotionRaw)) arcStage = 'Negative Shift (Fear / Instability)';
        else arcStage = 'Push-Pull Shift (Desire vs Resistance)';
    }

    // STEP 5: Internal Belief Shift
    const earlyBeliefs = BELIEF_EARLY_KW.reduce((s, kw) => s + (first10.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
    const lateBeliefs = BELIEF_LATE_KW.reduce((s, kw) => s + (last10.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length, 0);
    
    if (earlyBeliefs > 0 && lateBeliefs > 0) {
        flags.push({
            type: 'Strong Belief Evolution',
            severity: +20,
            message: 'Character transitions from avoidance/denial to possibility/desire.',
            suggestedFix: 'Excellent emotional progression mapped to internal belief shift.',
            text: `Early Resistance -> Late Possibility`
        });
    } else if (earlyBeliefs > 2 && lateBeliefs === 0 && chapter.index > 5) {
         flags.push({
            type: 'Static Internal Arc',
            severity: -10,
            message: 'Beliefs repeat unchanged ("I won\'t / I can\'t").',
            suggestedFix: 'Introduce a crack in their absolute belief system ("Maybe...").',
            text: `${earlyBeliefs} raw avoidance statements detected.`
        });
    }

    // STEP 7: Romance Arc Tracking Handled by romance.js (we inject scores here)

    let totalScore = 100;
    flags.forEach(f => {
        totalScore += (f.severity > 0 ? 0 : f.severity); // Only subtract negative severity
    });

    const finalScore = Math.max(0, Math.min(100, totalScore));

    return {
        start: entryEmotion,
        end: exitEmotion,
        arcStage: arcStage,
        behaviorHits,
        triggerHits,
        score: finalScore,
        flags: flags
    };
}
