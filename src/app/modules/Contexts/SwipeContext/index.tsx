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
import { ITouchEvent, SetStateType } from 'app/modules/@Types';

type Ttouch = ITouchEvent<HTMLImageElement>;

interface ISwipe {
  xPosition?: number | null;
  currentIndex: number;
  wrapperRef: LegacyRef<HTMLDivElement> | null;
  childrenRefElement: (HTMLImageElement | null)[];
  setCurrentIndex: SetStateType<number>;
  onTouchStart: (event: Ttouch) => void;
  onTouchMove: (event: Ttouch, index: number) => void;
  onTouchEnd: (event: Ttouch, index: number) => void;
}

const defaultCtx: ISwipe = {
  wrapperRef: null,
  currentIndex: 0,
  childrenRefElement: [],
  setCurrentIndex: () => null,
  onTouchStart: () => null,
  onTouchMove: () => null,
  onTouchEnd: () => null,
};

export const SwipeContext = createContext<ISwipe>(defaultCtx);
export const useSwipe = () => useContext(SwipeContext);

const SwipeProvider: FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const childrenRefElement = useRef<(HTMLImageElement | null)[]>(
    [],
  ).current;
  const xPositionRef = useRef<number | null>(0);

  const [xPosition, setXPosition] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef<number>(0);
  const prevXPosition = useRef<number>(0);

  const wrapperWidth =
    wrapperRef.current?.getBoundingClientRect().width ||
    window.innerWidth;

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
    (event: Ttouch) => {
      origin.x = event.touches[0].clientX;
      origin.y = event.touches[0].clientY;

      movementRef.current = true;

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
    (event: ITouchEvent<HTMLImageElement>, index: number) => {
      if (!movementRef.current) return;

      destination.x = event.touches[0].clientX;
      destination.y = event.touches[0].clientY;

      const dX = destination.x - origin.x;
      const dY = destination.y - origin.y;

      xPositionRef.current = dX;

      if (Math.abs(dY) > Math.abs(dX)) {
        wrapperRef.current?.removeEventListener(
          'touchmove',
          (event) => onTouchMove(event as unknown as Ttouch, index),
        );
        return;
      }

      if (wrapperRef.current) {
        wrapperRef.current.style.position = 'relative';

        prevXPosition.current = destination.x - startX.current;

        wrapperRef.current.style.left = `${prevXPosition.current}px`;
      }
    },
    [destination, origin.x, origin.y],
  );

  const onTouchEnd = useCallback(
    (event: Ttouch, index: number) => {
      movementRef.current = false;
      setXPosition(xPositionRef.current);

      const dX = destination.x - origin.x;
      let indicator = 0;
      const lastIndex = childrenRefElement.length - 1;

      if (wrapperRef.current) {
        if (Math.abs(dX / wrapperWidth) > 0.2) {
          if (dX < 0) {
            // REVERT TO THE FIRST ITEM IF THE CURRENT ITEM IS THE LAST ONE
            if (index === lastIndex) {
              // wrapperRef.current.style.transitionDuration = '1s';
              wrapperRef.current.style.left = `0px`;
              setCurrentIndex(0);
              return;
            }

            indicator = index + 1;

            wrapperRef.current.style.left = `-${
              wrapperWidth * indicator
            }px`;
          } else {
            // REVERT TO THE LAST ITEM IF THE CURRENT ITEM IS THE FIRST ONE
            if (index === 0) {
              wrapperRef.current.style.transitionDuration = '1s';
              wrapperRef.current.style.left = `-${
                wrapperWidth * lastIndex
              }px`;
              setCurrentIndex(lastIndex);
              return;
            }

            indicator = index - 1;
            wrapperRef.current.style.left = `-${
              wrapperWidth * indicator
            }px`;
          }
          if (indicator >= 0 && indicator < childrenRefElement.length)
            setCurrentIndex(indicator);
        } else {
          wrapperRef.current.style.left = `-${
            wrapperWidth * index
          }px`;
        }
      }
    },
    [
      childrenRefElement.length,
      destination.x,
      origin.x,
      wrapperWidth,
    ],
  );

  useEffect(() => {
    if (wrapperRef.current) {
      const { width } = wrapperRef.current.getBoundingClientRect();
      wrapperRef.current.style.position = 'relative';
      wrapperRef.current.style.left = `-${width * currentIndex}px`;
    }
  }, [currentIndex]);

  return (
    <SwipeContext.Provider
      value={{
        currentIndex,
        xPosition,
        wrapperRef,
        childrenRefElement,
        setCurrentIndex,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};

export default SwipeProvider;
