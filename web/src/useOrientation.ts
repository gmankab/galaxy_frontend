import { useEffect, useState } from 'react';

export const useOrientation = (horizontalMode: number) => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  const checkOrientation = () => {
    if (horizontalMode === 0) {
      setIsPortrait(window.innerHeight > window.innerWidth);
    } else {
      setIsPortrait(true); // Если горизонтальный режим включен, всегда считаем, что портретный режим
    }
  };

  useEffect(() => {
    window.addEventListener('resize', checkOrientation);
    checkOrientation(); // Initial check

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, [horizontalMode]);

  return isPortrait;
};
