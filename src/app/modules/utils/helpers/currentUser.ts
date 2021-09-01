import jwtDecode from 'jwt-decode';
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
export default getCurrentUser;
