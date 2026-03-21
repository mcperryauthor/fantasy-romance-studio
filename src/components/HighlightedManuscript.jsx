import React, { useMemo, useEffect, useRef } from 'react';

export default function HighlightedManuscript({ chapter, activeFlag }) {
  const contentRef = useRef(null);

  const paragraphs = useMemo(() => {
    if (!chapter?.rawText) return [];
    return chapter.rawText.split('\n').filter(p => p.trim() !== '');
  }, [chapter]);

  useEffect(() => {
     if (activeFlag && contentRef.current) {
        // Wait for render to finish
        setTimeout(() => {
           const mark = contentRef.current.querySelector('mark.active-highlight');
           if (mark) {
              mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
           }
        }, 50);
     }
  }, [activeFlag]);

  const renderParagraph = (text) => {
    if (!activeFlag) return text;
    
    let highlightTarget = activeFlag.sentence || activeFlag.phrase || activeFlag.phrase1 || activeFlag.original;
    if (!highlightTarget) return text;

    // Fallback case-insensitive check
    const lowerText = text.toLowerCase();
    const lowerTarget = highlightTarget.toLowerCase();
    const idx2 = lowerText.indexOf(lowerTarget);
    
    if (idx2 !== -1) {
       const before = text.substring(0, idx2);
       const match = text.substring(idx2, idx2 + highlightTarget.length);
       const after = text.substring(idx2 + highlightTarget.length);
       return (
         <>
           {before}
           <mark className="active-highlight" style={{ backgroundColor: 'rgba(201, 135, 76, 0.4)', color: '#fff', borderRadius: '3px', padding: '0 2px', borderBottom: '2px solid var(--color-gold)', transition: 'background-color 0.3s ease' }}>
             {match}
           </mark>
           {after}
         </>
       );
    }
    return text;
  };

  return (
    <div ref={contentRef} style={{ padding: '32px 48px', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-main)' }}>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ marginBottom: '1.2em', textIndent: '2em' }}>
          {renderParagraph(p)}
        </p>
      ))}
    </div>
  );
}
