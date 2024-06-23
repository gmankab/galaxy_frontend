import { useCallback, useEffect, useState } from 'react';

const defaultOrientation = { angle: 0, type: 'portrait-primary' };

export function useOrientation() {
  const [orientation, setOrientation] = useState(defaultOrientation);

  const updateOrientation = useCallback((orientation: ScreenOrientation) => {
    setOrientation({ angle: orientation.angle, type: orientation.type });
  }, []);

  const handleOrientationChange = useCallback((event: Event) => {
    const target = event.currentTarget as ScreenOrientation;
    updateOrientation(target);
  }, [updateOrientation]);

  useEffect(() => {
    updateOrientation(window?.screen?.orientation ?? defaultOrientation); // initial
    window.screen?.orientation?.addEventListener('change', handleOrientationChange);
    return () => window.screen?.orientation?.removeEventListener('change', handleOrientationChange);
  }, [updateOrientation, handleOrientationChange]);

  return orientation;
}
