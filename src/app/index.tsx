import { TouchEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import '@/styles/index.css';
import { ClanPage } from './components/ClanPage';
import { ClansMenu } from './components/ClansMenu';
import { ClanCreate } from './components/ClanCreate';
import { SectorPicker } from "./components/SectorPicker";

import { api } from '@/api';
import { useToggle } from '@/hooks/useToggle';
import {
  autoButtonImage,
  planetHpImage,
  planetImageBlue,
  planetImageGreen,
  resourceDonatonImage,
  resourseRareImage,
  tool1ButtonImage,
  tool2ButtonImage,
  tool3ButtonImage,
  toolUpgradeButtonImage,
} from '@/assets/images';
import { useOrientation } from '@/hooks/useOrientation';
import { OrientationWarning } from '@/components/OrientationWarning';
import { Menu } from '@/components/Menu';
import { Button } from '@/components/Button';
import { IRouteContext, RouteContext } from '@/context/routeContext';

function getFromLocalStorage<T>(key: string): T {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function saveToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
};

function cacheData<T>(key: string, data: T) {
  saveToLocalStorage(key, data);
};

function checkCookies<T>(key: string, data: T) {
  if (getFromLocalStorage(key) == null) {
    console.log('Cookies are not found, creating new one');
    cacheData(key, data);
  }
};

async function saveCoins(userId: number, clicks: number) {
  try {
    await api.post(`/coin/add`, {
      tg_id: userId,
      amount: clicks,
    });
    console.log(`Successfully saved ${clicks} clicks for user ${userId}`);
  } catch (error) {
    console.error('Failed to save clicks:', error);
  }
};

async function autoClick(userId: number) {
  try {
    await api.get(`/coin/autoclick?tg_id=${userId}`);
    console.log(`Autoclick run for ${userId}!`);
  } catch (error) {
    console.log('Failed to autoclick run:', error);
  }
};

function getClicksInInterval() {
  const cache = getFromLocalStorage<{ clicksInInterval: number }>('cache');
  return cache.clicksInInterval;
};

function saveCachedCoins(userId: number) {
  const cachedClicks = getClicksInInterval();
  if (cachedClicks !== 0) {
    saveCoins(userId, cachedClicks);
    cacheData('cache', { clicksInInterval: 0 });
  }
};

export function App() {
  const { page, setPage } = useContext(RouteContext) as IRouteContext;
  const [planetImage, setPlanetImage] = useState(planetImageGreen);
  const [count, setCount] = useState(0);
  const [planethp, setPlanetHp] = useState(50);
  const [clicksInInterval, setClicksInInterval] = useState(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [isVoiceOn, toggleVoiceOn] = useToggle(true);
  const [activeTouches, setActiveTouches] = useState(new Set<number>());
  const [isPlanetClicked] = useState(false); // TODO
  const saveInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isMobile] = useState(() => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

  const orientation = useOrientation();
  const [horizontalMode, setHorizontalMode] = useState(false);

  useEffect(() => {
    switch (orientation.type) {
      case 'landscape-primary':
      case 'landscape-secondary':
        setHorizontalMode(true);
        break;
      case 'portrait-secondary':
      case 'portrait-primary':
        setHorizontalMode(false);
        break;
    }
  }, [orientation]);

  useEffect(() => {
    checkCookies('cache', { clicksInInterval: 0 });
    console.log('Checking Telegram WebApp...');
    const initDataUnsafe = Telegram?.WebApp?.initDataUnsafe;
    console.log('initDataUnsafe:', initDataUnsafe);
    if (initDataUnsafe?.user?.id) {
      setUserId(initDataUnsafe.user.id);
      console.log('User ID from Telegram:', initDataUnsafe.user.id);
    } else {
      console.log('Telegram WebApp initDataUnsafe is empty or user data is missing');
      setUserId(12345);
    }
  }, []);

  const fetchCoins = useCallback(async (userId: number) => {
    try {
      const cachedClicks = getClicksInInterval();
      const response = await api.get(`/coin/get?tg_id=${userId}`);
      const data = response.data;
      const coin = data.coins;
      setCount(coin + cachedClicks);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchCoins(userId);
      saveCachedCoins(userId);
    }
  }, [fetchCoins, userId]);

  useEffect(() => {
    if (userId !== null) {
      saveInterval.current = setInterval(() => {
        if (clicksInInterval > 0) {
          saveCoins(userId, clicksInInterval);
          setClicksInInterval(0); // Reset the interval click counter after saving
          cacheData('cache', { clicksInInterval: 0 });
        }
      }, 10000);

      return () => {
        if (saveInterval.current) {
          clearInterval(saveInterval.current);
        }
      };
    }
  }, [clicksInInterval, userId]);

  useEffect(() => {
    const restoreHpInterval = setInterval(() => {
      setPlanetHp(prevHp => Math.min(50, prevHp + 1));
    }, 5000);

    return () => {
      clearInterval(restoreHpInterval);
    };
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const newTouches = new Set(activeTouches);
    for (let i = 0; i < event.touches.length; i++) {
      newTouches.add(event.touches[i].identifier);
    }
    setActiveTouches(newTouches);
  }, [activeTouches, setActiveTouches]);

  const handlePlanetClick = () => {
    if (planethp > 0) {
      setCount(prevCount => prevCount + 1);
      setClicksInInterval(clicksInInterval + 1);
      setPlanetHp(prevHp => prevHp - 1);
      cacheData('cache', { clicksInInterval: clicksInInterval + 1 });
      const retrievedData = getFromLocalStorage('cache');
      console.log(retrievedData);
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const newTouches = new Set(activeTouches);
    for (let i = 0; i < event.changedTouches.length; i++) {
      if (newTouches.has(event.changedTouches[i].identifier)) {
        handlePlanetClick();
        newTouches.delete(event.changedTouches[i].identifier);
      }
    }
    setActiveTouches(newTouches);
  };

  const handleAutoButtonClick = () => {
    if (userId !== null) {
      autoClick(userId);
    }
  };

  const handleChangeButtonClick = () => {
    setPlanetImage(prevImage =>
      prevImage === planetImageGreen ? planetImageBlue : planetImageGreen,
    );
  };

  return (
    <>
      {horizontalMode && <OrientationWarning />}
      <Menu content={(
        <>
          <Button
            variant='menu'
            intent='voice-toggle'
            onClick={toggleVoiceOn}
            state={isVoiceOn}
          />
          <Button variant='menu' intent='connect-twitter' />
          <Button variant='menu' intent='connect-wallet' />
          <div className='user-id'>
            User ID:
            {userId}
          </div>
        </>
      )}
      />
      <Button variant='top' intent='shop' />
      <Button variant='top' intent='gift' />
      <Button
        variant='top'
        intent='clans'
        onClick={() => setPage('clans')}
      />
      <div
        className='tool1-button'
        style={{ backgroundImage: `url("${tool1ButtonImage}")` }}
      >
        <div
          className='tool1-upgrade'
          style={{ backgroundImage: `url(${toolUpgradeButtonImage})` }}
        />
      </div>
      <div
        className='tool2-button'
        style={{ backgroundImage: `url("${tool2ButtonImage}")` }}
      >
        <div
          className='tool2-upgrade'
          style={{ backgroundImage: `url(${toolUpgradeButtonImage})` }}
        />
      </div>
      <div
        className='tool3-button'
        style={{ backgroundImage: `url("${tool3ButtonImage}")` }}
      >
        <div
          className='tool3-upgrade'
          style={{ backgroundImage: `url(${toolUpgradeButtonImage})` }}
        />
      </div>
      <div
        className='auto-button'
        onClick={handleAutoButtonClick}
        style={{ backgroundImage: `url("${autoButtonImage}")` }}
      />
      <div
        className='donation-container'
        style={{ backgroundImage: `url("${resourceDonatonImage}")` }}
      >
        <div className='donation'>{50}</div>
      </div>
      <div
        className='counter-container'
        style={{ backgroundImage: `url("${resourseRareImage}")` }}
      >
        <div className='counter'>{count}</div>
      </div>
      <div
        className='planet-hp-container'
        style={{ backgroundImage: `url("${planetHpImage}")` }}
      >
        <div className='planet-hp'>
          {planethp}
          /50
        </div>
        <div className='progress-bar-container'>
          <div className='progress-bar' style={{ width: `${(planethp / 50) * 100}%` }}></div>
        </div>
      </div>
      <div
        className={`planet ${isPlanetClicked ? 'clicked' : ''}`}
        onClick={isMobile ? undefined : handlePlanetClick}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        style={{ backgroundImage: `url("${planetImage}")` }}
      >
      </div>
      <div
        className='test-button'
        onClick={handleChangeButtonClick}
        style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}
      >
        test
      </div>
      {page === 'clan' && <ClanPage />}
      {page === 'clans' && <ClansMenu />}
      {page === 'clan_create' && <ClanCreate />}
      {page==='sector'&&<SectorPicker/>}
      
      {/* <Menu/> */}
    </>
  );
};
