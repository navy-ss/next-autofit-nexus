import React, { useState } from 'react';
import { Row, Col, Card, Space, Button } from 'antd';
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';
import ProjectsData from '../mocks/Projects.json';
import ProjectsTable from './ProjectTable';

const ProjectsPage = ({ data }) => {
    console.log(data);
    const [projectTabsKey, setProjectsTabKey] = useState('all');

    const PROJECT_TABS_CONTENT = {
        all: <ProjectsTable key="all-projects-table" data={data} />,
        inProgress: (
            <ProjectsTable
                key="in-progress-projects-table"
                // data={ProjectsData.filter((project) => project.status === 'in progress')}
                data={data.filter((project) => project.hours_saved > 0)}
            />
        ),
        onHold: (
            <ProjectsTable
                key="on-hold-projects-table"
                // data={ProjectsData.filter((project) => project.status === 'on hold')}
                data={data.filter((project) => !project.hours_saved)}
            />
        ),
    };

    const PROJECT_TABS = [
        { key: 'all', label: 'All projects' },
        { key: 'inProgress', label: 'Active' },
        { key: 'onHold', label: 'On Hold' },
    ];

    const onProjectsTabChange = (key) => {
        setProjectsTabKey(key);
    };

    return (
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={24}>
                <Card
                    title="Projects"
                    className='criclebox h-full'
                    extra={
                        <Space>
                            <Button icon={<CloudUploadOutlined />}>Import</Button>
                            <Button icon={<PlusOutlined />}>New project</Button>
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
