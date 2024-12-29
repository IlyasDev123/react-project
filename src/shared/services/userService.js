import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const updateProfile = (params) => {
  return HTTP_CLIENT.post(Endpoint.profile.updateProfile, params);
};

const changePassword = (params) => {
  return HTTP_CLIENT.post(Endpoint.profile.changePassword, params);
};

const getUsers = (page, search = null, filter) => {
  const status = filter?.status ?? '';

  return HTTP_CLIENT.get(
    Endpoint.users.get + `?page=${page}&search=${search}&status=${status}`
  );
};

const getUserDetail = (id) => {
  return HTTP_CLIENT.get(Endpoint.users.show(id));
};

const updateStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.users.updateStatue, params);
};

export { updateProfile, changePassword, getUsers, updateStatus, getUserDetail };
