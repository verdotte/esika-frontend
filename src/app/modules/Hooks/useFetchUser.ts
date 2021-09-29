import { useEffect } from 'react';
import { useProfile } from 'app/modules/Contexts/ProfileContext';

export const useFetchCurrentUser = () => {
  const { currentUser, onFetchCurrentUser } = useProfile();
  useEffect(() => {
    if (!currentUser.userId) {
      onFetchCurrentUser();
    }
  }, [currentUser.userId, onFetchCurrentUser]);
};

export const useFetchAgentProperties = () => {
  const { currentUser, onAgentPropertiesFetch } = useProfile();
  useEffect(() => {
    if (!currentUser.userId) {
      onAgentPropertiesFetch();
    }
  }, [currentUser.userId, onAgentPropertiesFetch]);
};
