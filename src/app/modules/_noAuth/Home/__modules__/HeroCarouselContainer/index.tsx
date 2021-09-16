/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback } from 'react';
import timeAgo from 'time-ago';
import { useHome } from 'app/modules/Contexts/HomeContext';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { useSwipe } from 'app/modules/Contexts/SwipeContext';
import HeroCarousel from '../HeroCarousel';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

const HeroCarouselContainer = () => {
  const { allProperties, loading } = useHome();

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

  const trendingProperties = useCallback(() => {
    if (loading && !allProperties.length) {
      return (
        <HeroCarousel
          data={{}}
          preload={loading && !allProperties.length}
        />
      );
    }
    return allProperties.slice(0, 5).map((property, index) => (
      <div
        ref={appendRef}
        key={index.toFixed()}
        className="w-full h-full flex-shrink-0"
        onTouchStart={onTouchStart}
        onTouchMove={(event) => onTouchMove(event, index)}
        onTouchEnd={(event) => onTouchEnd(event, index)}
      >
        <HeroCarousel
          data={property}
          preload={loading && !allProperties.length}
        />
      </div>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProperties, loading]);

  return (
    <div className="mt-[4.5rem] md:mt-4 my-4 overflow-hidden">
      <div
        className="w-full flex transition-all duration-700"
        ref={wrapperRef}
      >
        {trendingProperties()}
      </div>

      <div className="my-4 mt-6 w-full flex justify-between px-3 md:px-0">
        <ShowWidget condition={allProperties.length > 1}>
          <div className="flex items-center">
            {allProperties.slice(0, 5).map((_, index) => (
              <HeroCarouselIndicator
                key={index}
                position={index}
                current={currentIndex === index}
                onClick={onIndicatorClick}
              />
            ))}
          </div>
        </ShowWidget>

        <ShowWidget
          condition={!!allProperties[currentIndex]?.createdAt}
        >
          <p className="flex justify-end w-full">
            {timeAgo.ago(allProperties[currentIndex]?.createdAt)}
          </p>
        </ShowWidget>
      </div>
    </div>
  );
};

export default memo(HeroCarouselContainer);
