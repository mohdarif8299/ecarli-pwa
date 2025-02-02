import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './StartScreen.css';

// Constants
const ALERT_TITLES = {
  MISSING_INFO: 'Oops! Missing Information',
  INCOMPLETE_DETAILS: 'Incomplete Details',
};

const ALERT_MESSAGES = {
  MISSING_CHILD_REF: "We need the child's reference to start. Kindly fill it in.",
  MISSING_ASSESSOR_NAME: "Looks like the assessor's name is missing. Please add it to proceed.",
};

// Components
const AlertModal = ({ title, message, onClose }) => (
  <div className="overlay" role="dialog" aria-labelledby="alertTitle" aria-describedby="alertMessage">
    <div className="alertBox">
      <h2 id="alertTitle" className="alertTitle">{title}</h2>
      <p id="alertMessage" className="alertMessage">{message}</p>
      <button className="okButton" onClick={onClose} aria-label="Close alert">
        OK
      </button>
    </div>
  </div>
);

AlertModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const StartScreen = () => {
  const [childReference, setChildReference] = useState('');
  const [assessor, setAssessor] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', message: '' });
  const navigate = useNavigate();

  const handleStart = () => {
    if (!childReference.trim()) {
      showAlert(ALERT_TITLES.MISSING_INFO, ALERT_MESSAGES.MISSING_CHILD_REF);
      return;
    }

    if (!assessor.trim()) {
      showAlert(ALERT_TITLES.INCOMPLETE_DETAILS, ALERT_MESSAGES.MISSING_ASSESSOR_NAME);
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

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <div className="container">
      <h1 className="title">eCARLI</h1>

      <input
        className="input"
        type="text"
        placeholder="Enter Child's Reference"
        value={childReference}
        onChange={(e) => setChildReference(e.target.value)}
        aria-label="Child's Reference"
      />

      <input
        className="input"
        type="text"
        placeholder="Enter Assessor's Name"
        value={assessor}
        onChange={(e) => setAssessor(e.target.value)}
        aria-label="Assessor's Name"
      />

      <button className="button" onClick={handleStart} aria-label="Start Assessment">
        Start Assessment
      </button>

      {alertVisible && (
        <AlertModal
          title={alertContent.title}
          message={alertContent.message}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default StartScreen;