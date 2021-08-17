/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useCallback, useMemo } from 'react';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';
import { useHome } from 'app/modules/Contexts/HomeContext';
import Paginate from 'app/modules/utils/helpers/paginator';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import NotFound from 'app/modules/__modules__/NotFoundProperty';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';
import PropertyCategory from './PropertyCategory';

const ExplorerPanel = () => {
  const {
    properties,
    categories,
    loading,
    paginationIndicators,
    onIndicatorChange,
    onFetchCategories,
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
      chunks[indicator].map((property) => (
        <PropertyCard
          data={property}
          key={`property_${property.propertyId}`}
        />
      ))
    );
  }, [chunks, loading, indicator]);

  useEffect(() => {
    if (!categories.length) {
      onFetchCategories();
    }
    return () => {
      onFetchCategories();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchCategories]);

  return (
    <div className="my-4 px-3 md:px-0">
      <p className="font-extrabold text-4xl my-8">Explorer</p>

      <PropertyCategory />

      {/* className={`w-4/6 h-full top-0 ${
          menu ? 'left-0' : 'left-[-100%]'
        } bg-white fixed z-40 sm:hidden transition-all duration-700`} */}

      <div
        className={`w-full min-h-${
          !loading && !chunks[indicator] ? '[350px]' : '[500px]'
        }`}
      >
        <div className="w-full grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 gap-5 lg:gap-12 my-8">
          {renderProperties()}
        </div>
        <ShowWidget condition={!loading && !chunks[indicator]}>
          <NotFound />
        </ShowWidget>
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
export default ExplorerPanel;
