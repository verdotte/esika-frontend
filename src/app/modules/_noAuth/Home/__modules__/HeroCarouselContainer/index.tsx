/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback } from 'react';
import timeAgo from 'time-ago';
import { useHome } from 'app/modules/Contexts/HomeContext';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { useSwipe } from 'app/modules/Contexts/SwipeContext';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';
import TrendingProperties from './TrendingProperties';

const HeroCarouselContainer = () => {
  const { allProperties } = useHome();

  const { currentIndex, wrapperRef, setCurrentIndex } = useSwipe();

  const onIndicatorClick = useCallback(
    (position: number) => {
      setCurrentIndex(position);
    },
    [setCurrentIndex],
  );

  return (
    <div className="mt-[4.5rem] md:mt-4 my-4 overflow-hidden">
      <div
        className="w-full flex transition-all duration-700"
        ref={wrapperRef}
      >
        <TrendingProperties />
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
