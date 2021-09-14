import React from 'react';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import LocationVector from 'app/modules/__modules__/_vectors/LocationVector';
import { IProperty } from 'app/modules/@Types';

interface Props {
  property: IProperty | null;
  isLoading: boolean;
}

const PropertyDetails = ({ property, isLoading }: Props) => {
  return (
    <div className="md:container md:mx-auto md:px-16 lg:px-24 py-4 mx-4 border-b border-gray-300">
      <ShowWidget
        condition={!isLoading}
        fallback={
          <div className="h-4 mt-2 sm:mt-0 bg-gray-200 animate-pulse" />
        }
      >
        <div className="pb-1 flex justify-between items-center">
          <p className="text-[1rem] text-black font-medium">
            {property?.title}
          </p>
          <p className="text-[1rem] text-black font-medium">
            ${property?.price}/
            {property?.unit === 'month' ? 'mois' : property?.unit}
          </p>
        </div>
      </ShowWidget>
      <ShowWidget
        condition={!isLoading}
        fallback={
          <div className="w-28 h-4 mt-3 sm:mt-0 bg-gray-200 animate-pulse" />
        }
      >
        <div className="flex items-center">
          <LocationVector className="text-blue-500 h-4 w-4" />
          <p className="text-sm text-gray-600 pl-1">
            {property?.location}
          </p>
        </div>
      </ShowWidget>
    </div>
  );
};

export default PropertyDetails;
