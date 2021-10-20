import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import { IAgent, IObject, SetStateType } from 'app/modules/@Types';
import getCurrentUser from 'app/modules/utils/helpers/currentUser';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';

const defaultCurrentUser: IAgent = {
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
  address: '',
};

interface IProfile {
  loading: boolean;
  loadingExplorer: boolean;
  editMode: boolean;
  hideChildren: boolean;
  code: string;
  value: string;
  credential: string;
  currentUserNumber: string;
  currentUser: IAgent;
  currentUserProperties: IObject[];
  allProperties: IObject[];
  setLoading: SetStateType<boolean>;
  setEditMode: SetStateType<boolean>;
  setHideChildren: SetStateType<boolean>;
  setCode: SetStateType<string>;
  setloadingExplorer: SetStateType<boolean>;
  setCurrentUserProperties: SetStateType<IObject[]>;
  setValue: SetStateType<string>;
  setCredential: SetStateType<string>;
  setCurrentUser: SetStateType<IAgent>;
  setCurrentUserNumber: SetStateType<string>;
  onEditChange: () => void;
  onCodeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFetchCurrentUser: () => void;
  onFetchAgentProperties: () => void;
}

const defaultCtx: IProfile = {
  loading: true,
  loadingExplorer: true,
  editMode: false,
  hideChildren: false,
  code: '+243',
  value: '',
  credential: '',
  currentUserNumber: '',
  currentUserProperties: [],
  allProperties: [],
  currentUser: defaultCurrentUser,
  setCode: () => null,
  setValue: () => null,
  setLoading: () => null,
  setCredential: () => null,
  setEditMode: () => null,
  setHideChildren: () => null,
  setCurrentUser: () => null,
  setloadingExplorer: () => null,
  setCurrentUserProperties: () => null,
  setCurrentUserNumber: () => null,
  onEditChange: () => null,
  onCodeChange: () => null,
  onValueChange: () => null,
  onFetchCurrentUser: () => null,
  onFetchAgentProperties: () => null,
};

export const ProfileContext = createContext<IProfile>(defaultCtx);
export const useProfile = () => useContext(ProfileContext);

const ProfileProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExplorer, setloadingExplorer] =
    useState<boolean>(true);
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
  const [currentUserProperties, setCurrentUserProperties] = useState<
    IObject[]
  >([]);
  const [allProperties, setAllProperties] = useState<IObject[]>([]);

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

      const numbersString = phoneNumber.split('');

      setCode(numbersString.slice(0, 4).join(''));
      setCurrentUserNumber(numbersString.slice(-9).join(''));
    }
  }, []);

  const onFetchAgentProperties = useCallback(async () => {
    const agent = getCurrentUser();
    setLoading(true);
    const { error, data } = await Service.get(
      `${ENDPOINTS.AGENT_PROPERTIES}/${agent?.id}`,
    );
    setLoading(false);

    if (error) {
      return;
    }

    if (data) {
      const { propertyList } = data;
      setloadingExplorer(false);
      setCurrentUserProperties(propertyList);
      setAllProperties(propertyList);
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        loading,
        loadingExplorer,
        editMode,
        hideChildren,
        code,
        value,
        credential,
        currentUserProperties,
        currentUserNumber,
        currentUser,
        allProperties,
        onCodeChange,
        onValueChange,
        setEditMode,
        setHideChildren,
        setCode,
        setValue,
        setLoading,
        setCredential,
        setloadingExplorer,
        setCurrentUser,
        setCurrentUserNumber,
        setCurrentUserProperties,
        onEditChange,
        onFetchCurrentUser,
        onFetchAgentProperties,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
