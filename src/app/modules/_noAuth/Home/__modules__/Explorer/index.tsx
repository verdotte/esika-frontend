/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';
import { useHome } from 'app/modules/Contexts/HomeContext';
import Paginate from 'app/modules/utils/helpers/paginator';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import NoPropertyFound from 'app/modules/__modules__/NoPropertyFound';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';
import PropertyCategory from './PropertyCategory';
import useElementOnScreen from './UseElementOnScreen';

const ExplorerPanel = () => {
  const {
    properties,
    categories,
    loading,
    paginationIndicators,
    onIndicatorChange,
    onFetchCategories,
  } = useHome();

  const [threshold, setThreshold] = useState(0.37);

  useEffect(() => {
    const matchesWidth = window.matchMedia('(min-width: 992px)');
    if (matchesWidth.matches) {
      setThreshold(0.955);
      console.log('it matches');
    }
    matchesWidth.addEventListener('change', (ev) => {
      if (ev.matches) {
        setThreshold(0.9);
        console.log('992px');
      }
    });
  }, []);

  const targetRef = useRef(null);
  const isVisible = useElementOnScreen(
    {
      root: null,
      rootMargin: '0px',
      threshold,
    },
    targetRef,
  );

  const { propertiesIndicator: indicator } = paginationIndicators;
  const chunks = useMemo(() => Paginate(properties, 6), [properties]);

  const onIndicatorClick = useCallback(
    (position: number) => {
      onIndicatorChange(position, 'propertiesIndicator');
    },
    [onIndicatorChange],
  );

  const renderProperties = useCallback(() => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <PropertyCard key={index} preload={loading} />
      ));
    }
    return (
      chunks[indicator] &&
      chunks[indicator].map((property) => (
        <PropertyCard
          data={property}
          key={`property_${property.propertyId}`}
        />
      ))
    );
  }, [chunks, loading, indicator]);

  useEffect(() => {
    if (!categories.length) {
      onFetchCategories();
    }
    return () => {
      onFetchCategories();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchCategories]);

  return (
    <div className="my-4 px-3 md:px-0" ref={targetRef}>
      <p className="font-extrabold text-4xl my-8">Explorer</p>
      <div
        className={
          isVisible
            ? 'bg-red-300 fixed z-35 top-[5.3rem]'
            : 'bg-yellow-300'
        }
      >
        <PropertyCategory />
      </div>
      <div
        className={`w-full ${
          !loading && !chunks[indicator]
            ? 'h-[350px]'
            : 'min-h-[500px]'
        }`}
      >
        <ShowWidget condition={loading || !!chunks[indicator]}>
          <div className="w-full flex flex-col sm:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 gap-5 lg:gap-12 my-8">
            {renderProperties()}
          </div>
        </ShowWidget>
        <ShowWidget condition={!loading && !chunks[indicator]}>
          <NoPropertyFound className="w-1/2 md:w-1/4">
            <p className="mt-3">
              Aucun immobilier trouvé dans cette catégorie
            </p>
          </NoPropertyFound>
        </ShowWidget>
      </div>
      <ShowWidget condition={chunks.length > 1}>
        <div className="w-full flex justify-end">
          {chunks.map((_, index) => (
            <HeroCarouselIndicator
              key={index}
              current={indicator === index}
              position={index}
              defaultStyle="w-4"
              currentStyle="w-10 bg-brand-bold"
              className="h-4 border border-brand-bold rounded-full mr-3"
              onClick={onIndicatorClick}
            />
          ))}
        </div>
      </ShowWidget>
    </div>
  );
};
export default ExplorerPanel;
