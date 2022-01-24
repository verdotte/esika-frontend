// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import StarVector from 'app/modules/__modules__/_vectors/starVector';
import CheckVector from 'app/modules/__modules__/_vectors/checkVector';
import ProfileImage from 'app/modules/__modules__/ProfileImage';
// eslint-disable-next-line import/namespace
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import useFetchCurrentUser from '../UseFetchCurrentUser';

const Account = () => {
  const {
    code,
    loading,
    currentUser,
    currentUserNumber,
    onFetchProperties,
    properties,
  } = useProfile();

  const history = useHistory();

  useEffect(() => {
    if (!properties.length) {
      onFetchProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchProperties]);

  useFetchCurrentUser();

  // once we have agent and properties we will replace the name "Verdote" with `${currentUser.firstName}`
  const agentProperties = properties.filter(
    (propertie) => propertie.firstName === 'Verdotte',
  );
  const houseIndex = agentProperties.filter(
    (agentPropertie) => agentPropertie.category === 'House',
  ).length;
  const hotelIndex = agentProperties.filter(
    (agentPropertie) => agentPropertie.category === 'Hotel',
  ).length;
  const appartementIndex = agentProperties.filter(
    (agentPropertie) => agentPropertie.category === 'Appartement',
  ).length;

  return (
    <div>
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <div className="h-full mt-4 mb-16 md:mt-2 mx-7 sm:mx-0">
          <div className="ml-[-1.3rem] pb-4">
            <span
              onClick={() => {
                return history.push('/profile');
              }}
            >
              <ChevronLeftVector className="h-8 w-8 text-gray-500" />
            </span>
          </div>
          <div className="pb-9 flex justify-between items-center">
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="block h-8 w-44 bg-gray-200 animate-pulse" />
              }
            >
              <div className="block sm:hidden">
                <p className="sm:line-clamp-1 text-[1.1rem] sm:text-xl font-bold">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-xs sm:text-xl underline">
                  Modifier mon profile
                </p>
              </div>
            </ShowWidget>
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
              }
            >
              <ProfileImage image={currentUser.picture as string} />
            </ShowWidget>
          </div>
          <div className="py-4">
            <p className="text-sm sm:text-xl">Numero de Telephone</p>
            <div className="pt-1 flex items-center">
              <CheckVector className="text-green-600 text-sm h-6 w-6" />
              <p className="pl-1 text-sm sm:text-xl text-gray-700">
                {code} {currentUserNumber}
              </p>
            </div>
          </div>
          <div className="pt-4 pb-6 border-b border-gray-300">
            <p className="text-sm sm:text-xl">Adresse</p>
            <p className="pt-1 text-sm sm:text-xl text-gray-700">
              {currentUser.address
                ? `${currentUser.address}`
                : 'Adresse non fournie'}
            </p>
          </div>
          <div className="py-5 flex justify-between items-center border-b border-gray-300">
            <p className="text-sm sm:text-xl">Reviews</p>
            <div className="flex justify-start items-center">
              <p className="py-1 text-[1.2rem] sm:text-xl">0</p>
              <StarVector className="ml-2 h-5 w-5 font-bold" />
            </div>
          </div>
          <div className="pt-6">
            <p className="text-sm sm:text-xl">Statistiques</p>
          </div>
          <div className="py-5 flex justify-around items-center">
            <div className="py-1 px-5 rounded-lg shadow-xl border border-gray-200">
              <p className="py-1 text-sm sm:text-xl text-center">
                {hotelIndex}
              </p>
              <p className="py-1 text-sm sm:text-xl">Hotel</p>
            </div>
            <div className="py-1 px-5 rounded-lg shadow-xl border border-gray-200">
              <p className="py-1 text-sm sm:text-xl text-center">
                {appartementIndex}
              </p>
              <p className="py-1 text-sm sm:text-xl">Appartement</p>
            </div>
            <div className="py-1 px-5 rounded-lg shadow-xl border border-gray-200">
              <p className="py-1 text-sm sm:text-xl text-center">
                {houseIndex}
              </p>
              <p className="py-1 text-sm sm:text-xl">Maison</p>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Account;
