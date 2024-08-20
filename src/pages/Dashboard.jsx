import { Table, Button, Spin } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/Dashboard/index.scss";
import HeaderTitle from "../components/HeaderTitle";
import { getDashboardData } from "../components/handleFunctions";

const PATH = import.meta.env.VITE_APP_LINK_TO_PATH;

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    getDashboardData().then((data) => {
      console.log(data);
      setData(data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: "Process Name",
      dataIndex: "process_name",
      key: "process_name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Evaluated On",
      dataIndex: "evaluated_on",
      key: "evaluated_on",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Evaluation Summary",
      dataIndex: "evaluation_summary",
      key: "evaluation_summary",
    },
    {
      title: "ROI Assessment Summary",
      dataIndex: "roi_assessment_summary",
      key: "roi_assessment_summary",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => navigate(`${PATH}Automation`, { state: { dashboard_automation_id: record.id, initial_values: record.process_questions } })}
        >
          View/Modify
        </Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="home-page">
        <HeaderTitle />
        <div className="table-container">
          <Table
            className="dashboard-table"
            columns={columns}
            dataSource={data}
            pagination={true}
            scroll={{ y: 300 }} // Add vertical scroll with a fixed height
          />
        </div>
      </div>
    </Spin>
  );
}

export default Dashboard;
