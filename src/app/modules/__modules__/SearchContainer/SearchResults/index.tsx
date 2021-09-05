/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { FC, forwardRef } from 'react';
import {
  AutocompleteState,
  AutocompleteApi,
} from '@algolia/autocomplete-core';
import { AutocompleteItem } from 'app/modules/@Types';
import ShowWidget from '../../ShowWidget';

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
                        <li
                          key={item.objectID}
                          className="mb-3"
                          {...autocomplete.getItemProps({
                            item,
                            source,
                          })}
                        >
                          <div className="flex w-full space-x-3">
                            <div className="w-14 md:w-16">
                              <img
                                src={item.image}
                                alt={item.title}
                                width="40"
                                height="40"
                                className="w-14 md:w-16 h-14 md:h-16 object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <div
                                className="aa-ItemContentTitle"
                                dangerouslySetInnerHTML={{
                                  __html: item._highlightResult?.title
                                    ?.value as string,
                                }}
                              />
                            </div>
                            <button
                              className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                              type="button"
                              title="Select"
                              style={{ pointerEvents: 'none' }}
                            >
                              <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                              </svg>
                            </button>
                          </div>
                        </li>
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
