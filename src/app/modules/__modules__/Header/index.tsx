import React, { useState, memo, FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { onImageError } from 'app/modules/utils/helpers';
import ShowWidget from '../ShowWidget';
import UserVector from '../_vectors/userVector';

interface IProps {
  onSearch?: () => void;
  showSearchBar?: boolean;
  className?: string | null;
}

const defaultProps: IProps = {
  onSearch: () => null,
  showSearchBar: true,
  className: 'sticky top-0 z-10',
};

const Header: FC<IProps> = ({
  onSearch,
  showSearchBar = true,
  className,
}): JSX.Element => {
  const history = useHistory();
  const [menu, setMenu] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
    setBackdrop(!backdrop);
  };

  return (
    <>
      <div
        className={`w-full flex justify-between py-3 md:py-8 bg-white px-3 md:px-0 border-b shadow-sm md:border-none md:shadow-none ${className}`}
      >
        <Link to="/" className="w-auto">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Esika
          </h1>
          <p className="text-xs md:text-sm xl:text-md">
            Trouver une maison
          </p>
        </Link>

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
          onClick={handleMenu}
          // onClick={() => history.push('/register')}
          className="md:border border-brand-bold rounded-lg flex items-center justify-center p-4 space-x-3 w-auto lg:w-1/4"
        >
          <UserVector />
          <p className="text-black hidden md:block">
            Creer un compte
          </p>
        </button>
      </div>
      <div
        className={`w-4/6 h-full top-0 ${
          menu ? 'left-0' : 'left-[-100%]'
        } bg-white fixed z-40 sm:hidden transition-all duration-700`}
      >
        <div className="w-full h-[10%] bg-brand-bold p-5 flex justify-start items-center">
          <ShowWidget
            condition
            fallback={
              <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-full bg-gray-200 animate-pulse" />
            }
          >
            <img
              src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="User avatar"
              className="w-14 h-14 sm:w-24 sm:h-24 rounded-full object-cover"
              onError={onImageError}
            />
          </ShowWidget>
          <div className="ml-3">
            <p className="text-center text-md text-gray-800 sm:py-5">
              Verdotte
            </p>
          </div>
        </div>
        <ul className="w-full h-[90%] mt-3 relative p-5 life-style-type list-none ">
          <li
            role="none"
            className="my-4 text-gray-800 text-md"
            onClick={() => history.push('/add-property')}
          >
            <p>Add property</p>
          </li>
          <li
            role="none"
            className="my-4 text-gray-800 text-md"
            onClick={() => history.push('/my-properties')}
          >
            <p>My properties</p>
          </li>
          <li className="text-gray-800 text-md absolute bottom-[5%] ">
            <p>Logout</p>
          </li>
        </ul>
      </div>
      {backdrop && (
        <div
          role="none"
          onClick={handleMenu}
          className="w-full h-full bg-black bg-opacity-30 top-0 left-0 z-30 fixed sm:hidden"
        />
      )}
    </>
  );
};

Header.defaultProps = defaultProps;

export default memo(Header);
