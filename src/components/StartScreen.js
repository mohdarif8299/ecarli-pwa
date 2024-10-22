import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import './StartScreen.css';

const StartScreen = () => {
  const [childReference, setChildReference] = useState('');
  const [assessor, setAssessor] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', message: '' });
  const navigate = useNavigate();

  const handleStart = () => {
    if (!childReference.trim()) {
      showAlert('Oops! Missing Information', "We need the child's reference to start. Kindly fill it in.");
      return;
    }

    if (!assessor.trim()) {
      showAlert('Incomplete Details', "Looks like the assessor's name is missing. Please add it to proceed.");
      return;
    }

    const data = {
      childReference,
      assessor,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      scores: [],
    };

    navigate('/familiarization', { state: data });
  };

  const showAlert = (title, message) => {
    setAlertContent({ title, message });
    setAlertVisible(true);
  };

  return (
    <div className="container">
      <div className="animation">
        {/* If you want to use Lottie animations, you can add them here */}
        {/* <Lottie
          animationData={require('../assets/animations/login_animation.json')}
          loop
          autoplay
        /> */}
      </div>

      <h1 className="title">eCARLI</h1>

      <input
        className="input"
        type="text"
        placeholder="Enter Child's Reference"
        value={childReference}
        onChange={(e) => setChildReference(e.target.value)}
      />

      <input
        className="input"
        type="text"
        placeholder="Enter Assessor's Name"
        value={assessor}
        onChange={(e) => setAssessor(e.target.value)}
      />

      <button className="button" onClick={handleStart}>
        Start Assessment
      </button>

      {/* Custom Alert Modal */}
      {alertVisible && (
        <div className="overlay">
          <div className="alertBox">
            <h2 className="alertTitle">{alertContent.title}</h2>
            <p className="alertMessage">{alertContent.message}</p>
            <button className="okButton" onClick={() => setAlertVisible(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartScreen;