import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useHome } from 'app/modules/Contexts/HomeContext';
import Paginate from 'app/modules/utils/helpers/paginator';
import Header from 'app/modules/__modules__/Header';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Footer from 'app/modules/_noAuth/Home/__modules__/Footer';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { HeroCarouselIndicator } from 'app/modules/_noAuth/Home/__modules__/HeroCarousel/Indicator';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';
import ContactButton from 'app/modules/__modules__/ContactButton';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import EyeVector from 'app/modules/__modules__/_vectors/eyeVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import { useParams } from 'react-router';
import { IProperty } from 'app/modules/@Types';
import { onImageError } from 'app/modules/utils/helpers';
import ClockVector from 'app/modules/__modules__/_vectors/clockVector';
import LocationVector from 'app/modules/__modules__/_vectors/LocationVector';
import timeAgo from 'time-ago';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import PropertyPrice from 'app/modules/__modules__/Property/PropertyPrice';

const Property = () => {
  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading_, setLoading_] = useState<boolean>(false);
  // const [properties, setProperties] = useState({});

  const { slug } = useParams<{ slug?: string }>();

  const {
    onFetchProperties,
    onFetchAgents,
    properties,
    loading,
    paginationIndicators,
    onIndicatorChange,
  } = useHome();

  useEffect(() => {
    if (!properties.length) {
      onFetchProperties();
      onFetchAgents();
    }
    return () => {
      onFetchProperties();
      onFetchAgents();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchProperties]);

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
      chunks[indicator].map((property, index) => (
        <PropertyCard
          data={property}
          key={`property_${property.property_id}_${index}`}
        />
      ))
    );
  }, [chunks, loading, indicator]);

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

  useEffect(() => {
    fetchProperty();
    return () => {
      fetchProperty();
    };
  }, [fetchProperty]);

  const images: string[] = useMemo(
    () => property?.image?.split(',') || [],
    [property],
  );

  // const firstImage:string[] | undefined = images?[0]

  // console.log('property ==>', property);

  return (
    <div className="container mx-auto px-0 md:px-8 no-scrollbars">
      <Header className="fixed md:sticky z-20 md:z-10 top-0" />

      <div className="h-full mt-[5.5rem] md:mt-4 my-4 mx-2 sm:mx-0 bg-brand-thin/10 ">
        <div className="block sm:flex justify-between">
          <div className="w-full p-1 sm:w-[65%] sm:flex items-center sm:p-14">
            <div className="flex sm:justify-between items-center sm:block relative w-full sm:w-[4rem] h-[4rem] mb-4 sm:mb-0">
              <ShowWidget
                condition={!loading_}
                fallback={
                  <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
                }
              >
                <div className="relative block w-16 h-16">
                  <img
                    src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt="User avatar"
                    className="w-16 h-16 sm:w-16 sm:h-16 rounded-full object-cover"
                    onError={onImageError}
                  />
                  <VerifiedIcon className="absolute bottom-0 right-0 text-blue-500 text-sm h-5 w-5" />
                </div>
              </ShowWidget>
              <ShowWidget
                condition={!loading_}
                fallback={
                  <div className="block sm:hidden h-4 mt-2 sm:mt-0 bg-gray-200 animate-pulse" />
                }
              >
                <div className="ml-4 block sm:hidden">
                  <p className="sm:line-clamp-1 text-[1.1rem] sm:text-xl ">
                    {property?.title}
                  </p>
                </div>
              </ShowWidget>
            </div>

            <div className="ml-0 sm:ml-6 sm:flex-1">
              <ShowWidget
                condition={!loading_}
                fallback={
                  <div className="h-4 mt-2 sm:mt-0 bg-gray-200 animate-pulse" />
                }
              >
                <div className="hidden sm:block">
                  <p className="line-clamp-1 text-xl ">
                    {property?.title}
                  </p>
                </div>
              </ShowWidget>

              <div className=" sm:w-full sm:flex ">
                <ShowWidget
                  condition={!loading_}
                  fallback={
                    <div className="h-4 w-full mt-2 bg-gray-200 animate-pulse" />
                  }
                >
                  <div className="mt-2 block content-center sm:flex sm:justify-between items-center ">
                    <div className="flex sm:justify-between items-center">
                      <ClockVector className="text-blue-500 h-4 w-4 sm:h-5 sm:w-5" />
                      <p className="text-sm pl-1 text-gray-600">
                        {timeAgo.ago(property?.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center sm:pl-3 ">
                      <LocationVector className="text-blue-500 h-4 w-4 sm:h-5 sm:w-5" />
                      <p className="text-sm text-gray-600 pl-1">
                        {property?.location}
                      </p>
                    </div>
                  </div>
                </ShowWidget>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-[35%] flex items-center">
            <ShowWidget
              condition={!loading_}
              fallback={
                <div className="items-center p-10 w-full sm:pl-5 sm:pt-10 sm:pb-10 ">
                  <div className="h-5 sm:h-8 w-full p-5 sm:p-4 sm:pl-5 sm:pt-10 sm:pb-10 bg-gray-200 animate-pulse" />
                </div>
              }
            >
              <div className="w-full flex items-center justify-center sm:justify-start p-3 sm:pl-5 sm:pt-10 sm:pb-10">
                <div className="bg-yellow-400/60 p-3">
                  <PropertyPrice
                    unit={property?.unit}
                    price={property?.price || ''}
                  />
                </div>

                <div className="p-5">
                  <ShowWidget
                    condition={!loading_}
                    fallback={
                      <div className="h-6 w-6 bg-gray-200 animate-pulse" />
                    }
                  >
                    <button
                      type="button"
                      className="bg-red-500 flex-1 p-3 rounded-lg"
                    >
                      <HeartVector className="text-white h-6 w-6" />
                    </button>
                  </ShowWidget>
                </div>
              </div>
            </ShowWidget>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[65%] relative">
            <ShowWidget
              condition={!loading_}
              fallback={
                <div className="h-full w-full bg-gray-200 animate-pulse" />
              }
            >
              <img
                src={images[0]}
                alt="House on hood"
                className="w-full h-full object-cover"
                onError={onImageError}
              />
            </ShowWidget>
            <button
              type="button"
              className="bg-brand-bold border border-white text-sm rounded-lg p-2 px-5 absolute bottom-[5%] left-[3%] hidden"
            >
              Naviguer
            </button>
          </div>
          <div className="w-[35%] h-full pl-1 sm:pl-5 relative">
            <ShowWidget
              condition={!loading_}
              fallback={
                <div className="h-32 w-full sm:h-60 sm:w-full mb-2 bg-gray-200 animate-pulse" />
              }
            >
              <img
                src={images[1]}
                alt="House on hood"
                className="w-full h-full object-cover"
                onError={onImageError}
              />
            </ShowWidget>

            <ShowWidget
              condition={!loading_}
              fallback={
                <div className="h-32 w-full sm:h-60 sm:w-full bg-gray-200 animate-pulse" />
              }
            >
              {images[2] && (
                <img
                  src={images[2]}
                  alt="House on hood"
                  className="w-full h-full pt-2 sm:pt-3 object-cover"
                  onError={onImageError}
                />
              )}
            </ShowWidget>
            <ShowWidget condition={images.length > 3}>
              <button
                type="button"
                className="sm:bg-brand-bold border border-white text-sm rounded-lg bottom-2 right-2 sm:p-2 sm:px-5 absolute sm:bottom-[5%] sm:right-[3%] hidden md:block"
              >
                + Plus d&apos;images
              </button>
            </ShowWidget>
          </div>
        </div>
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
                  <div className="flex flex-wrap content-center my-2 sm:px-4">
                    <ShowWidget
                      condition={!loading_}
                      fallback={
                        <div className="h-8 w-16 rounded-full mr-3 bg-gray-200 animate-pulse" />
                      }
                    >
                      <div className="mb-2 sm:mb-0 p-2 px-3 sm:p-2 sm:px-3 rounded-full bg-brand-bold text-gray-700 mr-3">
                        <p className="text-xs">
                          {property?.bedroom}{' '}
                          {Number(property?.bedroom) > 1
                            ? 'chambres'
                            : 'chambre'}
                        </p>
                      </div>
                    </ShowWidget>
                    <ShowWidget
                      condition={!loading_}
                      fallback={
                        <div className="h-8 w-16 rounded-full mr-3 bg-gray-200 animate-pulse" />
                      }
                    >
                      <div className="mb-2 sm:mb-0 p-2 px-3 rounded-full bg-brand-bold text-gray-700 mr-3">
                        <p className="text-xs">
                          {property?.bathroom}{' '}
                          {Number(property?.bathroom) > 1
                            ? 'douches'
                            : 'douche'}
                        </p>
                      </div>
                    </ShowWidget>
                    <ShowWidget
                      condition={!loading_}
                      fallback={
                        <div className="h-8 w-16 rounded-full mr-3 bg-gray-200 animate-pulse" />
                      }
                    >
                      <div className="mb-2 sm:mb-0 p-2 px-3 rounded-full bg-brand-bold text-gray-700 mr-3">
                        <p className="text-xs">
                          {property?.balcony}{' '}
                          {Number(property?.balcony) > 1
                            ? 'balcons'
                            : 'balcon'}
                        </p>
                      </div>
                    </ShowWidget>
                    <ShowWidget
                      condition={!loading_}
                      fallback={
                        <div className="h-8 w-16 rounded-full mr-3 bg-gray-200 animate-pulse" />
                      }
                    >
                      <div className="mb-2 sm:mb-0 p-2 px-3 rounded-full bg-brand-bold text-gray-700 mr-3">
                        <p className="text-xs">
                          {property?.parking}{' '}
                          {Number(property?.parking) > 1
                            ? 'parkings'
                            : 'parking'}
                        </p>
                      </div>
                    </ShowWidget>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-1 sm:w-[35%] sm:pl-5 sm:pt-10 sm:pb-10 sm:pr-5">
              <div className="w-full flex border bg-white rounded-lg space-x-2 overflow-hidden">
                <ShowWidget
                  condition={!loading_}
                  fallback={
                    <div className="h-full sm:h-full w-28 sm:w-32 flex-initial  bg-gray-200 animate-pulse" />
                  }
                >
                  {/* <div className="w-full"> */}
                  <img
                    src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="agent name will be replaced here"
                    className="h-full sm:h-full w-32 sm:w-32 object-cover flex-initial"
                    onError={onImageError}
                  />
                  {/* </div> */}
                </ShowWidget>

                <div className="w-full flex-initial flex flex-col pt-3 pr-2 sm:pt-4 sm:pr-4 pl-0 sm:pl-2">
                  <div className="flex items-center space-x-2">
                    <ShowWidget condition={!loading_}>
                      <VerifiedIcon className="text-blue-500 text-xl h-6 w-6" />
                    </ShowWidget>

                    <ShowWidget
                      condition={!loading_}
                      fallback={
                        <div className="w-24 h-4 bg-gray-200 animate-pulse" />
                      }
                    >
                      <p className="text-md font-semibold">
                        {property?.firstName}
                      </p>
                    </ShowWidget>
                  </div>

                  <ShowWidget
                    condition={!loading_}
                    fallback={
                      <div className="w-full h-7 mt-3 bg-gray-200 animate-pulse" />
                    }
                  >
                    <p className="pt-2 sm:pt-0 text-xs text-gray-600">
                      Trouver toutes les maisons aux alentours de
                      Durba à bon prix... Contactez moi ou visiter mes
                      articles
                    </p>
                  </ShowWidget>

                  <div className="flex items-center space-x-3 my-3">
                    <div className="flex items-center">
                      <HouseVector className="h-3 w-3" />
                      <p className="text-xs ml-1">{3}</p>
                    </div>
                    <div className="flex items-center">
                      <HotelVector className="h-3 w-3" />
                      <p className="text-xs ml-1">{4}</p>
                    </div>
                    <div className="flex items-center">
                      <ApartmentVector className="h-3 w-3" />
                      <p className="text-xs ml-1">{2}</p>
                    </div>
                  </div>

                  <div className="flex justify-between sm:flex sm:justify-start items-center space-x-3 ">
                    <ShowWidget
                      condition={!loading_}
                      fallback={
                        <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
                      }
                    >
                      <ContactButton
                        className="bg-green-600 text-white flex items-center justify-center space-x-1 lg:space-x-2 w-full sm:w-32 sm:mb-2 pt-2 pb-2 pl-3 pr-3 rounded-lg text-xs"
                        vectorStyle="text-ehite h-4 w-4"
                      />
                    </ShowWidget>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="font-extrabold text-3xl pl-2 my-8 sm:pl-0 sm:text-5xl sm:my-8 sm:pt-20">
        Voir aussi...
      </p>

      <div className="w-full p-2 sm:p-0 sm:my-20 min-h-[500px]">
        <div className="w-full flex flex-col sm:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 gap-5 lg:gap-12 my-8">
          {renderProperties()}
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

      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default Property;
