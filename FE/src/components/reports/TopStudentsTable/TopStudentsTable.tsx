import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getTopStudents } from '../../../redux/features/reportSlice';   
const TopStudentsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topStudents, loading } = useSelector((state: RootState) => state.reports);

  useEffect(() => {
    dispatch(getTopStudents());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading top students...</div>;
  }

  return (
    <div className="top-students-container">
      <h2>Top 10 Students - Group A</h2>
      <p>Subjects: Mathematics, Physics, Chemistry</p>
      
      <div className="table-container">
        <table className="top-students-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Registration</th>
              <th>Math</th>
              <th>Physics</th>
              <th>Chemistry</th>
              <th>Total</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student, index) => (
              <tr key={student.id} className={index < 3 ? 'top-three' : ''}>
                <td>{index + 1}</td>
                {/* <td>{student.name}</td> */}
                <td>{student.registrationNumber}</td>
                <td>{student.math.toFixed(2)}</td>
                <td>{student.physics.toFixed(2)}</td>
                <td>{student.chemistry.toFixed(2)}</td>
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