import { Card, Button, Typography, Flex } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Result/index.scss';

const { Title, Paragraph } = Typography;

const Result = ({ scenarioTitle, scenarioDescription, onRetest }) => {
    const navigate = useNavigate();
    const PATH = import.meta.env.VITE_APP_LINK_TO_PATH;

    return (
        <div className="result-container">
            <Card className="questionnaire-card" style={{ marginTop: "50px" }}>
                <Title level={3}>{scenarioTitle}</Title>
                <Paragraph>{scenarioDescription}</Paragraph>
                <Flex justifyContent="center">
                    {/* <Button type="primary" onClick={() => navigate(`${PATH}`)}>Back to Home</Button> */}
                    <Button type="primary" onClick={onRetest} style={{ marginRight: '8px' }}>Retest</Button>
                </Flex>
            </Card>
            {/* <Button type="default" onClick={() => navigate(`${PATH}ROI`)} style={{marginTop: "30px"}}>ROI Calculator</Button> */}
            <Button
                type="default"
                onClick={() => navigate(`${PATH}ROI`)}
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
};

export default Result;
