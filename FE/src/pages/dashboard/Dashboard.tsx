import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
// import { getScoreStatistics } from '../../redux/features/reportSlice';
import Header from '../../components/common/Header/Header';
import Sidebar from '../../components/common/Sidebar/Sidebar';
import StatisticsCard from '../../components/Dashboard/StatisticsCard/StatisticCard';
import ScoreDistribution from '../../components/Dashboard/ScoreDistribution/ScoreDistribution';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { statistics, loading } = useSelector((state: RootState) => state.reports || {});

  // useEffect(() => {
  //   dispatch(getScoreStatistics());
  // }, [dispatch]);

  return (

        <main className="main-content">
          <h1>Dashboard</h1>
          
          <div className="stats-cards">
            <StatisticsCard 
              title="Excellent Students" 
              count={statistics.level1} 
              description="Students with scores ≥ 8" 
              icon="🏆"
              color="green"
            />
            <StatisticsCard 
              title="Good Students" 
              count={statistics.level2} 
              description="Students with scores 6-8" 
              icon="👍"
              color="blue"
            />
            <StatisticsCard 
              title="Average Students" 
              count={statistics.level3} 
              description="Students with scores 4-6" 
              icon="😐"
              color="orange"
            />
            <StatisticsCard 
              title="Below Average" 
              count={statistics.level4} 
              description="Students with scores < 4" 
              icon="📚"
              color="red"
            />
          </div>
          
          <div className="chart-container">
            <ScoreDistribution />
          </div>
        </main>
 

  );
};

export default Dashboard;