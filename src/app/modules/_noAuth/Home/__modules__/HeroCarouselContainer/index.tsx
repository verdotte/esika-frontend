/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import timeAgo from 'time-ago';
import { useHome } from 'app/modules/Contexts/HomeContext';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { useSwipe } from 'app/modules/Contexts/SwipeContext';
import HeroCarousel from '../HeroCarousel';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

const HeroCarouselContainer = () => {
  const {
    properties,
    loading,
    paginationIndicators,
    onIndicatorChange,
  } = useHome();

  const { wrapperRef, xPosition } = useSwipe();

  const { heroIndicator: indicator } = paginationIndicators;

  const trendingProperties = useMemo(
    () => properties.slice(0, 5),
    [properties],
  );

  const onIndicatorClick = useCallback(
    (position: number) => {
      onIndicatorChange(position, 'heroIndicator');
    },
    [onIndicatorChange],
  );

  useEffect(() => {
    if (
      xPosition &&
      xPosition < 0 &&
      indicator < trendingProperties.length - 1
    ) {
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
    <div className="mt-20 md:mt-4 my-4" ref={wrapperRef}>
      <div className="w-full flex overflow-x-auto no-scrollbars">
        <ShowWidget
          condition={!loading}
          fallback={
            <HeroCarousel
              preload={loading}
              data={properties[indicator]}
            />
          }
        >
          {trendingProperties.map((property) => (
            <HeroCarousel
              key={`carousel_property_${property.propertyId}`}
              data={property}
              preload={loading}
            />
          ))}
        </ShowWidget>
      </div>
      <div className="my-4 mt-6 w-full flex justify-between px-3 md:px-0">
        <ShowWidget condition={properties.length > 1}>
          <div className="flex items-center">
            {trendingProperties.map((_, index) => (
              <HeroCarouselIndicator
                key={index}
                position={index}
                current={indicator === index}
                onClick={onIndicatorClick}
              />
            ))}
          </div>
        </ShowWidget>

        <ShowWidget condition={!!properties[indicator]?.createdAt}>
          <p className="flex justify-end w-full">
            {timeAgo.ago(properties[indicator]?.createdAt)}
          </p>
        </ShowWidget>
      </div>
    </div>
  );
};

export default memo(HeroCarouselContainer);
