import React from 'react';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import placeholderImg from 'app/static/images/placeholder.jpg';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { onImageError } from 'app/modules/utils/helpers';

const PersonalInfos = () => {
  return (
    <div>
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <div className=" h-full mt-4 mb-16 md:mt-2 ml-5 mr-4 sm:mx-0">
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
                <div className="block w-16 h-16">
                  <img
                    src={placeholderImg}
                    alt="User avatar"
                    className="w-16 h-16 sm:w-16 sm:h-16 rounded-full object-cover"
                    onError={onImageError}
                  />
                </div>
              </ShowWidget>
            </div>
            <p className="py-2 text-sm sm:text-xl text-center text-blue-700">
              Ajouter une photo de profile
            </p>
          </div>
          <div className="py-5 border-b border-gray-300 flex justify-between items-center">
            <div className="block">
              <p className="text-sm sm:text-xl">Prenom</p>
              <p className="pt-1 text-sm sm:text-xl text-gray-700">
                Eliezer
              </p>
            </div>
            <p className="text-sm sm:text-xl text-blue-700">
              Modifier
            </p>
          </div>
          <div className="py-6 border-b border-gray-300 flex justify-between items-center">
            <div className="block">
              <p className="text-sm sm:text-xl">Nom de Famille</p>
              <p className="pt-1 text-sm sm:text-xl text-gray-700">
                Basubi
              </p>
            </div>
            <p className="text-sm sm:text-xl text-blue-700">
              Modifier
            </p>
          </div>
          <div className="py-6 border-b border-gray-300 flex justify-between items-center">
            <div className="block">
              <p className="text-sm sm:text-xl">
                Numero de Telephone
              </p>
              <p className="pt-1 text-sm sm:text-xl text-gray-700">
                (+256) 705 875 483
              </p>
            </div>
            <p className="text-sm sm:text-xl text-blue-700">
              Modifier
            </p>
          </div>
          <div className="my-6 flex justify-between items-center">
            <div className="block">
              <p className="text-sm sm:text-xl">Addresse</p>
              <p className="pt-1 text-sm sm:text-xl text-gray-700">
                Information non fournie
              </p>
            </div>
            <p className="text-sm sm:text-xl text-blue-700">
              Modifier
            </p>
          </div>
        </div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default PersonalInfos;
