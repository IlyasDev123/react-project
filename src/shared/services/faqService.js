import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const getFaqs = (search = null) => {
  return HTTP_CLIENT.get(Endpoint.faqs.get + `?search=${search}`);
};

const updateStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.faqs.updateStatue, params);
};

const addFaq = (params) => {
  return HTTP_CLIENT.post(Endpoint.faqs.add, params);
};

const getFaqById = (id) => {
  return HTTP_CLIENT.get(Endpoint.faqs.show(id));
};

const deleteFaq = (id) => {
  return HTTP_CLIENT.delete(Endpoint.faqs.delete(id));
};

const updateFaq = (params) => {
  return HTTP_CLIENT.post(Endpoint.faqs.update, params);
};

const sortFaqs = (params) => {
  return HTTP_CLIENT.post(Endpoint.faqs.sort, params);
};

export {
  getFaqs,
  updateStatus,
  getFaqById,
  addFaq,
  deleteFaq,
  updateFaq,
  sortFaqs,
};
