import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Col,
    Row,
    Typography,
    Spin,
    Tooltip,
} from "antd";
import { ClockCircleOutlined, UserOutlined, DollarOutlined, CalendarOutlined } from "@ant-design/icons";
import { getDashboardData } from "../components/handleFunctions";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import ProjectsPage from "../components/ProjectsPage";
import "../styles/components/Dashboard/index.scss";

function Dashboard() {
    const { Title, Text } = Typography;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [count, setCount] = useState([]);
    const [formattedData, setFormattedData] = useState([]);
    // const [lineData, setLineData] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        setLoading(true);
        getDashboardData().then((data) => {
            // console.log(JSON.stringify(data));
            const dataList = chartData(data);
            // const lineDataList = lineChartData(data);
            setFormattedData(dataList);
            // setLineData(lineDataList);
            // console.log("dataList1", JSON.stringify(dataList1));
            const countData = calculateData(data);
            setCount(countData);
            setData(data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    // const lineChartData = (data) => {
    //     const colors = ["springgreen", "lightgreen", "lemonchiffon", "lightgray", "lightskyblue"];

    //     // Initialize an object to store the sum of hours_saved, fte_reduction, and fte_cost_savings for each color
    //     const colorData = colors.reduce((acc, color) => {
    //         acc[color] = { hours_saved: 0, fte_reduction: 0, fte_cost_savings: 0 }; // Initialize each data point to 0
    //         return acc;
    //     }, {});

    //     // Iterate over the data to aggregate the values for each color
    //     data.forEach(item => {
    //         const color = item.row_color;
    //         if (colorData[color] !== undefined) {
    //             colorData[color].hours_saved += item.hours_saved || 0;
    //             colorData[color].fte_reduction += item.fte_reduction || 0;
    //             colorData[color].fte_cost_savings += item.fte_cost_savings || 0;
    //         }
    //     });

    //     return colorData; // Return the object containing the data for each color
    // };

    const chartData = (data) => {
        const colors = ["springgreen", "lightgreen", "lemonchiffon", "lightgray", "lightskyblue"];

        // Initialize an object to store the count of each color
        const colorCounts = colors.reduce((acc, color) => {
            acc[color] = 0; // Initialize each color count to 0
            return acc;
        }, {});

        // Iterate over the data to count occurrences of each color
        data.forEach(item => {
            const color = item.row_color; // Get the color for the current data object
            if (colorCounts[color] !== undefined) {
                colorCounts[color] += 1; // Increment the count for the corresponding color
            }
        });

        return colorCounts; // Return the object containing the count for each color
    };

    const calculateData = (data) => {
        // Calculate the sums
        const totalHoursSaved = data.reduce((sum, item) => sum + item.hours_saved, 0);
        const totalFTEReduction = data.reduce((sum, item) => sum + item.fte_reduction, 0);
        const totalFTECostSavings = data.reduce((sum, item) => sum + item.fte_cost_savings, 0);

        // Filter out items with valid avg_duration_recovery values (non-null and a number)
        const validDurations = data.filter(item => Number.isFinite(item.avg_duration_recovery) && item.avg_duration_recovery !== null);

        // Calculate the average only with valid avg_duration_recovery values
        const avgDurationRecovery = validDurations.reduce((sum, item) => sum + item.avg_duration_recovery, 0) / validDurations.length;

        // Prepare the state data
        const result = [
            {
                today: "Expected No of Hours Saved",
                title: `+${totalHoursSaved.toLocaleString()}`,
                persent: "+30%",
                icon: <ClockCircleOutlined />,
                bnb: "bnb2",
            },
            {
                today: "Expected FTE Reduction",
                title: `${totalFTEReduction.toLocaleString()}`,
                persent: "+20%",
                icon: <UserOutlined />,
                bnb: "bnb2",
            },
            {
                today: "Expected Cost Savings",
                title: `$${totalFTECostSavings.toLocaleString()}`,
                persent: "+20%",
                icon: <DollarOutlined />,
                bnb: "bnb2",
            },
            {
                today: "Avg Duration to Recover Investments (In Months)",
                title: validDurations.length > 0 ? `${avgDurationRecovery.toFixed(2)}` : "N/A", // Show N/A if no valid duration
                persent: "10%",
                icon: <CalendarOutlined />,
                bnb: "bnb2",
            },
        ];

        return result;
    };

    return (
        <div className="layout-content">
            <Spin spinning={loading} tip="Loading...">
                <div className="header-text">
                    Total Number of Processes Evaluated:  {data.length}
                </div>
                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={10} className="kpi mb-12">
                        {count.map((c, index) => (
                            <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24} className="mb-12">
                                <Card bordered={false} className="criclebox h-full">
                                    <div className="number">
                                        <Row align="middle" gutter={[24, 0]}>
                                            <Col xs={18}>
                                                <span>{c.today}</span>
                                                <Title level={3}>
                                                    {c.title}
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="icon-box">{c.icon}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={14} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <Echart data={formattedData} />
                        </Card>
                    </Col>
                </Row>
                <ProjectsPage data={data} />
            </Spin>
        </div>
    );
}

export default Dashboard;
