import React from 'react';
import './StatisticsCard.css';

interface StatisticsCardProps {
  title: string;
  count: number;
  description: string;
  icon: string;
  color: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ 
  title, 
  count, 
  description, 
  icon, 
  color 
}) => {
  const colorClass = `stat-card-${color}`;
  
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{title}</h3>
        <div className="stat-count">{count}</div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;