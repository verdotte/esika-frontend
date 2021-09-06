// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { useParams } from 'react-router';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Footer from 'app/modules/_noAuth/Home/__modules__/Footer';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { useHome } from 'app/modules/Contexts/HomeContext';
import { IAgent, IObject, IProperty } from 'app/modules/@Types';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import PropertySpecs from 'app/modules/__modules__/PropertySpecs';
import ChevronRightVector from 'app/modules/__modules__/_vectors/chevronRightVector';
import RelatedProperties from '../Property/RelatedProperties';
import PropertyCarousel from './PropertyCarousel';
import PropertyDetails from './PropertyDetails';
import PropertyAgent from './PropertyAgent';

const PropertyMobileContainer = () => {
  const [property, setProperty] = useState<IProperty | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [agent, setAgent] = useState<IAgent | null>(null);

  const isCurrent = useRef(true);

  const { slug } = useParams<{ slug?: string }>();

  const { loading, properties, onFetchProperties } = useHome();

  useEffect(() => {
    if (!properties.length) {
      onFetchProperties();
    }
    return () => {
      onFetchProperties();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchProperties]);

  const relatedProperties: IProperty[] = useMemo(() => {
    const categoryProperties = properties.filter(
      (itemProperty) =>
        itemProperty.category === property?.category &&
        itemProperty.slug !== slug,
    );

    if (categoryProperties.length) {
      return categoryProperties as IProperty[];
    }
    return properties.filter(
      (itemProperty) => itemProperty.slug !== slug,
    ) as IProperty[];
  }, [slug, property, properties]);

  const fetchProperty = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = await Service.get(
      `${ENDPOINTS.PROPERTIES}/${slug}`,
    );
    if (isCurrent.current && error) {
      setIsLoading(false);
      return;
    }
    if (isCurrent.current && data) {
      setIsLoading(false);
      setProperty(data);
    }
  }, [slug]);

  const fetchPropertyAgent = useCallback(async () => {
    if (property) {
      const { data } = await Service.get(
        `${ENDPOINTS.USER_PROFILE}/${property.userId}`,
      );

      if (isCurrent.current && data) {
        setAgent(data.profile);
      }
    }
  }, [property]);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  useEffect(() => {
    fetchPropertyAgent();
  }, [fetchPropertyAgent]);

  return (
    <div>
      <PropertyCarousel
        isLoading={isLoading}
        propertyImages={property?.image}
      />
      <PropertyDetails isLoading={isLoading} property={property} />
      <div className="py-4 mx-4 border-b border-gray-300">
        <PropertyAgent isLoading={isLoading} agent={agent} />
        <div className="mt-5 flex items-center justify-between overflow-x-scroll">
          <PropertySpecs
            loading={loading || isLoading}
            specs={property?.spec as IObject}
          />
        </div>
      </div>
      <div className="py-4 mx-4 border-b border-gray-300">
        <div className="flex justify-between items-center">
          <ShowWidget
            condition={!isLoading}
            fallback={
              <div className="w-4/5 h-8 sm:mt-0 bg-gray-200 animate-pulse" />
            }
          >
            <p className="text-sm text-black line-clamp-4">
              {property?.description} {property?.description}
            </p>
          </ShowWidget>
        </div>
        <button
          type="submit"
          className="mt-2 text-black font-medium justify-center items-center"
          style={{ display: `${!isLoading ? 'flex' : 'none'}` }}
        >
          Afficher plus{' '}
          <ChevronRightVector className="pl-1 h-7 w-7" />
        </button>
      </div>
      <div className="mx-4 my-5 flex justify-center items-center">
        <ShowWidget
          condition={!isLoading}
          fallback={
            <div className="w-full h-10 rounded-lg bg-gray-200 animate-pulse" />
          }
        >
          <button
            type="submit"
            className="w-full p-3 bg-blue-400 text-white rounded-lg"
          >
            Contacter l&apos;agent
          </button>
        </ShowWidget>
      </div>
      <RelatedProperties
        loading={loading || isLoading}
        properties={relatedProperties}
      />
      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default PropertyMobileContainer;
