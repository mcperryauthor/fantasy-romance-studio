import React from 'react';
import {
  ModuleChapterPurpose,
  ModuleEmotionalMovement,
  ModuleRomanceTension,
  ModuleConspiracyThread,
  ModulePOVVoice,
  ModuleProse,
  ModulePacing,
  ModuleAITells,
  ModuleOutOfPlace
} from '../components/modules/TechnicalModules';

export const analysisModules = [
  { id: 'purpose', title: 'Chapter Purpose', component: ModuleChapterPurpose },
  { id: 'emotional', title: 'Emotional Movement', component: ModuleEmotionalMovement },
  { id: 'romance', title: 'Romance Tension', component: ModuleRomanceTension },
  { id: 'conspiracy', title: 'Conspiracy Thread', component: ModuleConspiracyThread },
  { id: 'pov', title: 'POV Voice', component: ModulePOVVoice },
  { id: 'prose', title: 'Prose Patterns', component: ModuleProse },
  { id: 'outOfPlace', title: 'Out-of-Place Prose', component: ModuleOutOfPlace },
  { id: 'pacing', title: 'Pacing', component: ModulePacing },
  { id: 'ai', title: 'AI Patterns', component: ModuleAITells }
];
