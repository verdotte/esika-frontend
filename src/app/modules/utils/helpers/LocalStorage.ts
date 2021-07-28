import keys from '../configs/keys';

class LocalStorage {
  static get(key: string) {
    return localStorage.getItem(key);
  }

  static set(key: string, value) {
    localStorage.setItem(key, value);
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static setToken(value: string) {
    localStorage.setItem(keys.TOKEN_STORAGE_KEY as string, value);
  }

  static getToken() {
    return localStorage.getItem(keys.TOKEN_STORAGE_KEY as string);
  }

  static removeToken() {
    localStorage.removeItem(keys.TOKEN_STORAGE_KEY as string);
  }
}

export default LocalStorage;
