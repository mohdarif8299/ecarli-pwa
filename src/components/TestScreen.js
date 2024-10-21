import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, useBeforeUnload,useBlocker } from 'react-router-dom';
import Backendless from 'backendless';
import "./TestScreen.css";
import Lottie from 'react-lottie';
import celebrationsAnimation from '../assets/animations/success_animation.json';

const TestScreen = () => {
    const [currentItem, setCurrentItem] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isOptionEnabled, setIsOptionEnabled] = useState(false);
    const [visibleImages, setVisibleImages] = useState([]);
    const [score, setScore] = useState(new Array(20).fill(0));
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [optionsDisabled, setOptionsDisabled] = useState(false);
    const [showCustomAlert, setShowCustomAlert] = useState({ visible: false, message: '', onConfirm: () => { } });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [key, setKey] = useState(0);
    const [testItems, setTestItems] = useState([]);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const videoRef = useRef(null);

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

    const fetchTestItems = async () => {
        try {
            console.log('Fetching test items', data);
            setIsLoading(true);
            setError(null);

            if (!Backendless.applicationId) {
                Backendless.initApp(APP_ID, API_KEY);
            }

            const items = await Backendless.Data.of('TestItems').find();

            if (!items || items.length === 0) {
                throw new Error('No test items found');
            }

            const formattedItems = items.map(item => ({
                video: item.video,
                images: JSON.parse(item.images),
                correctIndex: item.correctIndex,
            }));

            setTestItems(formattedItems);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching test items:', error);
            setError('Failed to load test items. Please try again.');
            setIsLoading(false);
        }
    };

   
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    useEffect(() => {
        const unblock = navigate((nextLocation) => {
            if (nextLocation.pathname !== location.pathname) {
                setShowWarningModal(true);
                setPendingNavigation(() => () => navigate(nextLocation));
                return false;
            }
            return true;
        });

        return unblock;
    }, [navigate, location]);

    useEffect(() => {
        fetchTestItems();
    }, []);

    useEffect(() => {
        if (testItems.length > 0) {
            resetItemState();
        }
    }, [currentItem, testItems]);

   

    const handleVideoEnd = () => {
        console.log('Video ended');
        setIsVideoPlaying(false);
        setIsOptionEnabled(true);
    };

    const handleNextItem = () => {
        setShowFeedback(false);
        proceedToNextItem();
    };

    const proceedToNextItem = () => {
        if (currentItem < testItems.length - 1) {
            setCurrentItem(currentItem + 1);
        } else {
            endTesting();
        }
    };

    const resetItemState = () => {
        setAttempts(0);
        setIsOptionEnabled(false);
        setIsVideoPlaying(true);
        setVisibleImages([...Array(testItems[currentItem]?.images.length).keys()]);
        setSelectedOption(null);
        setIsCorrect(false);
        setOptionsDisabled(false);
        setKey(prevKey => prevKey + 1);
    };

    const saveScoreToBackendless = async (finalScore) => {
        try {
            const currentDate = new Date();
            const assessmentData = {
                childReference: data.childReference,
                assessor: data.assessor,
                date: currentDate.toISOString().split('T')[0],
                time: currentDate.toTimeString().split(' ')[0],
                ...finalScore.reduce((acc, score, index) => {
                    acc[`scoreItem${index + 1}`] = score;
                    return acc;
                }, {}),
                totalScore: finalScore.reduce((a, b) => a + b, 0),
            };

            await Backendless.Data.of('Assessments').save(assessmentData);
            console.log('Assessment data saved successfully', assessmentData);

        } catch (error) {
            console.error('Error saving assessment data:', error);
            throw error;
        }
    };

    const handleItemTouch = (index) => {
        console.log('Item touched. Index:', index);
        console.log('isOptionEnabled:', isOptionEnabled);
        console.log('optionsDisabled:', optionsDisabled);

        if (!isOptionEnabled || optionsDisabled) {
            console.log('Options are not enabled or are disabled');
            return;
        }

        setSelectedOption(index);

        if (index === testItems[currentItem].correctIndex) {
            console.log('Correct answer selected');
            handleCorrectAnswer();
        } else {
            console.log('Incorrect answer selected');
            handleIncorrectAnswer(index);
        }
    };

    const handleCorrectAnswer = () => {
        console.log('Feedback Check');
        setIsCorrect(true);
        setShowFeedback(true);
        setOptionsDisabled(true);

        const newScore = [...score];
        newScore[currentItem] = 3 - attempts;
        setScore(newScore);

        setTimeout(() => {
            handleNextItem();
        }, 3000);
    };

    const handleIncorrectAnswer = (index) => {
        setIsCorrect(false);
        setAttempts(prevAttempts => prevAttempts + 1);

        if (attempts === 0) {
            replayVideo();
        } else {
            const newVisibleImages = visibleImages.filter(imgIndex =>
                imgIndex === testItems[currentItem].correctIndex || imgIndex !== index
            );
            setVisibleImages(newVisibleImages);
            replayVideo();
        }
    };

    const replayVideo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
        setIsVideoPlaying(true);
        setIsOptionEnabled(false);
        setSelectedOption(null);
    };

    const endTesting = async () => {
        try {
            await saveScoreToBackendless(score);
            setShowCustomAlert({
                visible: true,
                message: 'Test completed and data saved successfully!',
                onConfirm: () => navigate('/'),
            });
        } catch (error) {
            console.error('Error saving final assessment data:', error);
            setShowCustomAlert({
                visible: true,
                message: 'Error saving data. Please try again.',
                onConfirm: () => setShowCustomAlert({ ...showCustomAlert, visible: false }),
            });
        }
    };

    const handleTesterButton = (action) => {
        if (selectedOption === null && action !== 'endTesting') {
            setShowCustomAlert({
                visible: true,
                message: 'Please select an option before proceeding.',
                onConfirm: () => setShowCustomAlert({ ...showCustomAlert, visible: false }),
            });
            return;
        }

        switch (action) {
            case 'nextPrompt':
                replayVideo();
                break;
            case 'nextItem':
                handleNextItem();
                break;
            case 'endTesting':
                if (currentItem === testItems.length - 1 || score.some(s => s > 0)) {
                    endTesting();
                } else {
                    setShowCustomAlert({
                        visible: true,
                        message: 'Please complete at least one item before ending the test.',
                        onConfirm: () => setShowCustomAlert({ ...showCustomAlert, visible: false }),
                    });
                }
                break;
        }
    };


    const handleLeavePage = () => {
        setShowWarningModal(false);
        if (pendingNavigation) {
            pendingNavigation();
        } else {
            navigate('/'); // Navigate to the desired route
        }
    };

    const handleStayOnPage = () => {
        setShowWarningModal(false);
        setPendingNavigation(null);
    };


    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error || testItems.length === 0) {
        return (
            <div className="error-container">
                <p className="error-text">{error}</p>
                <button className="retry-button" onClick={fetchTestItems}>Retry</button>
            </div>
        );
    }

    return (
        <div className="test-screen">
            <div className="banner">
                <h1>Test</h1>
            </div>

            {testItems[currentItem] && (
                <>
                    <div className="video-container">
                        <video
                            ref={videoRef}
                            key={key}
                            src={testItems[currentItem].video}
                            className="video"
                            controls={false}
                            onEnded={handleVideoEnd}
                            onLoadStart={() => {
                                console.log('Video started loading');
                                setIsVideoPlaying(true);
                                setIsOptionEnabled(false);
                            }}
                            autoPlay
                        />
                    </div>

                    <div className="image-container">
                        {testItems[currentItem].images.map((img, index) => visibleImages.includes(index) && (
                            <div
                                key={index}
                                className={`image-wrapper ${selectedOption === index && isCorrect ? 'correct' : ''}`}
                            >
                                <button
                                    onClick={() => handleItemTouch(index)}
                                    disabled={!isOptionEnabled || optionsDisabled}
                                    className="image-button"
                                >
                                    <img src={img} alt={`Option ${index + 1}`} className="option-image" />
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showFeedback && (
                <div className="animation-overlay" style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Lottie
                        options={celebrationsOptions}
                        height="120%"
                        width="100%"
                        style={{ marginBottom: '-10%' }}
                    />
                </div>
            )}

            <div className="tester-buttons-container">
                <button className="tester-button" onClick={() => handleTesterButton('nextPrompt')}>
                    NEXT PROMPT
                </button>
                <button className="tester-button" onClick={() => handleTesterButton('nextItem')}>
                    NEXT ITEM
                </button>
                <button className="tester-button" onClick={() => handleTesterButton('endTesting')}>
                    END TESTING
                </button>
            </div>

            {showWarningModal && (
                <div className="modal-background">
                    <div className="modal-container">
                        <p className="modal-message">Your data might be lost if you leave this page. Are you sure you want to continue?</p>
                        <div className="modal-buttons">
                            <button className="modal-button" onClick={handleLeavePage}>Yes, leave</button>
                            <button className="modal-button" onClick={handleStayOnPage}>Stay on this page</button>
                        </div>
                    </div>
                </div>
            )}

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
        </div>
    );
};

export default TestScreen;