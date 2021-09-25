import React, { useState, memo, FC } from 'react';

interface Props {
  processing?: boolean;
  editMode: boolean;
  label: string;
  data: string;
  children: JSX.Element;
  onEditMode: () => void;
  onSave: () => void;
}

const defaultProps: Partial<Props> = {
  processing: false,
};

const InfoItem: FC<Props> = ({
  label,
  data,
  children,
  processing,
  editMode,
  onEditMode,
  onSave,
}: Props) => {
  const [editModeProfile, setEditModeProfile] = useState(false);

  const onAction = () => {
    setEditModeProfile((prev) => !prev);
    onEditMode();
  };

  const onSaveChanges = async () => {
    await onSave?.();
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
              className="min-w-[8rem] py-2 px-3 bg-brand-bold disabled:bg-gray-300 text-white disabled:text-gray-700 rounded"
              onClick={onSaveChanges}
              disabled={processing}
            >
              {!processing ? 'Enregistrer' : 'En cours...'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

InfoItem.defaultProps = defaultProps;
export default memo(InfoItem);
