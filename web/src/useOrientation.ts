import { useEffect, useState } from 'react';

export const useOrientation = (horizontalMode: number): boolean => {
  const [isPortrait, setIsPortrait] = useState<boolean>(window.innerHeight > window.innerWidth);

  const checkOrientation = () => {
    if (horizontalMode === 0) {
      setIsPortrait(window.innerHeight > window.innerWidth);
    } else {
      setIsPortrait(false); // Если горизонтальный режим включен, считаем, что это не портретный режим
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
