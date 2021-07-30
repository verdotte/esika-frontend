/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback, useState } from 'react';
import timeAgo from 'time-ago';
import { useHome } from 'app/modules/Contexts/HomeContext';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import HeroCarousel from '../HeroCarousel';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

const HeroCarouselContainer = () => {
  const [indicator, setIndicator] = useState<number>(0);

  const { properties } = useHome();

  const onIndicatorChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const position =
        event.currentTarget.getAttribute('data-position');

      if (position) {
        setIndicator(Number(position));
      }
    },
    [],
  );

  return (
    <div className="mt-20 md:mt-4 my-4">
      <>
        <HeroCarousel data={properties[indicator]} />
      </>
      <div className="my-4 mt-6 w-full flex justify-between px-3 md:px-0">
        <div className="flex items-center">
          {properties.slice(0, 5).map((_, index) => (
            <HeroCarouselIndicator
              key={index}
              position={index}
              current={indicator === index}
              onClick={onIndicatorChange}
            />
          ))}
        </div>

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
