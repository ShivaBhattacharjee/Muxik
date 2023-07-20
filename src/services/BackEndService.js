import axios from 'axios';
import Cookies from 'js-cookie'; 
const BackEndService = axios.create({
  baseURL: 'http://localhost:8080/api', 
});


BackEndService.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default BackEndService;
