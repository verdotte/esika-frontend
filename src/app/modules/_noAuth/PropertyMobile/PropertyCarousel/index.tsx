import React, { useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { onImageError } from 'app/modules/utils/helpers';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';
import { useSwipe } from 'app/modules/Contexts/SwipeContext';
import { useHome } from 'app/modules/Contexts/HomeContext';
import { HeroCarouselIndicator } from '../../Home/__modules__/HeroCarousel/Indicator';

interface Props {
  propertyImages: string | null;
  isLoading: boolean;
}

const PropertyCarousel = ({ propertyImages, isLoading }: Props) => {
  const history = useHistory();

  const { paginationIndicators, onIndicatorChange } = useHome();

  const images: string[] = propertyImages?.split(',') || [];

  const {
    currentIndex,
    xPosition,
    setCurrentIndex,
    setCurrentPosition,
    wrapperRef,
    childrenRefElement,
  } = useSwipe();

  const { heroIndicator: indicator } = paginationIndicators;

  const onIndicatorClick = useCallback(
    (position: number) => {
      if (wrapperRef && wrapperRef.current) {
        console.log('wrapperWidth');
        setCurrentIndex(position);
        setCurrentPosition(
          position * wrapperRef.current.getBoundingClientRect().width,
        );
      }
    },
    [setCurrentIndex, setCurrentPosition],
  );

  useEffect(() => {
    if (xPosition && xPosition < 0) {
      let swipeIndicator = 0;
      if (indicator === images.length - 1) {
        swipeIndicator = 0;
        setCurrentIndex(0);
      } else {
        swipeIndicator = indicator + 1;
        setCurrentIndex(indicator + 1);
      }
      onIndicatorChange(swipeIndicator, 'heroIndicator');
      return;
    }

    if (xPosition && xPosition > 0 && indicator > 0) {
      const swipeIndicator = indicator - 1;
      setCurrentIndex(indicator - 1);
      onIndicatorChange(swipeIndicator, 'heroIndicator');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xPosition]);

  if (indicator === images.length - 1) {
    console.log('Last Image !!!');
  }

  console.log('currentIndex', currentIndex);

  // const imageElement = useMemo(() => {
  //   images.map((image, index) => (
  //     <img
  //       ref={(element) => {
  //         // if (childrenRefElement && childrenRefElement[index]) {
  //         childrenRefElement[index] = element;
  //         return childrenRefElement[index];
  //         // }
  //         // return element;
  //       }}
  //       key={index.toFixed()}
  //       src={image}
  //       alt="House on hood"
  //       className="w-full h-full object-cover"
  //       onError={onImageError}
  //     />
  //   ));
  // }, [childrenRefElement, images]);

  // const slidesToScroll = 1;
  // const slidesVisible = 1;

  // const ratio = images.length / slidesVisible;

  // const carouselWrapperWidth = ratio * 100;

  return (
    <div className="w-full relative transition-all ease-in-out flex-shrink-0">
      <div className="absolute top-[5%]">
        <button
          type="submit"
          onClick={() => {
            return history.push('/');
          }}
        >
          <ChevronLeftVector className="h-8 w-8 text-white" />
        </button>
      </div>
      <div className="absolute top-[5%] right-[3%]">
        <HeartVector className="h-8 w-8 text-white" />
      </div>
      <ShowWidget
        condition={!isLoading}
        fallback={
          <div className="h-80 md:h-[35rem] w-full md:rounded-lg bg-gray-200 animate-pulse" />
        }
      >
        <div
          className="h-80 md:h-[35rem] w-full flex transition-all"
          ref={wrapperRef}
        >
          {images.map((image, index) => (
            <img
              ref={(element) => {
                // if (childrenRefElement && childrenRefElement[index]) {
                childrenRefElement[index] = element;
                return childrenRefElement[index];
                // }
                // return element;
              }}
              key={index.toFixed()}
              src={image}
              alt="House on hood"
              className="w-full h-full object-cover flex-shrink-0"
              onError={onImageError}
            />
          ))}
        </div>
      </ShowWidget>
      <div
        className={`w-full p-3 md:p-6 absolute bottom-0 flex justify-between items-center ${
          images.length > 1
            ? 'bg-gradient-to-b from-black/10 to-black/50'
            : ''
        } `}
      >
        <div className="">
          <ShowWidget condition={images.length > 1}>
            <div className="flex items-center">
              {images.map((_, index: number) => (
                <HeroCarouselIndicator
                  key={index.toFixed()}
                  className="h-3 border border-white rounded-full mr-3"
                  currentStyle="w-12 bg-white"
                  position={index}
                  current={currentIndex === index}
                  onClick={onIndicatorClick}
                />
              ))}
            </div>
          </ShowWidget>
        </div>

        <div className="">
          <ShowWidget condition={images.length > 1}>
            <p className="text-[1rem] text-white">
              {currentIndex + 1}/{images.length}
            </p>
          </ShowWidget>
        </div>
      </div>
    </div>
  );
};

export default PropertyCarousel;
