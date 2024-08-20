import { Card, Button, Typography, Flex } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Result/index.scss';

const { Title, Paragraph } = Typography;

const Result = ({ scenarioTitle, scenarioDescription, onRetest, recordId }) => {
    const navigate = useNavigate();
    const PATH = import.meta.env.VITE_APP_LINK_TO_PATH;

    return (
        <div className="result-container">
            <Card className="questionnaire-card" style={{ marginTop: "50px" }}>
                <Title level={1}>{scenarioTitle}</Title>
                <Paragraph style={{ fontSize: "20px" }}>{scenarioDescription}</Paragraph>
                <Flex justifyContent="center">
                    {/* <Button type="primary" onClick={() => navigate(`${PATH}`)}>Back to Home</Button> */}
                    <Button type="primary" onClick={onRetest} style={{ marginRight: '8px', fontSize: "18px", padding: "18px" }}>Retest</Button>
                </Flex>
            </Card>
            {/* <Button type="default" onClick={() => navigate(`${PATH}ROI`)} style={{marginTop: "30px"}}>ROI Calculator</Button> */}
            <Button
                type="default"
                onClick={() => navigate(`${PATH}ROI`, { state: { dashboard_automation_id: recordId } })}
                size="large"
                style={{ marginTop: "30px", display: 'flex', alignItems: 'center' }}
            >
                ROI Calculator <ArrowRightOutlined style={{ marginLeft: '8px' }} />
            </Button>
        </div>
    );
};

Result.propTypes = {
    scenarioTitle: PropTypes.string.isRequired,
    scenarioDescription: PropTypes.string.isRequired,
    onRetest: PropTypes.func.isRequired,
    recordId: PropTypes.number,
};

export default Result;
