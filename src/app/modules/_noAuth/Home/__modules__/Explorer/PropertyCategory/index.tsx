import React, { useEffect, useCallback } from 'react';
import { useHome } from 'app/modules/Contexts/HomeContext';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import { ExplorerCard } from '../Card';

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

const PropertyCategory = () => {
  const {
    currentCategory,
    categories,
    loading,
    allProperties,
    setProperties,
    setLoading,
    setCurrentCategory,
    onFetchCategories,
  } = useHome();

  const fetchAllProperties = () => {
    setProperties(allProperties);
    setCurrentCategory(0);
  };

  const fetchByCategory = useCallback(
    async (item?: number, index = 0) => {
      setCurrentCategory(index);
      if (item) {
        setLoading(true);
        const { data } = await Service.get(
          `${ENDPOINTS.PROPERTIES_BY_CATEGORY}/${item}`,
        );
        setLoading(false);
        if (data) {
          setProperties(data.propertyList);
        }
      }
    },
    [setCurrentCategory, setLoading, setProperties],
  );

  useEffect(() => {
    if (!categories.length) {
      onFetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchCategories]);

  useEffect(() => {
    fetchByCategory();
    return () => {
      fetchByCategory();
    };
  }, [fetchByCategory]);

  const renderCategories = useCallback(() => {
    if (loading && !allProperties.length) {
      return Array.from({ length: 4 }).map((_, index) => (
        <ShowWidget
          key={index.toFixed()}
          condition={!loading}
          fallback={
            <div className="h-36 w-36 mx-1 sm:mx-3 rounded-xl bg-gray-200 animate-pulse" />
          }
        />
      ));
    }
    return (
      <>
        <ExplorerCard
          key="all__properties"
          title="All Properties"
          current={currentCategory === 0}
          onClick={fetchAllProperties}
          icon={<HouseVector />}
        />
        {categories.map((category, index) => (
          <ExplorerCard
            key={category.categoryId}
            title={category.title}
            current={currentCategory === index + 1}
            onClick={() =>
              fetchByCategory(category.categoryId, index + 1)
            }
            icon={
              EXPLORER_ICONS[category.title.toLocaleLowerCase()] || (
                <HotelVector />
              )
            }
          />
        ))}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAllProperties, categories, fetchByCategory]);

  return (
    <div className="w-full overflow-x-auto no-scrollbars flex">
      {renderCategories()}
    </div>
  );
};

export default PropertyCategory;
