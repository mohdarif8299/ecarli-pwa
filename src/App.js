import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FamiliarizationScreen from './components/FamiliarizationScreen';
import StartScreen from './components/StartScreen';
import Backendless from 'backendless';
import TestScreen from './components/TestScreen';

const APP_ID = '22B4C8EB-014E-4AA5-A563-0231CB4187EB';
const API_KEY = 'F7FA93E1-42B7-45A6-829C-B4231A720292';

Backendless.initApp(APP_ID, API_KEY);

const isIpad = () => {
  const userAgent = navigator.userAgent;

  const isIpad = /iPad/.test(userAgent);

  const isMacSafari = /Macintosh/.test(userAgent) && /Safari/.test(userAgent);
  const isMobileMode = window.innerWidth <= 1024;

  const isChrome = /Chrome/.test(userAgent);
  const isChromeMobileMode = window.innerWidth <= 1024;

  return isIpad || (isMacSafari && isMobileMode) || (isChrome && isChromeMobileMode);
};

const App = () => {

  return (
    <Router>
      {isIpad() ? (
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/familiarization" element={<FamiliarizationScreen />} />
          <Route path="/test" element={<TestScreen />} />
        </Routes>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>This app is only available on iPads.</h1>
        </div>
      )}
    </Router>
  );
};

export default App;