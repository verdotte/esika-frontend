import React, { useEffect, useCallback } from 'react';
import Header from 'app/modules/__modules__/Header';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Footer from 'app/modules/_noAuth/Home/__modules__/Footer';
import { useHome } from 'app/modules/Contexts/HomeContext';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';
import PropertyCategory from '../Home/__modules__/Explorer/PropertyCategory';

const PropertiesActivity = () => {
  const { properties, loading, onFetchProperties } = useHome();

  useEffect(() => {
    if (!properties.length) {
      onFetchProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchProperties]);

  const renderProperties = useCallback(() => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <PropertyCard key={index.toFixed()} preload={loading} />
      ));
    }
    return properties.map((property) => (
      <PropertyCard
        key={`properties_${property.propertyId}`}
        data={property}
      />
    ));
  }, [loading, properties]);

  return (
    <div className="container mt-24 md:mt-4 mx-auto px-0 md:px-8 no-scrollbars">
      <Header className="fixed md:sticky z-20 md:z-10 top-0" />
      <div className="my-5">
        <PropertyCategory />
      </div>
      <div className="w-full flex flex-col sm:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 gap-5 lg:gap-12 my-12 md:my-10 px-3 md:px-0">
        {renderProperties()}
      </div>
      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default PropertiesActivity;
