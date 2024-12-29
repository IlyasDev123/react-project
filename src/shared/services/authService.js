import { Endpoint } from '../../shared/utils/endpoints';
import { HTTP_CLIENT } from '../../shared/utils/interceptor';

const LoginUser = (params) => {
  return HTTP_CLIENT.post(Endpoint.auth.login, params);
};

const Logout = () => {
  return HTTP_CLIENT.get(Endpoint.auth.logout);
};

const updateProfile = (params) => {
  return HTTP_CLIENT.post('update-profile', params);
};

const changePassword = (params) => {
  return HTTP_CLIENT.post('update-profile', params);
};

export { LoginUser, Logout, updateProfile, changePassword };
