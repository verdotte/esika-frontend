import React from 'react';
import ContactButton from 'app/modules/__modules__/ContactButton';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import EyeVector from 'app/modules/__modules__/_vectors/eyeVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { onImageError } from 'app/modules/utils/helpers';

interface Props {
  data: Record<string, string | number | symbol | null | undefined>;
}

const defaultProps: Props = {
  data: {
    avatar:
      'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    agentName: 'Eliezer Basubi',
    description: 'Trouver des bonnes maisons dans des bons milieux.',
    houses: 10,
    hotels: 40,
    apartments: 4,
  },
};

const AgentCard: React.FC<Props> = ({ data }) => {
  const { agentName, description, houses, apartments, hotels } = data;

  const avatar: string = data.avatar as string;

  return (
    <div className="w-full flex border rounded-lg space-x-2 overflow-hidden">
      <img
        src={avatar}
        alt="agent name will be replaced here"
        className="h-full w-32 object-cover flex-initial"
        onError={onImageError}
      />

      <div className="flex-initial flex flex-col justify-between p-4 pl-3">
        <div className="flex items-center space-x-2">
          <VerifiedIcon className="text-blue-500 text-xl h-4 w-4" />
          <p className="text-sm font-semibold">{agentName}</p>
        </div>
        <p className="my-2 line-clamp-2 text-xs text-gray-700">
          {description}
        </p>

        <div className="flex items-center space-x-3 my-3">
          <div className="flex items-center">
            <HouseVector className="h-3 w-3" />
            <p className="text-xs ml-1">{houses}</p>
          </div>
          <div className="flex items-center">
            <HotelVector className="h-3 w-3" />
            <p className="text-xs ml-1">{hotels}</p>
          </div>
          <div className="flex items-center">
            <ApartmentVector className="h-3 w-3" />
            <p className="text-xs ml-1">{apartments}</p>
          </div>
        </div>

        <div className="flex justify-between items-center space-x-3">
          <ContactButton
            className="border border-brand-bold text-black flex items-center justify-center space-x-2 w-full p-2 rounded-lg text-xs"
            vectorStyle="text-green-600 h-4 w-4"
          />

          <button
            type="button"
            className="bg-brand-bold flex items-center justify-center space-x-2 w-full p-3 rounded-lg text-xs"
          >
            <EyeVector className="h-4 w-4" />
            <p>Voir</p>
          </button>
        </div>
      </div>
    </div>
  );
};

AgentCard.defaultProps = defaultProps;

export default AgentCard;
