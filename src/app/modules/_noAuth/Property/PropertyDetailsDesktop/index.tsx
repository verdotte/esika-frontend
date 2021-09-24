import React from 'react';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { IAgent, IObject, IProperty } from 'app/modules/@Types';
import ProfileImage from 'app/modules/__modules__/ProfileImage';
import PropertySpecs from 'app/modules/__modules__/PropertySpecs';

interface Props {
  agent: IAgent | null;
  property: IProperty | null;
  loading: boolean;
  isLoading: boolean;
}

const PropertyDetailsDesktop = ({
  agent,
  property,
  isLoading,
  loading,
}: Props) => {
  return (
    <div className="pt-8 pb-5 flex justify-between">
      <div className="w-[65%] h-24 border-b pb-3 border-gray-300 flex justify-between">
        <div className="block w-[80%]">
          <ShowWidget
            condition={!isLoading}
            fallback={
              <div className="w-4/5 h-8 sm:mt-0 bg-gray-200 animate-pulse" />
            }
          >
            <p className="text-sm text-black">
              Le service entier de la propriété est hébergé par
              <span className="ml-1 font-medium">
                {agent?.firstName} {agent?.lastName}
              </span>
            </p>
          </ShowWidget>
          <div className="flex items-center justify-between overflow-hidden overflow-x-scroll no-scrollbars">
            <PropertySpecs
              loading={loading || isLoading}
              specs={property?.spec as IObject}
              className="my-2 sm:px-0"
              tagClassName="bg-gray-300 my-1"
              loadingTagClassName="my-4 flex flex-wrap content-center"
            />
          </div>
        </div>
        <div className="block w-[15%]">
          <ShowWidget
            condition={!isLoading}
            fallback={
              <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
            }
          >
            <ProfileImage
              image={agent?.picture as string}
              verified={agent?.verified}
              className="w-20 h-20 relative"
              imageClassName="sm:w-20 sm:h-20 rounded-full object-cover"
            />
          </ShowWidget>
        </div>
      </div>
      <div className="w-[35%] h-24 sm:pl-5 relative">
        <div className="p-3 border border-gray-300 rounded-lg">
          <div className="pt-1 flex justify-center items-center">
            <ShowWidget condition={!isLoading}>
              <p className="text-[1rem] text-black font-medium">
                ${property?.price}/
                {property?.unit === 'month' ? 'mois' : property?.unit}
              </p>
            </ShowWidget>
          </div>
          <div className="pt-2 flex justify-center items-center">
            <ShowWidget
              condition={!isLoading}
              fallback={
                <div className="w-[90%] h-10 rounded-lg bg-gray-200 animate-pulse" />
              }
            >
              <button
                type="submit"
                className="w-[80%] p-1 bg-brand-bold text-sm text-white rounded-lg px-3 py-2 "
              >
                Contacter l&apos;agent
              </button>
            </ShowWidget>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsDesktop;
