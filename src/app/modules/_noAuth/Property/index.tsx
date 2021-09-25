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
import useResponsive from 'app/modules/Hooks/useResponsive';
import SearchContainer from 'app/modules/__modules__/SearchContainer';
import Header from 'app/modules/__modules__/Header';
import { useSearch } from 'app/modules/Contexts/SearchContext';
import RelatedProperties from './RelatedProperties';
import PropertyCarousel from './PropertyCarousel';
import PropertyDetails from './PropertyDetails';
import PropertyAgent from './PropertyAgent';
import PropertyImages from './PropertyImages';
import PropertyDetailsDesktop from './PropertyDetailsDesktop';

const PropertyContainer = () => {
  const [property, setProperty] = useState<IProperty | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [agent, setAgent] = useState<IAgent | null>(null);
  const [readMore, setReadMore] = useState(false);

  const [isMobile] = useResponsive();

  const isCurrent = useRef(true);

  const { slug } = useParams<{ slug?: string }>();

  const { loading, properties, onFetchProperties } = useHome();
  const { isVisible, onToggleVisibility } = useSearch();

  useEffect(() => {
    if (!properties.length) {
      onFetchProperties();
    }
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

  const onReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <div className="container mx-auto px-0 md:px-8 no-scrollbars">
      {isMobile ? (
        <PropertyCarousel
          isLoading={isLoading}
          propertyImages={property?.image as string}
        />
      ) : (
        <>
          <Header
            className="fixed md:sticky z-20 md:z-10 top-0"
            onSearchClick={onToggleVisibility}
          />
          <PropertyImages
            isLoading={isLoading}
            propertyImages={property?.image as string}
            property={property}
          />
        </>
      )}

      {isMobile ? (
        <>
          <PropertyDetails
            isLoading={isLoading}
            property={property}
          />

          <div className="py-4 mx-4 md:container md:mx-auto md:px-16 border-b border-gray-300">
            <PropertyAgent isLoading={isLoading} agent={agent} />
            <div className="flex items-center justify-between overflow-x-scroll no-scrollbars">
              <PropertySpecs
                loading={loading || isLoading}
                specs={property?.spec as IObject}
                tagClassName="bg-gray-300 my-1"
              />
            </div>
          </div>
        </>
      ) : (
        <PropertyDetailsDesktop
          loading={loading || isLoading}
          isLoading={isLoading}
          property={property}
          agent={agent}
        />
      )}

      <div className="py-4 mx-4 md:mx-0 md:container border-b md:border-none border-gray-300">
        <div className="flex justify-between items-center">
          <ShowWidget
            condition={!isLoading}
            fallback={
              <div className="w-4/5 h-8 md:w-full sm:mt-0 bg-gray-200 animate-pulse" />
            }
          >
            <p
              className={`text-sm text-black ${
                readMore ? 'line-clamp-none' : 'line-clamp-3'
              }`}
            >
              {property?.description}
            </p>
          </ShowWidget>
        </div>
        <ShowWidget
          condition={
            !isLoading &&
            !!property?.description &&
            property?.description.length > 89
          }
        >
          <button
            type="submit"
            onClick={onReadMore}
            className="flex mt-2 text-sm text-black font-medium justify-center items-center transition-all duration-500 md:hidden"
          >
            {readMore ? 'Afficher moins' : 'Afficher plus'}
            <ChevronRightVector className="pl-1 h-5 w-5" />
          </button>
        </ShowWidget>
      </div>
      {isMobile && (
        <div className="mx-4 my-5 md:container md:mx-auto md:px-56 flex justify-center items-center">
          <ShowWidget
            condition={!isLoading}
            fallback={
              <div className="w-full h-10 rounded-lg bg-gray-200 animate-pulse" />
            }
          >
            <button
              type="submit"
              className="w-full p-3 bg-brand-bold text-white rounded-lg md:mx-auto md:px-16"
            >
              Contacter l&apos;agent
            </button>
          </ShowWidget>
        </div>
      )}
      <div>
        <RelatedProperties
          loading={loading || isLoading}
          properties={relatedProperties}
        />
      </div>
      <Footer />
      <BottomNavbar />
      <SearchContainer
        show={isVisible}
        onClose={onToggleVisibility}
      />
    </div>
  );
};

export default PropertyContainer;
