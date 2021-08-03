import React, { FC } from 'react';
import isExpired from 'app/modules/utils/helpers/isExpired';
import browserHistory from 'app/modules/utils/helpers/browserHistory';
import HouseVector from '../_vectors/houseVector';
import BottomNavbarItem from './BottomNavItem';
import UserVector from '../_vectors/userVector';
import CategoryVector from '../_vectors/categoryVector';
import GlobeVector from '../_vectors/globeVector';

const BottomNavbar: FC = (): JSX.Element => {
  const isAuthed = isExpired();
  const path = browserHistory.location.pathname;

  return (
    <div className="w-full flex justify-between fixed bottom-0 p-3 px-5 bg-white z-20 border-t shadow-md md:hidden">
      <BottomNavbarItem
        icon={<HouseVector />}
        title="Home"
        to="/"
        current={path === '/'}
      />
      <BottomNavbarItem
        icon={<GlobeVector />}
        title="Explorer"
        to="/"
        current={path === '/explorer'}
      />
      <BottomNavbarItem
        icon={<CategoryVector />}
        title="Category"
        to="/"
        current={path === '/category'}
      />
      <BottomNavbarItem
        icon={<UserVector />}
        title={!isAuthed ? 'Profile' : 'Login'}
        to={!isAuthed ? '/profile' : '/login'}
        current={path === '/profile'}
      />
    </div>
  );
};

export default BottomNavbar;
