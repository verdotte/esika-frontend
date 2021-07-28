import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';

interface Props {
  children: ReactNode;
}

interface IProperties {
  [key: string]:
    | string
    | number
    | null
    | undefined
    | { [key: string]: string };
}

export const HomeContext = createContext({});
export const useHome = () => useContext(HomeContext);

const HomeProvider: FC<Props> = ({
  children,
}: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<IProperties[]>([]);

  const onFetchProperties = useCallback(async () => {
    const response = await Service.get(ENDPOINTS.PROPERTIES);

    setLoading(false);

    if (response.error) {
      return;
    }

    if (response.data) {
      setProperties(response.data);
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
