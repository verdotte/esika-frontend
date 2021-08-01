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

interface Indictators {
  heroIndicator: number;
  propertiesIndicator: number;
  agentsIndicator: number;
}

type IndicatorType =
  | 'heroIndicator'
  | 'propertiesIndicator'
  | 'agentsIndicator';

type homeType = {
  loading: boolean;
  properties: IObject[];
  agents: IAgent[];
  paginationIndicators: Indictators;
  setPaginationIndicators: stateSetterType<Indictators>;
  setProperties: stateSetterType<IObject[]>;
  setAgents: stateSetterType<IAgent[]>;
  onFetchAgents: () => void;
  onFetchProperties: () => void;
  onIndicatorChange: (
    position: number,
    indicator: IndicatorType,
  ) => void;
};

const defaultCtxProps: homeType = {
  loading: true,
  properties: [],
  agents: [],
  paginationIndicators: {
    heroIndicator: 0,
    propertiesIndicator: 0,
    agentsIndicator: 0,
  },
  setAgents: () => null,
  setProperties: () => null,
  setPaginationIndicators: () => null,
  onFetchAgents: () => null,
  onFetchProperties: () => null,
  onIndicatorChange: () => null,
};

export const HomeContext = createContext<homeType>(defaultCtxProps);
export const useHome = () => useContext(HomeContext);

const HomeProvider: FC = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<IObject[]>([]);
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [paginationIndicators, setPaginationIndicators] =
    useState<Indictators>({
      propertiesIndicator: 0,
      heroIndicator: 0,
      agentsIndicator: 0,
    });

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

  const onIndicatorChange = useCallback(
    (
      position: number,
      indicator:
        | 'heroIndicator'
        | 'propertiesIndicator'
        | 'agentsIndicator',
    ) => {
      const indicators = { ...paginationIndicators };

      indicators[indicator] = position;
      setPaginationIndicators(indicators);
    },
    [paginationIndicators],
  );

  return (
    <HomeContext.Provider
      value={{
        loading,
        agents,
        properties,
        paginationIndicators,
        setPaginationIndicators,
        setAgents,
        setProperties,
        onFetchAgents,
        onFetchProperties,
        onIndicatorChange,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
