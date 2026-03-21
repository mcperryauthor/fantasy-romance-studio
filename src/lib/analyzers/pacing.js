/**
 * Pacing Detector (Narrative Flow & Momentum Scan)
 * Evaluates whether scenes and chapters maintain forward momentum, variation in rhythm, and narrative progression.
 */

// Keyword clusters for semantic analysis
const ACTION_KW = ['fight', 'run', 'strike', 'attack', 'fly', 'leap', 'crash', 'burst', 'race', 'chase', 'slam', 'shove', 'grab'];
const STAKES_KW = ['die', 'death', 'kill', 'danger', 'risk', 'lose', 'fail', 'blood', 'survive', 'ruin', 'trapped', 'expose'];
const EMOTION_KW = ['realize', 'decide', 'choose', 'accept', 'refuse', 'change', 'shift', 'turn', 'understand', 'fear', 'furious'];

export function scanPacing(chapter) {
  const flags = [];
  const scenes = chapter.scenes || [];
  
  let totalScore = 100;

  // Scene-Level Analysis
  scenes.forEach((scene, sceneIdx) => {
    const text = scene.text || '';
    if (!text.trim()) return;
    
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = text.split(/\n\s*\n|\n/).filter(p => p.trim());
    
    if (sentences.length === 0) return;

    // 1. Slow Drag Detector (High Severity: -15)
    // 3 continuous paragraphs with no action or dialogue
    let dragCount = 0;
    paragraphs.forEach(p => {
      const isDialogue = /["“'”’]/.test(p);
      const hasAction = ACTION_KW.some(kw => p.toLowerCase().includes(kw));
      if (!isDialogue && !hasAction) dragCount++;
      else dragCount = 0;
      
      if (dragCount >= 3) {
        flags.push({
          type: 'Pacing Drag',
          severity: -15,
          message: 'Scene lacks forward movement (3+ paragraphs of pure description/thought).',
          suggestedFix: 'Add action, interruption, or decision.',
          text: p.slice(0, 50) + '...',
          sceneIndex: sceneIdx
        });
        dragCount = 0; // Reset after flag
      }
    });

    // 2. Empty Action Detector (Medium: -10)
    // High action density but 0 stakes or emotional shift
    const actionDensity = ACTION_KW.reduce((s, kw) => s + (text.toLowerCase().match(new RegExp(kw, 'g')) || []).length, 0);
    const stakesDensity = STAKES_KW.reduce((s, kw) => s + (text.toLowerCase().match(new RegExp(kw, 'g')) || []).length, 0);
    const emotionDensity = EMOTION_KW.reduce((s, kw) => s + (text.toLowerCase().match(new RegExp(kw, 'g')) || []).length, 0);
    if (actionDensity > 5 && stakesDensity === 0 && emotionDensity === 0) {
      flags.push({
        type: 'Empty Action',
        severity: -10,
        message: 'Movement without narrative impact (high action, zero stakes).',
        suggestedFix: 'Tie action to tension or consequence.',
        text: 'Action sequence in scene ' + (sceneIdx + 1),
        sceneIndex: sceneIdx
      });
    }

    // 3. Internal Looping Detector (High: -10)
    const loopMatch = text.match(/\b(why\s(.*?)|\bi don't understand|\bdoesn't make sense)\b/gi);
    if (loopMatch && loopMatch.length >= 3) {
      flags.push({
        type: 'Thought Loop',
        severity: -10,
        message: 'Internal conflict is repeating without development.',
        suggestedFix: 'Progress thought OR interrupt with action.',
        text: loopMatch.slice(0, 3).join(' | '),
        sceneIndex: sceneIdx
      });
    }

    // 4. Overloaded Density Detector (High: -10)
    // If action, emotion, and dialogue all happen within the same 2 sentences
    for (let i = 0; i < sentences.length - 1; i++) {
        const combined = (sentences[i] + ' ' + sentences[i+1]).toLowerCase();
        const hasA = ACTION_KW.some(kw => combined.includes(kw));
        const hasE = EMOTION_KW.some(kw => combined.includes(kw));
        const hasD = /["“'”’]/.test(combined);
        const hasS = STAKES_KW.some(kw => combined.includes(kw));
        if (hasA && hasE && hasD && hasS && combined.split(' ').length < 30) {
            flags.push({
              type: 'Overloaded Sequence',
              severity: -10,
              message: 'Too many major events compressed into one short sequence.',
              suggestedFix: 'Break into multiple beats or expand the sensory response.',
              text: combined,
              sceneIndex: sceneIdx
            });
            break; // Once per scene
        }
    }

    // 6. Dialogue Stall Detector (Medium: -10)
    // Back to back dialogue lines under 5 words each
    let shortDialogueStreak = 0;
    paragraphs.forEach(p => {
        if (/^["“'”’].*["“'”’]$/.test(p.trim()) && p.split(' ').length <= 5) {
            shortDialogueStreak++;
        } else {
            shortDialogueStreak = 0;
        }
        if (shortDialogueStreak >= 4) {
            flags.push({
              type: 'Dialogue Stall',
              severity: -10,
              message: 'Dialogue lacks progression or tension (rapid ping-pong of short pleasantries).',
              suggestedFix: 'Add subtext, conflict, or reveal.',
              text: p.trim(),
              sceneIndex: sceneIdx
            });
            shortDialogueStreak = 0;
        }
    });

    // 7. Monotone Rhythm Detector (Medium: -5)
    // 5+ sentences in a row with almost exactly identical word counts (e.g. 5-7 words)
    let monotoneStreak = 0;
    let prevLen = -1;
    sentences.forEach(s => {
        const len = s.split(/\s+/).length;
        if (prevLen > 0 && Math.abs(len - prevLen) <= 2) {
            monotoneStreak++;
        } else {
            monotoneStreak = 0;
        }
        prevLen = len;
        if (monotoneStreak >= 5) {
            flags.push({
              type: 'Rhythm Flatline',
              severity: -5,
              message: 'Sentence structure lacks variation (consistent length block).',
              suggestedFix: 'Introduce short lines for impact and longer lines for flow.',
              text: sentences.slice(-3).join(' '),
              sceneIndex: sceneIdx
            });
            monotoneStreak = 0;
        }
    });

    // 9. Transition Gap Detector (Medium: -5)
    // Scene start without sensory grounding
    if (sceneIdx > 0) {
        const firstTwo = sentences.slice(0, 2).join(' ').toLowerCase();
        const hasSensory = /\b(air|smell|scent|taste|sound|cold|warm|bright|dark|room|forest|street)\b/i.test(firstTwo);
        if (!hasSensory) {
             flags.push({
              type: 'Weak Transition',
              severity: -5,
              message: 'Scene shift lacks spatial/sensory grounding in opening lines.',
              suggestedFix: 'Add one anchor detail (sensory or spatial).',
              text: firstTwo,
              sceneIndex: sceneIdx
            });
        }
    }

    // 10. Weak Scene Ending (High: -10)
    const lastThree = sentences.slice(-3).join(' ').toLowerCase();
    const endingHasIntrospection = /\b(thought about|wondered|realized|understood|maybe|perhaps)\b/i.test(lastThree);
    const endingHasAction = ACTION_KW.some(kw => lastThree.includes(kw));
    const endingHasDialogue = /["“'”’]/.test(lastThree);

    if (endingHasIntrospection && !endingHasAction && !endingHasDialogue) {
        flags.push({
              type: 'Weak Ending',
              severity: -10,
              message: 'Scene ends without tension or hook (purely internal summary).',
              suggestedFix: 'End on unresolved tension, sharp action, or charged dialogue.',
              text: lastThree,
              sceneIndex: sceneIdx
        });
    } else {
        totalScore += 15; // Positive point for effective scene ending
    }

    // Positive Signals
    if (stakesDensity > 0) totalScore += 15; // Escalation 
    if (sceneIdx > 0 && /\b(air|smell|scent|taste|sound|cold|warm|bright|dark|room|forest|street)\b/i.test(sentences.slice(0, 2).join(' ').toLowerCase())) {
        totalScore += 10; // Strong transition
    }
  });

  // Consolidate Penalties
  flags.forEach(f => {
      totalScore += f.severity; // Severity is negative
  });

  const finalScore = Math.max(0, Math.min(100, totalScore));
  
  const breakdown = {};
  flags.forEach(f => {
    breakdown[f.type] = (breakdown[f.type] || 0) + 1;
  });

  // Calculate global chapter percentages for the Pacing Bar Chart
  const allText = chapter.rawText || '';
  const allTextLower = allText.toLowerCase();
  const allParagraphs = allText.split(/\n/).filter(p => p.trim());
  const paragraphsCount = allParagraphs.length || 1;
  const wordCount = allText.split(/\s+/).length || 1;

  const dialogueRatio = Math.round((allParagraphs.filter(p => /["“'”’]/.test(p)).length / paragraphsCount) * 100);
  const actionPct = Math.round((ACTION_KW.reduce((s, kw) => s + (allTextLower.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0) / wordCount) * 1000) / 10;
  const introspectPct = Math.round((['thought', 'wondered', 'felt', 'realized', 'knew'].reduce((s, kw) => s + (allTextLower.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0) / wordCount) * 1000) / 10;
  const expositionPct = Math.round((['history', 'years ago', 'the city', 'the world', 'magic', 'power'].reduce((s, kw) => s + (allTextLower.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0) / wordCount) * 1000) / 10;

  return {
    score: finalScore,
    flags,
    breakdown,
    dialogueRatio,
    actionPct,
    introspectPct,
    expositionPct
  };
}
