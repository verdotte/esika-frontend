import React from 'react';

import { onImageError } from 'app/modules/utils/helpers';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import LocationVector from 'app/modules/__modules__/_vectors/LocationVector';
import EditVector from 'app/modules/__modules__/_vectors/editVector';
import TrashVector from 'app/modules/__modules__/_vectors/trashVector';

export const PropertyCard_ = () => {

  return (
    <div className="h-36 w-full sm:w-[45%] flex bg-white my-4 sm:mx-4 border rounded-lg overflow-hidden">
    <ShowWidget
      condition={true}
      fallback={
        <div className="w-2/5 h-36 sm:w-full sm:h-40 bg-gray-200 animate-pulse" />
      }
    >
      <div className="w-2/5 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="House on hood"
          className="w-full h-full object-cover"
          onError={onImageError}
        />
      </div>
    </ShowWidget>

    <div className="w-1/2 flex-initial flex">
      <div className="w-full ">
        <div className="p-3">
          <ShowWidget
            condition={true}
            fallback={
              <div className="h-5 my-2 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
            }
          >
            <p className="text-left text-md text-black">
              Title
            </p>
          </ShowWidget>

          <ShowWidget
            condition={true}
            fallback={
              <div className="h-3 my-2 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
            }
          >
            <div className="flex justify-start items-center text-left mt-2 mb-1">
              <LocationVector className="text-brand-bold h-5 w-5 sm:h-5 sm:w-5" />
              <p className=" text-black pl-1 text-xs">
                Location
              </p>
            </div>
          </ShowWidget>

          <ShowWidget
            condition={true}
            fallback={
              <div className="h-3 mt-3 mb-5 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
            }
          >
          <p className="text-sm">
            100 000 fc/mois
          </p>
            
          </ShowWidget>
          <ShowWidget
            condition={true}
            fallback={
              <div className="w-20 h-5 mt-3 mb-5 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
            }
          >
          <div className="flex">
          <p className="mt-2 p-1 px-4 text-xs text-gray-700 bg-brand-semi-bold rounded-full">
            Rent
          </p>
          </div>
          </ShowWidget>
          
        </div>
      </div>
    </div>
    <div className="w-[10%] relative block">
        <EditVector className="absolute top-[10%] right-[25%] cursor-pointer text-brand-bold h-5 w-5 sm:h-4 sm:w-4" />
        <TrashVector className="absolute bottom-[10%] right-[25%] cursor-pointer text-brand-bold h-5 w-5 sm:h-4 sm:w-4" />
    </div>
  
  </div>

  );
};

export default PropertyCard_;
