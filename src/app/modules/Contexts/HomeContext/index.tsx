import {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import {
  IAgent,
  ICategory,
  IObject,
  SetStateType,
} from 'app/modules/@Types';

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
  loadingExplorer: boolean;
  currentCategory: number;
  properties: IObject[];
  allProperties: IObject[];
  categories: ICategory[];
  agents: IAgent[];
  paginationIndicators: Indictators;
  setLoading: SetStateType<boolean>;
  setloadingExplorer: SetStateType<boolean>;
  setCurrentCategory: SetStateType<number>;
  setPaginationIndicators: SetStateType<Indictators>;
  setProperties: SetStateType<IObject[]>;
  setAgents: SetStateType<IAgent[]>;
  onFetchAgents: () => void;
  onFetchProperties: () => void;
  onFetchCategories: () => void;
  onIndicatorChange: (
    position: number,
    indicator: IndicatorType,
  ) => void;
};

const defaultCtxProps: homeType = {
  loading: true,
  loadingExplorer: true,
  currentCategory: 0,
  properties: [],
  allProperties: [],
  categories: [],
  agents: [],
  paginationIndicators: {
    heroIndicator: 0,
    propertiesIndicator: 0,
    agentsIndicator: 0,
  },
  setLoading: () => null,
  setloadingExplorer: () => null,
  setCurrentCategory: () => null,
  setAgents: () => null,
  setProperties: () => null,
  setPaginationIndicators: () => null,
  onFetchAgents: () => null,
  onFetchProperties: () => null,
  onFetchCategories: () => null,
  onIndicatorChange: () => null,
};

export const HomeContext = createContext<homeType>(defaultCtxProps);
export const useHome = () => useContext(HomeContext);

const HomeProvider: FC = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExplorer, setloadingExplorer] =
    useState<boolean>(true);
  const [properties, setProperties] = useState<IObject[]>([]);
  const [allProperties, setAllProperties] = useState<IObject[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [paginationIndicators, setPaginationIndicators] =
    useState<Indictators>({
      propertiesIndicator: 0,
      heroIndicator: 0,
      agentsIndicator: 0,
    });

  const onFetchProperties = useCallback(async () => {
    setLoading(true);
    setloadingExplorer(true);

    const { error, data } = await Service.get(ENDPOINTS.PROPERTIES);

    setLoading(false);
    setloadingExplorer(false);

    if (error) {
      return;
    }

    if (data) {
      const { propertyList } = data;
      setProperties(propertyList);
      setAllProperties(propertyList);
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

  const onFetchCategories = useCallback(async () => {
    setLoading(true);

    const { data } = await Service.get(ENDPOINTS.CATEGORIES);

    setLoading(false);

    if (data) {
      setloadingExplorer(false);
      const { categoryList } = data;
      setCategories(categoryList);
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
        loadingExplorer,
        agents,
        properties,
        categories,
        paginationIndicators,
        currentCategory,
        allProperties,
        setCurrentCategory,
        setLoading,
        setloadingExplorer,
        setPaginationIndicators,
        setAgents,
        setProperties,
        onFetchAgents,
        onFetchProperties,
        onFetchCategories,
        onIndicatorChange,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
