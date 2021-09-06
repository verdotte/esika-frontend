import React, { useEffect, useCallback } from 'react';
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

  const { xPosition } = useSwipe();

  const { heroIndicator: indicator } = paginationIndicators;

  const onIndicatorClick = useCallback(
    (position: number) => {
      onIndicatorChange(position, 'heroIndicator');
    },
    [onIndicatorChange],
  );

  useEffect(() => {
    if (xPosition && xPosition < 0 && indicator < images.length - 1) {
      const swipeIndicator = indicator + 1;
      onIndicatorChange(swipeIndicator, 'heroIndicator');
      return;
    }

    if (xPosition && xPosition > 0 && indicator > 0) {
      const swipeIndicator = indicator - 1;
      onIndicatorChange(swipeIndicator, 'heroIndicator');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xPosition]);

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
          <div className="h-[20rem] w-full md:rounded-lg bg-gray-200 animate-pulse" />
        }
      >
        <img
          src={images[indicator]}
          alt="House on hood"
          className="w-full h-full object-cover"
          onError={onImageError}
        />
      </ShowWidget>
      <div className="w-full absolute bottom-[5%] left-[3%]">
        <ShowWidget condition={images.length > 1}>
          <div className="flex items-center">
            {images.map((_, index: number) => (
              <HeroCarouselIndicator
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="h-3 border border-white rounded-full mr-3"
                currentStyle="w-12 bg-white"
                position={index}
                current={indicator === index}
                onClick={onIndicatorClick}
              />
            ))}
          </div>
        </ShowWidget>
      </div>

      <div className="absolute bottom-[5%] right-[3%]">
        <ShowWidget condition={images.length > 1}>
          <p className="text-[1rem] text-white">
            {indicator + 1}/{images.length}
          </p>
        </ShowWidget>
      </div>
    </div>
  );
};

export default PropertyCarousel;
