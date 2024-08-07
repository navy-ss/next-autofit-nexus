import { Card, Button, Typography, Flex } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Result = ({ scenarioTitle, scenarioDescription, onRetest }) => {
    const navigate = useNavigate();
    const PATH = import.meta.env.VITE_APP_LINK_TO_PATH;

    return (
        <Card className="questionnaire-card">
            <Title level={3}>{scenarioTitle}</Title>
            <Paragraph>{scenarioDescription}</Paragraph>
            <Flex justifyContent="center">
                {/* <Button type="primary" onClick={() => navigate(`${PATH}`)}>Back to Home</Button> */}
                <Button type="primary" onClick={onRetest} style={{ marginRight: '8px' }}>Retest</Button>
                <Button type="default" onClick={() => navigate(`${PATH}ROI`)}>ROI Calculator</Button>
            </Flex>
        </Card>
    );
};

Result.propTypes = {
    scenarioTitle: PropTypes.string.isRequired,
    scenarioDescription: PropTypes.string.isRequired,
    onRetest: PropTypes.func.isRequired,
};

export default Result;
