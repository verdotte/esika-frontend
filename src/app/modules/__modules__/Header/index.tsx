import React, { memo, FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import isExpired from 'app/modules/utils/helpers/isExpired';
import useResponsive from 'app/modules/Hooks/useResponsive';
import ShowWidget from '../ShowWidget';
import UserVector from '../_vectors/userVector';
import HamburgerVector from '../_vectors/hamburgerVector';
import DropdownMenu from '../DropdownMenu';
import SearchInputBar from './SearchInputBar';

interface IProps {
  onSearchClick?: () => void;
  showSearchBar?: boolean;
  className?: string | null;
  action?: { name: string; push: string };
}

const defaultProps: IProps = {
  onSearchClick: () => null,
  showSearchBar: true,
  className: 'sticky top-0 z-10',
  action: {
    name: 'Creer un compte',
    push: '/register',
  },
};

const Header: FC<IProps> = ({
  onSearchClick,
  showSearchBar = true,
  className,
  action,
}): JSX.Element => {
  const history = useHistory();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile] = useResponsive();

  const onToggleMenu = () => {
    setIsExpanded((expandState) => !expandState);
  };

  return (
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
        <SearchInputBar onClick={onSearchClick} />
      </ShowWidget>

      <ShowWidget
        condition={isExpired()}
        fallback={
          <ShowWidget
            condition={!isMobile}
            fallback={
              <SearchInputBar
                className="flex items-center border rounded-full p-3 py-2 px-4 space-x-2 shadow-md text-black cursor-pointer"
                vectorClassName="h-5 w-5"
                onClick={onSearchClick}
              />
            }
          >
            <div className="relative">
              <button
                type="button"
                onClick={onToggleMenu}
                className="md:border rounded-full flex items-center justify-center p-4 py-2 space-x-3"
              >
                <HamburgerVector />
                <UserVector className="h-6 w-6 text-brand-bold" />
              </button>
              <div className="relative">
                <ShowWidget condition={isExpanded}>
                  <DropdownMenu
                    isExpanded={isExpanded}
                    onExpand={onToggleMenu}
                  />
                </ShowWidget>
              </div>
            </div>
          </ShowWidget>
        }
      >
        {isMobile ? (
          <SearchInputBar
            className="flex items-center border rounded-full p-3 py-2 px-4 space-x-2 shadow-md text-black cursor-pointer"
            vectorClassName="h-5 w-5"
            onClick={onSearchClick}
          />
        ) : (
          <button
            type="button"
            onClick={() => history.push(action?.push || '/register')}
            className="md:border rounded-lg flex items-center justify-center p-4 space-x-3 w-auto lg:w-1/4 bg-brand-bold text-white"
          >
            <UserVector />
            <p className="hidden md:block">{action?.name}</p>
          </button>
        )}
      </ShowWidget>
    </div>
  );
};

Header.defaultProps = defaultProps;

export default memo(Header);
