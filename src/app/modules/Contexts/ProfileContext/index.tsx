import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import { IAgent, SetStateType } from 'app/modules/@Types';
import getCurrentUser from 'app/modules/utils/helpers/currentUser';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';

const defaultCurrentUser = {
  active: true,
  createdAt: '',
  email: '',
  firstName: '',
  lastName: '',
  bio: '',
  phoneNumber: '',
  picture: '',
  updatedAt: '',
  userId: '',
  userType: '',
  verified: false,
};

interface IProfile {
  loading: boolean;
  editMode: boolean;
  hideChildren: boolean;
  code: string;
  value: string;
  credential: string;
  currentUserNumber: string;
  currentUser: IAgent;
  setEditMode: SetStateType<boolean>;
  setHideChildren: SetStateType<boolean>;
  setCode: SetStateType<string>;
  setValue: SetStateType<string>;
  setCredential: SetStateType<string>;
  setCurrentUser: SetStateType<IAgent>;
  onEditChange: () => void;
  onCodeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFetchCurrentUser: () => void;
}

const defaultCtx: IProfile = {
  loading: true,
  editMode: false,
  hideChildren: false,
  code: '+243',
  value: '',
  credential: '',
  currentUserNumber: '',
  currentUser: defaultCurrentUser,
  setCode: () => null,
  setValue: () => null,
  setCredential: () => null,
  setEditMode: () => null,
  setHideChildren: () => null,
  setCurrentUser: () => null,
  onEditChange: () => null,
  onCodeChange: () => null,
  onValueChange: () => null,
  onFetchCurrentUser: () => null,
};

export const ProfileContext = createContext<IProfile>(defaultCtx);
export const useProfile = () => useContext(ProfileContext);

const ProfileProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [hideChildren, setHideChildren] = useState<boolean>(false);
  const [code, setCode] = useState<string>('+243');
  const [value, setValue] = useState<string>('');
  const [credential, setCredential] = useState<string>('');
  const [currentUserNumber, setCurrentUserNumber] =
    useState<string>('');
  const [currentUser, setCurrentUser] = useState<IAgent>(
    defaultCurrentUser,
  );

  const onEditChange = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCodeChange = useCallback((event) => {
    setCode(event?.target.value);
  }, []);

  const onValueChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const onFetchCurrentUser = useCallback(async () => {
    const user = getCurrentUser();

    setLoading(true);

    const { error, data } = await Service.get(
      `${ENDPOINTS.USER_PROFILE}/${user?.id}`,
    );

    setLoading(false);

    if (error) {
      return;
    }

    if (data) {
      const { profile } = data;
      setCurrentUser(profile);

      const { phoneNumber } = profile;

      const codeString = phoneNumber.split(' ');
      const numbersString = phoneNumber.split(' ');

      setCode(codeString[0]);
      setCurrentUserNumber(
        numbersString[1] + numbersString[2] + numbersString[3],
      );
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        loading,
        editMode,
        hideChildren,
        code,
        value,
        credential,
        currentUserNumber,
        currentUser,
        onCodeChange,
        onValueChange,
        setEditMode,
        setHideChildren,
        setCode,
        setValue,
        setCredential,
        setCurrentUser,
        onEditChange,
        onFetchCurrentUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
