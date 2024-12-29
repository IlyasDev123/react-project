import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const getPackages = (page, search = null) => {
  return HTTP_CLIENT.get(
    Endpoint.packages.get + `?page=${page}&search=${search}&status=${status}`
  );
};

const updateStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.packages.updateStatue, params);
};

const addPackage = (params) => {
  return HTTP_CLIENT.post(Endpoint.packages.add, params);
};

const getPackageById = (id) => {
  return HTTP_CLIENT.get(Endpoint.packages.show(id));
};

const deletePackage = (id) => {
  return HTTP_CLIENT.delete(Endpoint.packages.delete(id));
};

const updatePackage = (params) => {
  return HTTP_CLIENT.post(Endpoint.packages.update, params);
};

export {
  getPackages,
  updateStatus,
  getPackageById,
  addPackage,
  deletePackage,
  updatePackage,
};
