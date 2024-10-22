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
  const [isMuted, setIsMuted] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [familiarizationItems, setFamiliarizationItems] = useState([]);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const APP_ID = 'E9332BC5-C922-4110-BB95-C9D84866DB8F';
  const API_KEY = '323C0F02-71BF-4134-BD72-7A037B8C64C6';

  const celebrationsOptions = {
    loop: false,
    autoplay: true,
    animationData: celebrationsAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMax slice'
    }
  };

  const parseBackendlessData = (item) => {
    try {
      // Handle images string that can contain multiple URLs
      let images = [];
      if (typeof item.images === 'string') {
        // Remove the outer brackets and split by comma
        const cleanedString = item.images
          .replace(/^\[/, '')  // Remove leading [
          .replace(/\]$/, ''); // Remove trailing ]
        
        // Split by comma and trim each URL
        images = cleanedString
          .split(',')
          .map(url => url
            .trim()
            .replace(/^['"]/, '')  // Remove leading quotes
            .replace(/['"]$/, '')); // Remove trailing quotes
      } else if (Array.isArray(item.images)) {
        images = item.images;
      }
  
      console.log('Item:', item);
      console.log('Parsed images:', images);
  
      return {
        video: item.video || '',
        images: images.filter(url => url && url.length > 0), // Filter out empty strings
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
      console.log('Fetching familiarization items', data);
      setIsLoading(true);
      setError(null);
  
      if (!Backendless.applicationId) {
        Backendless.initApp(APP_ID, API_KEY);
      }
  
      const queryBuilder = Backendless.DataQueryBuilder.create();
      queryBuilder.setPageSize(100);
      queryBuilder.setSortBy(['created asc']); // Sort by creation date to maintain order
  
      const items = await Backendless.Data.of('FamiliarizationItems').find(queryBuilder);
      console.log('Raw items from Backendless:', items);
  
      if (!items || items.length === 0) {
        throw new Error('No familiarization items found');
      }
  
      const formattedItems = items.map(item => {
        const parsed = parseBackendlessData(item);
        console.log('Parsed item:', parsed);
        return parsed;
      });
  
      // Filter out any items with missing data
      const validItems = formattedItems.filter(item => 
        item.video && 
        Array.isArray(item.images) && 
        item.images.length > 0
      );
  
      if (validItems.length === 0) {
        throw new Error('No valid familiarization items found');
      }
  
      // Sort items: first single-image items, then multi-image items
      const sortedItems = [
        ...validItems.filter(item => item.images.length === 1),
        ...validItems.filter(item => item.images.length > 1)
      ];
  
      console.log('Final sorted items:', sortedItems);
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.muted = isMuted;
      console.log('Video loaded. Muted state:', videoRef.current.muted);

      if (isVideoPlaying) {
        console.log('Attempting to play video');
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise.then(_ => {
            console.log('Video playback started successfully');
          }).catch(error => {
            console.error("Video playback failed:", error);
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.error("Silent playback also failed:", e));
          });
        }
      }
    }
  }, [currentItem, isVideoPlaying, isMuted]);

  const handleVideoEnd = () => {
    console.log('Video ended');
    setIsVideoPlaying(false);
    setIsMuted(true);
  };


  const handleItemTouch = (index) => {
    console.log('Item touched. Index:', index);
    setSelectedOption(index);
    if (index === familiarizationItems[currentItem].correctIndex) {
      console.log('Correct option selected');
      setIsCorrect(true);
      setShowFeedback(true);
      setShowAnimation(true);
      
      // Set a timeout to move to next item after 3 seconds
      setTimeout(() => {
        setShowAnimation(false);
        setShowFeedback(false);
        // Check if there are more items
        if (currentItem < familiarizationItems.length - 1) {
          setCurrentItem(prev => prev + 1);
          setIsVideoPlaying(false);
          setSelectedOption(null);
          setIsCorrect(false);
          setIsMuted(true);
        } else {
          setShowConfirm(true);
        }
      }, 3000);
    } else {
      console.log('Incorrect option selected. Attempting to play video');
      setIsCorrect(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        setIsMuted(false);
        setIsVideoPlaying(true);
        const playPromise = videoRef.current.play();
  
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            console.log('Video playback started successfully after incorrect selection');
          }).catch(error => {
            console.error("Video playback failed after incorrect selection:", error);
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.error("Silent playback also failed after incorrect selection:", e));
          });
        }
      }
    }
  };

  const handleNextItem = () => {
    console.log('Next item button clicked');
    if (selectedOption === null) {
      setShowSelectAlert(true);
    } else if (currentItem < familiarizationItems.length - 1) {
      setCurrentItem(prev => prev + 1);
      setIsVideoPlaying(false);
      setSelectedOption(null);
      setIsCorrect(false);
      setIsMuted(true);
    } else {
      setShowConfirm(true);
    }
  };

  const startTest = () => {
    setShowConfirm(false);
    console.log('Starting test. Data:', data);
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
        <button className="retry-button" onClick={fetchFamiliarizationItems}>Retry</button>
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
            onPlay={() => console.log('Video play event triggered')}
            onPause={() => console.log('Video pause event triggered')}
            onError={(e) => console.error('Video error:', e)}
          />

          <div className="fam-image-container">
            {familiarizationItems[currentItem].images.map((img, index) => (
              <button
                key={index}
                onClick={() => handleItemTouch(index)}
                disabled={isVideoPlaying}
                className={`option ${selectedOption === index && isCorrect ? 'correct-option' : ''}`}
              >
                <img 
                  src={img} 
                  alt={`Option ${index + 1}`} 
                  className="image"
                  onError={(e) => {
                    console.error(`Error loading image for option ${index + 1}`);
                    e.target.src = 'placeholder-image-url.jpg'; // Add a placeholder image URL
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
        disabled={isVideoPlaying}
      >
        Next Item
      </button>

      {showConfirm && (
        <div className="modal-background">
          <div className="modal-container">
            <h2 className="modal-title">Start Test</h2>
            <p className="modal-message">You are about to start the test. Are you ready?</p>
            <div className="modal-button-container">
              <button className="modal-button" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="modal-button modal-button-start" onClick={startTest}>Start</button>
            </div>
          </div>
        </div>
      )}

      {showSelectAlert && (
        <div className="modal-background">
          <div className="modal-container">
            <h2 className="modal-title">Almost Done!</h2>
            <p className="modal-message">Just pick the correct item, and we're good to go!</p>
            <button className="modal-button-single" onClick={() => setShowSelectAlert(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamiliarizationScreen;