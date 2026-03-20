import React from 'react';

export const Card = ({ children, padding = 'md', className = '', glow = false, ...props }) => {
  const pStyles = {
    none: '0',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  };

  const style = {
    backgroundColor: 'var(--color-charcoal)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-plum-dark)',
    padding: pStyles[padding],
    boxShadow: glow ? 'var(--shadow-glow)' : 'var(--shadow-panel)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <div style={style} className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};
