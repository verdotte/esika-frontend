import jwtDecode from 'jwt-decode';
import keys from '../configs/keys';
import LocalStorage from './LocalStorage';

interface TokenType {
  exp: number;
  id: string | number;
}

const getCurrentUser = (token = LocalStorage.getToken()) => {
  if (token && jwtDecode(token)) {
    return jwtDecode<TokenType>(token);
  }
  return null;
};

export const isAgent = () => {
  return LocalStorage.get(keys.USER_ROLE_KEY) === keys.AGENT_ROLE_KEY;
};

export default getCurrentUser;
