import { useEffect, useState } from 'react';

const useResponsive = (screen = '(max-width: 768px)') => {
  const [matches, setMatches] = useState<boolean>(false);

  const watchMedia = window.matchMedia(screen);

  const onResizeScreen = (event: MediaQueryListEvent | boolean) => {
    setMatches(typeof event === 'boolean' ? event : event.matches);
  };

  useEffect(() => {
    setMatches(watchMedia.matches);
    watchMedia.addEventListener('change', onResizeScreen);

    return () => {
      watchMedia.removeEventListener('change', onResizeScreen);
    };
  }, [watchMedia]);

  return [matches, setMatches];
};

export default useResponsive;
