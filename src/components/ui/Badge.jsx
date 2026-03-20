import React from 'react';

export const Badge = ({ children, variant = 'gray', className = '', ...props }) => {
  const variantStyles = {
    gray: { backgroundColor: 'var(--color-plum-dark)', color: 'var(--color-text-main)' },
    red: { backgroundColor: 'rgba(123, 44, 58, 0.2)', color: '#ff6b81', border: '1px solid var(--color-burgundy)' },
    gold: { backgroundColor: 'rgba(168, 139, 93, 0.1)', color: 'var(--color-gold-muted)', border: '1px solid var(--color-gold-muted)' },
    green: { backgroundColor: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', border: '1px solid rgba(46, 204, 113, 0.3)' },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    fontFamily: 'var(--font-sans)',
    ...variantStyles[variant]
  };

  return (
    <span style={style} className={`badge ${className}`} {...props}>
      {children}
    </span>
  );
};
