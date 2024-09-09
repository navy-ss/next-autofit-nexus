// RoiResult.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Typography, Row, Col, Card, Tooltip } from 'antd';
import { ClockCircleOutlined, UserOutlined, DollarOutlined, CalendarOutlined } from "@ant-design/icons";
import SavingsModal from './SavingsModal';
import '../styles/components/RoiResult/index.scss';

const { Title } = Typography;

const RoiResult = ({ onRetest, resultData = {} }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const results = resultData.results || [];
    const savingsResults = resultData.savings_results || [];

    const columns = [
        { title: '', dataIndex: 'type', key: 'type' },
        { title: 'Monthly', dataIndex: 'monthly', key: 'monthly' },
        { title: 'Annually', dataIndex: 'annually', key: 'annually' },
    ];

    // Icons for the different types
    const iconMap = {
        "No of hours": <ClockCircleOutlined />,
        "HC": <UserOutlined />,
        "Total FTE Cost/Savings": <DollarOutlined />,
    };

    // Generate cards dynamically
    const cards = results.flatMap((result) => [
        {
            today: result.type,
            title: `${result.monthly.toLocaleString()}`,
            period: "Monthly",
            icon: iconMap[result.type] || <CalendarOutlined />,
        },
        {
            today: result.type,
            title: `${result.annually.toLocaleString()}`,
            period: "Annually",
            icon: iconMap[result.type] || <CalendarOutlined />,
        },
    ]);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="roi-result-container">
            <Title level={2}>Expected FTE Cost Savings</Title>
            <Row className="rowgap-vbox" gutter={[24, 0]}>
                {cards.map((card, index) => (
                    <Col
                        key={index}
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={12}
                        className="mb-24"
                    >
                        <Card bordered={false} className="criclebox">
                            <div className="number">
                                <Row align="middle" gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>{card.today} ({card.period})</span>
                                        <Title level={3}>
                                            {card.title}
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <Tooltip title={card.period}>
                                            <div className="icon-box">{card.icon}</div>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* <Table
                className='result-table'
                columns={columns}
                dataSource={results}
                pagination={false}
                bordered
            /> */}
            <Button type="primary" onClick={handleOpenModal} style={{ marginTop: '20px' }}>
                View Detailed Savings
            </Button>
            <div style={{ marginTop: '20px' }}>
                <Button type="primary" onClick={onRetest}>
                    Retest
                </Button>
            </div>

            {/* Modal for Savings Results */}
            <SavingsModal
                visible={modalVisible}
                onClose={handleCloseModal}
                savingsResults={savingsResults}
            />
        </div>
    );
};

RoiResult.propTypes = {
    onRetest: PropTypes.func.isRequired,
    resultData: PropTypes.object,
};

export default RoiResult;
