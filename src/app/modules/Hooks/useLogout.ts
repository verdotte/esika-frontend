import { useHistory } from 'react-router-dom';
import LocalStorage from '../utils/helpers/LocalStorage';

const useLogout = () => {
  const history = useHistory();

  const onLogout = () => {
    LocalStorage.clear();
    history.push('/');
  };

  return { onLogout };
};

export default useLogout;
