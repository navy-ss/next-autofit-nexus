// SavingsModal.jsx
import PropTypes from 'prop-types';
import { Modal, Table, Tooltip } from 'antd';
import Csv from './Csv';

const SavingsModal = ({ visible, onClose, savingsResults }) => {
    const savingsColumns = [
        { title: '', dataIndex: 'type', key: 'type' },
        { title: 'Development Phase', dataIndex: 'development_phase', key: 'development_phase' },
        { title: 'Month 1', dataIndex: 'month_1', key: 'month_1' },
        { title: 'Month 2', dataIndex: 'month_2', key: 'month_2' },
        { title: 'Month 3', dataIndex: 'month_3', key: 'month_3' },
        { title: 'Month 4', dataIndex: 'month_4', key: 'month_4' },
        { title: 'Month 5', dataIndex: 'month_5', key: 'month_5' },
        { title: 'Month 6', dataIndex: 'month_6', key: 'month_6' },
        { title: 'Month 7', dataIndex: 'month_7', key: 'month_7' },
        { title: 'Month 8', dataIndex: 'month_8', key: 'month_8' },
        { title: 'Month 9', dataIndex: 'month_9', key: 'month_9' },
        { title: 'Month 10', dataIndex: 'month_10', key: 'month_10' },
        { title: 'Month 11', dataIndex: 'month_11', key: 'month_11' },
        { title: 'Month 12', dataIndex: 'month_12', key: 'month_12' },
        { title: 'Month 13', dataIndex: 'month_13', key: 'month_13' },
        { title: 'Month 14', dataIndex: 'month_14', key: 'month_14' },
        { title: 'Month 15', dataIndex: 'month_15', key: 'month_15' },
        { title: 'Month 16', dataIndex: 'month_16', key: 'month_16' },
        { title: 'Month 17', dataIndex: 'month_17', key: 'month_17' },
        { title: 'Month 18', dataIndex: 'month_18', key: 'month_18' },
        { title: 'Month 19', dataIndex: 'month_19', key: 'month_19' },
        { title: 'Month 20', dataIndex: 'month_20', key: 'month_20' },
        { title: 'Month 21', dataIndex: 'month_21', key: 'month_21' },
        { title: 'Month 22', dataIndex: 'month_22', key: 'month_22' },
        { title: 'Month 23', dataIndex: 'month_23', key: 'month_23' },
        { title: 'Month 24', dataIndex: 'month_24', key: 'month_24' },
        { title: 'Month 25', dataIndex: 'month_25', key: 'month_25' },
        { title: 'Month 26', dataIndex: 'month_26', key: 'month_26' },
        { title: 'Month 27', dataIndex: 'month_27', key: 'month_27' },
        { title: 'Month 28', dataIndex: 'month_28', key: 'month_28' },
        { title: 'Month 29', dataIndex: 'month_29', key: 'month_29' },
        { title: 'Month 30', dataIndex: 'month_30', key: 'month_30' },
        { title: 'Month 31', dataIndex: 'month_31', key: 'month_31' },
        { title: 'Month 32', dataIndex: 'month_32', key: 'month_32' },
        { title: 'Month 33', dataIndex: 'month_33', key: 'month_33' },
        { title: 'Month 34', dataIndex: 'month_34', key: 'month_34' },
        { title: 'Month 35', dataIndex: 'month_35', key: 'month_35' },
        { title: 'Month 36', dataIndex: 'month_36', key: 'month_36' },
    ];

    return (
        <Modal
            // title="Detailed Savings Results"
            title={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "20px" }}>
                    <span>Detailed Savings Results</span>
                    <Tooltip title="Download this data in CSV" placement="left">
                        <Csv data={savingsResults} year={2024} />
                    </Tooltip>
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            width={2000} // Set the width of the modal
            style={{ top: 20 }} // Reduce the top margin
        >
            <Table
                className='result-savings-table'
                columns={savingsColumns}
                dataSource={savingsResults}
                pagination={false}
                scroll={{ x: 2000 }} // Enable horizontal scroll
                bordered
            />
        </Modal>
    );
};

SavingsModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    savingsResults: PropTypes.array.isRequired,
};

export default SavingsModal;
