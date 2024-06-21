import React, { useState, useEffect, useRef } from 'react';
import { autoButtonImage } from '../assets/images';
import api from '../api';

interface AutoButtonProps {
  userId: number | null;
  handlePlanetClick: () => void;
  planethp: number;
}

const autoClick = async (userId: number) => {
  try {
    await api.get(`/coin/autoclick?tg_id=${userId}`);
    console.log(`Autoclick run for ${userId}!`);
  } catch (error) {
    console.log('Failed to autoclick run:', error);
  }
};

const handleAutoButtonClick = (
  userId: number | null,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  handlePlanetClick: () => void,
  intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>,
  planethp: number
) => {
  if (userId !== null) {
    autoClick(userId);
    setIsActive((prevState) => {
      const newState = !prevState;
      if (newState && planethp > 0) {
        intervalRef.current = setInterval(handlePlanetClick, 1000);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return newState;
    });
  }
};

const AutoButton: React.FC<AutoButtonProps> = ({ userId, handlePlanetClick, planethp }) => {
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`auto-button ${isActive ? 'active' : ''}`}
      onClick={() => handleAutoButtonClick(userId, setIsActive, handlePlanetClick, intervalRef, planethp)}
      style={{ backgroundImage: `url(${autoButtonImage})` }}
    ></div>
  );
};

export default AutoButton;