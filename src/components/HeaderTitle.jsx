import React from 'react';
import { useSelector } from "react-redux";
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

function HeaderTitle() {
    const topbarTitle = useSelector(state => state.global.topbarTitle);
    // console.log('topbarTitle', topbarTitle);

    return (
        <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
            <Col>
                <Title level={2} style={{ fontFamily: "Roboto", color: "#414BB2", fontWeight: "500" }}>
                    {topbarTitle}
                </Title>
            </Col>
        </Row>
    );
}

export default HeaderTitle;
