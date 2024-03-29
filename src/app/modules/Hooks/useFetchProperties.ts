import { useEffect } from 'react';
import { useHome } from '../Contexts/HomeContext';

const useFetchProperties = () => {
  const { properties, loading, loadingExplorer, onFetchProperties } =
    useHome();

  useEffect(() => {
    if (!properties.length) {
      onFetchProperties();
    }
  }, [onFetchProperties, properties.length]);

  return { properties, loading, loadingExplorer };
};

export default useFetchProperties;
