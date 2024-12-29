const BaseURL = 'http://127.0.0.1:8000/api/admin';
// const BaseURL = 'https://dev.upworkdeveloper.com/new/glampions/api/admin';
const SocketURL = 'http://178.128.29.7:5511';

const Endpoint = {
  auth: {
    login: 'login',
    logout: 'logout',
  },
  landing: {
    terms: 'privacy-policy/0',
    privacy: 'privacy-policy/1',
  },

  profile: {
    getUserProfile: 'user/get-profile/',
    updateProfile: 'user/update-profile',
    changePassword: 'user/change-password',
  },

  workout: {
    uploadVideo: 'workouts/upload-video',
    addWorkout: 'workouts/create',
    getWorkouts: 'workouts/get',
    getWorkoutById: (id) => `workouts/show/${id}`,
    updateWorkout: 'workouts/update',
    deleteWorkout: (id) => `workouts/delete/${id}`,
    updateFeatureStatue: 'workouts/update-feature-status',
    updatePremiumStatue: 'workouts/update-premium-status',
    updateStatue: 'workouts/update-status',
  },

  insight: {
    add: 'insights/store',
    get: 'insights/all',
    update: 'insights/update',
    delete: (id) => `insights/delete/${id}`,
    show: (id) => `insights/show/${id}`,
    updateStatue: 'insights/update-status',
  },

  category: {
    getAllCategories: 'categories/all',
    getWorkoutCategories: 'categories/workout',
    getInsightCategories: 'categories/insight',
    createCategory: 'categories/create',
    updateCategory: (id) => `categories/update/${id}`,
    deleteCategory: (id) => `categories/delete/${id}`,
    updateStatue: 'categories/update-status',
    sort: 'categories/sort',
  },

  insightCategory: {
    getAllCategories: 'categories/all',
    getWorkoutCategories: 'categories/workout',
    getInsightCategories: 'categories/insight',
    createCategory: 'categories/create',
    updateCategory: (id) => `categories/update/${id}`,
    deleteCategory: (id) => `categories/delete/${id}`,
    updateStatue: 'categories/update-status',
  },

  dashboard: {
    statistics: 'dashboard/statistics',
    subscription: 'dashboard/subscription',
    workoutStates: 'dashboard/top-workout-state',
  },

  packages: {
    add: 'packages/create',
    get: 'packages/all',
    show: (id) => `packages/show/${id}`,
    update: 'packages/update',
    delete: (id) => `packages/delete/${id}`,
    updateStatue: 'packages/update-status',
  },
  users: {
    get: 'user/all',
    show: (id) => `user/show/${id}`,
    delete: (id) => `users/delete/${id}`,
    updateStatue: 'user/update-status',
  },

  subscriptions: {
    get: 'subscriptions/all',
    show: (id) => `subscriptions/show/${id}`,
    delete: (id) => `subscriptions/delete/${id}`,
    updateStatue: 'subscriptions/update-status',
  },

  faqs: {
    get: 'faqs/all',
    add: 'faqs/create',
    show: (id) => `faqs/show/${id}`,
    delete: (id) => `faqs/delete/${id}`,
    updateStatue: 'faqs/update-status',
    update: 'faqs/update',
    sort: 'faqs/sort',
  },
  pages: {
    get: 'pages/all',
    show: (id) => `pages/show/${id}`,
    delete: (id) => `pages/delete/${id}`,
    updateStatue: 'pages/update-status',
    update: 'pages/update',
  },
  notifications: {},
};

export { BaseURL, Endpoint, SocketURL };
