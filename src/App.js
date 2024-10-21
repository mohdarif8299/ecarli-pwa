import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FamiliarizationScreen from './components/FamiliarizationScreen';
import StartScreen from './components/StartScreen';
import Backendless from 'backendless';
import TestScreen from './components/TestScreen';

// Backendless app configuration
const APP_ID = 'E9332BC5-C922-4110-BB95-C9D84866DB8F';
const API_KEY = '323C0F02-71BF-4134-BD72-7A037B8C64C6';

Backendless.initApp(APP_ID, API_KEY);

// Function to check if the device is an iPad
const isIpad = () => {
  return true;
  return /iPad/.test(navigator.userAgent);
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
