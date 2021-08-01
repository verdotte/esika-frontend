/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useMemo } from 'react';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import { useHome } from 'app/modules/Contexts/HomeContext';
import Paginate from 'app/modules/utils/helpers/paginator';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { ExplorerCard } from './Card';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

export const ExplorerPanel = () => {
  const {
    properties,
    loading,
    paginationIndicators,
    onIndicatorChange,
  } = useHome();

  const { propertiesIndicator: indicator } = paginationIndicators;
  const chunks = useMemo(() => Paginate(properties, 6), [properties]);

  const onIndicatorClick = useCallback(
    (position: number) => {
      onIndicatorChange(position, 'propertiesIndicator');
    },
    [onIndicatorChange],
  );

  const renderProperties = useCallback(() => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <PropertyCard key={index} preload={loading} />
      ));
    }
    return (
      chunks[indicator] &&
      chunks[indicator].map((property, index) => (
        <PropertyCard
          data={property}
          key={`property_${property.property_id}_${index}`}
        />
      ))
    );
  }, [chunks, loading, indicator]);

  return (
    <div className="my-4 px-3 md:px-0">
      <p className="font-extrabold text-4xl my-8">Explorer</p>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-12">
        <ExplorerCard current icon={<HouseVector />} />
        <ExplorerCard title="Hotel" icon={<HotelVector />} />
        <ExplorerCard title="Apartment" icon={<ApartmentVector />} />
      </div>

      <div className="w-full min-h-[500px]">
        <div className="w-full flex flex-col sm:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 gap-5 lg:gap-12 my-8">
          {renderProperties()}
        </div>
      </div>

      <ShowWidget condition={chunks.length > 1}>
        <div className="w-full flex justify-end">
          {chunks.map((_, index) => (
            <HeroCarouselIndicator
              key={index}
              current={indicator === index}
              position={index}
              defaultStyle="w-4"
              currentStyle="w-10 bg-brand-bold"
              className="h-4 border border-brand-bold rounded-full mr-3"
              onClick={onIndicatorClick}
            />
          ))}
        </div>
      </ShowWidget>
    </div>
  );
};
