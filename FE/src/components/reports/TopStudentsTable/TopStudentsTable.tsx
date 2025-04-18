import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getTopStudents } from '../../../redux/features/reportSlice';
import { Student } from '../../../types/student.types';
// import './TopStudentsTable.css';

const SUBJECT_COMBINATIONS: Record<string, string[]> = {
  A00: ['Math', 'Physics', 'Chemistry'],
  A01: ['Math', 'Physics', 'English'],
  A02: ['Math', 'Physics', 'Biology'],
  A03: ['Math', 'Physics', 'History'],
  A04: ['Math', 'Physics', 'Geography'],
  A05: ['Math', 'Chemistry', 'History'],
  A06: ['Math', 'Chemistry', 'Geography'],
  A07: ['Math', 'History', 'Geography'],
  A08: ['Math', 'History', 'Civic'],
  A09: ['Math', 'Geography', 'Civic'],
  A10: ['Math', 'Physics', 'Civic'],
  A11: ['Math', 'Chemistry', 'Civic'],
  B00: ['Math', 'Chemistry', 'Biology'],
  B01: ['Math', 'Biology', 'History'],
  B02: ['Math', 'Biology', 'Geography'],
  B03: ['Math', 'Biology', 'Literature'],
  C00: ['Literature', 'History', 'Geography'],
  C01: ['Literature', 'Math', 'Physics'],
  C02: ['Literature', 'Math', 'Chemistry'],
  C03: ['Literature', 'Math', 'History'],
  C04: ['Literature', 'Math', 'Geography'],
  C05: ['Literature', 'Physics', 'Chemistry'],
  C06: ['Literature', 'Physics', 'Biology'],
  C07: ['Literature', 'Physics', 'History'],
  C08: ['Literature', 'Chemistry', 'Biology'],
  C09: ['Literature', 'Physics', 'Geography'],
  C10: ['Literature', 'Chemistry', 'History'],
  C12: ['Literature', 'Biology', 'History'],
  C13: ['Literature', 'Biology', 'Geography'],
  C14: ['Literature', 'Math', 'Civic'],
  D01: ['Literature', 'Math', 'English'],
  D07: ['Math', 'Chemistry', 'English'],
  D08: ['Math', 'Biology', 'English'],
  D09: ['Math', 'History', 'English'],
  D10: ['Math', 'Geography', 'English'],
  D11: ['Literature', 'Physics', 'English'],
};

const SUBJECT_NAME: Record<string, string> = {
  "Math": 'math',
  "Chemistry": 'chemistry',
  "Physics": 'physics',
  "Biology": 'biology',
  "History": 'history',
  "Geography": 'geography',
  "Civic Education": 'civic',
  "English": 'english',
  "Literature": 'literature',
} ;


const TopStudentsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topStudents, loading } = useSelector((state: RootState) => state.reports);
  console.log("topStudents", topStudents);
  const [selectedCombination, setSelectedCombination] = useState<string>('A00');
  const [limit, setLimit] = useState<number>(10);
  useEffect(() => {
    const subjects_name = SUBJECT_COMBINATIONS[selectedCombination];
    const subjects = subjects_name.map(subject => SUBJECT_NAME[subject] || subject.toLowerCase());
    dispatch(getTopStudents({ subjects, limit }));
  }, [dispatch, selectedCombination, limit]);

  const handleCombinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCombination(e.target.value);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setLimit(val);
    }
  };

  if (loading) {
    return <div className="loading">Loading top students...</div>;
  }

  return (
    <div className="top-students-container">
      <h2>Top {limit} Students</h2>

      <div className="controls">
        <div className="control">
          <label>Subject Combination:</label>
          <select value={selectedCombination} onChange={handleCombinationChange}>
            {Object.entries(SUBJECT_COMBINATIONS).map(([code, subjects]) => (
              <option key={code} value={code}>
                {code} - {subjects.join(', ')}
              </option>
            ))}
          </select>
        </div>
        <div className="control">
          <label>Limit:</label>
          <input
            type="number"
            min={1}
            value={limit}
            onChange={handleLimitChange}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="top-students-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Registration</th>
              {SUBJECT_COMBINATIONS[selectedCombination].map((subject) => (
                <th key={subject}>{subject}</th>
              ))}
              <th>Total</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student, idx) => (
              <tr key={student.studentId} className={idx < 3 ? 'top-three' : ''}>
                <td>{idx + 1}</td>
                <td>{student.registrationNumber}</td>
                {SUBJECT_COMBINATIONS[selectedCombination].map((subj) => {
                  const found = student.scores.find((s) => s.subjectName === subj.toLowerCase());
                  return <td key={subj}>{found ? found.score.toFixed(2) : '-'}</td>;
                })}
                <td>{student.totalScore.toFixed(2)}</td>
                <td>{student.average.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopStudentsTable;
