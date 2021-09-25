import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { onImageError } from 'app/modules/utils/helpers';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';
import { useSwipe } from 'app/modules/Contexts/SwipeContext';
import { HeroCarouselIndicator } from '../../Home/__modules__/HeroCarousel/Indicator';

interface Props {
  propertyImages: string | null;
  isLoading: boolean;
}

const PropertyCarousel = ({ propertyImages, isLoading }: Props) => {
  const history = useHistory();

  const images: string[] = propertyImages?.split(',') || [];

  const {
    currentIndex,
    wrapperRef,
    childrenRefElement,
    setCurrentIndex,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
  } = useSwipe();

  const appendRef = useCallback(
    (ref) => {
      if (!childrenRefElement.includes(ref)) {
        childrenRefElement.push(ref);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childrenRefElement],
  );

  const onIndicatorClick = useCallback(
    (position: number) => {
      setCurrentIndex(position);
    },
    [setCurrentIndex],
  );

  return (
    <div className="w-full relative transition-all ease-in-out flex-shrink-0">
      <div className="absolute top-[5%] z-10">
        <ShowWidget condition={!isLoading}>
          <button type="submit" onClick={() => history.push('/')}>
            <ChevronLeftVector className="h-8 w-8 text-white" />
          </button>
        </ShowWidget>
      </div>
      <div className="absolute top-[5%] right-[3%] z-10">
        <ShowWidget condition={!isLoading}>
          <HeartVector className="h-8 w-8 text-white" />
        </ShowWidget>
      </div>
      <ShowWidget
        condition={!isLoading}
        fallback={
          <div className="h-80 w-full md:rounded-lg bg-gray-200 animate-pulse" />
        }
      >
        <div
          className="h-80 w-full flex transition-all duration-700"
          ref={wrapperRef}
        >
          {images.map((image, index) => (
            <img
              ref={appendRef}
              key={index.toFixed()}
              src={image}
              alt="House on hood"
              className="w-full h-full object-cover flex-shrink-0"
              onError={onImageError}
              onTouchStart={onTouchStart}
              onTouchMove={(event) => onTouchMove(event, index)}
              onTouchEnd={(event) => onTouchEnd(event, index)}
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

        <ShowWidget condition={images.length > 1}>
          <p className="text-[1rem] text-white">
            {currentIndex + 1}/{images.length}
          </p>
        </ShowWidget>
      </div>
    </div>
  );
};

export default PropertyCarousel;
