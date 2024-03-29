import React, { memo } from 'react';
import { useHistory } from 'react-router';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';
import ContactButton from 'app/modules/__modules__/ContactButton';
import { onImageError } from 'app/modules/utils/helpers';
import { IData, IObject } from 'app/modules/@Types';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import placeholderImg from 'app/static/images/placeholder.jpg';
import PropertySpecs from 'app/modules/__modules__/PropertySpecs';

const defaultProps: IData & { preload?: boolean } = {
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
  preload: false,
};

interface ICardData {
  preload: boolean;
  onPropertyClick?: (
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

const HeroCarouselCard: React.FC<
  Partial<IData & IObject & ICardData>
> = ({ data = {}, preload, onPropertyClick }) => {
  const history = useHistory();

  const { title, price, description, picture, unit, spec, slug } =
    data;

  const onClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    onPropertyClick?.(event);
    history.push(`/properties/${slug as string}`);
  };

  return (
    <div
      className="w-full md:w-96 h-full rounded-[20px] py-4 bg-black/80 text-white flex flex-col justify-between"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={() => null}
    >
      <div className="flex items-center pb-3 px-4">
        <ShowWidget
          condition={!preload}
          fallback={
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          }
        >
          <div className="relative">
            <img
              src={(picture as string) || placeholderImg}
              alt="User avatar"
              onError={onImageError}
              className="w-8 h-8 rounded-full object-cover"
            />
            <VerifiedIcon />
          </div>
        </ShowWidget>

        <ShowWidget
          condition={!preload}
          fallback={
            <div className="h-4 w-full ml-2 bg-gray-200 animate-pulse" />
          }
        >
          <p className="ml-2">{title}</p>
        </ShowWidget>
      </div>

      <ShowWidget
        condition={!preload}
        fallback={
          <div className="my-3 p-4 h-5 bg-gray-200 animate-pulse" />
        }
      >
        <div className="my-3 bg-yellow-400/70 text-black p-4 py-3">
          <p className="text-sm">
            ${price}/{unit === 'month' ? 'mois' : unit}
          </p>
        </div>
      </ShowWidget>

      <div className="flex my-2 px-4">
        <PropertySpecs
          loading={preload as boolean}
          specs={spec as unknown as IObject}
          className="w-full overflow-x-auto px-0"
          tagClassName="bg-white text-gray-700"
        />
      </div>
      <div className="px-4 my-3">
        <ShowWidget
          condition={!preload}
          fallback={<div className="h-4 bg-gray-200 animate-pulse" />}
        >
          <p className="text-left line-clamp-2 md:line-clamp-5 text-xs">
            {description}
          </p>
        </ShowWidget>
      </div>

      <div className="flex w-full px-4 space-x-4">
        <ShowWidget
          condition={!preload}
          fallback={
            <div className="h-5 w-40 bg-gray-200 animate-pulse" />
          }
        >
          <ContactButton />
        </ShowWidget>

        <ShowWidget
          condition={!preload}
          fallback={
            <div className="h-5 w-40 bg-gray-200 animate-pulse" />
          }
        >
          <button
            type="button"
            className="bg-red-500 flex-1 p-3 rounded-lg"
          >
            <HeartVector />
          </button>
        </ShowWidget>
      </div>
    </div>
  );
};

HeroCarouselCard.defaultProps = defaultProps;

export default memo(HeroCarouselCard);
