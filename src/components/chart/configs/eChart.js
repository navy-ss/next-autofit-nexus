const createChartConfig = (dataObj) => {
  // Extract series data and colors from dataObj
  const seriesData = Object.values(dataObj); // Extract the data points
  const colors = Object.keys(dataObj); // Extract the colors

  // Construct the chart configuration
  const eChart = {
    series: [
      {
        name: "Total",
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
        categories: [
          "Ideal Fit",
          "Good Fit",
          "Possible with adjustments",
          "Not Suitable",
          "Needs further investigation",
        ],
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array(seriesData.length).fill("#fff"), // Labels color
          },
          formatter: function (val) {
            return val.length > 10 ? val.substring(0, 10) + "..." : val;
          },
        },
      },
      yaxis: {
        title: {
          text: "No of Processes",
          style: {
            color: "#ccc",
            fontSize: "14px",
            fontWeight: 600,
          },
        },
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array(seriesData.length).fill("#fff"), // Labels color
          },
          formatter: function (val) {
            return Math.floor(val); // Ensure y-axis values are whole numbers
          },
        },
        min: 0,
        max: Math.max(...seriesData), // Dynamically set the max value
        tickAmount: Math.max(...seriesData), // Ensure tick amount matches the max value
        forceNiceScale: true, // Disable "nice" scale to avoid decimal ticks
      },
      legend: {
        labels: {
          colors: "#fff", // Set legend labels color to white
        },
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val;
          },
        },
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      title: {
        text: "Summary of Processes Evaluated",
        align: "center",
        style: {
          color: "#fff",
          fontSize: "18px",
          fontWeight: 500,
          letterSpacing: "0.5px",
        },
      },
    },
  };

  return eChart;
};

export default createChartConfig;
