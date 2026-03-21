/**
 * Romance Tension Detector (RTD)
 * Analyzes whether romantic interactions create sustained tension, escalation, and emotional pull.
 */

const ATTRACTION_KW = ['beautiful', 'handsome', 'want', 'gaze', 'eyes', 'lips', 'breath', 'heart', 'pull', 'desire', 'ache', 'burn', 'heat', 'obsess', 'ruin', 'hunger', 'starve', 'devour', 'shadow', 'mine'];
const RESISTANCE_KW = ['shouldn\'t', 'wrong', 'can\'t', 'resist', 'fight', 'hate', 'turn away', 'stop', 'danger', 'mistake', 'monster', 'betray', 'enemy', 'destroy', 'curse', 'lie', 'never'];
const RESOLUTION_KW = ['give in', 'don\'t care', 'surrender', 'accept', 'understand', 'let it happen'];
const REPETITIVE_CHEMISTRY = /\b(heart races|heart pounded|can't breathe|breath caught|world narrowed|stomach dropped|shivered)\b/ig;
const SAFE_DIALOGUE = /^(are you okay|yes|no|i'm fine|good|thank you|sorry|excuse me|pardon)\b/i;
const PROXIMITY_KW = ['step closer', 'stepped', 'close', 'touch', 'brush', 'lean', 'against', 'skin', 'space between'];
const POWER_KW = ['submit', 'command', 'obey', 'kneel', 'force', 'yield', 'trap', 'corner', 'stare down', 'chin', 'grip', 'hold', 'leash', 'bow', 'claim', 'beg', 'throat', 'pulse', 'prey', 'predator', 'hunt', 'choke', 'shatter'];

export function scanRomanceTension(chapter, settings = {}) {
  const flags = [];
  const scenes = chapter.scenes || [];
  const loveInterests = settings.loveInterests || ['Killian', 'Lysander', 'Ronin'];
  
  let tensionScore = 15; // Base starting score
  const breakdown = {};
  const byCharacter = {};
  loveInterests.forEach(li => byCharacter[li] = { tension: 0, triggers: [] });

  scenes.forEach((scene, sceneIdx) => {
    const text = scene.text || '';
    if (!text.trim()) return;

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = text.split(/\n\s*\n|\n/).filter(p => p.trim());
    
    // Check if a Love Interest is in the scene
    const activeLIs = loveInterests.filter(li => text.toLowerCase().includes(li.toLowerCase()));
    if (activeLIs.length === 0) return; // Skip scenes without love interests

    const attractionHits = ATTRACTION_KW.reduce((s, kw) => s + (text.toLowerCase().match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
    const resistanceHits = RESISTANCE_KW.reduce((s, kw) => s + (text.toLowerCase().match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
    const resolutionHits = RESOLUTION_KW.reduce((s, kw) => s + (text.toLowerCase().match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
    const proximityHits = PROXIMITY_KW.reduce((s, kw) => s + (text.toLowerCase().match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
    const powerHits = POWER_KW.reduce((s, kw) => s + (text.toLowerCase().match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
    
    let rawTension = (attractionHits * 1.5) + (resistanceHits * 2) + (proximityHits * 1.5) + (powerHits * 2);
    if (resolutionHits > 0 && resistanceHits === 0) rawTension -= 5;
    
    const liNames = activeLIs.join(' & ');
    activeLIs.forEach(li => {
        byCharacter[li].tension += Math.max(0, rawTension);
    });
    
    const isDialogueHeavy = paragraphs.filter(p => /["“”]/.test(p)).length > paragraphs.length * 0.4;

    // 1. Instant Attraction Collapse (High: -15)
    // Attraction + Acceptance without resistance
    if (attractionHits > 2 && resolutionHits > 0 && resistanceHits === 0) {
      flags.push({
        type: 'Instant Attraction Collapse',
        severity: -15,
        message: 'Attraction resolves without resistance.',
        suggestedFix: 'Add internal contradiction or physical hesitation.',
        text: `Scene ${sceneIdx+1} with ${liNames}`,
        sceneIndex: sceneIdx
      });
      tensionScore -= 15;
    }

    // 2. Missing Resistance Detector (High: -10)
    // Attraction exists but 0 moral conflict/resistance
    if (attractionHits > 4 && resistanceHits === 0) {
      flags.push({
        type: 'Low Conflict Attraction',
        severity: -10,
        message: 'Attraction lacks meaningful resistance or stakes.',
        suggestedFix: 'Introduce consequence or cost tied to desire.',
        text: `Scene ${sceneIdx+1} with ${liNames}`,
        sceneIndex: sceneIdx
      });
      tensionScore -= 10;
    }

    // 3. Repetitive Attraction Language (Med: -10)
    const repetitiveMatches = text.match(REPETITIVE_CHEMISTRY) || [];
    if (repetitiveMatches.length >= 2) {
      flags.push({
        type: 'Repetitive Chemistry',
        severity: -10,
        message: 'Attraction language is repeating without progression.',
        suggestedFix: 'Shift from internal -> physical -> behavioral escalation.',
        text: repetitiveMatches.join(', '),
        sceneIndex: sceneIdx
      });
      tensionScore -= 10;
    }

    // 4. Flat Interaction (High: -10)
    // Dialogue heavy with NO proximity or power shift
    if (isDialogueHeavy && proximityHits === 0 && powerHits === 0) {
      flags.push({
        type: 'Static Interaction',
        severity: -10,
        message: 'Scene lacks tension progression (dialogue without movement).',
        suggestedFix: 'Add movement, proximity change, or dominance shift.',
        text: `Scene ${sceneIdx+1} with ${liNames}`,
        sceneIndex: sceneIdx
      });
      tensionScore -= 10;
    }

    // 5. No Physical Escalation (Med: -5)
    if (attractionHits > 0 && proximityHits === 0) {
      flags.push({
        type: 'No Physical Escalation',
        severity: -5,
        message: 'Tension lacks spatial progression.',
        suggestedFix: 'Add distance changes to reflect emotional shift.',
        text: `Scene ${sceneIdx+1} with ${liNames}`,
        sceneIndex: sceneIdx
      });
    }

    // 6. Safe Dialogue (Med: -5)
    // Very short pleasantries between leads
    let safeCount = 0;
    sentences.forEach(s => {
      const quote = s.match(/["“'](.*?)["”']/);
      if (quote && SAFE_DIALOGUE.test(quote[1].trim())) safeCount++;
    });
    if (safeCount >= 3) {
      flags.push({
        type: 'Low-Risk Dialogue',
        severity: -5,
        message: 'Dialogue lacks subtext or tension (safe, polite responses).',
        suggestedFix: 'Add double meaning, challenge, or provocation.',
        text: `Scene ${sceneIdx+1} with ${liNames}`,
        sceneIndex: sceneIdx
      });
    }

    // 7. Over-Resolved Emotional Beats (High: -10)
    const resolveMatch = text.match(/\b(now i understand|it all makes sense|i know why i feel)\b/i);
    if (resolveMatch) {
      flags.push({
        type: 'Emotional Resolution',
        severity: -10,
        message: 'Tension resolves cleanly instead of sustaining.',
        suggestedFix: 'Leave emotion unresolved or contradictory.',
        text: resolveMatch[0],
        sceneIndex: sceneIdx
      });
    }

    // 8. Flat Power Dynamic (High: -10)
    // Long scene with love interest but 0 power words
    if (paragraphs.length > 5 && powerHits === 0) {
      flags.push({
        type: 'Flat Power Dynamic',
        severity: -10,
        message: 'No dominance or control tension detected in sustained interaction.',
        suggestedFix: 'Introduce imbalance or control shift.',
        text: `Scene ${sceneIdx+1} with ${activeLI}`,
        sceneIndex: sceneIdx
      });
    }

    // 9. Passive Attraction (High: -15)
    // Attraction high, but NO dialogue and NO movement
    if (attractionHits > 3 && !isDialogueHeavy && proximityHits === 0) {
      flags.push({
        type: 'Passive Attraction',
        severity: -15,
        message: 'Attraction is not affecting behavior (internal only).',
        suggestedFix: 'Translate desire into action or restraint.',
        text: `Scene ${sceneIdx+1} with ${activeLI}`,
        sceneIndex: sceneIdx
      });
    }

    // Positive Additions
    if (resistanceHits > 0) tensionScore += 10;
    if (powerHits > 0) tensionScore += 10;
    if (proximityHits > 0) tensionScore += 10;
    
    // 10. Unresolved tension at scene end (+15)
    const lastParam = sentences.slice(-3).join(' ').toLowerCase();
    if (RESISTANCE_KW.some(kw => lastParam.includes(kw)) || PROXIMITY_KW.some(kw => lastParam.includes(kw))) {
       tensionScore += 15;
    }
  });

  // Tension Plateau Logic (handled across chapters usually, but applied minimally here)
  const finalScore = Math.max(0, Math.min(100, tensionScore));

  flags.forEach(f => {
    breakdown[f.type] = (breakdown[f.type] || 0) + 1;
  });

  return {
    score: finalScore,
    flags,
    breakdown,
    byCharacter,
    totalTension: finalScore
  };
}
