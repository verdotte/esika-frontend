import React from 'react';
import { onImageError } from 'app/modules/utils/helpers';
import HeroCarouselCard from './Card';

const HeroCarousel = () => {
  return (
    <div className="w-full relative">
      <img
        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
        alt="House on hood"
        className="w-full h-[28rem] object-cover md:rounded-lg"
        onError={onImageError}
      />
      <div className="absolute md:top-[5%] bottom-[5%] left-8">
        <HeroCarouselCard />
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

export default HeroCarousel;
