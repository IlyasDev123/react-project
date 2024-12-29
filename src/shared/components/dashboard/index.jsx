import { useEffect, useState } from 'react';
import DataCards from 'shared/components/data-card';
import Card from 'shared/components/card';

import { getStatistics } from 'src/shared/services/dashboardService';
import { toastMessage } from '../toast';
import SubscriptionGraph from './subscription-chart';
import WorkoutsGraph from './workouts-graph';

export default function Dashboard() {
  const [statistics, setStatistics] = useState();
  const [isLoader, setIsLoader] = useState(false);

  const getDashboardState = () => {
    setIsLoader(true);
    getStatistics()
      .then(({ data: { data } }) => {
        console.log('data', data);
        setStatistics(data);
        setIsLoader(false);
      })
      .catch(() => {
        setIsLoader(false);
        toastMessage('error', 'Something went wrong!');
      })
      .finally(() => {
        setIsLoader(false);
      });
  };

  useEffect(() => {
    getDashboardState();
  }, []);

  const data = {
    user: {
      title: 'Total Users',
      count: statistics?.users.total,
      path: '/users',
      active: statistics?.users?.active ?? 0,
      inactive: statistics?.users?.inactive ?? 0,
      premium: statistics?.users?.premium ?? 0,
      free: statistics?.users?.free ?? 0,
    },

    workout: {
      title: 'Total Workout',
      path: '/workouts',
      count: statistics?.workouts.total,
      active: statistics?.workouts?.active ?? 0,
      inactive: statistics?.workouts?.inactive ?? 0,
    },

    insight: {
      title: 'Total Insight',
      path: '/insights',
      count: statistics?.insights.total,
      active: statistics?.insights?.active ?? 0,
      inactive: statistics?.insights?.inactive ?? 0,
    },

    subscription: {
      title: 'Total Subscription',
      path: '/subscription',
      count: statistics?.subscription.total,
      active: statistics?.subscription?.active ?? 0,
      inactive: statistics?.subscription?.inactive ?? 0,
    },
  };

  return (
    <>
      <div>
        <DataCards
          data={data}
          customClass="grid grid-cols-1 md:grid-cols-4 gap-4"
          isLoader={isLoader}
        />
      </div>
      <Card customClass="p-2 bg-white my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SubscriptionGraph title="Monthly Subscription" />
          </div>
          <div>
            <WorkoutsGraph title="Top Workouts" />
          </div>
        </div>
      </Card>
    </>
  );
}
