import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import LocalStorage from 'app/modules/utils/helpers/LocalStorage';
import useClickOutside from 'app/modules/Hooks/useClickOutside';
import ShowWidget from '../ShowWidget';

interface Props {
  isExpanded: boolean;
  onExpand?: () => void;
}

const defaultProps: Props = {
  isExpanded: false,
};

const DropdownMenu: FC<Props> = ({ isExpanded, onExpand }) => {
  const dropdownRef = useClickOutside(onExpand);

  return (
    <ShowWidget condition={isExpanded}>
      <div
        ref={dropdownRef}
        className="w-48 flex flex-col justify-between bg-white border rounded-md py-4 absolute right-0 top-3 shadow-lg"
      >
        <div className="flex-1">
          <div className="px-4 py-2 my-2  hover:bg-gray-100">
            <Link to="/properties" className="text-sm">
              Immobiliers
            </Link>
          </div>
          <div className="px-4 py-2 my-2 hover:bg-gray-100">
            <Link to="/wishlists" className="text-sm">
              Favoris
            </Link>
          </div>
          <div className="px-4 py-2 my-2 hover:bg-gray-100">
            <Link to="/profile" className="text-sm">
              Profil
            </Link>
          </div>
        </div>
        <div className="border-t px-4 py-2 pt-3 hover:bg-gray-100">
          <button
            type="button"
            className="text-sm"
            onClick={() => LocalStorage.removeToken()}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </ShowWidget>
  );
};

DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
