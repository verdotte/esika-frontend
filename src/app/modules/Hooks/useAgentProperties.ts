import { useEffect } from 'react';
import { useProfile } from '../Contexts/ProfileContext';

const useAgentProperties = () => {
  const {
    currentUserProperties,
    loading,
    loadingExplorer,
    allProperties,
    setLoading,
    onFetchAgentProperties,
    setCurrentUserProperties,
  } = useProfile();

  useEffect(() => {
    if (!currentUserProperties.length) {
      onFetchAgentProperties();
    }
  }, [onFetchAgentProperties, currentUserProperties.length]);

  return {
    currentUserProperties,
    loading,
    loadingExplorer,
    allProperties,
    setLoading,
    setCurrentUserProperties,
  };
};

export default useAgentProperties;
