import jwtDecode from 'jwt-decode';
import keys from '../configs/keys';
import LocalStorage from './LocalStorage';

interface TokenType {
  exp: number;
  id: string | number;
  userType: string | null;
}

const getCurrentUser = (token = LocalStorage.getToken()) => {
  if (token && jwtDecode(token)) {
    return jwtDecode<TokenType>(token);
  }
  return null;
};

export const getUserType = () => {
  return LocalStorage.get(keys.USER_TYPE_KEY as string);
};
export default getCurrentUser;
