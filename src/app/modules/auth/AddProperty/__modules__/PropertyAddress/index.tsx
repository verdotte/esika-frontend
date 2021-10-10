import React from 'react';
import { Link } from 'react-router-dom';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import useFetchCurrentUser from 'app/modules/Hooks/useFetchCurrentUser';
import SpecInput from './SpecInput';
import Title from '../Title';
import FloatingInputProperty from '../FloatingInputProperty';

const PropertyAddress = () => {
  useFetchCurrentUser();
  const { currentUser } = useProfile();

  return (
    <div className="pt-24 sm:pt-7 mx-2 sm:mx-0">
      <Title
        name="Les détails sur le type et l' adresse de l'
          immobilier"
        isLong
      />
      <div className="w-full flex items-center justify-center p-0 px-2 py-5 sm:px-16 sm:py-16 mt-8 pb-8 bg-white border border-gray-100 rounded-xl">
        <div className="w-full sm:w-[85%] ">
          <div className="mb-8">
            <p className="mb-2 text-sm text-black">
              Quel est le type correspondant le mieux à votre
              immobilier ?
            </p>
            <div className="mb-3 px-4 py-4 border border-gray-300 rounded-md">
              <div className="w-full inline-block relative">
                <select
                  name="categorie"
                  className="appearance-none block w-full text-black font-medium focus:outline-none"
                  onBlur={() => null}
                >
                  <option value="DEFAULT" disabled>
                    Sélectionner la catégorie de votre immobilier
                  </option>
                  <option value="House">Maison</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Land">Parcelle</option>
                  <option value="Apartment">Appartements</option>
                  <option value="Commercial">Magasins</option>
                  <option value="Studio">Studio</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-[01%] flex items-center px-2 text-gray-700">
                  <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2 text-sm text-gray-400">
              Si possible, veuillez specifier le nombre exact de
              chambre, douche, balcon et parking.
            </p>

            <div className="w-full mt-4 flex ">
              <SpecInput name="Chambre" />
              <SpecInput name="Douche" />
              <SpecInput name="Balcon" />
              <SpecInput name="Parking" isTheLast />
            </div>
          </div>

          <div className="w-full mb-6 flex justify-between">
            <div className="w-3/5">
              <p className="mb-2 text-sm text-black">
                Dans quel pays trouve l&apos;immobilier ?
              </p>
              <div className="w-full px-4 py-4  border border-gray-300 rounded-md">
                <div className="inline-block relative">
                  <select
                    name="categorie"
                    className="appearance-none block w-full text-black font-medium focus:outline-none"
                    onBlur={() => null}
                  >
                    <option value="DEFAULT" disabled>
                      Sélectionner la catégorie de votre immobilier
                    </option>
                    <option value="House">DRC</option>
                    <option value="Hotel">Uganda</option>
                    <option value="Land">Rwanda</option>
                    <option value="Apartment">Tanzanie</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-[01%] flex items-center px-2 text-gray-700">
                    <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/5 pl-5 self-end">
              <p className="mb-2 text-sm text-black">Region/City</p>
              <div className="w-full px-4 py-4  border border-gray-300 rounded-md">
                <div className="inline-block relative">
                  <select
                    name="categorie"
                    className="appearance-none block w-full text-black font-medium focus:outline-none"
                    onBlur={() => null}
                  >
                    <option value="DEFAULT" disabled>
                      Sélectionner la région de votre immobilier
                    </option>
                    <option value="House">Goma</option>
                    <option value="Hotel">Kinshasa</option>
                    <option value="Land">Lubumbashi</option>
                    <option value="Apartment">Bukavu</option>
                    <option value="Commercial">Kampala</option>
                    <option value="Studio">Kigali</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-[01%] flex items-center px-2 text-gray-700">
                    <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-2 text-sm text-black">
              L&apos; adresse compléte de votre immobilier ?
            </p>
            <FloatingInputProperty
              name="addresse"
              label="Adresse compléte"
            />
          </div>

          <div className="flex items-center justify-end">
            <Link to={`/${currentUser.firstName}/ajouter/images`}>
              <button
                type="submit"
                className="px-6 py-3 bg-brand-bold text-white text-sm rounded-md"
              >
                Continuer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAddress;
