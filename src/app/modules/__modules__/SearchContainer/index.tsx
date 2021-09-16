/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, memo } from 'react';
import ShowWidget from '../ShowWidget';
import Autocomplete from './AutoComplete';

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
          <Autocomplete
            placeholder="Rechercher des immobiliers"
            openOnFocus
          />
        </div>
      </div>
    </ShowWidget>
  );
};

SearchContainer.defaultProps = defaultProps;

export default memo(SearchContainer);
