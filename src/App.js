import React, { useState } from 'react';
import './App.css';
import RaiseOrLowerLandMass from './states/RaiseOrLowerLandMass.jsx';
import ObjectMover from './states/ObjectMover.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const goToRaiseOrLowerLandMass = () => {
    setCurrentPage('RaiseOrLowerLandMass');
  };
  const goToObjectMover = () => {
    setCurrentPage('ObjectMover');
  };

  const goToMainPage = () => {
    setCurrentPage('main');
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentPage === 'main' && (
          <>
            <button onClick={goToRaiseOrLowerLandMass} className="my-button">
              Raise or Lower Landmass
            </button>
            <button onClick={goToObjectMover} className="my-button">
              Move Object
            </button>
          </>
        )}

        {currentPage === 'RaiseOrLowerLandMass' && (
          <RaiseOrLowerLandMass goToMainPage={goToMainPage} />
        )}

        {currentPage === 'ObjectMover' && (
          <ObjectMover goToMainPage={goToMainPage} />
        )}
      </header>
    </div>
  );
}

export default App;