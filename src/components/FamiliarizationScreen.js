import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'react-lottie';
import Backendless from 'backendless';
import celebrationsAnimation from '../assets/animations/success_animation.json';
import './FamiliarizationScreen.css';

const FamiliarizationScreen = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSelectAlert, setShowSelectAlert] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [familiarizationItems, setFamiliarizationItems] = useState([]);
  const [hasVideoPlayed, setHasVideoPlayed] = useState(false);
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [showCustomAlert, setShowCustomAlert] = useState({ 
    visible: false, 
    message: '', 
    onConfirm: () => {} 
  });
  const data = location.state;

  const APP_ID = '22B4C8EB-014E-4AA5-A563-0231CB4187EB';
  const API_KEY = 'F7FA93E1-42B7-45A6-829C-B4231A720292';

  const celebrationsOptions = {
    loop: false,
    autoplay: true,
    animationData: celebrationsAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMax slice'
    }
  };

  const validateData = () => {
    return data && data.assessor && data.childReference;
  };

  useEffect(() => {
    if (!validateData()) {
      setShowCustomAlert({
        visible: true,
        message: "Please enter both the Child Reference and Assessor's name before starting the familiarization.",
        onConfirm: () => {
          setShowCustomAlert({ visible: false });
          navigate('/');
        }
      });
    }
  }, []);

  const parseBackendlessData = (item) => {
    try {
      let images = [];
      if (typeof item.images === 'string') {
        const cleanedString = item.images
          .replace(/^\[/, '')
          .replace(/\]$/, '');
        
        images = cleanedString
          .split(',')
          .map(url => url
            .trim()
            .replace(/^['"]/, '')
            .replace(/['"]$/, ''));
      } else if (Array.isArray(item.images)) {
        images = item.images;
      }

      return {
        video: item.video || '',
        images: images.filter(url => url && url.length > 0),
        correctIndex: typeof item.correctIndex === 'number' ? item.correctIndex : 0
      };
    } catch (error) {
      console.error('Error parsing item:', error, item);
      return {
        video: '',
        images: [],
        correctIndex: 0
      };
    }
  };

  const fetchFamiliarizationItems = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!Backendless.applicationId) {
        Backendless.initApp(APP_ID, API_KEY);
      }

      const queryBuilder = Backendless.DataQueryBuilder.create();
      queryBuilder.setPageSize(100);
      queryBuilder.setSortBy(['created asc']);

      const items = await Backendless.Data.of('FamiliarizationItems').find(queryBuilder);
      
      if (!items || items.length === 0) {
        throw new Error('No familiarization items found');
      }

      const formattedItems = items.map(item => {
        const parsed = parseBackendlessData(item);
        return parsed;
      });

      const validItems = formattedItems.filter(item =>
        item.video &&
        Array.isArray(item.images) &&
        item.images.length > 0
      );

      if (validItems.length === 0) {
        throw new Error('No valid familiarization items found');
      }

      const sortedItems = [
        ...validItems.filter(item => item.images.length === 1),
        ...validItems.filter(item => item.images.length > 1)
      ];

      setFamiliarizationItems(sortedItems);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching familiarization items:', error);
      setError('Failed to load familiarization items. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFamiliarizationItems();
  }, []);

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    setOptionsEnabled(true);
    setHasVideoPlayed(true);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setOptionsEnabled(false);
  };

  const handleVideoSeek = () => {
    setOptionsEnabled(false);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.load();
      videoElement.muted = isMuted;

      // Reset states when changing items
      setHasVideoPlayed(false);
      setOptionsEnabled(false);
      setIsVideoPlaying(false);

      const handleLoadStart = () => {
        setIsVideoPlaying(false);
        setOptionsEnabled(false);
      };

      videoElement.addEventListener('loadstart', handleLoadStart);

      return () => {
        videoElement.removeEventListener('loadstart', handleLoadStart);
      };
    }
  }, [currentItem, isMuted]);

  const handleItemTouch = (index) => {
    if (!optionsEnabled) return;
    setSelectedOption(index);
    
    if (index === familiarizationItems[currentItem].correctIndex) {
      setIsCorrect(true);
      setShowFeedback(true);
      setShowAnimation(true);
      setOptionsEnabled(false);

      setTimeout(() => {
        setShowAnimation(false);
        setShowFeedback(false);
        if (currentItem < familiarizationItems.length - 1) {
          setCurrentItem(prev => prev + 1);
          setIsVideoPlaying(false);
          setSelectedOption(null);
          setIsCorrect(false);
          setIsMuted(false);
          setHasVideoPlayed(false);
          setOptionsEnabled(false);
        } else {
          setShowConfirm(true);
        }
      }, 3000);
    } else {
      setIsCorrect(false);
      setOptionsEnabled(false);
      
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        setIsMuted(false);
        setIsVideoPlaying(true);
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }
    }
  };

  const handleNextItem = () => {
    if (selectedOption === null) {
      setShowSelectAlert(true);
      return;
    }

    if (currentItem < familiarizationItems.length - 1) {
      setCurrentItem(prev => prev + 1);
      setIsVideoPlaying(false);
      setSelectedOption(null);
      setIsCorrect(false);
      setIsMuted(true);
      setHasVideoPlayed(false);
      setOptionsEnabled(false);
    } else {
      setShowConfirm(true);
    }
  };

  const startTest = () => {
    setShowConfirm(false);
    navigate('/test', { state: data });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || familiarizationItems.length === 0) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button className="retry-button" onClick={fetchFamiliarizationItems}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="banner-container">
        <h1 className="banner-text">Familiarization Test</h1>
      </div>

      {familiarizationItems[currentItem] && (
        <>
          <video
            ref={videoRef}
            src={familiarizationItems[currentItem].video}
            className="fam-video"
            playsInline
            controls={true}
            muted={isMuted}
            onEnded={handleVideoEnd}
            onPlay={handleVideoPlay}
            onSeeking={handleVideoSeek}
            onPause={handleVideoPause}
            onError={(e) => {
              console.error('Video error:', e);
              setOptionsEnabled(false);
            }}
          />

          <div className="fam-image-container">
            {familiarizationItems[currentItem].images.map((img, index) => (
              <button
                key={index}
                onClick={() => handleItemTouch(index)}
                disabled={!optionsEnabled}
                className={`option 
                  ${selectedOption === index && isCorrect ? 'correct-option' : ''}
                  ${!optionsEnabled ? 'disabled-option' : ''}`}
              >
                <img
                  src={img}
                  alt={`Option ${index + 1}`}
                  className="image"
                  onError={(e) => {
                    console.error(`Error loading image for option ${index + 1}`);
                    e.target.src = 'placeholder-image-url.jpg';
                  }}
                />
              </button>
            ))}
          </div>
        </>
      )}

      {showAnimation && (
        <div className="animation-overlay" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Lottie
            options={celebrationsOptions}
            height="120%"
            width="100%"
            style={{ marginBottom: '-10%' }}
          />
        </div>
      )}

      <button
        className="next-button"
        onClick={handleNextItem}
        disabled={isVideoPlaying || !hasVideoPlayed}
      >
        Next Item
      </button>

      {showCustomAlert.visible && (
        <div className="modal-background">
          <div className="modal-container">
            <p className="modal-message">{showCustomAlert.message}</p>
            <button
              className="modal-button"
              onClick={() => {
                showCustomAlert.onConfirm();
                setShowCustomAlert({ ...showCustomAlert, visible: false });
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="modal-background">
          <div className="modal-container">
            <h2 className="modal-title">Start Test</h2>
            <p className="modal-message">You are about to start the test. Are you ready?</p>
            <div className="modal-button-container">
              <button className="modal-button" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="modal-button modal-button-start" onClick={startTest}>
                Start
              </button>
            </div>
          </div>
        </div>
      )}

      {showSelectAlert && (
        <div className="modal-background">
          <div className="modal-container">
            <h2 className="modal-title">Almost Done!</h2>
            <p className="modal-message">Just pick the correct item, and we're good to go!</p>
            <button 
              className="modal-button-single" 
              onClick={() => setShowSelectAlert(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamiliarizationScreen;