import React from 'react';
import { onImageError } from 'app/modules/utils/helpers';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import ContactButton from 'app/modules/__modules__/ContactButton';
import EyeVector from 'app/modules/__modules__/_vectors/eyeVector';

interface Props {
  loading: boolean;
  agent: { firstName: string; description: string; picture: string };
}

const PropertyAgent = ({ loading, agent }: Props) => {
  return (
    <div className="w-full flex border bg-white rounded-lg space-x-2 overflow-hidden">
      <ShowWidget
        condition={!loading}
        fallback={
          <div className="h-full sm:h-full w-28 sm:w-32 flex-initial bg-gray-200 animate-pulse" />
        }
      >
        <img
          src={agent.picture}
          alt="agent name will be replaced here"
          className="h-full sm:h-full w-32 sm:w-32 object-cover flex-initial"
          onError={onImageError}
        />
      </ShowWidget>

      <div className="w-full flex-initial flex flex-col pt-3 pr-2 sm:pt-4 sm:pr-4 pl-0 sm:pl-2">
        <div className="flex items-center space-x-2">
          <ShowWidget condition={!loading}>
            <VerifiedIcon className="text-blue-500 text-xl h-6 w-6" />
          </ShowWidget>

          <ShowWidget
            condition={!loading}
            fallback={
              <div className="w-24 h-4 bg-gray-200 animate-pulse" />
            }
          >
            <p className="text-md font-semibold">
              {agent?.firstName}
            </p>
          </ShowWidget>
        </div>

        <ShowWidget
          condition={!loading}
          fallback={
            <div className="w-full h-7 mt-3 bg-gray-200 animate-pulse" />
          }
        >
          <p className="pt-2 sm:pt-0 text-xs text-gray-600">
            {agent.description}
          </p>
        </ShowWidget>

        <div className="flex items-center space-x-3 my-3">
          <div className="flex items-center">
            <HouseVector className="h-3 w-3" />
            <p className="text-xs ml-1">{3}</p>
          </div>
          <div className="flex items-center">
            <HotelVector className="h-3 w-3" />
            <p className="text-xs ml-1">{4}</p>
          </div>
          <div className="flex items-center">
            <ApartmentVector className="h-3 w-3" />
            <p className="text-xs ml-1">{2}</p>
          </div>
        </div>

        <div className="flex justify-between sm:flex-wrap sm:justify-center items-center space-x-3 ">
          <ShowWidget
            condition={!loading}
            fallback={
              <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
            }
          >
            <ContactButton
              className="bg-green-600 text-white flex items-center justify-center space-x-1 lg:space-x-2 w-full sm:w-32 sm:mb-2 pt-2 pb-2 pl-3 pr-3 rounded-lg text-xs"
              vectorStyle="text-ehite h-4 w-4"
            />
          </ShowWidget>

          <ShowWidget
            condition={!loading}
            fallback={
              <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
            }
          >
            <button
              type="button"
              className="bg-brand-bold text-white flex items-center justify-center space-x-1 lg:space-x-2 w-full sm:w-20 sm:mb-2 pt-[0.6rem] pb-[0.6rem] pl-3 pr-3 rounded-lg text-xs"
            >
              <EyeVector className="h-4 w-4" />
              <p>Plus</p>
            </button>
          </ShowWidget>
        </div>
      </div>
    </div>
  );
};

export default PropertyAgent;
