import axios from 'axios';
import keys from 'app/modules/utils/configs/keys';
import LocalStorage from 'app/modules/utils/helpers/LocalStorage';

const baseURL = keys.DEFAULT_API;
const token = LocalStorage.getToken();

axios.defaults.baseURL = baseURL as string;
axios.defaults.headers.post.Accept = 'application/json';
axios.defaults.headers.Authorization = token;

export default axios;
