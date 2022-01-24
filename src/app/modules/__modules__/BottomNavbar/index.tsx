import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import isExpired from 'app/modules/utils/helpers/isExpired';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import HouseVector from '../_vectors/houseVector';
import BottomNavbarItem from './BottomNavItem';
import UserVector from '../_vectors/userVector';
import GlobeVector from '../_vectors/globeVector';
import { HeartVector } from '../_vectors/heartVector';
import ProfileIcon from '../ProfileIcon';

const BottomNavbar: FC = (): JSX.Element => {
  const isAuthed = isExpired();
  const { loading, currentUser } = useProfile();
  const history = useHistory();

  return (
    <div className="w-full flex justify-between fixed bottom-0 p-3 px-5 bg-white z-10 border-t shadow-md md:hidden">
      <BottomNavbarItem
        icon={<GlobeVector />}
        title="Explorer"
        to="/"
        current={history.location.pathname === '/'}
      />
      <BottomNavbarItem
        icon={<HouseVector />}
        title="Immobiliers"
        to="/properties"
        current={history.location.pathname === '/properties'}
      />
      <BottomNavbarItem
        icon={<HeartVector className="h-6 w-6" />}
        title="Favoris"
        to="/wishlists"
        current={history.location.pathname === '/wishlists'}
      />
      <BottomNavbarItem
        icon={
          !isAuthed ? (
            <ProfileIcon
              image={!loading ? `${currentUser.picture}` : ''}
            />
          ) : (
            <UserVector
              className="h-6 w-6"
              stroke="black"
              strokeOpacity="1"
            />
          )
        }
        title={!isAuthed ? 'Profil' : 'Connexion'}
        to={!isAuthed ? '/profile' : '/login'}
        current={history.location.pathname === '/profile'}
      />
    </div>
  );
};

export default BottomNavbar;
