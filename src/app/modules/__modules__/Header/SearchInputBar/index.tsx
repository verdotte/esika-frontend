import React, { FC } from 'react';
import SearchVector from '../../_vectors/searchVector';

interface Props {
  onClick?: () => void;
  className?: string;
  vectorClassName?: string;
}

const defaultProps: Props = {
  onClick: () => null,
  vectorClassName: 'h-6 w-6',
  className:
    'hidden md:flex items-center border rounded-full p-4 px-6 space-x-3 md:w-1/3 text-black cursor-pointer',
};

const SearchInputBar: FC<Props> = ({
  className,
  vectorClassName,
  onClick,
}: Props): JSX.Element => {
  return (
    <div className={className} role="none" onClick={onClick}>
      <SearchVector className={vectorClassName} />
      <p className="text-gray-500">Recherche...</p>
    </div>
  );
};

SearchInputBar.defaultProps = defaultProps;

export default SearchInputBar;
