import React from 'react';
import ScoreSearchForm from '../../components/search/ScoreSearchForm';
import Header from '../../components/common/Header/Header';
import Sidebar from '../../components/common/Sidebar/Sidebar';

const SearchScores: React.FC = () => {
  return (

        <main className="main-content">
          <ScoreSearchForm />
        </main>

  );
};

export default SearchScores;