import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import { IAgent, IObject, stateSetterType } from 'app/modules/@Types';

type homeType = {
  loading: boolean;
  properties: IObject[];
  agents: IAgent[];
  setProperties: stateSetterType<IObject[]>;
  setAgents: stateSetterType<IAgent[]>;
  onFetchAgents: () => void;
  onFetchProperties: () => void;
};

const defaultCtxProps: homeType = {
  loading: true,
  properties: [],
  agents: [],
  setProperties: () => null,
  setAgents: () => null,
  onFetchAgents: () => null,
  onFetchProperties: () => null,
};

export const HomeContext = createContext<homeType>(defaultCtxProps);
export const useHome = () => useContext(HomeContext);

const HomeProvider: FC = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<IObject[]>([]);
  const [agents, setAgents] = useState<IAgent[]>([]);

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

  const onFetchAgents = useCallback(async () => {
    setLoading(true);

    const { error, data } = await Service.get(ENDPOINTS.USERS);

    setLoading(false);

    if (error) {
      return;
    }

    if (data) {
      const { agentList } = data;
      setAgents(agentList);
    }
  }, []);

  return (
    <HomeContext.Provider
      value={{
        loading,
        agents,
        properties,
        setAgents,
        setProperties,
        onFetchAgents,
        onFetchProperties,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
