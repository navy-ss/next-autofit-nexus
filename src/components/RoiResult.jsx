// RoiResult.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Typography } from 'antd';
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

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="roi-result-container">
            <Title level={2}>Expected FTE Cost Savings</Title>
            <Table
                className='result-table'
                columns={columns}
                dataSource={results}
                pagination={false}
                bordered
            />
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
