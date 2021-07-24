/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import { ExplorerCard } from './Card';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

export const ExplorerPanel = () => {
  return (
    <div className="my-4 px-3 md:px-0">
      <p className="font-extrabold text-4xl my-8">Explorer</p>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-12">
        <ExplorerCard current icon={<HouseVector />} />
        <ExplorerCard title="Hotel" icon={<HotelVector />} />
        <ExplorerCard title="Apartment" icon={<ApartmentVector />} />
      </div>

      <div className="w-full flex flex-col sm:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 gap-5 lg:gap-x-12 my-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <PropertyCard key={index} />
        ))}
      </div>

      <div className="w-full flex justify-end">
        {Array.from({ length: 4 }).map((_, index) => (
          <HeroCarouselIndicator
            key={index}
            current={index === 2}
            defaultStyle="w-4"
            currentStyle="w-10 bg-brand-bold"
            className="h-4 border border-brand-bold rounded-full mr-3"
            onClick={() => null}
          />
        ))}
      </div>
    </div>
  );
};
