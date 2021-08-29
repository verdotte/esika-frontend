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
  code: string;
  setEditMode: SetStateType<boolean>;
  setCode: SetStateType<string>;
  onEditChange: () => void;
  onCodeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const defaultCtx: IProfile = {
  editMode: false,
  code: '+243',
  setCode: () => null,
  setEditMode: () => null,
  onEditChange: () => null,
  onCodeChange: () => null,
};

export const ProfileContext =
  createContext<Partial<IProfile>>(defaultCtx);
export const useProfile = () => useContext(ProfileContext);

const ProfileProvider: FC = ({ children }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [code, setCode] = useState<string>('+243');

  const onEditChange = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCodeChange = useCallback((event) => {
    setCode(event?.target.value);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        editMode,
        code,
        onCodeChange,
        setEditMode,
        setCode,
        onEditChange,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
