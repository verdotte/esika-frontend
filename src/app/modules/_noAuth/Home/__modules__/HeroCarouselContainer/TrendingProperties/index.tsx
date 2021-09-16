import React, { useCallback } from 'react';
import { useHome } from 'app/modules/Contexts/HomeContext';
import { useSwipe } from 'app/modules/Contexts/SwipeContext';
import HeroCarousel from '../../HeroCarousel';

const TrendingProperties = () => {
  const { allProperties, loading } = useHome();

  const {
    childrenRefElement,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
  } = useSwipe();

  const appendRef = useCallback(
    (ref) => {
      if (!childrenRefElement.includes(ref)) {
        childrenRefElement.push(ref);
      }
    },
    [childrenRefElement],
  );

  if (loading) {
    return (
      <HeroCarousel
        data={{}}
        preload={loading && !allProperties.length}
      />
    );
  }

  return (
    <>
      {allProperties.slice(0, 5).map((property, index) => (
        <div
          ref={appendRef}
          key={index.toFixed()}
          className="w-full h-full flex-shrink-0"
          onTouchStart={onTouchStart}
          onTouchMove={(event) => onTouchMove(event, index)}
          onTouchEnd={(event) => onTouchEnd(event, index)}
        >
          <HeroCarousel
            data={property}
            preload={loading && !allProperties.length}
          />
        </div>
      ))}
    </>
  );
};

export default TrendingProperties;
