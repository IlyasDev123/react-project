const routeConstant = {
  login: {
    path: '/',
    title: 'Login',
  },
  register: {
    path: '/register',
    title: 'Register',
  },

  dashboard: {
    path: '/dashboard',
    title: 'Dashboard',
  },

  setting: {
    path: '/setting',
    title: 'Setting',
  },

  user: {
    path: '/users',
    title: 'Users',
  },

  userDetail: {
    path: '/users/:id',
    title: 'Users',
  },

  workout: {
    path: '/workouts',
    title: 'Workouts',
  },

  addWorkout: {
    path: '/workouts/add',
    title: 'Add Workout',
  },

  editWorkout: {
    path: '/workouts/edit/:id',
    title: 'Edit Workout',
  },

  detailWorkout: {
    path: '/workouts/detail/:id',
    title: 'Detail Workout',
  },

  insight: {
    path: '/insights',
    title: 'Insight',
  },

  addInsight: {
    path: '/insights/add',
    title: 'Add',
  },

  updateInsight: {
    path: '/insights/update/:id',
    title: 'Update',
  },

  detailInsight: {
    path: '/insights/detail/:id',
    title: 'Detail Insight',
  },

  package: {
    path: '/packages',
    title: 'Packages',
  },

  detailPackage: {
    path: '/packages/detail/:id',
    title: 'Detail Package',
  },

  addPackage: {
    path: '/packages/add',
    title: 'Add Package',
  },

  editPackage: {
    path: '/packages/edit/:id',
    title: 'Edit Package',
  },

  category: {
    path: '/categories',
    title: 'Categories',
  },
  subscription: {
    path: '/subscriptions',
    title: 'Subscriptions',
  },
  subscriptionDetail: {
    path: '/subscriptions/detail/:id',
    title: 'Subscription Detail',
  },

  insightCategory: {
    path: '/insight-categories',
    title: 'Insight Categories',
  },

  pages: {
    path: '/pages',
    title: 'Pages',
  },

  updatePages: {
    path: '/pages/update/:id',
    title: 'Update Pages',
  },

  faq: {
    path: '/faqs',
    title: 'FAQs',
  },
  updateFaq: {
    path: '/faqs/update/:id',
    title: 'Update FAQs',
  },
  addFaq: {
    path: '/faqs/add',
    title: 'Add FAQs',
  },
};
export { routeConstant };
