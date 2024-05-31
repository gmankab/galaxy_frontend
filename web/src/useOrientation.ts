
import { useEffect, useState } from 'react';

export const useOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  const checkOrientation = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', checkOrientation);
    checkOrientation(); // Initial check

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  return isPortrait;
};
