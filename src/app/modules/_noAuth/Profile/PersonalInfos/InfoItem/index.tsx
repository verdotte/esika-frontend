// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, memo } from 'react';
// import { useProfile } from 'app/modules/Contexts/ProfileContext';

interface Props {
  editMode: boolean;
  label: string;
  data: string;
  children: JSX.Element;
  onEditMode: () => void;
  onSave: () => void;
}

const InfoItem = ({
  label,
  data,
  children,
  editMode,
  onEditMode,
  onSave,
}: Props) => {
  // const { editMode, hideChildren, setEditMode, setHideChildren } =
  //   useProfile();

  const [editModeProfile, setEditModeProfile] = useState(false);

  const onAction = () => {
    setEditModeProfile((prev) => !prev);
    onEditMode();
  };

  const onSaveChanges = () => {
    onSave?.();
    setEditModeProfile(false);
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
            <p className="text-sm sm:text-xl">{label}</p>
            <p
              className={`pt-1 text-sm sm:text-xl text-gray-700 transition-all duration-300 ${
                editModeProfile
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              {data}
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
          {children}
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="py-2 px-3 bg-brand-bold text-white rounded"
              onClick={onSaveChanges}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(InfoItem);
