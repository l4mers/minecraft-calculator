import React, { useState } from 'react';
import './App.css';
import RaiseOrLowerLandMass from './states/RaiseOrLowerLandMass.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const goToRaiseOrLowerLandMass = () => {
    setCurrentPage('RaiseOrLowerLandMass');
  };

  const goToMainPage = () => {
    setCurrentPage('main');
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentPage === 'main' && (
          <button onClick={goToRaiseOrLowerLandMass} className="my-button">
            Raise or lower landmass
          </button>
        )}
        
        {currentPage === 'RaiseOrLowerLandMass' && <RaiseOrLowerLandMass goToMainPage={goToMainPage} />}
      </header>
    </div>
  );
}

export default App;
