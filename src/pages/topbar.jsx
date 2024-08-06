import React from "react";
import { Layout, Avatar, Input, Badge, Menu, Dropdown, Spin } from "antd";
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import brandLogo from "../assets/indegene-logo.png";
import AutomationLogo from "../assets/automation.png";
// import brandLogo from "../assets/automation.png";
import { useSelector } from "react-redux";
import { updateGlobalData } from "../redux/actions/global";
import store from "../redux/store";

const { Header } = Layout;

const Topbar = (props) => {
    const globalState = useSelector(state => state.global);
    const topbarTitle = useSelector(state => state.global.topbarTitle);
    // console.log('state', globalState);
    const logoutHandler = () => {
        globalState.keycloak.logout();
    }
    const menuClickHandler = () => {
        store.dispatch(updateGlobalData({ collapsed: !globalState.collapsed }));
    }

    return (
        <Header style={{ background: "#fff", padding: 0, height: 'auto', lineHeight: 1 }}>

            <div
                style={{
                    display: "flex",
                    padding: "0 32px 0 12px",
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: '12px',
                        alignItems: 'center'
                    }}>
                    <div>
                        <MenuOutlined
                            onClick={menuClickHandler}
                            style={{
                                fontSize: '18px',
                                cursor: 'pointer'
                            }} />
                    </div>
                    <div
                        className="ant-dropdown-div"
                        style={{
                            color: "#034EA2",
                            lineHeight: 1
                        }}
                        to="#"
                    >
                        <img style={{ height: "60px" }} src={brandLogo} alt="" />
                    </div>
                </div>

                <div style={{ fontFamily: "Roboto", fontSize: "24px", color: "#414BB2", fontWeight: "500" }}>
                    {topbarTitle}
                </div>
                <div

                    style={{
                        textAlign: "right",
                        padding: "0 32px",
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center' }}>
                        <img src={AutomationLogo} style={{ height: "60px" }}  alt="" />
                        {/* <RoleSelect/> */}
                        <strong>
                            {/* {globalState?.userName} */}
                            Suruchi Pendse
                        </strong>
                        {/* <LogoutOutlined onClick={logoutHandler} /> */}
                        <LogoutOutlined />
                    </div>
                </div>
            </div>

        </Header>

    )
}

export default Topbar;
