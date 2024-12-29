import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const getCategories = (search) => {
  return HTTP_CLIENT.get(
    Endpoint.category.getAllCategories + `?search=${search}`
  );
};

const getWorkoutCategories = () => {
  return HTTP_CLIENT.get(Endpoint.category.getWorkoutCategories);
};

const getInsightCategories = (search) => {
  return HTTP_CLIENT.get(
    Endpoint.category.getInsightCategories + `?search=${search}`
  );
};

const deleteCategory = (id) => {
  return HTTP_CLIENT.delete(Endpoint.category.deleteCategory(id));
};

const createCategory = (params) => {
  return HTTP_CLIENT.post(Endpoint.category.createCategory, params);
};

const updateCategory = (id, params) => {
  return HTTP_CLIENT.put(Endpoint.category.updateCategory(id), params);
};

const updateStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.category.updateStatue, params);
};

const sortCategories = (params) => {
  return HTTP_CLIENT.post(Endpoint.category.sort, params);
};

export {
  getCategories,
  getWorkoutCategories,
  getInsightCategories,
  deleteCategory,
  createCategory,
  updateCategory,
  updateStatus,
  sortCategories,
};
