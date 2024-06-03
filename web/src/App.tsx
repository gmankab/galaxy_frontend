import React, { useState, useEffect } from 'react';
import './styles/index.css';
import planetImage from './assets/planet/green.svg'; // Make sure the image path is correct
import { useOrientation } from './useOrientation';
import OrientationWarning from './OrientationWarning';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const horizontalMode: number = 1; // Set to 0 for vertical mode, 1 for horizontal
  const isPortrait: boolean = useOrientation(horizontalMode);

  useEffect(() => {
    // Checking if the Telegram Web App object is available
    if (window.Telegram.WebApp) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      setUserId(initDataUnsafe.user?.id || null);
    }
  }, []);

  return (
    <div id="app">
      {horizontalMode === 0 && !isPortrait && <OrientationWarning />}
      {userId && <div className="user-id">User ID: {userId}</div>}
      <div className="counter">{count}</div>
      <div
        className="planet"
        onClick={() => setCount(count + 1)}
        style={{ backgroundImage: `url(${planetImage})` }}
      ></div>
    </div>
  );
}

export default App;
