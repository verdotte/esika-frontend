type ValueType = any;

class LocalStorage {
  static get(key: string) {
    return localStorage.getItem(key);
  }

  static set(key: string, value: ValueType) {
    localStorage.setItem(key, value);
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static setToken(value: string) {
    localStorage.setItem('ju79J48_IOPW', value);
  }

  static getToken() {
    return localStorage.getItem('ju79J48_IOPW');
  }

  static removeToken() {
    localStorage.removeItem('ju79J48_IOPW');
  }
}

export default LocalStorage;
