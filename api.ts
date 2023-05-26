import axios from 'axios';
import {BaseUrl} from './config';

const api = axios.create({
  baseURL: BaseUrl,
});

export default api;
