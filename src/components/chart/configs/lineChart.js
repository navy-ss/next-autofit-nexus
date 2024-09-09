const createLineChartConfig = (dataObj) => {
  // Extract series data and colors from dataObj
  const seriesData = Object.values(dataObj); // Extract the data points
  const colors = Object.keys(dataObj); // Extract the colors

  // Construct the line chart configuration
  const lineChart = {
    series: [
      {
        name: "Total",
        data: seriesData, // Keep all data points in a single series
      },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },

      legend: {
        show: true,
        labels: {
          colors: "#fff",
        },
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "smooth",
        width: 2,
        // colors: colors, // Use the colors array for the stroke
      },

      markers: {
        size: 5,
        // colors: colors, // Different color for each marker
        strokeColor: "#fff",
        strokeWidth: 2,
      },

      yaxis: {
        title: {
          text: "No of Processes",
          style: {
            color: "#8c8c8c",
            fontSize: "14px",
            fontWeight: 600,
          },
        },
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
          formatter: function (val) {
            return Math.floor(val); // Ensure y-axis values are whole numbers
          },
        },
        min: 0,
        max: Math.max(...seriesData), // Set max based on data
        tickAmount: Math.max(...seriesData), // Ensure tick amount matches the max value
        forceNiceScale: true, // Disable "nice" scale to avoid decimal ticks
      },

      xaxis: {

        categories: [
          "Ideal Fit",
          "Good Fit",
          "Possible with adjustments",
          "Not Suitable",
          "Needs further investigation",
        ].map((val) => (val.length > 20 ? val.substring(0, 20) + "..." : val)), // Truncate long labels
      },
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: Array(seriesData.length).fill("#8c8c8c"),
        },
      },

      // colors: colors, // Use the extracted colors array
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return lineChart;
};

export default createLineChartConfig;
