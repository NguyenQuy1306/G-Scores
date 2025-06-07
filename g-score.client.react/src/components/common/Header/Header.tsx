import React from 'react';
import './Header.css';

interface HeaderProps {
    onMenuClick?: () => void;
  }
  

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="header">
        <button className="menu-button" onClick={() => onMenuClick?.()}>
        <span className="menu-icon"></span>
      </button>
      <h1>gscores</h1>
    </header>
  );
};

export default Header;