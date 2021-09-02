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

interface IProfile {
  loading: boolean;
  editMode: boolean;
  code: string;
  currentUserNumber: string;
  currentUser: IAgent;
  setEditMode: SetStateType<boolean>;
  setCode: SetStateType<string>;
  onEditChange: () => void;
  onCodeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFetchCurrentUser: () => void;
}

const defaultCurrentUser = {
  active: true,
  createdAt: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  picture: '',
  updatedAt: '',
  userId: '',
  userType: '',
  verified: false,
};

const defaultCtx: IProfile = {
  loading: true,
  editMode: false,
  code: '+243',
  currentUserNumber: '',
  currentUser: defaultCurrentUser,
  setCode: () => null,
  setEditMode: () => null,
  onEditChange: () => null,
  onCodeChange: () => null,
  onFetchCurrentUser: () => null,
};

export const ProfileContext = createContext<IProfile>(defaultCtx);
export const useProfile = () => useContext(ProfileContext);

const ProfileProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [code, setCode] = useState<string>('+243');
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

      const numbersString = phoneNumber.split(' ');

      setCode(numbersString[0]);
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
        code,
        currentUserNumber,
        currentUser,
        onCodeChange,
        setEditMode,
        setCode,
        onEditChange,
        onFetchCurrentUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
