// RoiResult.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Typography } from 'antd';
import '../styles/components/RoiResult/index.scss';

const { Title } = Typography;

const RoiResult = ({ answers, onRetest }) => {
    const calculateMetrics = (answers) => {
        const answer1 = parseFloat(answers.question_1);
        const answer2 = parseFloat(answers.question_2);
        const answer3 = parseFloat(answers.question_3);

        const monthlyHours = answer1 * answer2;
        const annualHours = monthlyHours * 12;
        const hcMonthly = answer2 / 160;
        const hcAnnually = hcMonthly * 12;
        const fteCostSavingsMonthly = hcMonthly * answer3;
        const fteCostSavingsAnnually = fteCostSavingsMonthly * 12;

        return {
            monthlyHours,
            annualHours,
            hcMonthly,
            hcAnnually,
            fteCostSavingsMonthly,
            fteCostSavingsAnnually,
        };
    };

    const metrics = calculateMetrics(answers);

    const columns = [
        {
            title: '',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Monthly',
            dataIndex: 'monthly',
            key: 'monthly',
        },
        {
            title: 'Annually',
            dataIndex: 'annually',
            key: 'annually',
        },
    ];

    const data = [
        {
            key: '1',
            type: 'No of hours',
            monthly: metrics.monthlyHours.toFixed(2),
            annually: metrics.annualHours.toFixed(2),
        },
        {
            key: '2',
            type: 'HC',
            monthly: metrics.hcMonthly.toFixed(2),
            annually: metrics.hcAnnually.toFixed(2),
        },
        {
            key: '3',
            type: 'Total FTE Cost/Savings',
            monthly: `$${metrics.fteCostSavingsMonthly.toFixed(2)}`,
            annually: `$${metrics.fteCostSavingsAnnually.toFixed(2)}`,
        },
    ];

    return (
        <div className="roi-result-container">
            <Title level={2}>
                Expected FTE Cost Savings
            </Title>
            <Table
                className='result-table'
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
            />
            <div style={{ marginTop: '20px' }}>
                <Button type="primary" onClick={onRetest}>
                    Retest
                </Button>
            </div>
        </div>
    );
};

RoiResult.propTypes = {
    answers: PropTypes.object.isRequired,
    onRetest: PropTypes.func.isRequired,
};

export default RoiResult;
