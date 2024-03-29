import { Link } from 'react-router-dom';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import InboxVector from 'app/modules/__modules__/_vectors/inboxVector';
import PhoneVector from 'app/modules/__modules__/_vectors/phoneVector';
import LogoutVector from 'app/modules/__modules__/_vectors/logoutVector';
import ProfileImage from 'app/modules/__modules__/ProfileImage';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import useLogout from 'app/modules/Hooks/useLogout';
import ContactVector from 'app/modules/__modules__/_vectors/contactVector';
import PieChartVector from 'app/modules/__modules__/_vectors/pieChart';
import RecentActorsVector from 'app/modules/__modules__/_vectors/recentActorsVector';
import UserVector from 'app/modules/__modules__/_vectors/userVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import Restricted from 'app/modules/__modules__/Restricted';
import useFetchCurrentUser from './UseFetchCurrentUser';

const ProfileContainer = () => {
  const { loading, currentUser } = useProfile();

  useFetchCurrentUser();

  const { onLogout } = useLogout();

  return (
    <>
      <div className="container mx-auto px-0 md:px-16 lg:px-28 xl:w-3/4 2xl:w-1/2 py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-20 no-scrollbars">
        <div className="h-full mt-3 mb-16 md:mt-2 mx-4 sm:mx-0">
          <div className="pb-5 border-b border-gray-300 flex justify-start items-center">
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
              }
            >
              <ProfileImage image={currentUser.picture as string} />
            </ShowWidget>
            <ShowWidget
              condition={!loading}
              fallback={
                <div className="block h-8 w-44 ml-4 bg-gray-200 animate-pulse" />
              }
            >
              <div className="ml-4 block">
                <p className="sm:line-clamp-1 text-md sm:text-lg font-bold">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <Link to="/profile/infos">
                  <p className="text-xs sm:text-lg underline">
                    Voir mon profile
                  </p>
                </Link>
              </div>
            </ShowWidget>
          </div>
          <div className="py-10 border-b border-gray-300">
            <Link to="/profile/infos">
              <div className="flex justify-start items-center pb-2">
                <RecentActorsVector />
                <p className="ml-3 py-1 text-sm sm:text-xl text-gray-800">
                  Informations personnelles
                </p>
              </div>
            </Link>
            <Link to="/profile/compte">
              <div className="flex justify-start items-center pb-2">
                <UserVector className="h-6 w-6" />
                <p className="ml-3 py-1 text-sm sm:text-xl text-gray-800">
                  Mon compte
                </p>
              </div>
            </Link>
            <Link to="/profile/contacts">
              <div className="flex justify-start items-center">
                <ContactVector />
                <p className="ml-3 py-1 text-sm sm:text-xl text-gray-800">
                  Contacts
                </p>
              </div>
            </Link>
          </div>
          <Restricted>
            <div className="pt-3 pb-6 border-b border-gray-300">
              <Link to="/profile/properties">
                <div className="py-3 flex justify-start items-center">
                  <HouseVector />
                  <p className="ml-2 py-1 text-sm sm:text-xl text-gray-800">
                    Mes immobiliers
                  </p>
                </div>
              </Link>
            </div>
          </Restricted>
          <div className="pt-3 pb-6 border-b border-gray-300">
            <p className="py-1 text-sm text-gray-700 sm:text-xl">
              Analytics
            </p>

            <div className="py-3 flex justify-start items-center">
              <PieChartVector />
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
