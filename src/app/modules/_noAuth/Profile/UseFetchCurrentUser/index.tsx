import { useEffect } from 'react';
import { useProfile } from 'app/modules/Contexts/ProfileContext';

const useFetchCurrentUser = () => {
  const { currentUser, onFetchCurrentUser } = useProfile();
  useEffect(() => {
    if (!currentUser.userId) {
      onFetchCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchCurrentUser]);
};

export default useFetchCurrentUser;
