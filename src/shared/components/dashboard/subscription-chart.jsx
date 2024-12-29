// SubscriptionGraph.js

import { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { getSubscriptionData } from 'src/shared/services/dashboardService';
import { toastMessage } from '../toast';
import InputField from '../form/inputField';
import Loader from 'shared/components/loader';

const SubscriptionGraph = ({ title }) => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const getSubscriptions = () => {
    setIsLoader(true);
    getSubscriptionData()
      .then(({ data: { data } }) => {
        setSubscriptionData(data);
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
    console.log('Component mounted');
    getSubscriptions();
  }, []);

  const chartOptions = {
    data: subscriptionData,
    series: [
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'count',
        fills: ['#7cb5ec'],
        strokes: ['#1f497d'],
        tooltipRenderer: function (params) {
          return params.yValue + ' subscriptions in ' + params.xValue;
        },
      },
    ],
    xAxis: {
      title: {
        text: 'Month',
      },
    },
    yAxis: {
      title: {
        text: 'Subscription Count',
      },
    },
    // Set a specific distance between the bars (barWidth as a percentage)
    barWidth: 0.3, // Adjust this value based on your preference
  };

  return (
    <div>
      {/* <InputField
        type="date"
        placeholder="Enter title"
        name="title"
        onChange={handleChange}
      /> */}
      <h2 className="text-md text-center">{title}</h2>
      {isLoader ? <Loader /> : <AgChartsReact options={chartOptions} />}
    </div>
  );
};

export default SubscriptionGraph;
