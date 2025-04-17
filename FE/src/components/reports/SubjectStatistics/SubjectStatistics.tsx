import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getScoreStatistics } from '../../../redux/features/reportSlice';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SubjectStatistics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subjectStatistics, loading } = useSelector((state: RootState) => state.reports);

  useEffect(() => {
    dispatch(getScoreStatistics());
  }, [dispatch]);

  if (loading || !subjectStatistics || subjectStatistics.length === 0) {
    return <div className="loading">Loading statistics...</div>;
  }

  const subjects = subjectStatistics.map(stat => stat.subjectName);

  const chartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Excellent (≥8)',
        data: subjectStatistics.map(stat => stat.level1 || 0), 
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
      {
        label: 'Good (6-8)',
        data: subjectStatistics.map(stat => stat.level2 || 0), 
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Average (4-6)',
        data: subjectStatistics.map(stat => stat.level3 || 0), 
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
      {
        label: 'Below Average (<4)',
        data: subjectStatistics.map(stat => stat.level4 || 0), 
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Score Distribution by Subject',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="statistics-chart">
      <h2>Subject Statistics</h2>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SubjectStatistics;
