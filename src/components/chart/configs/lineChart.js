const createLineChartConfig = (dataObj) => {
  const hoursSavedSeries = Object.keys(dataObj).map(color => dataObj[color].hours_saved || 0);
  const fteReductionSeries = Object.keys(dataObj).map(color => dataObj[color].fte_reduction || 0);
  const fteCostSavingsSeries = Object.keys(dataObj).map(color => dataObj[color].fte_cost_savings || 0);

  // X-axis categories
  const categories = [
    "Ideal Fit",
    "Good Fit",
    "Possible with adjustments",
    "Not Suitable",
    "Needs further investigation",
  ];

  const columnChart = {
    series: [
      {
        name: "Hours Saved",
        data: hoursSavedSeries,
      },
      {
        name: "FTE Reduction",
        data: fteReductionSeries,
      },
      {
        name: "FTE Cost Savings",
        data: fteCostSavingsSeries,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      colors: ['#414bb2', '#77B6EA', '#FCCF31'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: categories, // Use predefined X-axis labels
        title: {
          text: 'Process Fit Categories', // Updated title
        },
      },
      yaxis: {
        title: {
          text: 'Values',
        },
        labels: {
          formatter: function (val) {
            return Math.floor(val); // Ensure no decimal points on Y-axis values
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return Math.floor(val); // Remove decimal points in tooltip as well
          },
        },
      },
      legend: {
        labels: {
          colors: ['#000'], // You can adjust this based on your theme
        },
        title: {
          text: 'Metrics', // Updated legend title from 'Colors' to 'Metrics'
        },
      },
    },
  };

  return columnChart;
};

export default createLineChartConfig;
