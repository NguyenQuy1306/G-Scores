import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="menu">
        <h3>Menu</h3>
        <ul>
          <li className={isActive('/') ? 'active' : ''}>
            <Link to="/">Dashboard</Link>
          </li>
          <li className={isActive('/search') ? 'active' : ''}>
            <Link to="/search">Search Scores</Link>
          </li>
          <li className={isActive('/reports') ? 'active' : ''}>
            <Link to="/reports">Reports</Link>
          </li>
          <li className={isActive('/settings') ? 'active' : ''}>
            <Link to="/settings">Settings</Link>
          </li>
        
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;