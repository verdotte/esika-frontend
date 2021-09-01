import React, {
  createContext,
  FC,
  useContext,
  useState,
} from 'react';
import { SetStateType } from 'app/modules/@Types';

interface TSearchCtx {
  isVisible: boolean;
  setIsVisible: SetStateType<boolean>;
  onToggleVisibility: () => void;
}

const defaultSearchCtx: TSearchCtx = {
  isVisible: false,
  setIsVisible: () => null,
  onToggleVisibility: () => null,
};

export const SearchContext =
  createContext<TSearchCtx>(defaultSearchCtx);
export const useSearch = () => useContext(SearchContext);

const SearchProvider: FC = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onToggleVisibility = () =>
    setIsVisible((visible) => !visible);

  return (
    <SearchContext.Provider
      value={{ isVisible, setIsVisible, onToggleVisibility }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
