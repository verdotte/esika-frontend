/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useCallback, useMemo } from 'react';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import { useHome } from 'app/modules/Contexts/HomeContext';
import Paginate from 'app/modules/utils/helpers/paginator';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import { ExplorerCard } from './Card';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

const ExplorerPanel = () => {
  const {
    properties,
    setProperties,
    setLoading,
    categories,
    loading,
    paginationIndicators,
    onIndicatorChange,
    onFetchCategories,
  } = useHome();

  const fetchByCategory = useCallback(
    async (item?: number) => {
      setLoading(true);
      const { data } = await Service.get(
        `${ENDPOINTS.PROPERTIES}/category/${item}`,
      );
      setLoading(false);
      if (data) {
        setProperties(data.propertyList);
      }
    },
    [setLoading, setProperties],
  );

  useEffect(() => {
    fetchByCategory();
    return () => {
      fetchByCategory();
    };
  }, [fetchByCategory]);

  const { propertiesIndicator: indicator } = paginationIndicators;
  const chunks = useMemo(() => Paginate(properties, 6), [properties]);

  const onIndicatorClick = useCallback(
    (position: number) => {
      onIndicatorChange(position, 'propertiesIndicator');
    },
    [onIndicatorChange],
  );

  const EXPLORER_ICONS = {
    house: <HouseVector className="h-5 w-5 sm:h-6 sm:w-6" />,
    apartment: <ApartmentVector className="h-5 w-5 sm:h-6 sm:w-6" />,
    hotel: <HotelVector className="h-5 w-5 sm:h-6 sm:w-6" />,
    land: <HouseVector className="h-5 w-5 sm:h-6 sm:w-6" />,
    'commercial building': (
      <ApartmentVector className="h-5 w-5 sm:h-6 sm:w-6" />
    ),
    studio: <HouseVector className="h-5 w-5 sm:h-6 sm:w-6" />,
  };

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

  // console.log('categories', categories);

  return (
    <div className="my-4 px-3 md:px-0">
      <p className="font-extrabold text-4xl my-8">Explorer</p>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5">
        {categories.map((category) => (
          <ExplorerCard
            key={category.categoryId}
            title={category.title}
            onClick={() => fetchByCategory(category.categoryId)}
            icon={
              EXPLORER_ICONS[category.title.toLocaleLowerCase()] || (
                <HotelVector />
              )
            }
          />
        ))}
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
export default ExplorerPanel;
