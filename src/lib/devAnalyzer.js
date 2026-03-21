/**
 * StoryForge — Developmental Analysis Engine
 * Analyzes manuscripts for story structure, character arcs,
 * romance dynamics, pacing, POV voice, and prose patterns.
 */

import { scanAIPatternsDetailed } from './analyzers/aiTells.js';
import { scanPacing } from './analyzers/pacing.js';
import { scanRomanceTension } from './analyzers/romance.js';
import { classifyChapterPurposeDetailed } from './analyzers/purpose.js';
import { scanEmotionalArc } from './analyzers/emotional.js';
import { scanExposition } from './analyzers/exposition.js';
// (Note: Optional cross-chapter logic could still be maintained, keeping for compatibility)
import { scanManuscriptAIPatterns } from './aiPatternScanner.js';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

export const POV_CHARACTERS = ['Elowyn', 'Killian', 'Lysander', 'Ronin']
export const LOVE_INTERESTS = ['Killian', 'Lysander', 'Ronin']

export const POV_VOICE_PROFILES = {
  Elowyn: {
    traits: ['restrained', 'noble', 'ideological', 'lyrical'],
    keywords: ['dignity', 'duty', 'honor', 'light', 'bloom', 'fracture', 'silence', 'ache'],
    sentenceLengthBias: 'varied', // long lyrical sentences + short fragments
    structuralBias: { introspection: 'high', action: 'low', dialogue: 'medium' },
  },
  Killian: {
    traits: ['aggressive', 'visceral', 'physical', 'survival'],
    keywords: ['blood', 'bone', 'fight', 'strike', 'burn', 'survive', 'break', 'fist', 'snarl'],
    sentenceLengthBias: 'short',
    structuralBias: { introspection: 'low', action: 'high', dialogue: 'low' },
  },
  Lysander: {
    traits: ['political', 'manipulative', 'elegant', 'calculated'],
    keywords: ['game', 'move', 'court', 'power', 'mask', 'choose', 'conceal', 'truth', 'advantage'],
    sentenceLengthBias: 'long',
    structuralBias: { introspection: 'medium', action: 'low', dialogue: 'high' },
  },
  Ronin: {
    traits: ['quiet', 'observational', 'tactical', 'shadow'],
    keywords: ['shadow', 'dark', 'watch', 'still', 'wait', 'silent', 'edge', 'forest', 'observe'],
    sentenceLengthBias: 'short',
    structuralBias: { introspection: 'medium', action: 'medium', dialogue: 'low' },
  },
}

// Helper to sanitize dynamic user input before feeding it to new RegExp() to prevent SyntaxErrors
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const CONSPIRACY_VECTORS = {
  institutional: ['dean', 'board', 'rules', 'records', 'trial', 'rigged', 'corrupt', 'academy', 'institution', 'curriculum', 'files', 'hidden archive'],
  magical: ['harvest', 'energy', 'drain', 'Life Well', 'core', 'siphon', 'sacrifice', 'power', 'ritual', 'bloodline', 'spell', 'curse'],
  historical: ['history', 'prior', 'ancient', 'treaty', 'pact', 'hidden', 'secret', 'cover', 'forgotten', 'erased', 'past', 'founding', 'truth'],
}
export const CONSPIRACY_KEYWORDS = Object.values(CONSPIRACY_VECTORS).flat()

const MICRO_PHRASES = [
  'jaw tightens', 'jaw tightened', 'breath catches', 'breath caught',
  'pulse jumps', 'pulse jumped', 'wings flare', 'wings flared',
  'step closer', 'stepped closer', 'silence stretches', 'silence stretched',
  'heart stutters', 'chest tightens', 'stomach drops', 'throat constricts',
  'something in my chest', 'heat floods', 'skin prickles', 'world narrows',
]

const DIALOGUE_TAGS = ['murmured', 'snarled', 'whispered', 'hissed', 'growled',
  'breathed', 'purred', 'snapped', 'barked', 'spat', 'choked', 'gasped']

// ─── PARSER ───────────────────────────────────────────────────────────────────

export function parseManuscript(rawText, settings = {}) {
  const lines = rawText.split('\n')
  const chapters = []
  let current = null
  let currentScene = null
  let chapterIndex = 0

  const povChars = settings.povCharacters || POV_CHARACTERS;
  const chapterPattern = /^(#{1,3}\s*)?(chapter\s+\d+|prologue|epilogue|\bpart\s+\d+)/i
  const sceneBreak = /^(\*\s*\*\s*\*|---+|#{3,}|~{3,}|\*{3,})$/
  const povCharsEscaped = (settings.povCharacters || POV_CHARACTERS).map(name => escapeRegExp(name));
  const povPattern = new RegExp(`^\\*{0,2}(${povCharsEscaped.join('|')})\\*{0,2}$|^POV:\\s*([A-Z][a-z]+)|^\\[([A-Z][a-z]+)\\]`, 'i');

  lines.forEach(line => {
    const trimmed = line.trim()

    if (chapterPattern.test(trimmed)) {
      chapterIndex++
      const title = trimmed.replace(/^#+\s*/, '').trim() || `Chapter ${chapterIndex}`;
      
      // Inline POV Extraction: Check if the POV name is directly in the chapter title
      let extractedPov = null;
      const allPovs = settings.povCharacters || POV_CHARACTERS;
      for (const name of allPovs) {
        if (new RegExp(`\\b${escapeRegExp(name)}\\b`, 'i').test(title)) {
          extractedPov = name;
          break;
        }
      }

      current = {
        index: chapterIndex,
        title,
        pov: extractedPov,
        scenes: [],
        rawText: '',
      }
      currentScene = { text: '', index: 0 }
      current.scenes.push(currentScene)
      chapters.push(current)
      return
    }

    if (!current) {
      current = {
        index: 0,
        title: 'Prologue / Pre-Chapter',
        pov: null,
        scenes: [],
        rawText: '',
      }
      currentScene = { text: '', index: 0 }
      current.scenes.push(currentScene)
      chapters.push(current)
    }

    if (sceneBreak.test(trimmed)) {
      const nextIdx = current.scenes.length
      currentScene = { text: '', index: nextIdx }
      current.scenes.push(currentScene)
      return
    }

    const povMatch = trimmed.match(povPattern)
    if (povMatch) {
      const name = povMatch[1] || povMatch[2] || povMatch[3]
      const properlyCased = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      if ((settings.povCharacters || POV_CHARACTERS).includes(properlyCased)) {
        current.pov = properlyCased
      }
      return
    }

    if (trimmed) {
      currentScene.text += ' ' + trimmed + '\n'
      current.rawText += ' ' + trimmed + '\n'
    }
  })

  chapters.forEach(ch => {
    ch.wordCount = countWords(ch.rawText)
    ch.sentences = getSentences(ch.rawText)
    ch.dialogueLines = countDialogueLines(ch.rawText)
    ch.povScore = inferPOV(ch, settings)
  })

  return chapters
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function countWords(text) { return (text.match(/\b\w+\b/g) || []).length }
function getSentences(text) { return text.match(/[^.!?]+[.!?]+/g) || [] }
function countDialogueLines(text) {
  const paragraphs = text.split(/\n/)
  let dialogueCount = 0
  paragraphs.forEach(p => { if (/["“”]/.test(p)) dialogueCount++ })
  return dialogueCount
}

function avgSentenceLen(sentences) {
  if (!sentences.length) return 0
  return sentences.reduce((s, x) => s + x.split(/\s+/).length, 0) / sentences.length
}

function inferPOV(chapter, settings = {}) {
  if (chapter.pov) return chapter.pov
  const text = chapter.rawText.toLowerCase()
  let best = null, bestScore = 0
  const povChars = settings.povCharacters || POV_CHARACTERS;
  const profiles = settings.povVoiceProfiles || POV_VOICE_PROFILES;
  
  povChars.forEach(name => {
    let score = 0;
    const profile = profiles[name];
    if (profile && profile.keywords) {
      profile.keywords.forEach(kw => {
        score += (text.match(new RegExp(`\\b${escapeRegExp(kw)}\\b`, 'g')) || []).length
      })
    } else {
      // Fallback: If no semantic profile exists, do a raw name density extraction
      // to tentatively assign the chapter to the dynamic character.
      score += (text.match(new RegExp(`\\b${escapeRegExp(name.toLowerCase())}\\b`, 'g')) || []).length * 2
    }
    
    if (score > bestScore) { bestScore = score; best = name }
  })
  return best
}

function phraseCount(text, phrase) {
  const re = new RegExp(escapeRegExp(phrase), 'gi')
  return (text.match(re) || []).length
}

function wordCount(text, word) {
  return (text.toLowerCase().match(new RegExp(`\\b${escapeRegExp(word)}\\b`, 'g')) || []).length
}

// ─── MODULE: CHAPTER PURPOSE ─────────────────────────────────────────────────
export function classifyChapterPurpose(chapter) {
    // Route to the new deep 10-module detector
    return classifyChapterPurposeDetailed(chapter);
}

export function analyzeEmotionalMovement(chapter) {
   // Route to the new deep 8-step framework detector
   return scanEmotionalArc(chapter);
}

// ─── MODULE: ROMANCE TENSION ──────────────────────────────────────────────────
export function analyzeRomanceTension(chapter, settings = {}) {
   // Route to the new deep 10-module detector
   return scanRomanceTension(chapter, settings);
}

// ─── MODULE: CONSPIRACY TRACKING ──────────────────────────────────────────────
const CLUE_DENSITY_THRESHOLD = 3
const REVEAL_KW = ['revealed', 'discovered', 'confirmed', 'proven', 'exposed', 'confessed', 'admitted', 'found out', 'secret out', 'finally saw', 'truth', 'mask fell'];
const SUSPICION_KW = ['suspicious', 'wrong', 'off', 'strange', 'doubt', 'question', 'wonder', 'notice', 'lied', 'lying', 'hide', 'hidden', 'darkness', 'lurking'];

export function analyzeConspiracyArc(chapter) {
  const text = chapter.rawText.toLowerCase()
  
  const vectors = {
    institutional: CONSPIRACY_VECTORS.institutional.reduce((s,k) => s + wordCount(text, k.toLowerCase()), 0),
    magical: CONSPIRACY_VECTORS.magical.reduce((s,k) => s + wordCount(text, k.toLowerCase()), 0),
    historical: CONSPIRACY_VECTORS.historical.reduce((s,k) => s + wordCount(text, k.toLowerCase()), 0),
  }
  
  const clueDensity = Object.values(vectors).reduce((a, b) => a + b, 0)
  const revealDensity = REVEAL_KW.reduce((s,k) => s + wordCount(text, k), 0)
  const suspicionDensity = SUSPICION_KW.reduce((s,k) => s + wordCount(text, k), 0)

  const flags = []
  if (revealDensity > 5 && chapter.index < 8) {
    flags.push({ type: 'warning', msg: 'Major reveal language appears early — consider if this exposes plot before tension has built.' })
  }
  if (clueDensity > 12) {
    flags.push({ type: 'note', msg: 'High conspiracy keyword density — ensure clues feel organic, not expository.' })
  }
  
  if (vectors.institutional > 5) flags.push({ type: 'info', msg: 'Heavy Institutional plotting detected.' })
  if (vectors.magical > 5) flags.push({ type: 'info', msg: 'Heavy Magical/Energy lore detected.' })

  const phase = revealDensity > 4 ? 'reveal' : suspicionDensity > 4 ? 'suspicion' : clueDensity > 0 ? 'seeding' : 'inactive'

  // Compatibility mapping for existing UI
  const subplots = Object.entries(vectors).map(([k,v]) => ({ type: k, mentions: v }));

  return { clueDensity, vectors, revealDensity, suspicionDensity, phase, flags, score: clueDensity * 5, subplots }
}

// ─── MODULE: POV VOICE CONSISTENCY ──────────────────────────────────────────
export function analyzePOVVoice(chapter, allChapters, settings = {}) {
  const pov = chapter.pov || chapter.povScore
  const profiles = settings.povVoiceProfiles || POV_VOICE_PROFILES;
  if (!pov || !profiles[pov]) return null

  const profile = profiles[pov]
  const text = chapter.rawText.toLowerCase()
  const avgLen = avgSentenceLen(chapter.sentences)

  const samePOV = allChapters.filter(c => (c.pov || c.povScore) === pov && c.index !== chapter.index)
  const meanLen = samePOV.length
    ? samePOV.reduce((s,c) => s + avgSentenceLen(c.sentences), 0) / samePOV.length
    : avgLen

  const drift = Math.abs(avgLen - meanLen)
  const flags = []

  if (drift > meanLen * 0.35 && samePOV.length >= 2) {
    flags.push({
      type: 'warning',
      msg: `${pov}\u2019s sentence rhythm deviates from their baseline (avg ${avgLen.toFixed(1)} vs typical ${meanLen.toFixed(1)} words). Voice may be drifting.`,
    })
  }
  
  const otherVoices = Object.entries(profiles).filter(([k]) => k !== pov)
  const contaminations = []
  otherVoices.forEach(([otherName, otherProfile]) => {
    const hits = (otherProfile.keywords || []).filter(kw => wordCount(text, kw) >= 3)
    if (hits.length >= 3) {
      contaminations.push({ from: otherName, hits })
      flags.push({
        type: 'note',
        msg: `Voice note: "${hits.join(', ')}" — terms more associated with ${otherName}\u2019s voice appearing frequently. Check for drift.`,
      })
    }
  })

  const voiceScore = (profile.keywords || []).reduce((s,k) => s + wordCount(text, k), 0)
  const voiceStrength = voiceScore >= 8 ? 'Strong' : voiceScore >= 4 ? 'Moderate' : 'Weak'

  return { pov, avgLen, meanLen, drift, voiceScore, voiceStrength, contaminations, flags, score: voiceScore * 5 }
}

// ─── MODULE: PROSE PATTERN SCANNER ─────────────────────────────────────────
export function scanProsePatterns(chapter, sensitivity = 3) {
  const issues = []
  const text = chapter.rawText
  const sentences = chapter.sentences

  const starterMap = {}
  sentences.forEach(s => {
    const words = s.trim().split(/\s+/).slice(0,2).join(' ').toLowerCase().replace(/[^a-z\s]/g,'')
    if (words.length < 2) return
    starterMap[words] = (starterMap[words] || 0) + 1
  })
  Object.entries(starterMap).forEach(([starter, count]) => {
    if (count >= Math.max(3, 5 - sensitivity)) {
      issues.push({
        type: 'sentence-starter', severity: count >= 8 ? 'high' : 'medium',
        phrase: starter, count,
        msg: `"${starter}" used ${count}× to open sentences.`,
      })
    }
  })

  MICRO_PHRASES.forEach(phrase => {
    const count = phraseCount(text, phrase)
    if (count >= Math.max(2, 3 - sensitivity)) {
      issues.push({
        type: 'micro-phrase', severity: count >= 4 ? 'high' : 'medium',
        phrase, count,
        msg: `"${phrase}" appears ${count}× — emotional shorthand may be losing impact.`,
      })
    }
  })

  DIALOGUE_TAGS.forEach(tag => {
    const count = wordCount(text.toLowerCase(), tag)
    if (count >= Math.max(3, 5 - sensitivity)) {
      issues.push({
        type: 'dialogue-tag', severity: count >= 8 ? 'high' : 'medium',
        phrase: tag, count,
        msg: `"${tag}" used ${count}× as a dialogue tag.`,
      })
    }
  })

  return { issues, totalFlags: issues.length };
}

// ─── MODULE: OUT-OF-PLACE PROSE ──────────────────────────────────────────────
const GENERIC_PROSE = [
  /\bshe smiled\b/gi, /\bhe nodded\b/gi, /\bshe nodded\b/gi,
  /\bit was clear that\b/gi, /\bit was obvious\b/gi,
  /\bthe atmosphere was\b/gi, /\bthe mood was\b/gi,
  /\bshe was beautiful\b/gi, /\bhe was handsome\b/gi,
]
const MODERN_SLIPS = /\b(okay|ok|yep|nope|gonna|wanna|kinda|sorta|totally|literally|like,)\b/gi

export function detectOutOfPlaceProse(chapter) {
  const results = []
  chapter.sentences.forEach((sentence, i) => {
    const lo = sentence.toLowerCase()
    GENERIC_PROSE.forEach(pattern => {
      if (pattern.test(lo)) {
        results.push({
          sentence: sentence.trim(),
          reason: 'Generic prose — reads as stock description.',
          severity: 'low',
          sentenceIndex: i,
        })
      }
    })
    if (MODERN_SLIPS.test(sentence)) {
      results.push({
        sentence: sentence.trim(),
        reason: 'Modern colloquial language that may break the fantasy register.',
        severity: 'medium',
        sentenceIndex: i,
      })
    }
    MODERN_SLIPS.lastIndex = 0
  })
  return results
}

// ─── MODULE: PACING ANALYZER ──────────────────────────────────────────────────
export function analyzePacing(chapter) {
   // Route to the new deep 10-module detector
   return scanPacing(chapter);
}

// ─── MASTER ANALYSIS ──────────────────────────────────────────────────────────
export function analyzeManuscript(chapters, settings = {}) {
  let analyzed = chapters.map(chapter => ({
    ...chapter,
    analysis: {
      purpose:    classifyChapterPurpose(chapter),
      emotional:  analyzeEmotionalMovement(chapter),
      romance:    analyzeRomanceTension(chapter, settings),
      conspiracy: analyzeConspiracyArc(chapter),
      prose:      scanProsePatterns(chapter, settings.sensitivity ?? 3),
      outOfPlace: detectOutOfPlaceProse(chapter),
      pacing:     analyzePacing(chapter),
      exposition: scanExposition(chapter),
      aiPatterns: scanAIPatternsDetailed(chapter),
    },
  }))
  
  analyzed = analyzed.map(chapter => {
    chapter.analysis.povVoice = analyzePOVVoice(chapter, analyzed, settings)
    return chapter
  })
  
  return analyzed
}

// ─── MANUSCRIPT STATS ─────────────────────────────────────────────────────────
export function buildManuscriptStats(analyzedChapters, settings = {}) {
  const totalWords = analyzedChapters.reduce((s, c) => s + (c.wordCount || 0), 0)
  const totalScenes = analyzedChapters.reduce((s, c) => s + c.scenes.length, 0)

  const povChars = settings.povCharacters || POV_CHARACTERS;
  const loveInterests = settings.loveInterests || LOVE_INTERESTS;

  const povDist = {}
  povChars.forEach(p => { povDist[p] = 0 })
  analyzedChapters.forEach(c => {
    const pov = c.pov || c.povScore
    if (pov && povDist[pov] !== undefined) povDist[pov]++
  })

  const romanceTotals = {}
  loveInterests.forEach(n => { romanceTotals[n] = 0 })
  analyzedChapters.forEach(c => {
    loveInterests.forEach(n => { 
        romanceTotals[n] += (c.analysis?.romance?.byCharacter?.[n]?.tension || 0) 
    })
  })

  const conspiracyByChapter = analyzedChapters.map(c => ({
    chapter: c.title,
    index: c.index,
    density: c.analysis?.conspiracy?.clueDensity || 0,
    phase: c.analysis?.conspiracy?.phase || 'inactive',
  }))

  const allIssues = analyzedChapters.flatMap(c => (c.analysis?.prose?.issues || []).map(i => ({
    ...i, chapter: c.title, chapterIndex: c.index,
  })))

  const topPhrases = {}
  analyzedChapters.forEach(c => {
    ;(c.analysis?.prose?.issues || []).filter(i => i.type === 'micro-phrase').forEach(i => {
      topPhrases[i.phrase] = (topPhrases[i.phrase] || 0) + i.count
    })
  })

  // Merge aiPatterns (which is now a detailed flag list)
  const allAIPatterns = analyzedChapters.flatMap(c => (c.analysis?.aiPatterns?.flags || []).map(i => ({
    ...i, chapter: c.title, chapterIndex: c.index,
  })))
  
  const aiDensityScore = allAIPatterns.length / (totalWords / 1000)
  let aiDensityLabel = 'Low'
  if (aiDensityScore > 1.5) aiDensityLabel = 'High'
  else if (aiDensityScore > 0.5) aiDensityLabel = 'Moderate'
  
  const aiPatternCounts = {}
  allAIPatterns.forEach(p => {
    aiPatternCounts[p.type] = (aiPatternCounts[p.type] || 0) + 1
  })

  return {
    totalWords,
    totalChapters: analyzedChapters.length,
    totalScenes,
    povDist,
    romanceTotals,
    conspiracyByChapter,
    allIssues,
    topPhrases: Object.entries(topPhrases).sort((a,b)=>b[1]-a[1]).slice(0,12),
    allAIPatterns,
    aiDensityLabel,
    aiPatternCounts: Object.entries(aiPatternCounts).sort((a,b)=>b[1]-a[1])
  }
}
