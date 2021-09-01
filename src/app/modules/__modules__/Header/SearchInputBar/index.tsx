import React, { FC } from 'react';

interface Props {
  onClick?: () => void;
  className?: string;
}

const defaultProps: Props = {
  onClick: () => null,
  className:
    'hidden md:flex items-center border rounded-full p-4 px-6 space-x-3 md:w-1/3 text-black cursor-pointer',
};

const SearchInputBar: FC<Props> = ({
  className,
  onClick,
}: Props): JSX.Element => {
  return (
    <div className={className} role="none" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <p className="text-gray-500">Recherche...</p>
    </div>
  );
};

SearchInputBar.defaultProps = defaultProps;

export default SearchInputBar;
