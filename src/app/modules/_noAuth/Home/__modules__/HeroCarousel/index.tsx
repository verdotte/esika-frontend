import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import placeholder from 'app/static/images/placeholder.jpg';
import { onImageError } from 'app/modules/utils/helpers';
import { IData } from 'app/modules/@Types';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import HeroCarouselCard from './Card';

type Props = IData & { preload: boolean };

const HeroCarousel: FC<Props> = ({ data, preload }) => {
  const { image, slug } = data;

  const propertyImage = useMemo(
    () => image?.toString().split(',')[0] || placeholder,
    [image],
  );

  return (
    <div className="w-full relative transition-all ease-in-out flex-shrink-0">
      <ShowWidget
        condition={!preload}
        fallback={
          <div className="h-[28rem] w-full md:rounded-lg bg-gray-200 animate-pulse" />
        }
      >
        <img
          src={propertyImage as string}
          alt="House on hood"
          className="w-full h-[28rem] object-cover md:rounded-lg"
          onError={onImageError}
        />
      </ShowWidget>
      <div className="absolute md:top-[5%] bottom-[5%] left-8 right-8 md:right-auto">
        <HeroCarouselCard data={data} preload={preload} />
      </div>

      <ShowWidget condition={!preload}>
        <Link to={`/properties/${slug as string}`}>
          <button
            type="button"
            className="bg-brand-bold text-white text-sm rounded-lg p-2 px-5 absolute bottom-[5%] right-[3%] hidden md:block"
          >
            Voir
          </button>
        </Link>
      </ShowWidget>
    </div>
  );
};

HeroCarousel.displayName = 'HeroCarousel';

export default HeroCarousel;
