import jwtDecode from 'jwt-decode';
import LocalStorage from './LocalStorage';

interface TokenType {
  exp: number;
}

const isExpired = (token = LocalStorage.getToken()) => {
  if (!token) {
    return false;
  }
  if (token && jwtDecode(token)) {
    const decode = jwtDecode<TokenType>(token);
    const expiry: number = decode.exp;
    const now = new Date();
    const expired: boolean = now.getTime() > expiry * 1000;

    if (expired) {
      LocalStorage.removeToken();
    }

    return expired;
  }
  return false;
};
export default isExpired;
