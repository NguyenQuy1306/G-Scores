import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getSubjectStatistics } from '../../../redux/features/reportSlice';
import Chart from 'chart.js/auto';
import './ScoreLevelChart.css';
import { SubjectLevelStats } from '../../../types/report.types';   

const ScoreLevelChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { subjectStatistics, loading } = useSelector((state: RootState) => state.reports);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    dispatch(getSubjectStatistics());
  }, [dispatch]);

  useEffect(() => {
    if (loading || !subjectStatistics || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    if (ctx) {
      const filteredStats = selectedSubject === 'all' 
        ? subjectStatistics 
        : subjectStatistics.filter((stat: SubjectLevelStats) => stat.subjectName === selectedSubject);
      
      const subjects = filteredStats.map((stat: SubjectLevelStats) => stat.subjectName);
      const level1Data = filteredStats.map((stat: SubjectLevelStats) => stat.level1);
      const level2Data = filteredStats.map((stat: SubjectLevelStats) => stat.level2);
      const level3Data = filteredStats.map((stat: SubjectLevelStats) => stat.level3);
      const level4Data = filteredStats.map((stat: SubjectLevelStats) => stat.level4);

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: subjects,
          datasets: [
            {
              label: 'Excellent (≥8)',
              data: level1Data,
              backgroundColor: 'rgba(42, 157, 143, 0.8)',
              borderColor: 'rgba(42, 157, 143, 1)',
              borderWidth: 1
            },
            {
              label: 'Good (6-8)',
              data: level2Data,
              backgroundColor: 'rgba(58, 134, 255, 0.8)',
              borderColor: 'rgba(58, 134, 255, 1)',
              borderWidth: 1
            },
            {
              label: 'Average (4-6)',
              data: level3Data,
              backgroundColor: 'rgba(251, 133, 0, 0.8)',
              borderColor: 'rgba(251, 133, 0, 1)',
              borderWidth: 1
            },
            {
              label: 'Below Average (<4)',
              data: level4Data,
              backgroundColor: 'rgba(230, 57, 70, 0.8)',
              borderColor: 'rgba(230, 57, 70, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Score Distribution by Subject',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          },
          scales: {
            x: {
              stacked: false,
              title: {
                display: true,
                text: 'Subjects'
              }
            },
            y: {
              stacked: false,
              title: {
                display: true,
                text: 'Number of Students'
              },
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [subjectStatistics, loading, selectedSubject]);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  const getUniqueSubjects = () => {
    if (!subjectStatistics) return [];
    const subjects = subjectStatistics.map((stat: SubjectLevelStats) => stat.subjectName);
    return [...new Set(subjects)];
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="score-level-chart">
      <div className="chart-header">
        <h2>Score Levels by Subject</h2>
        <select 
          className="subject-selector" 
          value={selectedSubject} 
          onChange={handleSubjectChange}
        >
          <option value="all">All Subjects</option>
          {getUniqueSubjects().map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>
      
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
      
      <div className="score-level-legend">
        <div className="legend-item">
          <div className="legend-color level-1"></div>
          <span>Excellent (≥8)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color level-2"></div>
          <span>Good (6-8)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color level-3"></div>
          <span>Average (4-6)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color level-4"></div>
          <span>Below Average (&lt;4)</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreLevelChart;
