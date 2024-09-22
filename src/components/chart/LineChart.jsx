import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import createLineChartConfig from "./configs/lineChart";

function LineChart({ data }) {
  const { Title, Paragraph } = Typography;
  const lineChart = createLineChartConfig(data);
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Key Metrics for Process Efficiency</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
        </div>
        {/* <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div> */}
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="bar"
        height={380}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
