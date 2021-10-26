import React, { FC, LegacyRef, memo } from 'react';
import { Link } from 'react-router-dom';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import useFetchCurrentUser from 'app/modules/Hooks/useFetchCurrentUser';
import Title from '../Title';
import FloatingInputProperty from '../FloatingInputProperty';
import SelectInputProperty from '../SelectInputProperty';
import { useAddPropperty } from 'app/modules/Contexts/AddPropertyContext';
import { SUPPORTED_CURRENCIES, SUPPORTED_TYPES, SUPPORTED_UNITS } from 'app/modules/utils/helpers';

const AddPropertyDetails: FC = (): JSX.Element => {
  useFetchCurrentUser();
  // const { currentUser } = useProfile();

  const {
    formRef,
    errors,
    isPerforming,
    onClearMessage,
    onTitleChange,
    onDescriptionChange,
    onCategoryChange,
    onUnitChange,
    onPriceChange,
    onCityChange,
    onCurrencyChange,
    onTypeChange,
    onAddDetailsProperty
  } = useAddPropperty();

  console.log('errors ==>', errors);

  return (
    <div className="pt-24 sm:pt-7 mx-2 sm:mx-0">
      <Title name="Les details de l'immobilier" />
      <div className="w-full flex items-center justify-center p-0 px-2 py-10 sm:px-16 sm:py-16 mt-8 pb-8 bg-white border border-gray-100 rounded-xl">
        <form
          ref={formRef as LegacyRef<HTMLFormElement> | undefined}
          onSubmit={onAddDetailsProperty}
          autoComplete="off"
          className="w-full"
        >

          <div className="w-full sm:w-[85%]">
            <div className="mb-8">
              <p className="mb-2 text-sm text-black">
                Quel est le titre de votre immobilier ?
              </p>
              <FloatingInputProperty name="title" label="Titre" onChange={onTitleChange} />
              <div className="mb-2" >
                <p className="text-sm text-red-400">{errors.title}</p>
              </div>
            </div>
            <div className="mb-8">
              <p className="mb-2 text-sm text-black">
                Comment decrivez-vous votre immobilier ?
              </p>

              <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-0 overflow-hidden">
                <div className="w-full relative">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    placeholder="Description"
                    className="w-[95%] pl-2 peer outline-none resize-none text-black font-medium placeholder-transparent bg-transparent"
                    onChange={onDescriptionChange}
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
              <div className="mb-2" >
                <p className="text-sm text-red-400">{errors.description}</p>
              </div>
            </div>
            <div className="mb-8">
              <p className="mb-2 text-sm text-black">
                Quelle est la categorie de votre immobilier ?
              </p>
              <SelectInputProperty name="category" onSelectChange={onCategoryChange} />
              <div className="mb-2" >
                <p className="text-sm text-red-400">{errors.category}</p>
              </div>
            </div>
            <div className="mb-8">
              <p className="mb-2 text-sm text-black">
                Quelle est le type de votre immobilier ?
              </p>
              <SelectInputProperty name="category" defaultOption="Sélectionner le type de votre immobilier" onSelectChange={onTypeChange} options={SUPPORTED_TYPES} />
              <div className="mb-2" >
                <p className="text-sm text-red-400">{errors.category}</p>
              </div>
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
                        type="number"
                        placeholder="Price"
                        className="w-[85%] absolute -top-0.3 peer outline-none text-black font-medium placeholder-transparent bg-transparent"
                        onChange={onPriceChange}
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

                  <SelectInputProperty
                    name="currency"
                    className="w-2/5 sm:w-[35%] py-2"
                    selectClassName="px-3 py-2 border-l border-gray-300 inline-block relative"
                    defaultOption="Sélectionner la devise"
                    onSelectChange={onCurrencyChange}
                    options={SUPPORTED_CURRENCIES}
                  />
                </div>
                <div className="mb-2" >
                  <p className="text-sm text-red-400">{errors.price ? errors.price : errors.currency}</p>
                </div>
              </div>
              <div className="w-2/5 pl-5">
                <p className="mb-2 text-sm text-black">
                  Durée de paiement
                </p>

                <SelectInputProperty
                    name="unit"
                    defaultOption="Sélectionner la durée de paiement"
                    onSelectChange={onUnitChange}
                    options={SUPPORTED_UNITS}
                  />
                <div className="mb-2" >
                  <p className="text-sm text-red-400">{errors.unit}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              {/* <Link to={`/${currentUser.firstName}/ajouter/adresse`}> */}
              <button
                type="submit"
                className={`px-6 py-3 text-sm rounded-md ${isPerforming ? 'bg-gray-400 text-white' : 'bg-brand-bold text-white'}`}
                disabled={isPerforming}
              >
                Continuer
              </button>
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(AddPropertyDetails);
