import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
  const headerStyle = {
    height: '72px',
    borderBottom: '1px solid var(--color-plum-dark)',
    backgroundColor: 'var(--color-obsidian)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--spacing-xl)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-charcoal)',
    border: '1px solid var(--color-plum-dark)',
    borderRadius: 'var(--radius-lg)',
    padding: '8px 16px',
    width: '300px',
  };

  const searchInputStyle = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--color-text-main)',
    marginLeft: '8px',
    width: '100%',
    fontFamily: 'var(--font-sans)',
  };

  const actionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
  };

  const iconButtonStyle = {
    background: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s ease',
  };

  return (
    <header style={headerStyle}>
      <div style={searchContainerStyle}>
        <Search size={16} color="var(--color-text-muted)" />
        <input 
          type="text" 
          placeholder="Search manuscripts, reviews..." 
          style={searchInputStyle}
        />
      </div>

      <div style={actionStyle}>
        <button style={iconButtonStyle} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold-muted)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
