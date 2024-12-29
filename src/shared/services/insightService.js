import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const addInsight = (params) => {
  return HTTP_CLIENT.post(Endpoint.insight.add, params);
};

const updateInsight = (params) => {
  return HTTP_CLIENT.post(Endpoint.insight.update, params);
};

const getInsight = (page, search = null, filter) => {
  const category = filter?.category ?? '';
  const status = filter?.status ?? '';

  return HTTP_CLIENT.get(
    Endpoint.insight.get +
      `?page=${page}&search=${search}&category_id=${category}&status=${status}`
  );
};

const getInsightById = (id) => {
  return HTTP_CLIENT.get(Endpoint.insight.show(id));
};

const updateFeatureStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.workout.updateFeatureStatue, params);
};

const updateStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.insight.updateStatue, params);
};

const deleteInsight = (id) => {
  return HTTP_CLIENT.delete(Endpoint.insight.delete(id));
};

export {
  addInsight,
  getInsight,
  updateFeatureStatus,
  updateStatus,
  updateInsight,
  getInsightById,
  deleteInsight,
};
