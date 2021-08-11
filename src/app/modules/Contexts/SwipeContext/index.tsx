import React, {
  createContext,
  FC,
  LegacyRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ICoordinates {
  x: number | null;
  y: number | null;
}

type IDirection = 'right' | 'left' | null;

interface ISwipe {
  origin: ICoordinates;
  destination: ICoordinates;
  pressed: boolean;
  direction: IDirection;
  xPosition?: number | null;
  wrapperRef: LegacyRef<HTMLDivElement> | null;
  carouselItemsRef: (HTMLDivElement | null)[];
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
}

const defaultCtx: ISwipe = {
  origin: {
    x: 0,
    y: 0,
  },
  destination: {
    x: 0,
    y: 0,
  },
  direction: null,
  pressed: false,
  wrapperRef: null,
  carouselItemsRef: [],
  onTouchStart: () => null,
  onTouchMove: () => null,
};

export const SwipeContext =
  createContext<Partial<ISwipe>>(defaultCtx);
export const useSwipe = () => useContext(SwipeContext);

const SwipeProvider: FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const xPositionRef = useRef<number | null>(null);
  const carouselItemsRef = useRef<(HTMLDivElement | null)[]>(
    [],
  ).current;

  const [xPosition, setXPosition] = useState<number | null>(null);

  const origin = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    [],
  );
  const destination = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    [],
  );

  const onTouchStart = useCallback(
    (event: TouchEvent) => {
      origin.x = event.touches[0].clientX;
      origin.y = event.touches[0].clientY;
    },
    [origin],
  );

  /**
   * Remove the touch move event if user touch is moving in vertical position.
   * Execute swiping behavior if user touch is moving in horizontal position.
   * @author Eliezer Basubi
   * @param event TouchEvent
   * @returns
   */
  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      destination.x = event.touches[0].clientX;
      destination.y = event.touches[0].clientY;

      const dX = destination.x - origin.x;
      const dY = destination.y - origin.y;

      if (Math.abs(dY) > Math.abs(dX)) {
        wrapperRef.current?.removeEventListener(
          'touchmove',
          onTouchMove,
        );
        return;
      }
      xPositionRef.current = dX;
    },
    [destination, origin.x, origin.y],
  );

  const onTouchEnd = useCallback(() => {
    setXPosition(xPositionRef.current);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      carouselItemsRef.forEach((item, index) => {
        item?.addEventListener('touchstart', (e) => {
          console.log('X START', e.touches[0].clientX);
        });
        item?.addEventListener('touchmove', (e) => {
          const bound = item.getBoundingClientRect();

          console.log(bound);

          console.log('X MOVE', e.touches[0].clientX);
        });
      });
    }, 1000);
    // wrapperRef.current?.addEventListener('touchstart', onTouchStart);
    // wrapperRef.current?.addEventListener('touchmove', onTouchMove);
    // wrapperRef.current?.addEventListener('touchend', onTouchEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselItemsRef]);

  return (
    <SwipeContext.Provider
      value={{
        xPosition,
        wrapperRef,
        carouselItemsRef,
        onTouchMove,
        onTouchStart,
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};

export default SwipeProvider;
