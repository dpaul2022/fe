import Axios from  'axios-observable';
import AuthService from "./auth-service";

const AUTH_TOKEN_KEY = 'X-AUTH-TOKEN';

const Api = Axios.create({
  baseURL: 'https://be-server.herokuapp.com/'
});

Api.interceptors.request.use(function(config) {
  const token = AuthService.getToken();
  if (token) {
    config.headers.common[AUTH_TOKEN_KEY] = token;
  }
  return config;
});

export default Api;
