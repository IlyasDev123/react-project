import { routeConstant } from './routeConstants';
import Login from 'pages/login';
import Register from 'pages/register';
import Dashboard from 'pages/dashboard';
import User from 'pages/user';
import UserDetail from 'pages/user/detail';
import Setting from 'pages/setting';
import Workout from 'pages/workouts';
import AddWorkout from 'pages/workouts/add';
import EditWorkout from 'pages/workouts/edit';
import WorkoutDetail from 'pages/workouts/show';
import Insight from 'pages/insights/index';
import AddInsight from 'pages/insights/add';
import UpdateInsight from 'pages/insights/update';
import showInsight from 'pages/insights/show';
import Package from 'pages/packages/index';
import PackageDetail from 'pages/packages/show';
import AddPackage from 'pages/packages/add';
import UpdatePackage from 'pages/packages/update';
import Categories from 'pages/categories/index';
import SubscriptionHistory from 'pages/subscription-history/index';
import SubscriptionHistoryDetail from 'pages/subscription-history/show';
import InsightCategory from 'pages/insights/categories/index';
import CustomPages from 'pages/custom-pages';
import UpdatePages from 'pages/custom-pages/edit';
import Faqs from 'pages/faqs';
import UpdateOrCreate from 'pages/faqs/updateOrCreate';

const publicRoute = [
  {
    path: routeConstant.login.path,
    title: routeConstant.login.title,
    Component: Login,
  },
  {
    path: routeConstant.register.path,
    title: routeConstant.register.title,
    Component: Register,
  },
];

const privateRoute = [
  {
    path: routeConstant.dashboard.path,
    title: routeConstant.dashboard.title,
    Component: Dashboard,
  },
  {
    path: routeConstant.user.path,
    title: routeConstant.user.title,
    Component: User,
  },
  {
    path: routeConstant.userDetail.path,
    title: routeConstant.userDetail.title,
    Component: UserDetail,
  },
  {
    path: routeConstant.setting.path,
    title: routeConstant.setting.title,
    Component: Setting,
  },
  {
    path: routeConstant.workout.path,
    title: routeConstant.workout.title,
    Component: Workout,
  },
  {
    path: routeConstant.addWorkout.path,
    title: routeConstant.addWorkout.title,
    Component: AddWorkout,
  },
  {
    path: routeConstant.editWorkout.path,
    title: routeConstant.editWorkout.title,
    Component: EditWorkout,
  },
  {
    path: routeConstant.detailWorkout.path,
    title: routeConstant.detailWorkout.title,
    Component: WorkoutDetail,
  },

  {
    path: routeConstant.insight.path,
    title: routeConstant.insight.title,
    Component: Insight,
  },

  {
    path: routeConstant.addInsight.path,
    title: routeConstant.addInsight.title,
    Component: AddInsight,
  },

  {
    path: routeConstant.updateInsight.path,
    title: routeConstant.updateInsight.title,
    Component: UpdateInsight,
  },

  {
    path: routeConstant.detailInsight.path,
    title: routeConstant.detailInsight.title,
    Component: showInsight,
  },

  {
    path: routeConstant.package.path,
    title: routeConstant.package.title,
    Component: Package,
  },

  {
    path: routeConstant.addPackage.path,
    title: routeConstant.package.title,
    Component: AddPackage,
  },

  {
    path: routeConstant.detailPackage.path,
    title: routeConstant.package.title,
    Component: PackageDetail,
  },
  {
    path: routeConstant.editPackage.path,
    title: routeConstant.package.title,
    Component: UpdatePackage,
  },
  {
    path: routeConstant.category.path,
    title: routeConstant.category.title,
    Component: Categories,
  },

  {
    path: routeConstant.subscription.path,
    title: routeConstant.subscription.title,
    Component: SubscriptionHistory,
  },

  {
    path: routeConstant.subscriptionDetail.path,
    title: routeConstant.subscriptionDetail.title,
    Component: SubscriptionHistoryDetail,
  },
  {
    path: routeConstant.insightCategory.path,
    title: routeConstant.insightCategory.title,
    Component: InsightCategory,
  },
  {
    path: routeConstant.pages.path,
    title: routeConstant.pages.title,
    Component: CustomPages,
  },
  {
    path: routeConstant.updatePages.path,
    title: routeConstant.updatePages.title,
    Component: UpdatePages,
  },
  {
    path: routeConstant.faq.path,
    title: routeConstant.faq.title,
    Component: Faqs,
  },
  {
    path: routeConstant.updateFaq.path,
    title: routeConstant.updateFaq.title,
    Component: UpdateOrCreate,
  },
  {
    path: routeConstant.addFaq.path,
    title: routeConstant.addFaq.title,
    Component: UpdateOrCreate,
  },
];

export { publicRoute, privateRoute };
