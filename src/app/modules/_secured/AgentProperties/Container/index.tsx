import { useCallback, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { groupBy, isEmpty } from 'app/modules/utils/helpers';
import { IObject, IProperty } from 'app/modules/@Types';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import paths from 'app/Routes/paths';
import useAgentProperties from 'app/modules/Hooks/useAgentProperties';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';

const CAgentProperties = () => {
  const {
    currentUserProperties,
    loading,
    loadingExplorer,
    allProperties,
    setLoading,
    setCurrentUserProperties,
  } = useAgentProperties();
  const { category } = useParams<IObject>();

  const groupedProperties = useMemo(
    () =>
      groupBy(currentUserProperties, (property) => property.category),
    [currentUserProperties],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAllProperties = () => {
    setCurrentUserProperties(allProperties);
  };

  const fetchCategory = useCallback(async () => {
    if (category) {
      setLoading(true);
      const { data } = await Service.get(
        `${ENDPOINTS.PROPERTIES_BY_CATEGORY}/${+category}`,
      );
      setLoading(false);

      if (data) {
        const { propertyList } = data;
        setCurrentUserProperties(propertyList);
      }
    }
  }, [category, setCurrentUserProperties, setLoading]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    if (!category) {
      fetchAllProperties();
    }
  }, [category, fetchAllProperties]);

  if (loadingExplorer || loading || isEmpty(groupedProperties)) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`preload_${index.toFixed()}`}>
            <div className="bg-gray-200 animate-pulse h-5 w-16 md:w-56 m-3" />
            <div className="flex md:grid md:grid-cols-4 gap-8 overflow-x-auto no-scrollbars my-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`property_${index.toFixed()}`}
                  className="square h-48 w-4/5 md:h-52 md:w-full bg-gray-200 animate-pulse rounded-xl first:ml-4"
                />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="w-full my-8">
      {!isEmpty(groupedProperties) &&
        Object.keys(groupedProperties).map((key) => {
          const chunkedProperties = groupedProperties[
            key
          ] as IProperty[];

          return (
            <div
              key={`grouped_property_${key}`}
              className="my-6 w-full"
            >
              <div className="my-4 px-4">
                <h2 className="capitalize font-bold">{key}</h2>
              </div>

              <div className=" grid md:flex grid-cols-2 flex-shrink-0 overflow-x-auto no-scrollbars snap-x-mandatory scroll-padding-4">
                {chunkedProperties.map((property) => {
                  return (
                    <Link
                      to={`${paths.Properties}/${property.slug}`}
                      className="flex-shrink-0 md:w-2/6 xl:w-1/5 mr-3 first:ml-4 snap-start "
                      key={`property_${property.propertyId}`}
                    >
                      <div className="h-48 md:h-52 relative rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={property.image as string}
                          alt={property.title as string}
                          className="h-full w-full md:w-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70">
                          <div className="absolute bottom-0 inset-x-0 p-3 text-white">
                            <div className="flex items-center justify-between">
                              <p>{property.title}</p>
                              <p className="text-xs font-bold text-red-500">
                                <span className="uppercase mr-1">
                                  {property.currency}
                                </span>
                                {property.price}
                              </p>
                            </div>
                            <p className="text-xs truncate">
                              {property.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <ShowWidget condition={chunkedProperties.length > 6}>
                  <div className="square h-48 md:h-52 w-2/4 md:w-2/6 lg:w-1/5 relative flex flex-col justify-center items-center bg-brand-thin rounded-xl mr-3">
                    <Link
                      to={`${paths.AgentProperties}/${key}`}
                      className="px-4 py-2 rounded-xl bg-brand-bold text-white md:w-9/12 text-center"
                    >
                      Voir plus
                    </Link>
                  </div>
                </ShowWidget>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CAgentProperties;
