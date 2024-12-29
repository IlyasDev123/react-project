// SubscriptionGraph.js

import { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { getWorkoutsData } from 'src/shared/services/dashboardService';
import { toastMessage } from '../toast';
import InputField from '../form/inputField';
import Loader from 'shared/components/loader';

const WorkoutsGraph = ({ title }) => {
  const [workoutData, setworkoutData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const getWorkoutsStatistics = () => {
    setIsLoader(true);
    getWorkoutsData()
      .then(({ data: { data } }) => {
        console.log('********************', data);
        setworkoutData(data);
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

  const handleChange = (e) => {
    console.log(e.value);
  };

  useEffect(() => {
    getWorkoutsStatistics();
  }, []);

  const chartOptions = {
    data: workoutData,
    series: [
      {
        title: {
          text: 'Annual Fuel Expenditure',
        },
        xKey: 'title',
        yKey: 'count',
        yName: 'Workout',
        stroke: 'blue',
        label: {
          fontWeight: 'bold',
          formatter: ({ value }) => value.toFixed(0),
        },
        marker: {
          fill: 'green',
          size: 5,
          stroke: 'blue',
          strokeWidth: 2,
          shape: 'diamond',
        },
      },
    ],
  };

  return (
    <div>
      <h2 className="text-md text-center">{title}</h2>
      {isLoader ? <Loader /> : <AgChartsReact options={chartOptions} />}
    </div>
  );
};

export default WorkoutsGraph;
