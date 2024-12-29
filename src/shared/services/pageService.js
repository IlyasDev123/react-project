import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const getPage = (search) => {
  return HTTP_CLIENT.get(Endpoint.pages.get + `?search=${search}`);
};

const deletePage = (id) => {
  return HTTP_CLIENT.delete(Endpoint.pages.delete(id));
};

const createPage = (params) => {
  return HTTP_CLIENT.post(Endpoint.pages.create, params);
};

const updatePage = (params) => {
  console.log('params', params);
  return HTTP_CLIENT.post(Endpoint.pages.update, params);
};

const updateStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.pages.updateStatue, params);
};

const getPageDetail = (id) => {
  return HTTP_CLIENT.get(Endpoint.pages.show(id));
};

export {
  getPage,
  deletePage,
  createPage,
  updatePage,
  updateStatus,
  getPageDetail,
};
