import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import { useHome } from 'app/modules/Contexts/HomeContext';
import Header from 'app/modules/__modules__/Header';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Footer from 'app/modules/_noAuth/Home/__modules__/Footer';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { IProperty } from 'app/modules/@Types';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import AgentCard from 'app/modules/__modules__/_Cards/AgentCard';
import RelatedProperties from './RelatedProperties';
import PropertySpecs from './PropertySpecs';
import PropertyDetails from './PropertyDetails';

const PropertyContainer = () => {
  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading_, setLoading_] = useState<boolean>(false);
  const [agent, setAgent] = useState({});

  const { slug } = useParams<{ slug?: string }>();

  const { onFetchProperties, properties, loading } = useHome();

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
    return properties as IProperty[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, properties]);

  const fetchProperty = useCallback(async () => {
    setLoading_(true);

    const { data } = await Service.get(
      `${ENDPOINTS.PROPERTIES}/${slug}`,
    );
    setLoading_(false);
    if (data) {
      setProperty(data);
    }
  }, [slug]);

  const fetchPropertyAgent = useCallback(async () => {
    if (property) {
      const { data } = await Service.get(
        `${ENDPOINTS.USER_PROFILE}/${property.userId}`,
      );

      if (data) {
        setAgent(data);
      }
    }
  }, [property]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  useEffect(() => {
    fetchPropertyAgent();
  }, [fetchPropertyAgent]);

  const specs = useMemo(
    () => ({
      bathroom: property?.bathroom || null,
      balcony: property?.balcony,
      bedroom: property?.bedroom,
      parking: property?.parking,
    }),
    [property],
  );

  return (
    <div>
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <Header className="fixed md:sticky z-20 md:z-10 top-0" />

        <div className="h-full mt-[5.5rem] md:mt-4 my-4 mx-2 sm:mx-0 bg-brand-thin/10 ">
          <PropertyDetails
            loading={loading}
            property={property as IProperty}
          />
          <div className="pb-3 block sm:flex sm:justify-between">
            <div className="block sm:flex">
              <div className="w-full p-1 pt-2 pb-2 sm:w-[65%] sm:pt-10 sm:pl-10 sm:pb-10">
                <div className=" block border bg-white p-3 sm:p-8 ">
                  <ShowWidget
                    condition={!loading_}
                    fallback={
                      <div className="h-6 sm:h-4 w-full pt-2 pl-5 bg-gray-200 animate-pulse" />
                    }
                  >
                    <p className="text-sm text-gray-600  sm:pt-2 sm:pl-5">
                      {property?.description}
                    </p>
                  </ShowWidget>

                  <div className="flex pt-3 sm:pt-8">
                    <PropertySpecs
                      loading={loading || loading_}
                      specs={specs}
                    />
                  </div>
                </div>
              </div>
              <div className="p-1 sm:w-[35%] sm:pl-5 sm:pt-10 sm:pb-10 sm:pr-5">
                <AgentCard
                  data={agent}
                  preload={loading}
                  className="bg-white w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <RelatedProperties
          loading={loading || loading_}
          properties={relatedProperties}
        />
      </div>

      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default PropertyContainer;
