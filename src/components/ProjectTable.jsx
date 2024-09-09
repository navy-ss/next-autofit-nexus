import { Badge, Table, Tag, Typography, Button, Tooltip } from 'antd';
import { RedoOutlined, RiseOutlined, EyeOutlined } from "@ant-design/icons"; // Import Ant Design icons
import { useNavigate } from "react-router-dom";
import { saveRoiData } from './handleFunctions';

const PATH = import.meta.env.VITE_APP_LINK_TO_PATH;

const ProjectsTable = ({ data, ...others }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const columns = [
        {
            title: "Process Name",
            dataIndex: "process_name",
            key: "process_name",
            width: "10%",
        },
        {
            title: "Owner",
            dataIndex: "owner",
            key: "owner",
            width: "10%",
        },
        {
            title: "Evaluated On",
            dataIndex: "evaluated_on",
            key: "evaluated_on",
            render: (text) => new Date(text).toLocaleDateString(),
            width: "10%",
        },
        {
            title: "Evaluation Summary",
            dataIndex: "evaluation_summary",
            key: "evaluation_summary",
            width: "25%",
        },
        {
            title: "ROI Assessment Summary",
            dataIndex: "roi_assessment_summary",
            key: "roi_assessment_summary",
            width: "25%",
        },
        {
            title: "Actions",
            key: "actions",
            width: "20%",
            render: (_, record) => {
                // const navigate = useNavigate();

                const handleShowROI = async () => {
                    try {
                        // Call API to save ROI data
                        const result_data = await saveRoiData(record.roi_questions);

                        // Navigate to ROI page with result data
                        navigate(`${PATH}ROI`, {
                            state: {
                                result_data: {
                                    // Assuming resultData is available in the scope
                                    ...result_data, // Replace with your actual resultData
                                },
                            },
                        });
                    } catch (error) {
                        console.error("Failed to save ROI data:", error);
                    }
                };

                return (
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {/* Re-evaluate Button */}
                        <Tooltip title="Re-evaluate">
                            <Button
                                type="default"
                                icon={<RedoOutlined style={{ color: "#fff" }} />}
                                onClick={() =>
                                    navigate(`${PATH}Automation`, {
                                        state: {
                                            dashboard_automation_id: record.id,
                                            initial_values: record.process_questions,
                                        },
                                    })
                                }
                                style={{
                                    backgroundColor: "#555", // Lighter silver-black color background
                                    color: "#fff", // Light font color
                                    border: "none",
                                }}
                            >
                                Re-evaluate
                            </Button>
                        </Tooltip>

                        {/* Go to ROI Button */}
                        <Tooltip title="Go to ROI">
                            <Button
                                type="default"
                                icon={<RiseOutlined style={{ color: "#fff" }} />}
                                onClick={() =>
                                    navigate(`${PATH}ROI`, {
                                        state: {
                                            dashboard_automation_id: record.id,
                                            initial_values: record.roi_questions,
                                        },
                                    })
                                }
                                style={{
                                    backgroundColor: "#555", // Lighter silver-black color background
                                    color: "#fff", // Light font color
                                    border: "none",
                                }}
                            >
                                Go to ROI
                            </Button>
                        </Tooltip>

                        {/* Show ROI Button */}
                        {record.roi_questions && <Tooltip title="Show ROI">
                            <Button
                                type="default"
                                icon={<EyeOutlined style={{ color: "#fff" }} />}
                                onClick={handleShowROI}
                                style={{
                                    backgroundColor: "#555", // Lighter silver-black color background
                                    color: "#fff", // Light font color
                                    border: "none",
                                }}
                            >
                                Show ROI
                            </Button>
                        </Tooltip>}
                    </div>
                );
            },
        },

    ];
    return (
        <Table
            dataSource={data}
            columns={columns}
            onRow={(record) => ({
                style: {
                    backgroundColor: record.row_color || 'lightgray', // Apply color from data or fallback to gray
                },
            })}
            className="overflow-scroll dashboard-table"
            {...others}
        />
    )
};

export default ProjectsTable;
