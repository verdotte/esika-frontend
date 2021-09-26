import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import SettingVector from 'app/modules/__modules__/_vectors/settingVector';
import InboxVector from 'app/modules/__modules__/_vectors/inboxVector';
import PhoneVector from 'app/modules/__modules__/_vectors/phoneVector';
import LogoutVector from 'app/modules/__modules__/_vectors/logoutVector';
import ProfileImage from 'app/modules/__modules__/ProfileImage';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import useLogout from 'app/modules/Hooks/useLogout';
import useFetchCurrentUser from './UseFetchCurrentUser';

const ProfileContainer = () => {
  const { loading, currentUser } = useProfile();

  useFetchCurrentUser();

  const { onLogout } = useLogout();

  return (
    <>
      <div className="container mx-auto px-0 md:px-8 py-4 no-scrollbars">
        <div className="h-full mt-3 mb-16 md:mt-2 mx-4 sm:mx-0">
          <div className="pb-5 border-b border-gray-300 flex justify-start items-center">
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
              }
            >
              <ProfileImage />
            </ShowWidget>
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="block h-8 w-44 ml-4 bg-gray-200 animate-pulse" />
              }
            >
              <div className="ml-4 block sm:hidden">
                <p className="sm:line-clamp-1 text-md sm:text-xl font-bold">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-xs sm:text-xl underline">
                  Voir mon profile
                </p>
              </div>
            </ShowWidget>
          </div>
          <div className="py-10 border-b border-gray-300">
            <Link to="/profile/infos">
              <div className="flex justify-start items-center">
                <SettingVector className="h-6 w-6 text-gray-500" />
                <p className="ml-3 py-1 text-sm sm:text-xl text-gray-800">
                  Informations personnelles
                </p>
              </div>
            </Link>
            <Link to="/profile/compte">
              <div className="flex justify-start items-center">
                <SettingVector className="h-6 w-6 text-gray-500" />
                <p className="ml-3 py-1 text-sm sm:text-xl text-gray-800">
                  Mon compte
                </p>
              </div>
            </Link>
            <Link to="/profile/contacts">
              <div className="flex justify-start items-center">
                <SettingVector className="h-6 w-6 text-gray-500" />
                <p className="ml-3 py-1 text-sm sm:text-xl text-gray-800">
                  Contacts
                </p>
              </div>
            </Link>
          </div>
          <div className="pt-3 pb-6 border-b border-gray-300">
            <p className="py-1 text-sm text-gray-700 sm:text-xl">
              Analytics
            </p>

            <div className="py-3 flex justify-start items-center">
              <SettingVector className="h-6 w-6 text-gray-500" />
              <p className="ml-2 py-1 text-sm sm:text-xl text-gray-800">
                Statistiques
              </p>
            </div>
          </div>
          <div className="pt-3 pb-8 border-b border-gray-300">
            <p className="pt-1 pb-3 text-sm text-gray-700 sm:text-xl">
              Support
            </p>
            <div className="py-2 flex justify-start items-center">
              <PhoneVector className="h-6 w-6 text-gray-500" />
              <p className="ml-2 text-sm sm:text-xl text-gray-800">
                (+243) 976 890 483
              </p>
            </div>
            <div className="py-2 flex justify-start items-center">
              <InboxVector className="h-6 w-6 text-gray-500" />
              <p className="ml-2 text-sm sm:text-xl text-gray-800">
                support@esika.com
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="pt-5 flex justify-start items-center"
          >
            <LogoutVector className="h-6 w-6 text-gray-500" />
            <p className="ml-2 text-sm sm:text-xl text-gray-800">
              Logout
            </p>
          </button>
          <div className="mt-8 p-4 w-full flex justify-around flex-wrap">
            <p className="text-xs my-1 underline">FAQ</p>
            <p className="text-xs my-1 underline">A propos de nous</p>
            <p className="text-xs my-1 underline">
              Termes et conditions
            </p>
            <p className="text-xs my-1 underline">
              Politique de confidentialite
            </p>
          </div>
        </div>
        <BottomNavbar />
      </div>
    </>
  );
};

export default ProfileContainer;
