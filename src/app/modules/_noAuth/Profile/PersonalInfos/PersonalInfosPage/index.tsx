// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import ImageProfile from 'app/modules/__modules__/ImageProfile';
import InfoItem from '../InfoItem';
import NameForm from '../NameForm';
import NumberForm from '../NumberForm';
import AddressForm from '../AddressForm';

const PersonalInfosPage = () => {
  const { editMode } = useProfile();

  return (
    <div>
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <div className="h-full mt-4 mb-16 md:mt-2 ml-6 mr-5 sm:mx-0">
          <div className="flex items-center">
            <ChevronLeftVector className="h-6 w-6 text-gray-500" />
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
                <ImageProfile />
              </ShowWidget>
            </div>
            <div className="flex justify-center items-center">
              <label>
                <span
                  className={`py-2 text-sm sm:text-xl text-center transition-all duration-100 ${
                    editMode ? 'text-gray-400' : 'text-blue-700'
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
            <NameForm data="Eliezer" label="Prénom" />
          </InfoItem>
          <InfoItem
            key="Post_nom"
            label="Nom de Famille"
            data="Basubi"
          >
            <NameForm data="Basubi" label="Nom de Famille" />
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
