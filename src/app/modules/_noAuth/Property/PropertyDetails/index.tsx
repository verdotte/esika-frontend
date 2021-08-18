import React, { memo } from 'react';
import timeAgo from 'time-ago';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import ClockVector from 'app/modules/__modules__/_vectors/clockVector';
import LocationVector from 'app/modules/__modules__/_vectors/LocationVector';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { IProperty } from 'app/modules/@Types';
import { onImageError } from 'app/modules/utils/helpers';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';

interface Props {
  loading: boolean;
  property: IProperty;
}

const PropertyDetails = ({ loading, property }: Props) => {
  const images: string[] = property?.image?.split(',') || [];

  return (
    <>
      <div className="block sm:flex justify-between">
        <div className="w-full p-1 sm:w-[65%] sm:flex items-center sm:p-14">
          <div className="flex sm:justify-between items-center sm:block relative w-full sm:w-[4rem] h-[4rem] mb-4 sm:mb-0">
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
              }
            >
              <div className="relative block w-16 h-16">
                <img
                  src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="User avatar"
                  className="w-16 h-16 sm:w-16 sm:h-16 rounded-full object-cover"
                  onError={onImageError}
                />
                <VerifiedIcon className="absolute bottom-0 right-0 text-blue-500 text-sm h-5 w-5" />
              </div>
            </ShowWidget>
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="block sm:hidden h-4 mt-2 sm:mt-0 bg-gray-200 animate-pulse" />
              }
            >
              <div className="ml-4 block sm:hidden">
                <p className="sm:line-clamp-1 text-[1.1rem] sm:text-xl ">
                  {property?.title}
                </p>
              </div>
            </ShowWidget>
          </div>

          <div className="ml-0 sm:ml-6 sm:flex-1">
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="h-4 mt-2 sm:mt-0 bg-gray-200 animate-pulse" />
              }
            >
              <div className="hidden sm:block">
                <p className="line-clamp-1 text-xl ">
                  {property?.title}
                </p>
              </div>
            </ShowWidget>

            <div className=" sm:w-full sm:flex ">
              <ShowWidget
                condition={!loading}
                fallback={
                  <div className="h-4 w-full mt-2 bg-gray-200 animate-pulse" />
                }
              >
                <div className="mt-2 block content-center sm:flex sm:justify-between items-center ">
                  <div className="flex sm:justify-between items-center">
                    <ClockVector className="text-blue-500 h-4 w-4 sm:h-5 sm:w-5" />
                    <p className="text-sm pl-1 text-gray-600">
                      {timeAgo.ago(property?.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center sm:pl-3 ">
                    <LocationVector className="text-blue-500 h-4 w-4 sm:h-5 sm:w-5" />
                    <p className="text-sm text-gray-600 pl-1">
                      {property?.location}
                    </p>
                  </div>
                </div>
              </ShowWidget>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-[35%] flex items-center">
          <ShowWidget
            condition={!loading}
            fallback={
              <div className="items-center p-10 w-full sm:pl-5 sm:pt-10 sm:pb-10 ">
                <div className="h-5 sm:h-8 w-full p-5 sm:p-4 sm:pl-5 sm:pt-10 sm:pb-10 bg-gray-200 animate-pulse" />
              </div>
            }
          >
            <div className="w-full flex items-center justify-center sm:justify-start p-3 sm:pl-5 sm:pt-10 sm:pb-10">
              <div className="bg-yellow-400/60 p-3">
                <p className="text-md">
                  {property?.price} fc/
                  {property?.unit !== 'month'
                    ? 'mois'
                    : property?.unit}
                </p>
              </div>

              <div className="p-5">
                <ShowWidget
                  condition={!loading}
                  fallback={
                    <div className="h-6 w-6 bg-gray-200 animate-pulse" />
                  }
                >
                  <button
                    type="button"
                    className="bg-red-500 flex-1 p-3 rounded-lg"
                  >
                    <HeartVector className="text-white h-6 w-6" />
                  </button>
                </ShowWidget>
              </div>
            </div>
          </ShowWidget>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[65%] relative">
          <ShowWidget
            condition={!loading}
            fallback={
              <div className="h-full w-full bg-gray-200 animate-pulse" />
            }
          >
            <img
              src={images[0]}
              alt="House on hood"
              className="w-full h-full object-cover"
              onError={onImageError}
            />
          </ShowWidget>
          <button
            type="button"
            className="bg-brand-bold border border-white text-sm rounded-lg p-2 px-5 absolute bottom-[5%] left-[3%] hidden"
          >
            Naviguer
          </button>
        </div>
        <div className="w-[35%] h-full pl-1 sm:pl-5 relative">
          <ShowWidget
            condition={!loading}
            fallback={
              <div className="h-32 w-full sm:h-60 sm:w-full mb-2 bg-gray-200 animate-pulse" />
            }
          >
            <img
              src={images[1]}
              alt="House on hood"
              className="w-full h-full object-cover"
              onError={onImageError}
            />
          </ShowWidget>

          <ShowWidget
            condition={!loading}
            fallback={
              <div className="h-32 w-full sm:h-60 sm:w-full bg-gray-200 animate-pulse" />
            }
          >
            {images[2] && (
              <img
                src={images[2]}
                alt="House on hood"
                className="w-full h-full pt-2 sm:pt-3 object-cover"
                onError={onImageError}
              />
            )}
          </ShowWidget>
          <ShowWidget condition={images.length > 3}>
            <button
              type="button"
              className="sm:bg-brand-bold border border-white text-sm rounded-lg bottom-2 right-2 sm:p-2 sm:px-5 absolute sm:bottom-[5%] sm:right-[3%] hidden md:block"
            >
              + Plus d&apos;images
            </button>
          </ShowWidget>
        </div>
      </div>
    </>
  );
};

export default memo(PropertyDetails);
