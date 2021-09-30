import React, { useState, memo, FC } from 'react';
import CountrySelectorInput from 'app/modules/__modules__/CountrySelectorInput';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import FloatingInputLabel from '../FloatingInputLabel';

interface Props {
  editMode: boolean;
  onEditMode: () => void;
}

const AddressInput: FC<Props> = ({ editMode, onEditMode }: Props) => {
  const { currentUser, setCurrentUser } = useProfile();

  const [startProcess, setStartProcess] = useState(false);
  const [editModeProfile, setEditModeProfile] = useState(false);

  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
    postCode: '',
  });

  const onAction = () => {
    setEditModeProfile((prev) => !prev);
    onEditMode();
  };

  const onInputChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setAddress((form) => ({ ...form, [name]: value }));
  };

  const onSave = async () => {
    setStartProcess(true);
    const formData = {
      address: `${address.city} ${address.postCode}, ${address.state}, ${address.country}`,
    };

    const { error, data } = await Service.put(
      `${ENDPOINTS.USER_PROFILE}/${currentUser.userId}`,
      formData,
    );

    if (error) {
      onEditMode();
      setStartProcess(false);
      return;
    }

    if (data) {
      setCurrentUser(data.profile);
      onEditMode();
      setStartProcess(false);
      setEditModeProfile(false);
    }
  };

  return (
    <>
      <div
        className={`mb-5 border-b border-gray-300 ${
          editModeProfile ? 'h-full' : 'h-[80px]'
        } transition-all duration-150`}
      >
        <div className="pt-5 flex justify-between items-center">
          <div className="block">
            <p className="text-sm sm:text-xl">Addresse</p>
            <p
              className={`w-[250px] whitespace-nowrap overflow-hidden overflow-ellipsis pt-1 text-sm sm:text-xl text-gray-700 transition-all duration-300 
              ${
                editModeProfile
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              {currentUser.address}
            </p>
          </div>
          <button
            onClick={onAction}
            type="submit"
            className={`text-sm sm:text-xl ${
              !editModeProfile && editMode
                ? 'text-gray-400'
                : 'text-blue-500'
            } transition-all duration-300 `}
            disabled={!editModeProfile && editMode}
          >
            {!editModeProfile ? 'Modifier' : 'Annuler'}
          </button>
        </div>
        <div
          className={`mb-3 transition-all duration-300 ${
            editModeProfile
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="mb-3 px-4 py-2 border border-gray-300 rounded">
            <p className="text-gray-600 text-xs transition-all duration-100">
              Pays/Region
            </p>
            <div className="w-full inline-block relative">
              <CountrySelectorInput
                isCountryName
                className="appearance-none block w-full text-black font-medium focus:outline-none"
                onChange={onInputChange}
                nameSelectInput="country"
              />
              <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
                <ChevroDownVector className="fill-brand-bold h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
            <FloatingInputLabel
              name="state"
              defaultValue={currentUser.address?.split(' ')[2]}
              label="Etat"
              onChange={onInputChange}
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="w-[55%] mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
              <FloatingInputLabel
                name="city"
                defaultValue={currentUser.address?.split(' ')[0]}
                label="Ville"
                onChange={onInputChange}
              />
            </div>
            <div className="w-2/5 mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
              <FloatingInputLabel
                name="postCode"
                defaultValue={currentUser.address?.split(' ')[1]}
                label="Code Postal"
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="min-w-[8rem] py-2 px-3 bg-brand-bold disabled:bg-gray-300 text-white disabled:text-gray-700 rounded"
              onClick={onSave}
              disabled={startProcess}
            >
              {!startProcess ? 'Enregistrer' : 'En cours...'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AddressInput);
