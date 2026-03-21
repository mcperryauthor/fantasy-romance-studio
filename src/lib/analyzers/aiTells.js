/**
 * AI Tells Detector (Structural Pattern Scan)
 * Detects deep structural writing patterns commonly associated with AI-generated prose.
 */

const REDUNDANT_MEANING = /\b(it feels|it means|this shows|the result is|this makes me|which means)\b/i;
const THEME_STATEMENT = /\b(power|fear|love|truth|control|destiny)\s+(is|is never|cannot be|always|has always been)\b/i;
const DIALOGUE_INTERPRET = /^(the words|the comment|the statement|his words|her words)\s+(hit|stung|cut|landed|struck|pierced)\b/i;
const EMOTIONAL_DIAGNOSIS = /\b(i realize|i understand|i am (afraid|scared|terrified|furious|sad|happy|angry|confused|lost|broken|devastated))\b/i;
const WORLDBUILDING_REP = /\b(in this world|as everyone knows|the system works by|is known for|has always been known to)\b/i;
const PHILOSOPHICAL_NARRATION = /^(lies are|truth is|everyone knows|no one ever|men are|women are|monsters are|we all know)\b/i;
const SCENE_WRAP_UP = /\b(that's when i realized|everything changed|from that moment|i finally understood|my life would never be the same)\b/i;
const PHYSICAL_CLICHES = /\b(let out a breath|breath (he|she) didn't know|shiver ran down|eyes darkened|gaze darkened|heart hammered|swallowed hard)\b/i;

// 3 or more comma-separated words followed by 'and' or a noun (Basic syntactic proxy for descriptor/sensory stacking)
const DESCRIPTOR_STACK = /\b(\w+(?:ly|ic|ful|ous|ish|ed|ing|y|al|ive|less|en|ar)),\s+(\w+[^,\s]+),\s+(and\s+)?(\w+[^,\s]+)\s+(\w+)\b/i;

export function scanAIPatternsDetailed(chapter) {
  const flags = [];
  const sentences = chapter.sentences || [];

  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i].trim();
    if (!s) continue;

    // 1. Redundant Meaning (High)
    if (REDUNDANT_MEANING.test(s)) {
      flags.push({
        type: 'Redundant Meaning',
        severity: 3,
        message: 'Second sentence explains what is already shown.',
        suggestedFix: 'Delete interpretation sentence OR replace with physical reaction.',
        text: s,
        sentenceIndex: i
      });
    }

    // 2. Theme Statement (High)
    if (THEME_STATEMENT.test(s) || /is never.*it is/i.test(s)) {
      flags.push({
        type: 'Theme Statement',
        severity: 3,
        message: 'Abstract thematic declaration detected.',
        suggestedFix: 'Convert into character action or dialogue.',
        text: s,
        sentenceIndex: i
      });
    }

    // 3. Symmetry Pattern (Med-High)
    if (i >= 2) {
      const w1 = s.split(' ').slice(0,2).join(' ').toLowerCase().replace(/[^a-z ]/g, '');
      const prev1 = sentences[i-1].split(' ').slice(0,2).join(' ').toLowerCase().replace(/[^a-z ]/g, '');
      const prev2 = sentences[i-2].split(' ').slice(0,2).join(' ').toLowerCase().replace(/[^a-z ]/g, '');
      
      if (w1 && w1 === prev1 && w1 === prev2) {
        flags.push({
          type: 'Structural Symmetry',
          severity: 2,
          message: 'Overuse of parallel sentence structure (3+ lines starting identically).',
          suggestedFix: 'Keep one line, vary or cut the rest.',
          text: `${sentences[i-2].trim()} ${sentences[i-1].trim()} ${s}`,
          sentenceIndex: i
        });
      }
    }

    // 4 & 10. Descriptor Density / Sensory Stacking (Med)
    if (DESCRIPTOR_STACK.test(s)) {
      const isSensory = /\b(air|smell|scent|taste|sound|temperature|breeze|room|light|dark)\b/i.test(s);
      flags.push({
        type: isSensory ? 'Sensory Overload' : 'Descriptor Overload',
        severity: 2,
        message: isSensory ? 'Multiple sensory inputs in one beat.' : 'Too many modifiers on a single object.',
        suggestedFix: isSensory ? 'Reduce to one dominant sensory detail.' : 'Reduce to 1-2 strong descriptors.',
        text: s,
        sentenceIndex: i
      });
    }

    // 5. Dialogue Interpretation (High)
    if (DIALOGUE_INTERPRET.test(s)) {
      flags.push({
        type: 'Dialogue Over-Explanation',
        severity: 3,
        message: 'Dialogue is being interpreted instead of experienced.',
        suggestedFix: 'Replace with physical or behavioral reaction.',
        text: s,
        sentenceIndex: i
      });
    }

    // 6. Emotional Self-Diagnosis (High)
    if (EMOTIONAL_DIAGNOSIS.test(s)) {
      flags.push({
        type: 'Emotional Over-Clarity',
        severity: 3,
        message: 'Emotion is labeled instead of shown.',
        suggestedFix: 'Replace with hesitation, movement, or contradiction.',
        text: s,
        sentenceIndex: i
      });
    }

    // 7. Worldbuilding Repetition (Med)
    if (WORLDBUILDING_REP.test(s)) {
      flags.push({
        type: 'Worldbuilding Repetition',
        severity: 2,
        message: 'Previously established concept is being re-explained.',
        suggestedFix: 'Remove or replace with contextual reference.',
        text: s,
        sentenceIndex: i
      });
    }

    // 8. Philosophical Narration (High)
    if (PHILOSOPHICAL_NARRATION.test(s)) {
      flags.push({
        type: 'Authorial Intrusion',
        severity: 3,
        message: 'Narration detached from POV.',
        suggestedFix: 'Anchor statement to character perspective.',
        text: s,
        sentenceIndex: i
      });
    }

    // 9. Scene Wrap-Up (High) - Check only the last 3 sentences
    if (i >= sentences.length - 3) {
      if (SCENE_WRAP_UP.test(s)) {
        flags.push({
          type: 'Scene Over-Resolution',
          severity: 3,
          message: 'Scene ends with explanation instead of tension.',
          suggestedFix: 'End on action, image, or unresolved beat.',
          text: s,
          sentenceIndex: i
        });
      }
    }

    // 11. Tired Physical Cliches (Med)
    if (PHYSICAL_CLICHES.test(s)) {
      flags.push({
        type: 'Tired Physical Response (Cliche)',
        severity: 2,
        message: 'A widely overused physical reaction phrase was detected.',
        suggestedFix: 'Replace with a specific, visceral bodily reaction unique to this character.',
        text: s,
        sentenceIndex: i
      });
    }
  }

  // Calculate Score
  const rawPenalty = flags.reduce((sum, f) => sum + f.severity, 0);
  // Base 100, lose points based on severity. Limit to 0. 
  // Max loss is scaled by chapter length to avoid huge chapters auto-failing. 
  // A penalty of 3 (1 High) per 200 words is acceptable.
  const wc = chapter.wordCount || 1000;
  const expectedPenalty = (wc / 200) * 3;
  
  let score = 100;
  if (rawPenalty > expectedPenalty * 0.25) {
     const ratio = rawPenalty / expectedPenalty; // if ratio > 1, heavily penalized
     score = Math.max(0, Math.round(100 - (ratio * 50))); 
  }

  // Generate Breakdown Maps
  const breakdown = {};
  flags.forEach(f => {
    breakdown[f.type] = (breakdown[f.type] || 0) + 1;
  });

  return {
    score,
    flags,
    breakdown,
    rawPenalty
  };
}
