/**
 * Exposition Detector (Worldbuilding & Lore Delivery Scan)
 * Evaluates whether narrative information is integrated, passive, or an info-dump.
 */

const BACKSTORY_SIGNS = ['had been', 'had always', 'used to', 'once', 'before', 'years ago', 'growing up', 'as a child', 'remembered', 'recalled'];
const LORE_SIGNS = ['known for', 'defined by', 'consists of', 'functions as', 'history of', 'rules', 'system', 'magic', 'kingdom', 'empire'];
const AUTHORIAL_SUMMARY = ['this meant', 'this was because', 'in truth', 'the reality was', 'it was a place where', 'which meant'];
const EXPLANATION_VERBS = ['explained', 'described', 'detailed', 'outlined', 'clarified'];

function countHits(text, lexicons) {
    const lo = text.toLowerCase();
    let hits = 0;
    lexicons.forEach(kw => {
        hits += (lo.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length;
        if (lo.includes(kw)) hits++; // Fallback for phrases like 'this was because'
    });
    return hits;
}

export function scanExposition(chapter) {
    const flags = [];
    const emittedRules = new Set();
    const scenes = chapter.scenes || [];
    
    let totalScore = 100;
    let integratedCount = 0;
    let passiveCount = 0;
    let infoDumpCount = 0;

    let tensionMaintained = true;
    let explanationReplacingEmotion = false;

    // Track flow across chapter
    let chapterBlockTypes = []; 

    scenes.forEach((scene, sceneIdx) => {
        const text = scene.text || '';
        if (!text.trim()) return;
        
        const paragraphs = text.split(/\\n\\s*\\n|\\n/).filter(p => p.trim());
        if (paragraphs.length === 0) return;

        let expoStreak = 0;

        paragraphs.forEach((p, pIdx) => {
            const isDialogue = /["“'”’]/.test(p);
            
            // 1. Detection
            const backstoryHits = countHits(p, BACKSTORY_SIGNS);
            const loreHits = countHits(p, LORE_SIGNS);
            const authorialHits = countHits(p, AUTHORIAL_SUMMARY);
            
            const totalExpoSignals = backstoryHits + loreHits + authorialHits;
            const wordCount = p.split(/\\s+/).length;

            if (totalExpoSignals > 0) {
                // Determine Classification
                if (isDialogue && wordCount < 40) {
                    integratedCount++;
                    chapterBlockTypes.push('E-INT');
                    expoStreak = 0;
                } else if (!isDialogue && wordCount > 60 && totalExpoSignals > 2) {
                    infoDumpCount++;
                    chapterBlockTypes.push('E-DUMP');
                    expoStreak++;
                    totalScore -= 5;
                } else {
                    passiveCount++;
                    chapterBlockTypes.push('E-PASS');
                    expoStreak++;
                    totalScore -= 2;
                }
            } else {
                if (isDialogue || countHits(p, ['walked', 'turned', 'stepped', 'grabbed']) > 0) {
                    chapterBlockTypes.push('A');
                    expoStreak = 0;
                } else {
                    chapterBlockTypes.push('O'); // Other
                }
            }

            // Failure Detection
            
            // 1. Exposition Overload
            if (expoStreak >= 2 && !emittedRules.has('Exposition Overload')) {
                flags.push({
                    type: 'Exposition Overload',
                    severity: -15,
                    message: 'Narrative momentum stalled by exposition. 2+ heavy explanation blocks in a row.',
                    suggestedFix: 'Break into dialogue, attach to conflict, or cut.',
                    text: p.slice(0, 60) + '...',
                    sceneIndex: sceneIdx
                });
                emittedRules.add('Exposition Overload');
            }

            // 2. Front-Loaded Information
            if (pIdx < 4 && sceneIdx === 0 && (infoDumpCount > 0 || passiveCount > 1) && !emittedRules.has('Front-Loaded Exposition')) {
                flags.push({
                    type: 'Front-Loaded Information',
                    severity: -15,
                    message: 'Delayed reader engagement due to early information load.',
                    suggestedFix: 'Delay reveal. Start with action or dialogue, weave lore in later.',
                    text: p.slice(0, 60) + '...',
                    sceneIndex: sceneIdx
                });
                emittedRules.add('Front-Loaded Exposition');
            }
            
            // Authorial Summary Flag
            if (authorialHits > 0 && !emittedRules.has('Authorial Summary')) {
                flags.push({
                    type: 'Authorial Summary',
                    severity: -10,
                    message: 'Text interprets instead of dramatizing (telling the reader the meaning).',
                    suggestedFix: 'Replace with action. Show the consequence instead of explaining it.',
                    text: p.slice(0, 60) + '...',
                    sceneIndex: sceneIdx
                });
                emittedRules.add('Authorial Summary');
            }
        });

        // Romance Specific Overlay
        // If scene has romance/attraction keywords but is dominated by info-dumps
        const hasRomance = countHits(text, ['mate', 'bond', 'desire', 'attraction', 'pull', 'obsessed']) > 0;
        if (hasRomance && infoDumpCount > 0) {
            explanationReplacingEmotion = true;
            tensionMaintained = false;
            if (!emittedRules.has('Romantic Explanation')) {
                flags.push({
                    type: 'Romantic Explanation',
                    severity: -15,
                    message: 'Romantic tension replaced with explanation of bonds/dynamics.',
                    suggestedFix: 'Let the power dynamic play out in interaction. Stop explaining it.',
                    text: 'Scene ' + (sceneIdx + 1),
                    sceneIndex: sceneIdx
                });
                emittedRules.add('Romantic Explanation');
            }
        }
    });

    const finalScore = Math.max(0, Math.min(100, totalScore));
    const totalDetected = integratedCount + passiveCount + infoDumpCount;
    const density = totalDetected > 8 ? 'High' : (totalDetected > 3 ? 'Moderate' : 'Low');

    const breakdown = {};
    flags.forEach(f => {
        breakdown[f.type] = (breakdown[f.type] || 0) + 1;
    });

    return {
        score: finalScore,
        density,
        integratedCount,
        passiveCount,
        infoDumpCount,
        flags,
        breakdown,
        romanceImpact: {
            tensionMaintained,
            explanationReplacingEmotion
        }
    };
}
