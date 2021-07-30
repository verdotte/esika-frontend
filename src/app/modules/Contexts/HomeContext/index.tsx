import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';

type IProperties = { [key: string]: string };

type homeType = {
  loading: boolean;
  properties: IProperties[];
  setProperties: React.Dispatch<React.SetStateAction<IProperties[]>>;
  onFetchProperties: () => void;
};

const defaultCtxProps: homeType = {
  loading: true,
  properties: [],
  onFetchProperties: () => null,
  setProperties: () => null,
};

export const HomeContext = createContext<homeType>(defaultCtxProps);
export const useHome = () => useContext(HomeContext);

const HomeProvider: FC = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<IProperties[]>([]);

  const onFetchProperties = useCallback(async () => {
    const { error, data } = await Service.get(ENDPOINTS.PROPERTIES);

    setLoading(false);

    if (error) {
      return;
    }

    if (data) {
      const { propertyList } = data;
      setProperties(propertyList);
    }
  }, []);

  return (
    <HomeContext.Provider
      value={{
        loading,
        properties,
        setProperties,
        onFetchProperties,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
