// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import ProfileImage from 'app/modules/__modules__/ProfileImage';
import InfoItem from '../InfoItem';
import NameForm from '../NameForm';
import NumberForm from '../NumberForm';
import AddressForm from '../AddressForm';

const PersonalInfosPage = () => {
  const { editMode } = useProfile();
  const history = useHistory();

  return (
    <div>
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <div className="h-full mt-6 mb-16 md:mt-2 ml-6 mr-5 sm:mx-0">
          <div className="flex items-center">
            <span
              className="ml-[-1.3rem]"
              onClick={() => {
                return history.push('/profile');
              }}
            >
              <ChevronLeftVector className="h-8 w-8 text-gray-500" />
            </span>
            <p className="ml-3 py-1 text-[1rem] sm:text-xl text-gray-800">
              Informations Personnelles
            </p>
          </div>
          <div className="py-6">
            <div className="flex justify-center items-center">
              <ShowWidget
                condition
                fallback={
                  <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
                }
              >
                <ProfileImage />
              </ShowWidget>
            </div>
            <div className="flex justify-center items-center">
              <label>
                <span
                  className={`py-2 text-sm sm:text-xl text-center transition-all duration-100 ${
                    editMode ? 'text-gray-400' : 'text-blue-500'
                  }`}
                >
                  Ajouter une photo de profile
                </span>
                <input
                  type="file"
                  className="hidden"
                  disabled={editMode}
                />
              </label>
            </div>
          </div>
          <InfoItem key="Prenom" label="Prenom" data="Eliezer">
            <NameForm defaultValue="Eliezer" label="Prénom" />
          </InfoItem>
          <InfoItem
            key="Post_nom"
            label="Nom de Famille"
            data="Basubi"
          >
            <NameForm defaultValue="Basubi" label="Nom de Famille" />
          </InfoItem>
          <InfoItem
            key="Numero"
            label="Numero de Telephone"
            data="(+256) 705 875 483"
          >
            <NumberForm data="705 875 483" />
          </InfoItem>
          <InfoItem
            key="Addresse"
            label="Addresse"
            data="Information non fournie"
          >
            <AddressForm label="Prenom" />
          </InfoItem>
        </div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default PersonalInfosPage;
