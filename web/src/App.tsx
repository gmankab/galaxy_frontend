import React, { useState } from 'react';
import './styles/index.css';
import planetImage from './assets/planet/green.svg'; // Убедитесь, что путь к изображению правильный

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div id="app">
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
