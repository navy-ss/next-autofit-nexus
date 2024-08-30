import { Button, Drawer, Dropdown, Input, Menu, Tooltip } from "antd"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, DashboardOutlined, CalculatorOutlined, AuditOutlined } from '@ant-design/icons';
import { updateGlobalData } from "../redux/actions/global";
import Sider from "antd/es/layout/Sider";
import '../styles/components/SideBar/index.scss';
// import ChatHistory from "./ChatHistory";

const SubMenu = Menu.SubMenu;
const PATH = import.meta.env.VITE_APP_LINK_TO_PATH;
const SideBar = (props) => {
    const globalState = useSelector(state => state.global);
    const dispatch = useDispatch();
    const location = useLocation();

    // const handleMenuClick = (title) => {
    //     dispatch(updateGlobalData({ topbarTitle: title }));
    // };

    useEffect(() => {
        // Check the current path and update the title accordingly
        const currentPath = location.pathname;
        if (currentPath === `${PATH}`) {
            dispatch(updateGlobalData({ topbarTitle: '' }));
        } else if (currentPath === `${PATH}Dashboard`) {
            dispatch(updateGlobalData({ topbarTitle: 'Dashboard' }));
        } else if (currentPath === `${PATH}Dashboard-InProgess`) {
            dispatch(updateGlobalData({ topbarTitle: 'Dashboard InProgess' }));
        } else if (currentPath === `${PATH}Automation`) {
            dispatch(updateGlobalData({ topbarTitle: 'Automation Potential Evaluation' }));
        } else if (currentPath === `${PATH}ROI`) {
            dispatch(updateGlobalData({ topbarTitle: 'ROI Calculator' }));
        }
    }, [location.pathname, dispatch]);
    return (
        <Sider
            className="side-nav-menu"
            trigger={null}
            theme="light"
            collapsible
            collapsed={!globalState.collapsed}
            width={260}>
            <div className="logo" id="logo">
            </div>
            <Menu
                theme="light"
                mode="inline"
                inlineIndent={10}
                selectedKeys={[location.pathname]} // Set the selected key
            >
                <Menu.Item key={`${PATH}`}>
                    <Link to={`${PATH}`}>
                        <HomeOutlined />
                        <span>
                            Home
                        </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={`${PATH}Dashboard`}>
                    <Link to={`${PATH}Dashboard`}>
                        <DashboardOutlined />
                        <span>
                            Dashboard
                        </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={`${PATH}Dashboard-InProgess`}>
                    <Link to={`${PATH}Dashboard-InProgess`}>
                        <DashboardOutlined />
                        <span>
                            Dashboard InProgess
                        </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={`${PATH}Automation`}>
                    <Link to={`${PATH}Automation`}>
                        <AuditOutlined />
                        <span>
                            Automation Potential Evaluation
                        </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={`${PATH}ROI`}>
                    <Link to={`${PATH}ROI`}>
                        <CalculatorOutlined />
                        <span>
                            ROI Calculator
                        </span>
                    </Link>
                </Menu.Item>
                {/* <ChatHistory /> */}
            </Menu>
        </Sider>
    )
}

export default SideBar;