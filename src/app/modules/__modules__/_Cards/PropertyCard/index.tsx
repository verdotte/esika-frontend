import React, { useMemo, useState } from 'react';
import timeAgo from 'time-ago';
import { useHistory } from 'react-router-dom';
import ContactButton from 'app/modules/__modules__/ContactButton';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';
import { onImageError } from 'app/modules/utils/helpers';
import placeholderImg from 'app/static/images/placeholder.jpg';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { IObject } from 'app/modules/@Types';
import ProfileImage from 'app/modules/__modules__/ProfileImage';
import PropertySpecs from '../../PropertySpecs';
import { HeartSolidVector } from '../../_vectors/heartSolideVector';

interface Props {
  data?: IObject;
  preload?: boolean;
  onPropertyClick?: (
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

const defaultProps: Props = {
  data: {
    picture:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    image:
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus eum sint maiores esse molestiae, corporis autem cum odio? Itaque, ipsum atque eius aspernatur non neque dolores ipsa suscipit molestias sunt!',
  },
  preload: false,
  onPropertyClick: () => null,
};

export const PropertyCard = ({
  data = {},
  preload,
  onPropertyClick,
}: Props) => {
  const {
    image,
    picture,
    description,
    price,
    title,
    unit,
    createdAt,
    slug,
    spec,
    phoneNumber,
    verified,
  } = data;

  const history = useHistory();
  const [vectorTrigger, setVectorTrigger] = useState(false);
  const propertyImage = useMemo(
    () => image?.toString().split(',')[0],
    [image],
  );

  const onClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    onPropertyClick?.(event);
    history.push(`/properties/${slug as string}`);
  };

  return (
    <div className="w-full border rounded-lg py-4 h-full flex flex-col justify-between mb-4 sm:mb-0">
      <div
        className="px-4"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={() => null}
      >
        <div className="flex items-center pb-3 w-full">
          <ShowWidget
            condition={!preload}
            fallback={
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            }
          >
            <ProfileImage
              image={picture}
              verified={verified}
              className="relative"
            />
          </ShowWidget>
          <div className="ml-3 flex-1">
            <ShowWidget
              condition={!preload}
              fallback={
                <div className="h-4 w-full bg-gray-200 animate-pulse" />
              }
            >
              <div className="w-full flex justify-between items-center">
                <p className="line-clamp-1 text-sm">{title}</p>
                <p className="text-xs text-gray-700">
                  {timeAgo.ago(createdAt)}
                </p>
              </div>
            </ShowWidget>

            <ShowWidget
              condition={!preload}
              fallback={
                <div className="h-4 w-full p-2 mt-2 bg-gray-200 animate-pulse" />
              }
            >
              <div className="bg-yellow-400/60 p-2 mt-2 rounded-sm">
                <p className="text-sm">
                  ${price}/{unit === 'month' ? 'mois' : unit}
                </p>
              </div>
            </ShowWidget>
          </div>
        </div>

        <ShowWidget
          condition={!preload}
          fallback={
            <div className="my-3 h-4 w-full bg-gray-200 animate-pulse" />
          }
        >
          <p className="text-xs text-gray-700 line-clamp-2 my-3">
            {description}
          </p>
        </ShowWidget>
      </div>

      <PropertySpecs
        loading={preload as boolean}
        specs={spec as IObject}
        tagClassName="border bg-gray-200"
        className="w-full flex-nowrap my-3 px-4 overflow-x-auto no-scrollbars"
      />

      <div className="my-3">
        <ShowWidget
          condition={!preload}
          fallback={
            <div className="h-48 w-full bg-gray-200 animate-pulse" />
          }
        >
          <img
            src={propertyImage || placeholderImg}
            alt="property"
            className="w-full h-48 object-cover"
            onError={onImageError}
          />
        </ShowWidget>
      </div>

      <div className="px-4 flex justify-between space-x-4 my-2 w-">
        <ShowWidget
          condition={!preload}
          fallback={
            <div className="h-5 w-40 bg-gray-200 animate-pulse" />
          }
        >
          <ContactButton phoneNumber={phoneNumber} />
        </ShowWidget>

        <ShowWidget
          condition={!preload}
          fallback={
            <div className="h-5 w-40 bg-gray-200 animate-pulse" />
          }
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVectorTrigger(!vectorTrigger);
            }}
            className="border flex items-center justify-center space-x-2 flex-1 w-full p-3 rounded-lg"
          >
            {vectorTrigger ? (
              <HeartSolidVector className="text-red-500 h-5 w-5" />
            ) : (
              <HeartVector className="text-red-500 h-5 w-5" />
            )}

            <p className="text-sm hidden xl:block">Sauvegarder</p>
          </button>
        </ShowWidget>
      </div>
    </div>
  );
};

PropertyCard.defaultProps = defaultProps;
