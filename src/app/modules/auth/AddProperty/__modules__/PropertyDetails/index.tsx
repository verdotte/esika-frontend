import React from 'react';
import { Link } from 'react-router-dom';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import useFetchCurrentUser from 'app/modules/Hooks/useFetchCurrentUser';
import Title from '../Title';
import FloatingInputProperty from '../FloatingInputProperty';
import SelectInputProperty from '../SelectInputProperty';

const AddPropertyDetails = () => {
  useFetchCurrentUser();
  const { currentUser } = useProfile();

  return (
    <div className="pt-24 sm:pt-7 mx-2 sm:mx-0">
      <Title name="Les details de l'immobilier" />
      <div className="w-full flex items-center justify-center p-0 px-2 py-10 sm:px-16 sm:py-16 mt-8 pb-8 bg-white border border-gray-100 rounded-xl">
        <div className="w-full sm:w-[85%]">
          <div className="mb-8">
            <p className="mb-2 text-sm text-black">
              Quel est le titre de votre immobilier ?
            </p>
            <FloatingInputProperty name="titre" label="Titre" />
          </div>
          <div className="mb-8">
            <p className="mb-2 text-sm text-black">
              Comment decrivez-vous votre immobilier ?
            </p>

            <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-0 overflow-hidden">
              <div className="w-full relative">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  placeholder="Bio"
                  className="w-[95%] pl-2 peer outline-none resize-none text-black font-medium placeholder-transparent bg-transparent"
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  htmlFor="bio"
                  className="absolute left-2 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-0.5"
                >
                  Description
                </label>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-2 text-sm text-black">
              Quelle est la categorie de votre immobilier ?
            </p>
            <SelectInputProperty name="categorie" />
          </div>
          <div className="w-full mb-6 flex items-center justify-between">
            <div className="w-3/5">
              <p className="mb-2 text-sm text-black">
                Quel est le prix de votre immobilier ?
              </p>
              <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center justify-between">
                <div className="w-3/5 sm:w-[65%] flex items-center pt-6 pb-2 pl-4 pr-0 overflow-hidden">
                  <div className="w-full h-6 relative pl-2 pb-1">
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="Price"
                      className="w-[85%] absolute -top-0.3 peer outline-none text-black font-medium placeholder-transparent bg-transparent"
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label
                      htmlFor="Titre"
                      className=" absolute left-2 -top-3.5 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-1.5"
                    >
                      Price
                    </label>
                  </div>
                </div>

                <div className="w-2/5 sm:w-[35%] py-2">
                  <div className="px-3 py-2 border-l border-gray-300 inline-block relative">
                    <select
                      name="categorie"
                      className="appearance-none block w-full text-black font-medium focus:outline-none"
                      onBlur={() => null}
                    >
                      <option value="DEFAULT" disabled>
                        Sélectionner la devise
                      </option>
                      <option value="USD">USD</option>
                      <option value="CDF">CDF</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-[01%] flex items-center px-2 text-gray-700">
                      <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/5 pl-5">
              <p className="mb-2 text-sm text-black">
                Durée de paiement
              </p>
              <div className="mb-3 px-4 py-4 border border-gray-300 rounded-md">
                <div className="w-full inline-block relative">
                  <select
                    name="categorie"
                    className="appearance-none block w-full text-black font-medium focus:outline-none"
                    onBlur={() => null}
                  >
                    <option value="DEFAULT" disabled>
                      Sélectionner la durée de paiement
                    </option>
                    <option value="House">Mois</option>
                    <option value="Hotel">Jour</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-[01%] flex items-center px-2 text-gray-700">
                    <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Link to={`/${currentUser.firstName}/ajouter/adresse`}>
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

export default AddPropertyDetails;
