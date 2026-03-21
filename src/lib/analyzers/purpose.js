/**
 * Chapter Purpose Detector (CPD)
 * Identifies whether a chapter has a clear narrative function, and whether that function is executed, weak, or missing.
 */

const PLOT_KW = ['attack', 'reveal', 'discover', 'escape', 'trap', 'decide', 'choose', 'confront', 'find', 'plan', 'search', 'run', 'hide', 'seek', 'journey', 'arrive', 'leave', 'kill', 'save', 'protect', 'destroy', 'build'];
const CHARACTER_KW = ['realize', 'understand', 'change', 'accept', 'refuse', 'grief', 'memory', 'belief', 'feel', 'hurt', 'pain', 'hope', 'fear', 'wonder', 'wish', 'want', 'need', 'love', 'hate', 'know', 'think', 'remember'];
const ROMANCE_KW = ['kiss', 'touch', 'pull', 'tension', 'desire', 'resist', 'yield', 'burn', 'breath', 'lips', 'skin', 'eyes', 'glance', 'stare', 'warmth', 'shiver', 'ache', 'craving', 'chest', 'pulse', 'heart'];
const WORLD_KW = ['history', 'lore', 'rule', 'magic', 'realm', 'system', 'court', 'explain', 'gods', 'ancient', 'power', 'spell', 'curse', 'king', 'queen', 'throne', 'war', 'past', 'legend'];
const CONFLICT_KW = ['argue', 'fight', 'demand', 'snap', 'hiss', 'threaten', 'strike', 'clash', 'yell', 'scream', 'glare', 'scowl', 'battle', 'war', 'sword', 'blade', 'blood', 'punch', 'shove', 'force'];
const PASSIVITY_KW = ['watched', 'waited', 'stood there', 'listened', 'observed', 'nodded', 'followed', 'stared', 'did nothing', 'could only'];
const SETUP_KW = ['secret', 'hidden', 'wondered', 'mystery', 'locked', 'question', 'strange', 'unusual', 'peculiar', 'shadow', 'curious', 'unknown'];

export function classifyChapterPurposeDetailed(chapter) {
  const flags = [];
  const text = chapter.rawText.toLowerCase() || '';

  const plotHits = PLOT_KW.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
  const charHits = CHARACTER_KW.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
  const romHits = ROMANCE_KW.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
  const worldHits = WORLD_KW.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
  const conflictHits = CONFLICT_KW.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
  const passiveHits = PASSIVITY_KW.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
  const setupHits = SETUP_KW.reduce((s, kw) => s + (text.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);

  let cpScore = 50; // Base score
  const purposes = [];
  if (plotHits >= 2 || chapter.wordCount > 1500 && plotHits > 0) purposes.push('Plot Advancement');
  if (charHits >= 3) purposes.push('Character Development');
  if (romHits >= 3) purposes.push('Romance Progression');
  if (worldHits >= 2) purposes.push('Worldbuilding');
  if (conflictHits >= 2) purposes.push('Conflict Escalation');

  let executionLevel = 'Moderate';

  // 1. Missing Purpose Detector (Critical: -30)
  if (purposes.length === 0) {
    flags.push({
      type: 'No Chapter Purpose',
      severity: -30,
      message: 'Chapter does not meaningfully affect story (no plot, character, or conflict triggers).',
      suggestedFix: 'Add conflict, reveal, or remove chapter entirely.',
      text: 'Entire Chapter'
    });
    purposes.push('Filler (Flagged)');
    executionLevel = 'Failed';
    cpScore -= 30;
  }

  // 2. Weak Purpose Execution (High: -10)
  // Purpose exists, but very low hit count across the board
  const maxHit = Math.max(plotHits, charHits, romHits, worldHits, conflictHits);
  if (purposes.length > 0 && maxHit < 4 && !purposes.includes('Filler (Flagged)')) {
    flags.push({
      type: 'Weak Purpose',
      severity: -10,
      message: 'Chapter purpose is present but lacks impact/stakes.',
      suggestedFix: 'Increase consequence or outcome of the dominant function.',
      text: `Dominant Function peak: ${maxHit} triggers.`
    });
    executionLevel = 'Weak';
    cpScore -= 10;
  }

  // The user explicitly requested that we do NOT punish chapters for covering multiple purposes,
  // as plot, romance, and worldbuilding should be woven together.
  // (Multi-Purpose Overload block removed)

  // 4. No Change Outcome (Critical: -25)
  // Compare first 10% of chapter sentences to last 10%
  const sentences = chapter.sentences;
  if (sentences && sentences.length > 10) {
      const firstTen = sentences.slice(0, Math.floor(sentences.length * 0.1)).join(' ').toLowerCase();
      const lastTen = sentences.slice(-Math.floor(sentences.length * 0.1)).join(' ').toLowerCase();
      const firstEmotion = CHARACTER_KW.find(kw => firstTen.includes(kw));
      const lastEmotion = CHARACTER_KW.find(kw => lastTen.includes(kw));
      
      if (firstEmotion && firstEmotion === lastEmotion && conflictHits === 0) {
          flags.push({
            type: 'No Outcome Shift',
            severity: -25,
            message: 'Chapter ends in exact same emotional/situational state it began.',
            suggestedFix: 'Introduce irreversible change.',
            text: `Start: ${firstEmotion} / End: ${lastEmotion}`
          });
          cpScore -= 25;
      } else {
          cpScore += 20; // Strong outcome change
      }
  }

  // 7. Worldbuilding Without Purpose (Med-High: -15)
  if (worldHits > 8 && plotHits === 0 && conflictHits === 0) {
    flags.push({
      type: 'Isolated Worldbuilding',
      severity: -15,
      message: 'Worldbuilding is not integrated into story movement (pure info-dump).',
      suggestedFix: 'Tie information to character need or conflict.',
      text: `${worldHits} lore keywords vs 0 plot markers.`
    });
    cpScore -= 15;
  }

  // 8. Passive Character Detector (High: -15)
  if (passiveHits > 4 && plotHits < 2) {
    flags.push({
      type: 'Passive Protagonist',
      severity: -15,
      message: 'Main character lacks agency in this chapter (observing only).',
      suggestedFix: 'Add decision or action that alters direction.',
      text: `${passiveHits} passive tags detected.`
    });
    cpScore -= 15;
  }

  // 9. Delayed Conflict Detector (High: -15)
  if (conflictHits === 0 && romHits === 0 && chapter.index > 1) {
    flags.push({
      type: 'Low Conflict Chapter',
      severity: -15,
      message: 'Chapter delays necessary conflict (no tension, no stakes).',
      suggestedFix: 'Introduce friction, risk, or opposition.',
      text: '0 conflict markers'
    });
    cpScore -= 15;
  }

  // 10. Setup Without Payoff (Med: -10)
  if (setupHits > 3 && plotHits === 0 && conflictHits === 0) {
      flags.push({
        type: 'Empty Setup',
        severity: -10,
        message: 'Setup/Mystery introduced but lacks immediate narrative return.',
        suggestedFix: 'Add micro-payoff or escalation within chapter.',
        text: `${setupHits} setup triggers without plot movement.`
      });
      cpScore -= 10;
  }
  
  if (cpScore > 80) executionLevel = 'High';

  const finalScore = Math.max(0, Math.min(100, cpScore));
  const primaryPurpose = purposes[0] || 'Unclear';

  const breakdown = {};
  flags.forEach(f => {
    breakdown[f.type] = (breakdown[f.type] || 0) + 1;
  });

  return {
    score: finalScore,
    flags,
    breakdown,
    primaryPurpose,
    executionLevel,
    allPurposes: purposes
  };
}
