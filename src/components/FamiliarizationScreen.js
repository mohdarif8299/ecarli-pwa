import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'react-lottie';
import celebrationsAnimation from '../assets/animations/success_animation.json';
import './FamiliarizationScreen.css';

// Import all video assets
import babyVideo from '../assets/videos/baby.mp4';
import ballVideo from '../assets/videos/ball.mp4';
import bananaVideo from '../assets/videos/banana.mp4';
import birdVideo from '../assets/videos/bird.mp4';
import bookVideo from '../assets/videos/book.mp4';
import bubblesVideo from '../assets/videos/bubbles.mp4';

// Import all image assets
import babyImage from '../assets/images/baby.jpg';
import ballImage from '../assets/images/ball.jpg';
import bananaImage from '../assets/images/banana.jpg';
import birdImage from '../assets/images/bird.jpg';
import spoonImage from '../assets/images/spoon.jpg';
import bookImage from '../assets/images/book.jpg';
import teddyImage from '../assets/images/teddy.jpg';
import bubblesImage from '../assets/images/bubbles.jpg';

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
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const familiarizationItems = [
    { video: babyVideo, images: [babyImage], correctIndex: 0 },
    { video: ballVideo, images: [ballImage], correctIndex: 0 },
    { video: bananaVideo, images: [bananaImage], correctIndex: 0 },
    { video: birdVideo, images: [birdImage, bananaImage], correctIndex: 0 },
    { video: bookVideo, images: [spoonImage, bookImage], correctIndex: 1 },
    { video: bubblesVideo, images: [teddyImage, bubblesImage], correctIndex: 1 },
  ];

  const celebrationsOptions = {
    loop: false,
    autoplay: true,
    animationData: celebrationsAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMax slice'
    }
  };

  useEffect(() => {
    console.log('Fetching test items fam', data);
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
            // If autoplay is prevented, try to play without sound
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
      setTimeout(() => {
        setShowAnimation(false);
        setShowFeedback(false);
      }, 3000); // Hide animation and feedback after 3 seconds
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
            // If autoplay is prevented, try to play without sound
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

  return (
    <div className="container">
      <div className="banner-container">
        <h1 className="banner-text">Familiarization Test</h1>
      </div>

      <video
        ref={videoRef}
        src={familiarizationItems[currentItem].video}
        className="fam-video"
        playsInline
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
            <img src={img} alt={`Option ${index + 1}`} className="image" />
          </button>
        ))}
      </div>

      {showAnimation && (
        <div className="animation-overlay" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Lottie
            options={celebrationsOptions}
            height="120%" // Slightly taller than the container
            width="100%"
            style={{ marginBottom: '-10%' }} // Pushes the bottom of the animation below the viewport
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