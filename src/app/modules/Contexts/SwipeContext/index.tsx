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
  childrenRefElement: HTMLImageElement[] | null;
  onTouchStart: (event: TouchEvent, index: number) => void;
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
  childrenRefElement: null,
  onTouchStart: () => null,
  onTouchMove: () => null,
};

export const SwipeContext =
  createContext<Partial<ISwipe>>(defaultCtx);
export const useSwipe = () => useContext(SwipeContext);

const SwipeProvider: FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const childrenRefElement = useRef<HTMLImageElement[] | null>(
    [],
  ).current;
  const xPositionRef = useRef<number | null>(null);

  const [xPosition, setXPosition] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const prevXPosition = useRef(0);

  const movementRef = useRef(false);

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
    (event: TouchEvent, index: number) => {
      origin.x = event.touches[0].clientX;
      origin.y = event.touches[0].clientY;

      movementRef.current = true;
      setCurrentIndex(index);
      if (wrapperRef.current) {
        startX.current = origin.x - wrapperRef.current?.offsetLeft;
      }
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
    (event: TouchEvent, index: number) => {
      if (!movementRef.current) return;

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

      console.log('index', index);

      if (wrapperRef.current) {
        const wrapperWidth =
          wrapperRef.current?.getBoundingClientRect().width;

        wrapperRef.current.style.position = 'relative';

        wrapperRef.current.style.left = `${
          destination.x - startX.current
        }px`;

        prevXPosition.current = destination.x - startX.current;

        if (prevXPosition.current > 10) {
          wrapperRef.current.style.left = '0px';
        }

        console.log('prevXPosition.current', prevXPosition.current);

        console.log('-wrapperWidth * index', -wrapperWidth * index);

        if (
          prevXPosition.current >
          -wrapperWidth * index
          // ||
          // currentPosition === wrapperWidth * index
        ) {
          console.log('!!!!!STOP !!!!!!');
          wrapperRef.current.style.left = `${
            -wrapperWidth * index
          }px`;
        }

        if (
          wrapperWidth - Math.abs(wrapperRef.current.offsetLeft) >=
            300 &&
          wrapperWidth - Math.abs(wrapperRef.current.offsetLeft) < 315
        ) {
          console.log(
            '<==== BOOM ====>',
            wrapperWidth - Math.abs(wrapperRef.current.offsetLeft),
          );
          wrapperRef.current.style.left = `-${
            wrapperWidth * (index + 1)
          }px`;
        }

        console.log('prevXPosition.current', prevXPosition.current);
      }
    },
    [destination, origin.x, origin.y],
  );

  const onTouchEnd = useCallback(() => {
    movementRef.current = false;
    setXPosition(xPositionRef.current);
  }, []);

  console.log('currentPosition', currentPosition);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.position = 'relative';
      wrapperRef.current.style.left = `-${currentPosition}px`;
    }
  }, [currentPosition]);

  useEffect(() => {
    // wrapperRef.current?.addEventListener('touchstart', onTouchStart);
    // wrapperRef.current?.addEventListener('touchmove', onTouchMove);
    // wrapperRef.current?.addEventListener('touchend', onTouchEnd);

    setTimeout(() => {
      childrenRefElement?.forEach((element, index) => {
        console.log('element', element);

        element.addEventListener('touchstart', (event) =>
          onTouchStart(event, index),
        );
        element.addEventListener('touchmove', (event) =>
          onTouchMove(event, index),
        );
        element.addEventListener('touchend', onTouchEnd);
      });
    }, 1500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenRefElement]);

  return (
    <SwipeContext.Provider
      value={{
        currentIndex,
        xPosition,
        wrapperRef,
        childrenRefElement,
        setCurrentIndex,
        setCurrentPosition,
        onTouchMove,
        onTouchStart,
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};

export default SwipeProvider;
