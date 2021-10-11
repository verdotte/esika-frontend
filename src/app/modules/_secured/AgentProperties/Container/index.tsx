import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFetchProperties from 'app/modules/Hooks/useFetchProperties';
import { groupBy, isEmpty } from 'app/modules/utils/helpers';
import { IProperty } from 'app/modules/@Types';
import ShowWidget from 'app/modules/__modules__/ShowWidget';

const CAgentProperties = () => {
  const { properties, loading, loadingExplorer } =
    useFetchProperties();

  const groupedProperties = useMemo(
    () => groupBy(properties, (property) => property.category),
    [properties],
  );

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
              <div className="w-full flex flex-shrink-0 overflow-x-auto no-scrollbars snap-x-mandatory scroll-padding-4">
                {chunkedProperties.map((property) => (
                  <div
                    className="flex-shrink-0 w-4/5 md:w-2/6 lg:w-1/5 mr-3 first:ml-4 snap-start"
                    key={`property_${property.propertyId}`}
                  >
                    <div className="h-48 md:h-52 relative rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={property.image as string}
                        alt={property.title as string}
                        className="h-full w-full md:w-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black">
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
                  </div>
                ))}
                <ShowWidget condition={chunkedProperties.length > 6}>
                  <div className="square h-48 md:h-52 w-2/4 md:w-2/6 lg:w-1/5 relative flex flex-col justify-center items-center bg-brand-thin rounded-xl mr-3">
                    <Link
                      to={`/profile/properties/${key}`}
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
