import {
  FaChartBar,
  FaUser,
  FaDumbbell,
  FaCog,
  FaInfoCircle,
  FaBookOpen,
  FaMoneyBill,
  FaQuestionCircle,
  FaBookReader,
} from 'react-icons/fa';

import { routeConstant } from 'src/shared/routes/routeConstants';

const sidebarItems = [
  {
    id: 1,
    name: 'Dashboard',
    path: routeConstant.dashboard.path,
    icon: FaChartBar,
  },
  { id: 2, name: 'Users', path: routeConstant.user.path, icon: FaUser },
  {
    id: 3,
    name: 'Workouts',
    path: routeConstant.workout.path,
    icon: FaDumbbell,
    // submenu: [
    //   {
    //     name: 'Add Workout',
    //     path: '/workouts/add',
    //     icon: FaPlus,
    //   },
    // ],
  },
  {
    id: 4,
    name: 'Categories',
    path: routeConstant.category.path,
    icon: FaBookOpen,
  },
  {
    id: 4,
    name: 'Insight Categories',
    path: routeConstant.insightCategory.path,
    icon: FaBookOpen,
  },
  {
    id: 5,
    name: 'Insights',
    path: routeConstant.insight.path,
    icon: FaInfoCircle,
  },
  {
    id: 6,
    name: 'Packages',
    path: routeConstant.package.path,
    icon: FaInfoCircle,
  },
  {
    id: 6,
    name: 'Subscriptions',
    path: routeConstant.subscription.path,
    icon: FaMoneyBill,
  },

  { id: 7, name: 'Pages', path: '/pages', icon: FaBookReader },
  { id: 8, name: 'Faqs', path: '/faqs', icon: FaQuestionCircle },
  { id: 9, name: 'Setting', path: '/setting', icon: FaCog },
];
export { sidebarItems };
