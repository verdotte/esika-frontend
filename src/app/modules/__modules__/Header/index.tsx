import React, { memo, FC } from 'react';
import ShowWidget from '../ShowWidget';
import UserVector from '../_vectors/userVector';

interface IProps {
  onSearch?: () => void;
  showSearchBar?: boolean;
}

const defaultProps: IProps = {
  onSearch: () => null,
  showSearchBar: true,
};

const Header: FC<IProps> = ({
  onSearch,
  showSearchBar = true,
}): JSX.Element => {
  return (
    <div className="w-full flex justify-between py-3 md:py-8 sticky top-0 z-10 bg-white px-3 md:px-0 border-b shadow-sm md:border-none md:shadow-none">
      <div className="w-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Esika
        </h1>
        <p className="text-xs md:text-sm xl:text-md">
          Trouver une maison
        </p>
      </div>

      <ShowWidget condition={showSearchBar}>
        <div className="hidden md:flex items-center border border-brand-bold rounded-xl p-4 space-x-3 md:w-1/3 bg-brand-thin text-black">
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
          <input
            type="text"
            placeholder="Recherche..."
            onChange={onSearch}
            className="w-full bg-transparent focus:border-none active:border-none outline-none appearance-none placeholder-black"
          />
        </div>
      </ShowWidget>

      <button
        type="button"
        className="md:border border-brand-bold rounded-lg flex items-center justify-center p-4 space-x-3 w-auto lg:w-1/4"
      >
        <UserVector />
        <p className="text-black hidden md:block">Creer un compte</p>
      </button>
    </div>
  );
};

Header.defaultProps = defaultProps;

export default memo(Header);
