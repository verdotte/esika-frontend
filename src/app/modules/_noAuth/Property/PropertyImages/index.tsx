import React from 'react';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { onImageError } from 'app/modules/utils/helpers';
import { IProperty } from 'app/modules/@Types';
import LocationVector from 'app/modules/__modules__/_vectors/LocationVector';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';

interface Props {
  propertyImages: string | null;
  isLoading: boolean;
  property: IProperty | null;
}

const PropertyImages = ({
  propertyImages,
  isLoading,
  property,
}: Props) => {
  const images: string[] = propertyImages?.split(',') || [];

  return (
    <div>
      <ShowWidget
        condition={!isLoading}
        fallback={
          <div className="w-2/5 h-14 sm:mt-0 bg-gray-200 animate-pulse" />
        }
      >
        <p className="text-[1.3rem] text-black font-medium">
          {property?.title}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <LocationVector className="h-4 w-4 text-brand-bold" />
            <p className="pl-1 text-sm text-black">
              {property?.location}
            </p>
          </div>
          <ShowWidget condition={!isLoading}>
            <button
              type="submit"
              className="w-40 border border-gray-300 flex justify-center items-center rounded-lg px-2 py-2 "
            >
              <HeartVector className="text-red-500 h-4 w-4" />
              <p className="pl-2 text-sm text-black">Favoris</p>
            </button>
          </ShowWidget>
        </div>
      </ShowWidget>
      <div className="pt-5 h-[27rem] hidden sm:flex justify-between">
        <div className="w-[65%] h-full">
          <ShowWidget
            condition={!isLoading}
            fallback={
              <div className="h-full w-full bg-gray-200 animate-pulse rounded-md" />
            }
          >
            <img
              src={images[0]}
              alt="House on hood"
              className="w-full h-full object-cover rounded-md"
              onError={onImageError}
            />
          </ShowWidget>
        </div>
        <div className="w-[35%] h-full pl-3 relative">
          <ShowWidget
            condition={!isLoading}
            fallback={
              <div className="h-[12.5rem] w-full mb-3 bg-gray-200 animate-pulse rounded-md" />
            }
          >
            <img
              src={images[1]}
              alt="House on hood"
              className="h-[12.5rem] w-full mb-3 object-cover rounded-md"
              onError={onImageError}
            />
          </ShowWidget>

          <ShowWidget
            condition={!isLoading}
            fallback={
              <div className="h-[12.5rem] w-full bg-gray-200 animate-pulse rounded-md" />
            }
          >
            {images[2] && (
              <img
                src={images[2]}
                alt="House on hood"
                className="h-[12.5rem] w-full object-cover rounded-md"
                onError={onImageError}
              />
            )}
          </ShowWidget>
          <ShowWidget condition={images.length >= 3}>
            <button
              type="button"
              className="bg-black/60 hover:bg-white text-white hover:text-black border border-white hover:border-black text-sm rounded-lg p-2 px-5 absolute bottom-[5%] right-[5%]"
            >
              + Plus d&apos;images
            </button>
          </ShowWidget>
        </div>
      </div>
    </div>
  );
};

export default PropertyImages;
