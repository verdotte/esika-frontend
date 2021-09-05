// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, memo } from 'react';
import { useProfile } from 'app/modules/Contexts/ProfileContext';

interface Props {
  label: string;
  data: string;
  children: JSX.Element;
}

const InfoItem = ({ label, data, children }: Props) => {
  const {
    editMode: editModeProfile,
    setEditMode: setEditModeProfile,
  } = useProfile();

  const [editMode, setEditMode] = useState(false);

  const onAction = useCallback(() => {
    setEditMode((prev) => !prev);
    setEditModeProfile?.((prev) => !prev);
  }, [setEditModeProfile]);

  return (
    <>
      <div
        className={`mb-5 border-b border-gray-300 ${
          editMode ? 'h-full' : 'h-[80px]'
        } transition-all duration-150`}
      >
        <div className="pt-5 flex justify-between items-center">
          <div className="block">
            <p className="text-sm sm:text-xl">{label}</p>
            <p
              className={`pt-1 text-sm sm:text-xl text-gray-700 transition-all duration-300 ${
                editMode
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
              editModeProfile && !editMode
                ? 'text-gray-400'
                : 'text-blue-500'
            } transition-all duration-300 `}
            disabled={editModeProfile && !editMode}
          >
            {editMode ? 'Annuler' : 'Modifier'}
          </button>
        </div>
        <div
          className={`mb-3 transition-all duration-300 ${
            editMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default memo(InfoItem);
