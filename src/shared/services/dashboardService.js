import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const getStatistics = () => {
  return HTTP_CLIENT.get(Endpoint.dashboard.statistics);
};

const getSubscriptionData = () => {
  return HTTP_CLIENT.get(Endpoint.dashboard.subscription);
};

const getWorkoutsData = () => {
  return HTTP_CLIENT.get(Endpoint.dashboard.workoutStates);
};

export { getStatistics, getSubscriptionData, getWorkoutsData };
