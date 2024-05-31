import React, { useState } from 'react';
import './styles/index.css';
import planetImage from './assets/planet/green.svg'; // Убедитесь, что путь к изображению правильный
import { useOrientation } from './useOrientation';
import OrientationWarning from './OrientationWarning';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const horizontalMode = 1; // Установите 0 для вертикального режима, 1 для горизонтального
  const isPortrait = useOrientation(horizontalMode);

  return (
    <div id="app">
      {!isPortrait && horizontalMode === 0 && <OrientationWarning />}
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
