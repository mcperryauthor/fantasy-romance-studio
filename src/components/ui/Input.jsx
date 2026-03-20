import React from 'react';

export const Input = ({ label, type = 'text', id, className = '', ...props }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    width: '100%',
    marginBottom: 'var(--spacing-md)',
  };

  const labelStyle = {
    fontSize: '0.875rem',
    color: 'var(--color-text-muted)',
    fontWeight: '500',
  };

  const inputStyle = {
    backgroundColor: 'var(--color-charcoal-light)',
    border: '1px solid var(--color-plum-dark)',
    borderRadius: 'var(--radius-sm)',
    padding: '12px 16px',
    color: 'var(--color-text-main)',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      {type === 'textarea' ? (
        <textarea 
          id={id} 
          style={{...inputStyle, minHeight: '120px', resize: 'vertical'}} 
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--color-burgundy)';
            e.target.style.boxShadow = '0 0 0 1px var(--color-burgundy)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--color-plum-dark)';
            e.target.style.boxShadow = 'none';
          }}
          {...props} 
        />
      ) : (
        <input 
          id={id} 
          type={type} 
          style={inputStyle} 
          onFocus={(e) => {
             e.target.style.borderColor = 'var(--color-burgundy)';
             e.target.style.boxShadow = '0 0 0 1px var(--color-burgundy)';
          }}
          onBlur={(e) => {
             e.target.style.borderColor = 'var(--color-plum-dark)';
             e.target.style.boxShadow = 'none';
          }}
          {...props} 
        />
      )}
    </div>
  );
};
