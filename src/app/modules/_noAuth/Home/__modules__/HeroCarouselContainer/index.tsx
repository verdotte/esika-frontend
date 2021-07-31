/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback } from 'react';
import timeAgo from 'time-ago';
import { useHome } from 'app/modules/Contexts/HomeContext';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import HeroCarousel from '../HeroCarousel';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

const HeroCarouselContainer = () => {
  const {
    properties,
    loading,
    paginationIndicators,
    onIndicatorChange,
  } = useHome();
  const { heroIndicator: indicator } = paginationIndicators;

  const onIndicatorClick = useCallback(
    (position: number) => {
      onIndicatorChange(position, 'heroIndicator');
    },
    [onIndicatorChange],
  );

  return (
    <div className="mt-20 md:mt-4 my-4">
      <>
        <HeroCarousel
          data={properties[indicator]}
          preload={loading}
        />
      </>
      <div className="my-4 mt-6 w-full flex justify-between px-3 md:px-0">
        <ShowWidget condition={properties.length > 1}>
          <div className="flex items-center">
            {properties.slice(0, 5).map((_, index) => (
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
