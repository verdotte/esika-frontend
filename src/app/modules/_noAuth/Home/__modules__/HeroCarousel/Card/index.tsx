import React from 'react';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';
import ContactButton from 'app/modules/__modules__/ContactButton';
import { onImageError } from 'app/modules/utils/helpers';
import { IData } from 'app/modules/@Types';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import placeholderImg from 'app/static/images/placeholder.jpg';

const defaultProps: IData = {
  data: {
    title: 'Maison a vendre',
    price: 2000,
    balcony: 1,
    bathroom: 2,
    bedroom: 3,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus eum sint maiores esse molestiae, corporis autem cum odio? Itaque, ipsum atque eius aspernatur non neque dolores ipsa suscipit molestias sunt!',
    picture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
  },
};

const HeroCarouselCard: React.FC<Partial<IData>> = ({
  data = {},
}) => {
  const {
    title,
    price,
    description,
    balcony,
    bathroom,
    bedroom,
    picture,
    unit,
  } = data;

  return (
    <div className="w-full md:w-96 h-full rounded-[20px] py-4 bg-black/80 text-white flex flex-col justify-between">
      <div className="flex items-center pb-3 px-4">
        <div className="relative">
          <img
            src={(picture as string) || placeholderImg}
            alt="User avatar"
            onError={onImageError}
            className="w-8 h-8 rounded-full object-cover"
          />
          <VerifiedIcon />
        </div>
        <p className="ml-2">{title}</p>
      </div>
      <div className="my-3 bg-yellow-400/70 text-black p-4 py-3">
        <p className="text-sm">
          {price} fc/{unit !== 'month' ? 'mois' : unit}
        </p>
      </div>
      <div className="flex my-2 px-4">
        <ShowWidget condition={!!bedroom}>
          <div className="p-2 px-3 rounded-full bg-white text-gray-700 mr-3">
            <p className="text-xs">
              {bedroom} {Number(bedroom) > 1 ? 'chambres' : 'chambre'}
            </p>
          </div>
        </ShowWidget>
        <ShowWidget condition={!!bathroom}>
          <div className="p-2 px-3 rounded-full bg-white text-gray-700 mr-3">
            <p className="text-xs">
              {bathroom} {Number(bathroom) > 1 ? 'douches' : 'douche'}
            </p>
          </div>
        </ShowWidget>
        <ShowWidget condition={!!balcony}>
          <div className="p-2 px-3 rounded-full bg-white text-gray-700 mr-3">
            <p className="text-xs">
              {balcony} {Number(balcony) > 1 ? 'douches' : 'douche'}
            </p>
          </div>
        </ShowWidget>
      </div>
      <div className="px-4 my-3">
        <p className="text-left line-clamp-2 md:line-clamp-5 text-xs">
          {description}
        </p>
      </div>

      <div className="flex w-full px-4 space-x-4">
        <ContactButton />

        <button
          type="button"
          className="bg-red-500 flex-1 p-3 rounded-lg"
        >
          <HeartVector />
        </button>
      </div>
    </div>
  );
};

HeroCarouselCard.defaultProps = defaultProps;

export default HeroCarouselCard;
