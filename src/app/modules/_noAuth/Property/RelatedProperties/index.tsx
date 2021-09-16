import React, { memo, useCallback } from 'react';
import { IObject, IProperty } from 'app/modules/@Types';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';

interface Props {
  properties: IProperty[];
  loading: boolean;
}

const RelatedProperties = ({ properties, loading }: Props) => {
  const renderProperties = useCallback(() => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <PropertyCard key={index.toFixed()} preload={loading} />
      ));
    }
    return (
      properties &&
      properties.map((property) => (
        <PropertyCard
          data={property as IObject}
          key={`property_${property.propertyId}`}
        />
      ))
    );
  }, [loading, properties]);

  return (
    <>
      <p className="font-extrabold text-3xl pl-2 my-8 sm:pl-0 sm:text-5xl sm:my-8 sm:pt-20">
        Voir aussi...
      </p>

      <div className="w-full px-2 sm:p-0 sm:my-20 min-h-[500px]">
        <div className="w-full flex flex-col sm:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 gap-5 lg:gap-12 my-8">
          {renderProperties()}
        </div>
      </div>
    </>
  );
};

export default memo(RelatedProperties);
