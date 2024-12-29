import { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';

const PieChart = ({ chartValues }) => {
  const [options, setOptions] = useState({
    data: [],
    title: {
      text: 'Portfolio Composition',
    },
    series: [
      {
        type: 'pie',
        angleKey: 'totalCount',
        calloutLabelKey: 'asset',
        sectorLabelKey: 'count',
        sectorLabel: {
          color: 'white',
          fontWeight: 'bold',
          formatter: ({ value }) => `$${(value / 1000).toFixed(0)}K`,
        },
      },
    ],
  });

  useEffect(() => {
    // Update options when the values prop changes
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: chartValues,
    }));
  }, [chartValues]);

  return <AgChartsReact options={options} />;
};

export default PieChart;
