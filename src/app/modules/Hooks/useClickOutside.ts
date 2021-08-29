import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = (callback) => {
  const currentRef = useRef<HTMLDivElement>(null);

  const checkParent = (t, elm) => {
    while (t.parentNode) {
      if (t === elm) {
        return true;
      }
      t = t.parentNode;
    }
    return false;
  };

  const check = useCallback(
    (e) => {
      const target = (e && e.target) || (e && e.srcElement);

      if (!checkParent(target, currentRef.current)) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener('click', check, true);

    return () => {
      document.removeEventListener('click', check, true);
    };
  }, [check]);

  return currentRef;
};

export default useClickOutside;
