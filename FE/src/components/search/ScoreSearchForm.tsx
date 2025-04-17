import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getScoreByRegistration } from '../../redux/features/scoreSlice';
import ScoreCard from '../../components/common/ScoreCard/ScoreCard';

const ScoreSearchForm: React.FC = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { currentScore, loading, error } = useSelector((state: RootState) => state.scores);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationNumber.trim()) {
      dispatch(getScoreByRegistration(registrationNumber));
    }
  };

  return (
    <div className="score-search-container">
      <div className="search-form-card">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="registration">Registration Number:</label>
            <input
              type="text"
              id="registration"
              placeholder="Enter registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Submit'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      {currentScore && (
        <div className="detailed-scores-card">
          <h2>Detailed Scores</h2>
          <ScoreCard score={currentScore} />
        </div>
      )}
    </div>
  );
};

export default ScoreSearchForm;