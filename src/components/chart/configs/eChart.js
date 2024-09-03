const createChartConfig = (dataObj) => {
  // Extract series data and colors from dataObj
  const seriesData = Object.values(dataObj); // Extract the data points
  const colors = Object.keys(dataObj); // Extract the colors

  // Construct the chart configuration
  const eChart = {
    series: [
      {
        name: "Sales",
        data: seriesData, // Use the extracted data points for the series
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          distributed: true, // Enable distributed colors for each bar
        },
      },
      colors: colors, // Use the extracted colors array
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun"], // Adjusted for 5 data points
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array(seriesData.length).fill("#fff"), // Labels color
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array(seriesData.length).fill("#fff"), // Labels color
          },
        },
      },
      legend: {
        labels: {
          colors: "#fff", // Set legend labels color to white
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };

  return eChart;
};

export default createChartConfig;