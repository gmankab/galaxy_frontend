import React, { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import {
  planetImageGreen,
  planetImageBlue,
  menuButtonImage,
  openedMenuImage,
  shopButtonImage,
  voiceOnImage,
  voiceOffImage,
  twitterButtonImage,
  walletButtonImage,
  giftButtonImage,
  clansButtonImage,
  autoButtonImage,
  tool1ButtonImage,
  tool2ButtonImage,
  tool3ButtonImage,
  planetHpImage,
  resourceDonatonImage,
  resourseRareImage,
} from './assets/images';
import { useOrientation } from './useOrientation';
import OrientationWarning from './OrientationWarning';
import api from './api';

const App: React.FC = () => {
  const [planetImage, setPlanetImage] = useState<string>(planetImageGreen);
  const [count, setCount] = useState<number>(0);
  const [planethp, setPlanetHp] = useState<number>(50);
  const [clicksInInterval, setClicksInInterval] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isVoiceOn, setIsVoiceOn] = useState<boolean>(true);
  const [activeTouches, setActiveTouches] = useState<Set<number>>(new Set());
  const [isPlanetClicked] = useState<boolean>(false); // Новое состояние
  const horizontalMode: number = 1; // Set to 0 for vertical mode, 1 for horizontal
  const isPortrait: boolean = useOrientation(horizontalMode);
  const saveInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    console.log('Checking Telegram WebApp...');
    if (window.Telegram && window.Telegram.WebApp) {
      console.log('Telegram WebApp found');
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      console.log('initDataUnsafe:', initDataUnsafe);
      if (initDataUnsafe && initDataUnsafe.user && initDataUnsafe.user.id) {
        setUserId(initDataUnsafe.user.id);
        console.log('User ID from Telegram:', initDataUnsafe.user.id);
      } else {
        console.log('initDataUnsafe is empty or user data is missing');
        setUserId(12345);
      }
    } else {
      console.log('Telegram WebApp not found, setting userId to 12345');
      setUserId(12345);
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchCoins(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userId !== null) {
      saveInterval.current = setInterval(() => {
        if (clicksInInterval > 0) {
          saveCoins(userId, clicksInInterval);
          setClicksInInterval(0); // Reset the interval click counter after saving
        }
      }, 10000);

      return () => {
        if (saveInterval.current) {
          clearInterval(saveInterval.current);
        }
      };
    }
  }, [userId, clicksInInterval]);

  useEffect(() => {
    const restoreHpInterval = setInterval(() => {
      setPlanetHp((prevHp) => Math.min(50, prevHp + 1));
    }, 5000);

    return () => {
      clearInterval(restoreHpInterval);
    };
  }, []);

  const fetchCoins = async (userId: number) => {
    try {
      const response = await api.get(`/coin/get?tg_id=${userId}`);
      const data = response.data;
      const coin = data.coins;
      setCount(coin);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
    }
  };

  const saveCoins = async (userId: number, clicks: number) => {
    try {
      await api.post(`/coin/add`, {
        "tg_id": userId,
        "amount": clicks
      });
      console.log(`Successfully saved ${clicks} clicks for user ${userId}`);
    } catch (error) {
      console.error('Failed to save clicks:', error);
    }
  };

  const autoClick = async (userId: number) => {
    try {
      await api.get(`/coin/autoclick?tg_id=${userId}`);
      console.log(`Autoclick run for ${userId}!`)
    } catch (error) {
      console.log('Failed to autoclick run:', error);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const newTouches = new Set(activeTouches);
    for (let i = 0; i < event.touches.length; i++) {
      newTouches.add(event.touches[i].identifier);
    }
    setActiveTouches(newTouches);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const newTouches = new Set(activeTouches);
    for (let i = 0; i < event.changedTouches.length; i++) {
      if (newTouches.has(event.changedTouches[i].identifier)) {
        handlePlanetClick();
        newTouches.delete(event.changedTouches[i].identifier);
      }
    }
    setActiveTouches(newTouches);
  };

  const handlePlanetClick = () => {
    if (planethp > 0) {
      setCount((prevCount) => prevCount + 1);
      setClicksInInterval(clicksInInterval + 1);
      setPlanetHp((prevHp) => prevHp - 1);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleVoice = () => {
    setIsVoiceOn(!isVoiceOn);
  };

  const handleAutoButtonClick = () => {
    if (userId !== null) {
      autoClick(userId);
    }
  };

  const handleChangeButtonClick = () => {
    setPlanetImage((prevImage) =>
      prevImage === planetImageGreen ? planetImageBlue : planetImageGreen
    );
  };

  return (
    <div id="app">
      {horizontalMode === 0 && !isPortrait && <OrientationWarning />}
      <div className={`menu ${isMenuOpen ? 'visible' : 'hidden'}`}>
        <img src={openedMenuImage} alt="Opened Menu" />
        <div
          className="voice-toggle"
          onClick={toggleVoice}
          style={{ backgroundImage: `url(${isVoiceOn ? voiceOnImage : voiceOffImage})` }}
        ></div>
        <div
          className="connect-twitter"
          style={{ backgroundImage: `url(${twitterButtonImage})` }}
        ></div>
        <div
          className="connect-wallet"
          style={{ backgroundImage: `url(${walletButtonImage})` }}
        ></div>
	<div className="user-id">User ID: {userId}</div>
      </div>
      <div 
        className={`menu-button ${isMenuOpen ? 'hidden' : ''}`} 
        onClick={toggleMenu} 
        style={{ backgroundImage: `url(${menuButtonImage})` }}
      ></div>
      <div 
        className="shop-button"
        style={{ backgroundImage: `url(${shopButtonImage})` }}
      ></div>
      <div 
        className="gift-button"
        style={{ backgroundImage: `url(${giftButtonImage})` }}
      ></div>
      <div 
        className="clans-button"
        style={{ backgroundImage: `url(${clansButtonImage})` }}
      ></div>
      <div
        className="tool1-button"
        style={{ backgroundImage: `url(${tool1ButtonImage})` }}
      ></div>
      <div
        className="tool2-button"
        style={{ backgroundImage: `url(${tool2ButtonImage})` }}
      ></div>
      <div
        className="tool3-button"
        style={{ backgroundImage: `url(${tool3ButtonImage})` }}
      ></div>
      <div 
        className="auto-button"
        onClick={handleAutoButtonClick}
        style={{ backgroundImage: `url(${autoButtonImage})` }}
      ></div>
      <div
        className="donation-container"
        style={{ backgroundImage: `url(${resourceDonatonImage})` }}>
        <div className="donation">{50}</div>
      </div>
      <div 
        className="counter-container"
        style={{ backgroundImage: `url(${resourseRareImage})` }}>
        <div className="counter">{count}</div>
      </div>
      <div 
        className="planet-hp-container"
        style={{ backgroundImage: `url(${planetHpImage})` }}
      >
        <div className="planet-hp">{planethp}/50</div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(planethp / 50) * 100}%` }}></div>
        </div>
      </div>
      <div
        className={`planet ${isPlanetClicked ? 'clicked' : ''}`}
        onClick={isMobile ? undefined : handlePlanetClick}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        style={{ backgroundImage: `url(${planetImage})` }}
      ></div>
      <div 
        className="test-button" 
        onClick={handleChangeButtonClick} 
        style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}
      >test</div>
    </div>
  );
};
export default App;

