import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import { SetStateType } from 'app/modules/@Types';

interface IProfile {
  editMode: boolean;
  setEditMode: SetStateType<boolean>;
  onEditChange: () => void;
}

const defaultCtx: IProfile = {
  editMode: false,
  setEditMode: () => null,
  onEditChange: () => null,
};

export const ProfileContext =
  createContext<Partial<IProfile>>(defaultCtx);
export const useProfile = () => useContext(ProfileContext);

const ProfileProvider: FC = ({ children }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const onEditChange = useCallback(() => {
    setEditMode(true);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        editMode,
        setEditMode,
        onEditChange,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
