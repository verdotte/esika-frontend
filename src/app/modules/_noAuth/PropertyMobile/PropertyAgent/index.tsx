import React from 'react';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { IAgent } from 'app/modules/@Types';
import ProfileImage from 'app/modules/__modules__/ProfileImage';

interface Props {
  agent: IAgent | null;
  isLoading: boolean;
}

const PropertyAgent = ({ agent, isLoading }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-4/5">
        <ShowWidget
          condition={!isLoading}
          fallback={
            <div className="w-4/5 h-8 sm:mt-0 bg-gray-200 animate-pulse" />
          }
        >
          <p className="text-sm text-black font-medium">
            Le service entier de la propriété est hébergé par
            {agent?.firstName} {agent?.lastName}
          </p>
        </ShowWidget>
      </div>
      <div className="w-1/5 flex justify-center items-center">
        <ShowWidget
          condition={!isLoading}
          fallback={
            <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
          }
        >
          <ProfileImage
            image={agent?.picture as string}
            verified={agent?.verified}
            className="w-25 h-10"
          />
        </ShowWidget>
      </div>
    </div>
  );
};

export default PropertyAgent;
