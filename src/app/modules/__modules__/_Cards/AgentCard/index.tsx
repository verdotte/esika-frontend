import React from 'react';
import ContactButton from 'app/modules/__modules__/ContactButton';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import EyeVector from 'app/modules/__modules__/_vectors/eyeVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { onImageError } from 'app/modules/utils/helpers';
import { IAgent, IObject } from 'app/modules/@Types';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import placeholderImg from 'app/static/images/placeholder.jpg';

interface IProps {
  data: IAgent;
  preload: boolean;
  className?: string;
}

const defaultProps: IProps | IObject = {
  data: {
    picture:
      'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    firstName: 'Eliezer',
    lastName: 'Basubi',
    description: 'Trouver des bonnes maisons dans des bons milieux.',
    houses: 10,
    hotels: 40,
    apartments: 4,
    verified: false,
  },
  preload: false,
  className: '',
};

const AgentCard: React.FC<Partial<IProps | IObject>> = ({
  data = {},
  preload,
  className,
}) => {
  const {
    firstName,
    lastName,
    houses,
    apartments,
    hotels,
    picture,
    verified,
    description,
  } = data;

  return (
    <div
      className={`w-full flex border rounded-lg space-x-2 overflow-hidden ${className}`}
    >
      <ShowWidget
        condition={!preload}
        fallback={
          <div className="h-full w-40 flex-initial bg-gray-200 animate-pulse" />
        }
      >
        <img
          src={picture || placeholderImg}
          alt="agent name will be replaced here"
          className="h-full w-32 object-cover flex-initial"
          onError={onImageError}
        />
      </ShowWidget>

      <div className="w-full flex-initial flex flex-col justify-between p-4 pl-1 md:pl-3">
        <div className="flex items-center space-x-2">
          <ShowWidget condition={!preload || verified}>
            <VerifiedIcon className="text-blue-500 text-xl h-4 w-4" />
          </ShowWidget>

          <ShowWidget
            condition={!preload}
            fallback={
              <div className="w-full h-4 bg-gray-200 animate-pulse" />
            }
          >
            <p className="text-sm font-semibold">
              {firstName && lastName
                ? `${firstName} ${lastName}`
                : 'Verdotte Atutu'}
            </p>
          </ShowWidget>
        </div>

        <ShowWidget
          condition={!preload}
          fallback={
            <div className="w-full h-7 mt-3 bg-gray-200 animate-pulse" />
          }
        >
          <p className="pt-2 sm:pt-0 text-xs text-gray-600">
            {description
              ? `${description}`
              : 'Trouver des bonnes maisons à Bunia et ses environs à bon prix'}
          </p>
        </ShowWidget>

        <div className="flex items-center space-x-3 my-3">
          <div className="flex items-center">
            <HouseVector className="h-3 w-3" />
            <p className="text-xs ml-1">{houses || 3}</p>
          </div>
          <div className="flex items-center">
            <HotelVector className="h-3 w-3" />
            <p className="text-xs ml-1">{hotels || 4}</p>
          </div>
          <div className="flex items-center">
            <ApartmentVector className="h-3 w-3" />
            <p className="text-xs ml-1">{apartments || 2}</p>
          </div>
        </div>

        <div className="flex justify-between items-center space-x-3">
          <ShowWidget
            condition={!preload}
            fallback={
              <div className="h-5 w-full bg-gray-200 animate-pulse" />
            }
          >
            <ContactButton
              className="border  text-black flex items-center justify-center space-x-1 lg:space-x-2 w-full p-2 rounded-lg text-xs"
              vectorStyle="text-green-600 h-4 w-4"
            />
          </ShowWidget>

          <ShowWidget
            condition={!preload}
            fallback={
              <div className="h-5 w-full bg-gray-200 animate-pulse" />
            }
          >
            <button
              type="button"
              className="bg-brand-bold text-white hidden items-center justify-center space-x-1 lg:space-x-2 w-full p-3 rounded-lg text-xs"
            >
              <EyeVector className="h-4 w-4" />
              <p>Voir</p>
            </button>
          </ShowWidget>
        </div>
      </div>
    </div>
  );
};

AgentCard.defaultProps = defaultProps;

export default AgentCard;
