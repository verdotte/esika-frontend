/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useEffect, useMemo } from 'react';
import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { Hit } from '@algolia/client-search';
import {
  indexName,
  searchClient,
} from 'app/modules/utils/helpers/algoliaClient';
import { useSearch } from 'app/modules/Contexts/SearchContext';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import SearchVector from 'app/modules/__modules__/_vectors/searchVector';
import SearchResults from '../SearchResults';

import './style.css';

type AutocompleteItem = Hit<{
  image: string;
  title: string;
  objectID: string;
  location: string;
  resource: string;
}>;

const Autocomplete = (
  props: Partial<AutocompleteOptions<AutocompleteItem>>,
) => {
  const [autocompleteState, setAutocompleteState] = React.useState<
    AutocompleteState<AutocompleteItem>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle',
  });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const { onToggleVisibility } = useSearch();

  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'products',
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: indexName as string,
                      query,
                      params: {
                        hitsPerPage: 5,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return item.image;
              },
            },
          ];
        },
        ...props,
      }),
    [props],
  );

  const { getEnvironmentProps } = autocomplete;

  useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  return (
    <>
      <div
        className="flex items-center flex-none border-b h-16 md:h-20 px-3 md:px-4 lg:px-6 space-x-2 border-transparent"
        {...autocomplete.getRootProps({})}
      >
        <form
          className="w-full flex space-x-3 border-r focus-within:text-brand-bold"
          {...autocomplete.getFormProps({
            inputElement: inputRef.current,
          })}
        >
          <SearchVector />
          <input
            className="w-full bg-transparent focus:text-black active:border-none outline-none appearance-none caret-brand-bold"
            ref={inputRef}
            {...autocomplete.getInputProps({
              inputElement: inputRef.current,
            })}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </form>
        <button
          type="button"
          className="text-xs text-gray-500"
          onClick={onToggleVisibility}
        >
          Cancel
        </button>
      </div>
      <ShowWidget condition={autocompleteState.isOpen}>
        <SearchResults
          autocomplete={autocomplete}
          autocompleteState={autocompleteState}
          // @ts-ignore
          ref={panelRef}
        />
      </ShowWidget>
    </>
  );
};

export default Autocomplete;
