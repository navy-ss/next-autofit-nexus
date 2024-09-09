import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Space, Button } from 'antd';
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';
import ProjectsTable from './ProjectTable';

const PATH = import.meta.env.VITE_APP_LINK_TO_PATH;

const ProjectsPage = ({ data }) => {
    const navigate = useNavigate();
    const [projectTabsKey, setProjectsTabKey] = useState('all');

    const PROJECT_TABS_CONTENT = {
        all: <ProjectsTable key="all-projects-table" data={data} />,
        inProgress: (
            <ProjectsTable
                key="in-progress-projects-table"
                data={data.filter((project) => project.hours_saved > 0)}
            />
        ),
        onHold: (
            <ProjectsTable
                key="on-hold-projects-table"
                data={data.filter((project) => !project.hours_saved)}
            />
        ),
    };

    const PROJECT_TABS = [
        { key: 'all', label: 'All Processes' },
        { key: 'inProgress', label: 'Completed' },
        { key: 'onHold', label: 'Pending' },
    ];

    const onProjectsTabChange = (key) => {
        setProjectsTabKey(key);
    };

    const handleNewProcess = () => {
        navigate(`${PATH}Automation`);
    }

    return (
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={24}>
                <Card
                    title="Process Table"
                    className='criclebox h-full'
                    extra={
                        <Space>
                            {/* <Button icon={<CloudUploadOutlined />}>Import</Button> */}
                            <Button icon={<PlusOutlined />} onClick={handleNewProcess}>New processes</Button>
                        </Space>
                    }
                    tabList={PROJECT_TABS}
                    activeTabKey={projectTabsKey}
                    onTabChange={onProjectsTabChange}
                >
                    {PROJECT_TABS_CONTENT[projectTabsKey]}
                </Card>
            </Col>
        </Row>
    );
};

export default ProjectsPage;
