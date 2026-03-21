/**
 * Pacing Detector (Narrative Flow & Momentum Scan)
 * Evaluates whether scenes and chapters maintain forward momentum, variation in rhythm, and narrative progression.
 * Includes advanced Action vs Introspection Block Tracking and Romance Flow Overlay.
 */

// STEP 1: ACTION LEXICON
const PHYSICAL_VERBS = ['walked', 'stepped', 'turned', 'grabbed', 'pulled', 'pushed', 'opened', 'closed', 'crossed', 'leaned', 'flinched', 'hit', 'ran', 'fell', 'caught', 'struck', 'shoved'];
const TIME_PROGRESSION = ['then', 'when', 'as', 'before', 'after', 'suddenly'];
const ENV_INTERACTION = ['door', 'glass', 'shattered', 'table', 'chair', 'wall', 'floor', 'ground', 'sword', 'blade', 'weapon'];

// STEP 2: INTROSPECTION LEXICON
const THOUGHT_MARKERS = ['thought', 'knew', 'realized', 'wondered', 'felt', 'seemed', "couldn't", 'why', 'how'];
const EMOTION_PROCESSING = ['fear', 'guilt', 'desire', 'shame', 'longing', 'ache', 'weight', 'pressure', 'panic', 'angry', 'furious', 'sad', 'empty', 'thrill'];
const MEMORY_MARKERS = ['before', 'once', 'used to', 'remembered', 'had been', 'memory', 'past'];
const HYPOTHETICALS = ['what if', 'maybe', "shouldn't", "can't", 'perhaps', 'if only'];
const SENSORY_JUDGMENT = ['ruthless', 'beautiful', 'sickly', 'brittle', 'violent', 'benevolent', 'perfect', 'flawless', 'effortless', 'eternal', 'warm', 'cold', 'sharp', 'soft', 'heavy', 'light', 'dark', 'bright', 'bitter', 'sweet', 'hollow', 'cruel', 'kind', 'harsh', 'gentle'];

// STEP 3: REACTIVE INTERNALITY LEXICON
// Physical/Behavioral responses driven by internal emotion (Suppression, proximity, visceral response)
const REACTIVE_KW = ['throat closes', 'breath shallow', 'flinch', 'shiver', 'tremble', 'flatten', 'stillness', 'resist the urge', 'hold back', 'force myself', 'refuse to', 'swallow', 'stutter', 'clench', 'jaw tightened', 'heart raced', 'pulse', 'nausea', 'bile', 'breath hitched', 'shaking', 'shrank', 'froze'];

// Helpers
function countHits(text, lexicons) {
    const lo = text.toLowerCase();
    let hits = 0;
    lexicons.forEach(kw => {
        hits += (lo.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length;
    });
    return hits;
}

export function scanPacing(chapter) {
    const flags = [];
    const emittedRules = new Set();
    const scenes = chapter.scenes || [];
    
    let totalScore = 100;
    let totalActionBlocks = 0;
    let totalIntroBlocks = 0;
    let totalDialogueBlocks = 0;
    let totalReactiveBlocks = 0;
    let totalParagraphs = 0;

    let hasGoodRomanceFlow = false;
    let pushPullPresent = false;

    scenes.forEach((scene, sceneIdx) => {
        const text = scene.text || '';
        if (!text.trim()) return;
        
        const paragraphs = text.split(/\n\s*\n|\n/).filter(p => p.trim());
        if (paragraphs.length === 0) return;

        totalDialogueBlocks += paragraphs.filter(p => /["“”]/.test(p)).length;

        let actionStreak = 0;
        let introStreak = 0;
        
        // Romance Flow Tracking
        let romanceFlowPattern = []; // Keep track of continuous A-I-A sequences

        paragraphs.forEach((p, pIdx) => {
            totalParagraphs++;
            
            // 1. ACTION SIGNALS
            const physicalHits = countHits(p, PHYSICAL_VERBS);
            const timeHits = countHits(p, TIME_PROGRESSION);
            const envHits = countHits(p, ENV_INTERACTION);
            const isDialogue = /["“'”’]/.test(p);
            
            const totalActionSignals = physicalHits + timeHits + (isDialogue ? 3 : 0) + envHits;

            // 2. INTROSPECTION SIGNALS
            const thoughtHits = countHits(p, THOUGHT_MARKERS);
            const emotionHits = countHits(p, EMOTION_PROCESSING);
            const memoryHits = countHits(p, MEMORY_MARKERS);
            const hypoHits = countHits(p, HYPOTHETICALS);
            const judgmentHits = countHits(p, SENSORY_JUDGMENT);
            
            const totalIntroSignals = thoughtHits + emotionHits + memoryHits + hypoHits + judgmentHits;

            // STEP 3: SEGMENT CLASSIFICATION
            let classification = 'Neutral';
            const reactiveHits = countHits(p, REACTIVE_KW);
            
            if (reactiveHits > 0) {
                classification = 'REACTIVE';
                totalReactiveBlocks++;
                actionStreak = 0;
                introStreak = 0;
                romanceFlowPattern.push('R');
            } else if (totalActionSignals > (totalIntroSignals + 1)) {
                classification = 'ACTION';
                totalActionBlocks++;
                actionStreak++;
                introStreak = 0;
                romanceFlowPattern.push('A');
            } else if (totalIntroSignals > (totalActionSignals + 1)) {
                classification = 'INTROSPECTION';
                totalIntroBlocks++;
                introStreak++;
                actionStreak = 0;
                romanceFlowPattern.push('I');
            } else {
                actionStreak = 0;
                introStreak = 0;
            }

            // STEP 4: FAILURE DETECTION
            
            // 1. Introspection Overload
            if (introStreak >= 3 && !emittedRules.has('Introspection Overload')) {
                flags.push({
                    type: 'Introspection Overload',
                    severity: -15,
                    message: 'Scene stalled in internal processing.',
                    suggestedFix: 'Break up the 3+ internal blocks with external physical action or dialogue.',
                    text: p.slice(0, 50) + '...',
                    sceneIndex: sceneIdx
                });
                emittedRules.add('Introspection Overload');
            }

            // 2. Action Without Internality
            if (actionStreak >= 4 && !emittedRules.has('Low emotional grounding')) {
                flags.push({
                    type: 'Action Without Internality',
                    severity: -10,
                    message: 'Low emotional grounding. Long action sequence with no introspection.',
                    suggestedFix: 'Show what the character feels or fears about this action sequence.',
                    text: p.slice(0, 50) + '...',
                    sceneIndex: sceneIdx
                });
                emittedRules.add('Low emotional grounding');
            }

            // 4. Static Introspection
            // Re-evaluating the same hypo without action
            if (classification === 'INTROSPECTION' && hypoHits > 2 && introStreak > 1 && !emittedRules.has('Static Introspection')) {
                 flags.push({
                    type: 'Static Introspection',
                    severity: -10,
                    message: 'Repetitive internal loop detected without belief shift.',
                    suggestedFix: 'Force the character out of their head and into a choice.',
                    text: p.slice(0, 50) + '...',
                    sceneIndex: sceneIdx
                });
                emittedRules.add('Static Introspection');
            }
        });

        // 3. Action-Introspection Disconnect
        // If the scene had massive action but 0 intro blocks and 0 reactive blocks
        if (totalActionBlocks > 3 && totalIntroBlocks === 0 && totalReactiveBlocks === 0 && !emittedRules.has('Action-Introspection Disconnect')) {
            flags.push({
                type: 'Action-Introspection Disconnect',
                severity: -10,
                message: 'Events lack emotional consequence.',
                suggestedFix: 'The character must have a reaction to the scene events.',
                text: 'Entire scene ' + (sceneIdx + 1),
                sceneIndex: sceneIdx
            });
            emittedRules.add('Action-Introspection Disconnect');
        }

        // 4. Positive Reinforcement: High-Level Prose
        if (totalReactiveBlocks > 2 && !emittedRules.has('Reactive Mastery')) {
            flags.push({
                type: 'Reactive Mastery',
                severity: 15, // Positive reward
                message: 'Strong emotional grounding. Interaction leverages high-level reactive internality (showing vs telling).',
                suggestedFix: 'Excellent emotional processing in real-time.',
                text: 'Detected in Scene ' + (sceneIdx + 1),
                sceneIndex: sceneIdx
            });
            emittedRules.add('Reactive Mastery');
        }

        // ROMANCE OVERLAY
        const flowString = romanceFlowPattern.join('');
        if (flowString.includes('AIA') || flowString.includes('AHA')) {
            hasGoodRomanceFlow = true;
            pushPullPresent = true;
        }
        
        // Bad Romance Flow: Too much introspection
        if (flowString.includes('IIII') && !emittedRules.has('Romance not externalized')) {
            flags.push({
                type: 'Weak Interaction Cycle',
                severity: -10,
                message: 'Romance not externalized. Thinking about love interest continuously without interacting.',
                suggestedFix: 'Force them into the same room.',
                text: 'Detected in Scene ' + (sceneIdx + 1),
                sceneIndex: sceneIdx
            });
            emittedRules.add('Romance not externalized');
        }

        // Bad Romance Flow: Constant Action
        if (flowString.includes('AAAA') && !emittedRules.has('Romance lacks emotional depth')) {
             flags.push({
                type: 'Weak Interaction Cycle',
                severity: -10,
                message: 'Romance lacks emotional depth. Constant interaction without internal processing/reaction.',
                suggestedFix: 'Show the visceral internal reaction to the proximity or touch.',
                text: 'Detected in Scene ' + (sceneIdx + 1),
                sceneIndex: sceneIdx
            });
            emittedRules.add('Romance lacks emotional depth');
        }
    });

    flags.forEach(f => {
        totalScore += f.severity;
    });

    const finalScore = Math.max(0, Math.min(100, totalScore));
    
    const breakdown = {};
    flags.forEach(f => {
        breakdown[f.type] = (breakdown[f.type] || 0) + 1;
    });

    // Percentages
    const actionPct = totalParagraphs > 0 ? Math.round((totalActionBlocks / totalParagraphs) * 100) : 0;
    const introspectPct = totalParagraphs > 0 ? Math.round((totalIntroBlocks / totalParagraphs) * 100) : 0;
    const reactivePct = totalParagraphs > 0 ? Math.round((totalReactiveBlocks / totalParagraphs) * 100) : 0;
    
    // Count exact paragraphs containing dialogue for a pure stat
    const dialogueRatio = totalParagraphs > 0 ? Math.round((totalDialogueBlocks / totalParagraphs) * 100) : 0;

    let flowPattern = 'Balanced';
    if (actionPct > 60) flowPattern = 'Action Heavy';
    if (introspectPct > 50) flowPattern = 'Introspection Heavy';
    if (reactivePct > 25) flowPattern = 'Emotion-Driven (Balanced)'; // Overrides action heavy if reactive

    return {
        score: finalScore,
        flags: flags, // Return raw array for mapping
        breakdown,
        // UI visualization variables
        actionPct,
        introspectPct,
        reactivePct,
        dialogueRatio, 
        
        // New Overlay Data
        flowPattern,
        pushPullPresent,
        interactionReactionResponse: hasGoodRomanceFlow
    };
}
