import React from 'react';
import { SearchBar } from './SearchBar';
import { LangToggle } from './LangToggle';

interface TopHeaderProps {
  onToggleSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="top-header">
      <button
        className="mobile-menu-btn"
        onClick={onToggleSidebar}
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      <SearchBar />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <LangToggle />
      </div>
    </header>
  );
};
