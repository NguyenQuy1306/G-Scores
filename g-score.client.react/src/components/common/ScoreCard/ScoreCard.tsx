import React from 'react';
import { Score } from '../../../types/score.types';

interface ScoreCardProps {
  score: Score;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  const getScoreLevel = (score: number) => {
    if (score >= 8) return { level: 'Excellent', class: 'level-1' };
    if (score >= 6) return { level: 'Good', class: 'level-2' };
    if (score >= 4) return { level: 'Average', class: 'level-3' };
    return { level: 'Below Average', class: 'level-4' };
  };

  const averageLevel = getScoreLevel(score.averageScore);

  return (
    <div className="score-card">
      <div className="student-info">
        <h3>{score.studentName ?? 'Unknown Student'}</h3>
        <p>Registration: {score.registrationNumber}</p>
        <p className={`average ${averageLevel.class}`}>
          Average: {score.averageScore.toFixed(2)} - {averageLevel.level}
        </p>
      </div>

      <div className="subject-scores">
        <h4>Subject Scores</h4>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {score.scoreResponses.map((subject, index) => {
              const subjectLevel = getScoreLevel(subject.score);
              return (
                <tr key={index}>
                  <td>{subject.subjectName}</td>
                  <td>{subject.score.toFixed(2)}</td>
                  <td className={subjectLevel.class}>{subjectLevel.level}</td>
                </tr>
              );
            })}
            <tr className="total-row">
              <td>Total</td>
              <td colSpan={2}>{score.totalScore.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreCard;
