/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { FC, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import {
  AutocompleteState,
  AutocompleteApi,
} from '@algolia/autocomplete-core';
import { AutocompleteItem } from 'app/modules/@Types';
import ShowWidget from '../../ShowWidget';
import LocationVector from '../../_vectors/LocationVector';

interface Props {
  autocompleteState: AutocompleteState<AutocompleteItem>;
  autocomplete: AutocompleteApi<
    AutocompleteItem,
    React.BaseSyntheticEvent,
    React.MouseEvent<Element, MouseEvent>,
    React.KeyboardEvent<Element>
  >;
}

const SearchResults: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ autocompleteState, autocomplete }, ref): JSX.Element => {
    return (
      <ShowWidget condition={autocompleteState.isOpen}>
        <div
          ref={ref}
          className={[
            'aa-Panel',
            'aa-Panel--desktop',
            autocompleteState.status === 'stalled' &&
              'aa-Panel--stalled',
          ]
            .filter(Boolean)
            .join(' ')}
          {...autocomplete.getPanelProps({})}
        >
          {autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              <section
                key={`source-${index.toFixed()}`}
                className="aa-Source border-t"
              >
                {items.length > 0 && (
                  <ul
                    className="p-3 px-3 py-4 md:px-4 lg:px-6"
                    {...autocomplete.getListProps()}
                  >
                    {items.map((item) => {
                      return (
                        <Link
                          to={`/properties/${item.objectID}`}
                          key={item.objectID}
                        >
                          <li
                            className="mb-3 p-2 hover:bg-gray-100 rounded-md"
                            {...autocomplete.getItemProps({
                              item,
                              source,
                            })}
                          >
                            <div className="flex w-full space-x-3">
                              <div className="w-14 md:w-16 peer relative">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  width="40"
                                  height="40"
                                  className="w-14 md:w-16 h-14 md:h-16 object-cover rounded-md"
                                />
                                <div
                                  className="bg-red-400 text-white p-1 px-2 rounded-tl-md rounded-br-md md:rounded-br-none text-xs absolute bottom-0 right-0"
                                  dangerouslySetInnerHTML={{
                                    __html: `$${
                                      item._highlightResult?.price
                                        ?.value as string
                                    }`,
                                  }}
                                />
                              </div>
                              <div className="flex-1 peer">
                                <div
                                  className="aa-ItemContentTitle"
                                  dangerouslySetInnerHTML={{
                                    __html: item._highlightResult
                                      ?.title?.value as string,
                                  }}
                                />
                                <div
                                  className="line-clamp-1 text-xs text-gray-700 w-full"
                                  dangerouslySetInnerHTML={{
                                    __html: item._highlightResult
                                      ?.description?.value as string,
                                  }}
                                />
                                <div className="flex items-center justify-between md:justify-start space-x-3 mt-1">
                                  <div className="flex items-center space-x-2 text-brand-bold">
                                    <LocationVector className="h-4 w-4" />
                                    <div
                                      className="line-clamp-1 text-xs"
                                      dangerouslySetInnerHTML={{
                                        __html: item._highlightResult
                                          ?.location?.value as string,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                className="pointer-events-none w-4 hidden peer-hover:block"
                                type="button"
                                title="Select"
                              >
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  className="text-gray-400"
                                >
                                  <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                </svg>
                              </button>
                            </div>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </ShowWidget>
    );
  },
);

SearchResults.displayName = 'SearchResults';

export default SearchResults;
