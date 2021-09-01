/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, memo } from 'react';
import ShowWidget from '../ShowWidget';
import SearchVector from '../_vectors/searchVector';

interface Props {
  show?: boolean;
  onClose?: () => void;
}

const defaultProps: Props = {
  show: false,
  onClose: () => null,
};

const SearchContainer: FC<Props> = ({
  show,
  onClose,
}: Props): JSX.Element => {
  return (
    <ShowWidget condition={!!show}>
      <div
        className="search fixed inset-0 flex justify-center items-start bg-gray-400/50 text-base z-30 overflow-hidden xl:pt-40 xl:pb-32 xl:px-40"
        role="none"
        onClick={onClose}
      >
        <div
          className="xl:max-w-1040 w-full flex flex-col justify-between bg-white shadow-md xl:rounded-lg"
          role="none"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center flex-none border-b h-16 md:h-20 px-3 md:px-4 lg:px-6 space-x-2 border-transparent">
            <form className="w-full flex space-x-3 border-r focus-within:text-brand-bold">
              <SearchVector />
              <input
                className="w-full bg-transparent focus:text-black active:border-none outline-none appearance-none caret-brand-bold"
                aria-autocomplete="both"
                aria-labelledby="search-label"
                id="search-input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                placeholder="Rechercher des immobiliers"
                maxLength={512}
                type="search"
                enterKeyHint="go"
              />
            </form>
            <button
              type="button"
              className="text-xs text-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ShowWidget>
  );
};

SearchContainer.defaultProps = defaultProps;

export default memo(SearchContainer);
