import { Table, Button } from "antd";
import "../styles/components/Dashboard/index.scss";
import HeaderTitle from "../components/HeaderTitle";

const columns = [
  {
    title: "Process Name",
    dataIndex: "processName",
    key: "processName",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "Evaluated On",
    dataIndex: "evaluatedOn",
    key: "evaluatedOn",
  },
  {
    title: "Evaluation Summary",
    dataIndex: "evaluationSummary",
    key: "evaluationSummary",
  },
  {
    title: "ROI Assessment Summary",
    dataIndex: "roiAssessmentSummary",
    key: "roiAssessmentSummary",
  },
  {
    title: "Action",
    key: "action",
    render: () => <Button type="link">View/Modify</Button>,
  },
];

const data = [
  {
    key: "1",
    processName: "Automation Potential Evaluation",
    owner: "Suruchi Pendse",
    evaluatedOn: "08/08/2024",
    evaluationSummary: "Process is an ideal fit for automation",
    roiAssessmentSummary: "ROI Assessment Summary 1",
  },
  {
    key: "2",
    processName: "Automation Potential Evaluation",
    owner: "Suruchi Pendse",
    evaluatedOn: "08/08/2024",
    evaluationSummary: "Process is a good fit with minor adjustments needed",
    roiAssessmentSummary: "ROI Assessment Summary 2",
  },
  //   {
  //     key: "3",
  //     processName: "Process 1",
  //     owner: "Owner 1",
  //     evaluatedOn: "01/01/2021",
  //     evaluationSummary: "Evaluation Summary 1",
  //     roiAssessmentSummary: "ROI Assessment Summary 1",
  //   },
  //   {
  //     key: "4",
  //     processName: "Process 2",
  //     owner: "Owner 2",
  //     evaluatedOn: "01/01/2021",
  //     evaluationSummary: "Evaluation Summary 2",
  //     roiAssessmentSummary: "ROI Assessment Summary 2",
  //   },
  //   {
  //     key: "5",
  //     processName: "Process 1",
  //     owner: "Owner 1",
  //     evaluatedOn: "01/01/2021",
  //     evaluationSummary: "Evaluation Summary 1",
  //     roiAssessmentSummary: "ROI Assessment Summary 1",
  //   },
  //   {
  //     key: "6",
  //     processName: "Process 2",
  //     owner: "Owner 2",
  //     evaluatedOn: "01/01/2021",
  //     evaluationSummary: "Evaluation Summary 2",
  //     roiAssessmentSummary: "ROI Assessment Summary 2",
  //   },
  //   {
  //     key: "7",
  //     processName: "Process 1",
  //     owner: "Owner 1",
  //     evaluatedOn: "01/01/2021",
  //     evaluationSummary: "Evaluation Summary 1",
  //     roiAssessmentSummary: "ROI Assessment Summary 1",
  //   },
  //   {
  //     key: "8",
  //     processName: "Process 2",
  //     owner: "Owner 2",
  //     evaluatedOn: "01/01/2021",
  //     evaluationSummary: "Evaluation Summary 2",
  //     roiAssessmentSummary: "ROI Assessment Summary 2",
  //   },
];

function Dashboard() {
  return (
    <>
      <div className="home-page">
        <HeaderTitle />
        <div className="table-container">
          <Table
            className="dashboard-table"
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ y: 300 }} // Add vertical scroll with a fixed height
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
