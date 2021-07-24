/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import HeroCarousel from '../HeroCarousel';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

const HeroCarouselContainer = () => {
  const [indicator, setIndicator] = useState<number>(3);

  return (
    <div className="mt-0 md:mt-4 my-4">
      <HeroCarousel />
      <div className="my-4 mt-6 w-full flex justify-between px-3 md:px-0">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <HeroCarouselIndicator
              key={index}
              current={indicator === index}
              onClick={() => {
                setIndicator(index);
              }}
            />
          ))}
        </div>

        <p>Il ya 8 heures</p>
      </div>
    </div>
  );
};

export default HeroCarouselContainer;
