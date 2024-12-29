import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const getSubscriptions = (page, search) => {
  return HTTP_CLIENT.get(
    Endpoint.subscriptions.get + `?page=${page}&search=${search}`
  );
};

const getSubscriptionById = (id) => {
  return HTTP_CLIENT.get(Endpoint.subscriptions.show(id));
};

export { getSubscriptions, getSubscriptionById };
