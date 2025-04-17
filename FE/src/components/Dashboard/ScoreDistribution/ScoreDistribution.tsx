import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Chart from 'chart.js/auto';
import './ScoreDistribution.css';

const ScoreDistribution: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { statistics, loading } = useSelector((state: RootState) => state.reports);

  useEffect(() => {
    if (loading || !statistics || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Excellent (≥8)', 'Good (6-8)', 'Average (4-6)', 'Below Average (<4)'],
          datasets: [{
            data: [
              12,
              4,
              4,
              5
            ],
            backgroundColor: [
              'rgba(42, 157, 143, 0.8)',  // Green
              'rgba(58, 134, 255, 0.8)',  // Blue
              'rgba(251, 133, 0, 0.8)',   // Orange
              'rgba(230, 57, 70, 0.8)'    // Red
            ],
            borderColor: [
              'rgba(42, 157, 143, 1)',
              'rgba(58, 134, 255, 1)',
              'rgba(251, 133, 0, 1)',
              'rgba(230, 57, 70, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: {
                  family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: 'Student Score Distribution',
              font: {
                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                size: 16,
                weight: 'bold'
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw ? (context.raw as number) : 0;  // Casting context.raw to number
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;  // Ensure no division by zero
                  return `${label}: ${value} students (${percentage}%)`;
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [ loading]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="score-distribution-card">
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="score-legend">
        <div className="legend-item">
          <span className="legend-color level-1"></span>
          <span>Excellent (≥8): {statistics.level1} students</span>
        </div>
        <div className="legend-item">
          <span className="legend-color level-2"></span>
          <span>Good (6-8): {statistics.level2} students</span>
        </div>
        <div className="legend-item">
          <span className="legend-color level-3"></span>
          <span>Average (4-6): {statistics.level3} students</span>
        </div>
        <div className="legend-item">
          <span className="legend-color level-4"></span>
          <span>Below Average (&lt;4): {statistics.level4} students</span>

        </div>
      </div>
    </div>
  );
};

export default ScoreDistribution;
