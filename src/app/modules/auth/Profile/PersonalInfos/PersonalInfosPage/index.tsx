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
// eslint-disable-next-line import/namespace
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import ProfileImage from 'app/modules/__modules__/ProfileImage';
import ENDPOINTS from 'app/Services/endpoints';
import Service from 'app/Services';
import { IObject } from 'app/modules/@Types';
import InfoItem from '../InfoItem';
import NumberForm from '../NumberForm';
import AddressForm from '../AddressForm';
import useFetchCurrentUser from '../../UseFetchCurrentUser';
import FloatingInputLabel from '../FloatingInputLabel';

const PersonalInfosPage = () => {
  const {
    hideChildren,
    currentUser,
    code,
    currentUserNumber,
    setCurrentUser,
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

  const uploadingProcess = async () => {
    Compress.imageFileResizer(
      imageProcess as Blob, // the file from input
      480, // width
      480, // height
      'PNG', // compress format WEBP, JPEG, PNG
      70, // quality
      0, // rotation
      async (uri) => {
        // Upload logic
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

        // Update user data
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
      'blob', // blob or base64 default base64
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

    setFormData((formValue) => ({
      ...formValue,
      [name]: value,
    }));
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

  useFetchCurrentUser();

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
            onEditMode={onEditMode}
            onSave={onSave}
            key="Prénom"
            label="Prénom"
            data={currentUser ? `${currentUser.firstName}` : ''}
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
            onEditMode={onEditMode}
            onSave={onSave}
            key="Post_nom"
            label="Nom de Famille"
            data={currentUser ? `${currentUser.lastName}` : ''}
          >
            <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
              <FloatingInputLabel
                name="lastName"
                defaultValue={`${currentUser?.lastName}`}
                label="Prénom"
                onChange={onInputChange}
              />
            </div>
          </InfoItem>
          <InfoItem
            processing={startProcess}
            editMode={editMode}
            onEditMode={onEditMode}
            onSave={onSave}
            key="Numero"
            label="Numero de Telephone"
            data={currentUser ? `(${code}) ${currentUserNumber}` : ''}
          >
            <NumberForm />
          </InfoItem>
          <InfoItem
            processing={startProcess}
            editMode={editMode}
            onEditMode={onEditMode}
            onSave={onSave}
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
