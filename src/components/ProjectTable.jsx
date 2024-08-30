import { Badge, Table, Tag, Typography } from 'antd';

const COLUMNS = [
    {
        title: 'Name',
        dataIndex: 'project_name',
        key: 'proj_name',
        render: (_, { project_name }) => (
            <Typography.Paragraph
                ellipsis={{ rows: 1 }}
                className="text-capitalize"
                style={{ marginBottom: 0 }}
            >
                {project_name.substring(0, 20)}
            </Typography.Paragraph>
        ),
    },
    {
        title: 'Client',
        dataIndex: 'client_name',
        key: 'proj_client_name',
    },
    {
        title: 'Category',
        dataIndex: 'project_category',
        key: 'proj_category',
        render: (_) => <span className="text-capitalize">{_}</span>,
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'proj_priority',
        render: (_) => {
            let color;

            if (_ === 'low') color = 'cyan';
            else if (_ === 'medium') color = 'geekblue';
            else color = 'magenta';

            return (
                <Tag color={color} className="text-capitalize">
                    {_}
                </Tag>
            );
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'proj_status',
        render: (_) => {
            let status;

            if (_ === 'on hold') status = 'default';
            else if (_ === 'completed') status = 'success';
            else status = 'processing';

            return <Badge status={status} text={_} className="text-capitalize" />;
        },
    },
    {
        title: 'Team size',
        dataIndex: 'team_size',
        key: 'proj_team_size',
    },
    {
        title: 'Duration',
        dataIndex: 'project_duration',
        key: 'project_duration',
    },
    {
        title: 'Start date',
        dataIndex: 'start_date',
        key: 'proj_start_date',
    },
];

const ProjectsTable = ({ data, ...others }) => (
    <Table
        dataSource={data}
        columns={COLUMNS}
        onRow={(record) => ({
            style: {
                backgroundColor: record.row_color || 'lightgray', // Apply color from data or fallback to gray
            },
        })}
        className="overflow-scroll dashboard-table"
        {...others}
    />
);

export default ProjectsTable;
