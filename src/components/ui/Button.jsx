import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-sm)',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-sans)',
  };
  
  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.875rem' },
    md: { padding: '10px 20px', fontSize: '1rem' },
    lg: { padding: '14px 28px', fontSize: '1.125rem' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-burgundy)',
      color: 'var(--color-text-heading)',
      boxShadow: '0 2px 10px rgba(123, 44, 58, 0.4)',
    },
    secondary: {
      backgroundColor: 'var(--color-charcoal)',
      color: 'var(--color-text-main)',
      border: '1px solid var(--color-plum-border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-main)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-gold-muted)',
      border: '1px solid var(--color-gold-muted)',
    }
  };

  const _style = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <button 
      style={_style} 
      className={`btn-${variant} ${className}`}
      onMouseOver={(e) => {
        if(variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--color-burgundy-hover)';
        if(variant === 'secondary') e.currentTarget.style.borderColor = 'var(--color-gold-muted)';
        if(variant === 'ghost') e.currentTarget.style.color = 'var(--color-gold-muted)';
      }}
      onMouseOut={(e) => {
        if(variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--color-burgundy)';
        if(variant === 'secondary') e.currentTarget.style.borderColor = 'var(--color-plum-border)';
        if(variant === 'ghost') e.currentTarget.style.color = 'var(--color-text-main)';
      }}
      {...props}
    >
      {children}
    </button>
  );
};
