import React, { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import planetImage from './assets/planet/green.svg';
import menuButtonImage from './assets/buttons/menu_button.svg';
import openedMenuImage from './assets/opened_menu.svg';
import shopButtonImage from './assets/buttons/shop_button.svg';
import voiceOnImage from './assets/buttons/voice_on.svg';
import voiceOffImage from './assets/buttons/voice_off.svg';
import twitterButtonImage from './assets/buttons/connct_x.svg';
import walletButtonImage from './assets/buttons/connect_wallet.svg';
import giftButtonImage from './assets/buttons/gift_button.svg';
import clansButtonImage from './assets/buttons/clans_button.svg';
import autoButtonImage from './assets/buttons/auto_button.svg'
import { useOrientation } from './useOrientation';
import OrientationWarning from './OrientationWarning';
import api from './api';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [clicksInInterval, setClicksInInterval] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isVoiceOn, setIsVoiceOn] = useState<boolean>(true);
  const [isPlanetClicked, setIsPlanetClicked] = useState<boolean>(false); // Новое состояние
  const horizontalMode: number = 1; // Set to 0 for vertical mode, 1 for horizontal
  const isPortrait: boolean = useOrientation(horizontalMode);
  const saveInterval = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const handlePlanetClick = () => {
    setCount(count + 1);
    setClicksInInterval(clicksInInterval + 1);
    setIsPlanetClicked(true);
    setTimeout(() => {
      setIsPlanetClicked(false);
    }, 300); // Animation duration in milliseconds
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleVoice = () => {
    setIsVoiceOn(!isVoiceOn);
  };

  return (
    <div id="app">
      {horizontalMode === 0 && !isPortrait && <OrientationWarning />}
      {isMenuOpen && (
        <div className="menu">
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
        </div>
      )}
      <div className="user-id">User ID: {userId}</div>
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
        className="auto-button"
	style={{ backgroundImage: `url(${autoButtonImage})` }}
      ></div>
      <div className="counter-container">
        <div className="counter">{count}</div>
      </div>
      <div
        className={`planet ${isPlanetClicked ? 'clicked' : ''}`}
        onClick={handlePlanetClick}
        style={{ backgroundImage: `url(${planetImage})` }}
      ></div>
    </div>
  );
};

export default App;

