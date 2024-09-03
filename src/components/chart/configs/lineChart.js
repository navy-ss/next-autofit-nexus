const createLineChartConfig = (dataObj) => {
  // Extract series data and colors from dataObj
  const seriesData = Object.values(dataObj); // Extract the data points
  const colors = Object.keys(dataObj); // Extract the colors

  // Construct the line chart configuration
  const lineChart = {
    series: [
      {
        name: "Mobile apps",
        data: seriesData, // Use the extracted data points for the series
        offsetY: 0,
      },
      // Add more series if needed, using similar dynamic extraction
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },

      legend: {
        show: true, // Enable legend to show series names
        labels: {
          colors: "#fff", // Set legend labels color to white
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: Array(seriesData.length).fill("#8c8c8c"), // Labels color
          },
        },
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
        ],
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