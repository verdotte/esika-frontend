import React, { memo } from 'react';

interface IProps {
  onSearch?: () => void;
}

const defaultProps: IProps = {
  onSearch: () => null,
};

const Header = ({ onSearch }: IProps) => {
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

      <button
        type="button"
        className="md:border border-brand-bold rounded-lg flex items-center justify-center p-4 space-x-3 w-auto lg:w-1/4"
      >
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
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-black hidden md:block">Creer un compte</p>
      </button>
    </div>
  );
};

Header.defaultProps = defaultProps;

export default memo(Header);
