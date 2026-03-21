import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, PlusCircle, Settings, FileText, Feather } from 'lucide-react';

const Sidebar = () => {
  const sidebarStyle = {
    width: '260px',
    backgroundColor: 'var(--color-charcoal)',
    borderRight: '1px solid var(--color-plum-dark)',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--spacing-lg) 0',
  };

  const logoStyle = {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--color-text-heading)',
    padding: '0 var(--spacing-lg)',
    marginBottom: 'var(--spacing-xl)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    letterSpacing: '0.5px'
  };

  const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    flex: 1,
  };

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px var(--spacing-lg)',
    color: isActive ? 'var(--color-gold-muted)' : 'var(--color-text-muted)',
    backgroundColor: isActive ? 'rgba(168, 139, 93, 0.05)' : 'transparent',
    borderRight: isActive ? '3px solid var(--color-gold-muted)' : '3px solid transparent',
    fontWeight: isActive ? '500' : '400',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  });

  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>
        <BookOpen size={24} color="var(--color-burgundy)" />
        The Editorial Grimoire
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={navListStyle}>
          <li>
            <NavLink to="/style-profile" style={({ isActive }) => linkStyle(isActive)}>
              <Feather size={18} /> Style & Voice Calibration
            </NavLink>
          </li>
          <li>
            <NavLink to="/report/dummy" style={({ isActive }) => linkStyle(isActive)}>
              <FileText size={18} /> Reports Archive
            </NavLink>
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', paddingBottom: 'var(--spacing-md)' }}>
        <ul style={navListStyle}>
          <li>
            <NavLink to="/settings" style={({ isActive }) => linkStyle(isActive)}>
              <Settings size={18} /> Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
