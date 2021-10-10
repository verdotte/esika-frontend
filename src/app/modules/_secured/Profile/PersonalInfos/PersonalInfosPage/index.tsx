// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Compress from 'react-image-file-resizer';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import ProfileImage from 'app/modules/__modules__/ProfileImage';
import ENDPOINTS from 'app/Services/endpoints';
import Service from 'app/Services';
import { IObject } from 'app/modules/@Types';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import CountrySelectorInput from 'app/modules/__modules__/CountrySelectorInput';
import InfoItem from '../InfoItem';
import useFetchCurrentUser from '../../UseFetchCurrentUser';
import FloatingInputLabel from '../FloatingInputLabel';
import AddressInput from '../AddressInput';

const PersonalInfosPage = () => {
  const {
    hideChildren,
    currentUser,
    code,
    currentUserNumber,
    onCodeChange,
    setCurrentUser,
    setCurrentUserNumber,
  } = useProfile();
  const history = useHistory();

  const [startProcess, setStartProcess] = useState(false);
  const [imageProcess, setImageProcess] = useState<Blob | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<IObject>({});

  const uploadImage = ({ target }) => {
    const profileImage = target.files[0];
    setPreview(URL.createObjectURL(profileImage));
    setStartProcess(true);
    setImageProcess(profileImage);
  };

  const cancelProcess = async () => {
    setStartProcess(false);
    setPreview(currentUser.picture);
  };

  useFetchCurrentUser();

  const uploadingProcess = async () => {
    Compress.imageFileResizer(
      imageProcess as Blob,
      480,
      480,
      'PNG',
      70,
      0,
      async (uri) => {
        const dataPicture = new FormData();
        dataPicture.append('file', uri as Blob);
        dataPicture.append('tags', `codeinfuse, medium, gist`);
        dataPicture.append('upload_preset', 'lcarnyle');
        dataPicture.append('api_key', '763699599957591');
        dataPicture.append('timestamp', `${Date.now() / 1000}`);
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/mtk67/image/upload',
          {
            method: 'post',
            body: dataPicture,
          },
        );
        const { url } = await response.json();

        if (!url) {
          return;
        }

        const newPicture = {
          picture: url,
        };

        const { error, data } = await Service.put(
          `${ENDPOINTS.USER_PROFILE}/${currentUser.userId}`,
          newPicture,
        );

        if (error) {
          setPreview(currentUser.picture);
          return;
        }

        if (data) {
          setPreview(url);
        }
      },
      'blob',
    );

    setStartProcess(false);
  };

  const onEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const goBack = () => {
    setEditMode(false);
    return history.push('/profile');
  };

  const onInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    if (name === 'phoneNumber') {
      setCurrentUserNumber(value.replaceAll(' ', ''));
      setFormData((formValue) => ({
        ...formValue,
        phoneNumber: `${code}${value.replaceAll(' ', '')}`,
      }));
    } else {
      setFormData((formValue) => ({
        ...formValue,
        [name]: value,
      }));
    }
  };

  const onSave = async () => {
    setStartProcess(true);
    const { error, data } = await Service.put(
      `${ENDPOINTS.USER_PROFILE}/${currentUser.userId}`,
      formData,
    );

    if (error) {
      setEditMode(false);
      setStartProcess(false);
      return;
    }

    if (data) {
      setCurrentUser(data.profile);
      setEditMode(false);
      setStartProcess(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <div className="h-full mt-6 mb-16 md:mt-2 ml-6 mr-5 sm:mx-0">
          <div className="flex items-center">
            <span className="ml-[-1.3rem]" onClick={goBack}>
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
                <ProfileImage
                  image={
                    (preview as string) ||
                    (currentUser.picture as string)
                  }
                />
              </ShowWidget>
            </div>
            {startProcess ? (
              <div className="flex justify-center items-center">
                <div className="w-[45%] flex justify-between items-center">
                  <button
                    className="p-1 text-sm text-gray-500"
                    type="button"
                    onClick={cancelProcess}
                  >
                    Annuler
                  </button>
                  <button
                    className="p-1 text-sm text-blue-500"
                    type="button"
                    onClick={uploadingProcess}
                  >
                    Upload
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <label>
                  <span
                    className={`py-2 text-sm sm:text-xl text-center transition-all duration-100 ${
                      editMode && !hideChildren
                        ? 'text-gray-400'
                        : 'text-blue-500'
                    }`}
                  >
                    {currentUser.picture
                      ? 'Modifier photo de profile'
                      : 'Ajouter une photo de profile'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    disabled={editMode && !hideChildren}
                    onChange={uploadImage}
                  />
                </label>
              </div>
            )}
          </div>
          <InfoItem
            processing={startProcess}
            editMode={editMode}
            isBio
            onEditMode={onEditMode}
            onSave={onSave}
            key="Biographie"
            label="Biographie"
            data={
              currentUser.bio
                ? `${currentUser.bio}`
                : 'Biographie non fournie'
            }
          >
            <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-0 overflow-hidden">
              <div className="w-full relative">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  placeholder="Bio"
                  className="w-[95%] peer outline-none text-black font-medium placeholder-transparent bg-transparent"
                  defaultValue={`${currentUser.bio}`}
                  onChange={onInputChange}
                />
                <label
                  htmlFor="bio"
                  className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-0.5"
                >
                  Biographie
                </label>
              </div>
            </div>
          </InfoItem>
          <InfoItem
            processing={startProcess}
            editMode={editMode}
            isBio={false}
            onEditMode={onEditMode}
            onSave={onSave}
            key="Prénom"
            label="Prénom"
            data={
              currentUser.firstName
                ? `${currentUser.firstName}`
                : 'Prénom non fourni'
            }
          >
            <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
              <FloatingInputLabel
                name="firstName"
                defaultValue={`${currentUser?.firstName}`}
                label="Prénom"
                onChange={onInputChange}
              />
            </div>
          </InfoItem>
          <InfoItem
            processing={startProcess}
            editMode={editMode}
            isBio={false}
            onEditMode={onEditMode}
            onSave={onSave}
            key="Post_nom"
            label="Nom de Famille"
            data={
              currentUser.lastName
                ? `${currentUser.lastName}`
                : 'Nom de Famille non fourni'
            }
          >
            <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
              <FloatingInputLabel
                name="lastName"
                defaultValue={`${currentUser?.lastName}`}
                label="Nom de Famille"
                onChange={onInputChange}
              />
            </div>
          </InfoItem>
          <InfoItem
            processing={startProcess}
            editMode={editMode}
            isBio={false}
            onEditMode={onEditMode}
            onSave={onSave}
            key="Numero"
            label="Numero de Telephone"
            data={
              currentUser.phoneNumber
                ? `(${code}) ${currentUserNumber}`
                : 'Numero de Telephone non fourni'
            }
          >
            <div className="mb-3 p-2">
              <div className="w-full inline-block relative">
                <CountrySelectorInput onChange={onCodeChange} />
                <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
                  <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                </div>
              </div>
              <div className="my-4 border border-gray-300 rounded flex justify-between items-center">
                <p className="px-3 border-r border-gray-300 text-sm sm:text-xl text-gray-800">
                  {code}
                </p>
                <input
                  className="appearance-none block w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm sm:text-xl text-gray-900"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  defaultValue={`${currentUserNumber}`}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </InfoItem>
          <AddressInput onEditMode={onEditMode} editMode={editMode} />
        </div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default PersonalInfosPage;
