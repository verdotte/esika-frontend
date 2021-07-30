import React, { FC } from 'react';
import { onImageError } from 'app/modules/utils/helpers';
import { IData } from 'app/modules/@Types';
import HeroCarouselCard from './Card';

const defaultProps: IData = {
  data: {
    title: 'Maison a vendre',
    price: 2000,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus eum sint maiores esse molestiae, corporis autem cum odio? Itaque, ipsum atque eius aspernatur non neque dolores ipsa suscipit molestias sunt!',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
  },
};

const HeroCarousel: FC<IData> = ({ data }) => {
  const { image } = data;

  return (
    <div className="w-full relative transition-all ease-in-out">
      <img
        src={image as string}
        alt="House on hood"
        className="w-full h-[28rem] object-cover md:rounded-lg"
        onError={onImageError}
      />
      <div className="absolute md:top-[5%] bottom-[5%] left-8 right-8 md:right-auto">
        <HeroCarouselCard data={data} />
      </div>

      <button
        type="button"
        className="bg-brand-bold text-sm rounded-lg p-2 px-5 absolute bottom-[5%] right-[3%] hidden md:block"
      >
        Voir
      </button>
    </div>
  );
};

HeroCarousel.defaultProps = defaultProps;

export default HeroCarousel;
