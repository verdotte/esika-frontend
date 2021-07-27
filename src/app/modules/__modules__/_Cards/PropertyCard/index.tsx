import React from 'react';
import ContactButton from 'app/modules/__modules__/ContactButton';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { onImageError } from 'app/modules/utils/helpers';

interface Props {
  data?: Record<string, number | string | symbol | null>;
}

const defaultProps: Props = {
  data: {
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    image:
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus eum sint maiores esse molestiae, corporis autem cum odio? Itaque, ipsum atque eius aspernatur non neque dolores ipsa suscipit molestias sunt!',
  },
};

export const PropertyCard = ({ data }: Props) => {
  const { image, avatar, description } = data;

  return (
    <div className="w-full border border-brand-bold rounded-lg py-4 h-full flex flex-col justify-between">
      <div className="px-4">
        <div className="flex items-center pb-3 w-full">
          <div className="relative">
            <img
              src={avatar}
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover"
              onError={onImageError}
            />
            <VerifiedIcon />
          </div>
          <div className="ml-3 flex-1">
            <div className="w-full flex justify-between items-center">
              <p className="line-clamp-1 text-sm">Maison</p>
              <p className="text-xs text-gray-700">3 min plus tard</p>
            </div>

            <div className="bg-yellow-400/60 p-2 mt-2 rounded-sm">
              <p className="text-sm">2000fc/mois</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-700 line-clamp-2 my-3">
          {description}
        </p>
      </div>

      <div className="w-full flex my-3 px-4 overflow-x-auto no-scrollbars">
        <div className="p-2 px-3 rounded-full bg-brand-thin border border-brand-bold text-gray-700 mr-3">
          <p className="text-xs whitespace-nowrap">4 chambre</p>
        </div>
        <div className="p-2 px-3 rounded-full bg-brand-thin border border-brand-bold text-gray-700 mr-3">
          <p className="text-xs whitespace-nowrap">2 douches</p>
        </div>
        <div className="p-2 px-3 rounded-full bg-brand-thin border border-brand-bold text-gray-700 mr-3">
          <p className="text-xs whitespace-nowrap">Balcon a vitre</p>
        </div>
      </div>

      <div className="my-3">
        <img
          src={image}
          alt="property"
          className="w-full h-48 object-cover"
          onError={onImageError}
        />
      </div>

      <div className="px-4 flex justify-between space-x-4 my-2">
        <ContactButton />

        <button
          type="button"
          className="border border-brand-bold flex items-center justify-center space-x-2 w-full p-3 rounded-lg"
        >
          <HeartVector className="text-red-500 h-5 w-5" />
          <p className="text-sm">Savaugarder</p>
        </button>
      </div>
    </div>
  );
};

PropertyCard.defaultProps = defaultProps;
