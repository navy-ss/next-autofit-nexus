import Topbar from "./topbar";
import SideBar from "./SideBar";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import AntdConfigProvider from '../components/AntdConfigProvider';
import Questionnaire from "../components/Questionnaire";
import HomePage from "./HomePage";
import questions from "../questions";
import roiQuestions from "../roiQuestions";

const PATH = import.meta.env.VITE_APP_LINK_TO_PATH;
const PageLayout = () => {

    return (
        <AntdConfigProvider>
            <Layout className="main-container">
                <SideBar />
                <Layout className="app-main-layout">
                    <Topbar />
                    <div className="route-main-container">
                        <Routes >
                            <Route path={`${PATH}`} element={<HomePage />} />
                            <Route path={`${PATH}Process`} element={<Questionnaire key={1} questions={questions} />} />
                            <Route path={`${PATH}ROI`} element={<Questionnaire key={2} questions={roiQuestions} />} />
                        </Routes >
                    </div>
                </Layout>
            </Layout>
        </AntdConfigProvider>

    )
}

export default PageLayout;