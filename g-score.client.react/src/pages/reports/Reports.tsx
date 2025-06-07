import React from 'react';
import ScoreLevelChart from '../../components/reports/ScoreLevelChart/ScoreLevelChart';
import TopStudentsTable from '../../components/reports/TopStudentsTable/TopStudentsTable';

const Reports: React.FC = () => {
  return (

        <main className="main-content">
          <h1 style={{color:"black"}}>Reports</h1>
          
          <div className="reports-grid">
            <div className="report-card">
              <ScoreLevelChart />
            </div>
            
            
            <div className="report-card wide">
              <TopStudentsTable />
            </div>
          </div>
        </main>

  );
};

export default Reports;