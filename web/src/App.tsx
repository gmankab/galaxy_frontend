import React, { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import planetImage from './assets/planet/green.svg';
import menuButtonImage from './assets/menu_button.svg';
import openedMenuImage from './assets/opened_menu.svg';
import { useOrientation } from './useOrientation';
import OrientationWarning from './OrientationWarning';
import api from './api'; // Импортируем нашу утилиту

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [clicksInInterval, setClicksInInterval] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
      const response = await api.post(`/coin/add`, {
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
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div id="app">
      {horizontalMode === 0 && !isPortrait && <OrientationWarning />}
      {isMenuOpen && (
        <div className="menu">
          <img src={openedMenuImage} alt="Opened Menu" />
          <div className="user-id">User ID: {userId}</div>
        </div>
      )}
      <div 
        className={`menu-button ${isMenuOpen ? 'hidden' : ''}`} 
        onClick={toggleMenu} 
        style={{ backgroundImage: `url(${menuButtonImage})` }}
      ></div> 
      <div className="counter-container">
        <div className="counter">{count}</div>
      </div>
      <div
        className="planet"
        onClick={handlePlanetClick}
        style={{ backgroundImage: `url(${planetImage})` }}
      ></div>
    </div>
  );
};

export default App;

