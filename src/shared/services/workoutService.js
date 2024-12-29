import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const uploadVideo = (params, onUploadProgress) => {
  return HTTP_CLIENT.post(Endpoint.workout.uploadVideo, params, {
    onUploadProgress: onUploadProgress,
  });
};

const addWorkout = (params) => {
  return HTTP_CLIENT.post(Endpoint.workout.addWorkout, params);
};

const getWorkouts = (page, search = null, filter) => {
  const category = filter?.category ?? '';
  const status = filter?.status ?? '';

  return HTTP_CLIENT.get(
    Endpoint.workout.getWorkouts +
      `?page=${page}&search=${search}&category_id=${category}&status=${status}`
  );
};

const getWorkoutById = (id) => {
  return HTTP_CLIENT.get(Endpoint.workout.getWorkoutById(id));
};

const updateWorkout = (params) => {
  return HTTP_CLIENT.post(Endpoint.workout.updateWorkout, params);
};

const deleteWorkout = (id) => {
  return HTTP_CLIENT.delete(Endpoint.workout.deleteWorkout(id));
};

const updateFeatureStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.workout.updateFeatureStatue, params);
};

const updatePremiumStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.workout.updatePremiumStatue, params);
};

const updateStatus = (params) => {
  return HTTP_CLIENT.post(Endpoint.workout.updateStatue, params);
};

export {
  uploadVideo,
  addWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  updateFeatureStatus,
  updatePremiumStatus,
  updateStatus,
};
