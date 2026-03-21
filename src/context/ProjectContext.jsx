import React, { createContext, useState, useContext, useEffect } from 'react';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [manuscriptTitle, setManuscriptTitle] = useState('Untitled Project');
  const [rawText, setRawText] = useState('');
  const [parsedChapters, setParsedChapters] = useState([]); // Pre-analysis structural division
  const [chapters, setChapters] = useState([]); // Post-analysis with all scoring
  const [stats, setStats] = useState(null); // Global aggregated metrics

  // Basic autosave to localStorage for persistence across reloads
  useEffect(() => {
    try {
      const saved = localStorage.getItem('grimoire-project');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.chapters && data.chapters.length > 0) {
          setManuscriptTitle(data.title || 'Draft');
          setChapters(data.chapters);
          setStats(data.stats);
        }
      }
    } catch (e) {
      console.error('Failed to load saved project', e);
    }
  }, []);

  const saveProject = (title, analyzedChapters, generatedStats) => {
    setManuscriptTitle(title);
    setChapters(analyzedChapters);
    setStats(generatedStats);
    
    // Attempt persist (may fail on very large manuscripts >10MB due to localStorage limits)
    try {
      localStorage.setItem('grimoire-project', JSON.stringify({
        title,
        chapters: analyzedChapters,
        stats: generatedStats
      }));
    } catch (e) {
      console.warn('Project too large for localStorage autosave', e);
    }
  };

  const clearProject = () => {
    localStorage.removeItem('grimoire-project');
    setManuscriptTitle('Untitled Project');
    setRawText('');
    setParsedChapters([]);
    setChapters([]);
    setStats(null);
  };

  return (
    <ProjectContext.Provider value={{
      manuscriptTitle, setManuscriptTitle,
      rawText, setRawText,
      parsedChapters, setParsedChapters,
      chapters, setChapters,
      stats, setStats,
      saveProject, clearProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
