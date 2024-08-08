
import { ConfigProvider } from 'antd';
import antdThemeConfig from '../styles/antdThemeConfig.json';

const AntdConfigProvider = (props) => {
    return (

        <ConfigProvider
            theme={{
                token: {
                    //fontFamily:'Nunito Sans'
                    colorPrimary: antdThemeConfig.global.colorPrimary,
                    colorText: antdThemeConfig.global.colorTextBody,
                    // colorText: "#edf9fe",
                    colorBorder: antdThemeConfig.global.colorBorderSecondary,
                    colorBgContainer: '#F0F2F6'
                },
                components: {
                    Table: {
                        //colorBgContainer: antdThemeConfig.global.colorBgContainer,
                        borderColor: antdThemeConfig.global.colorLineSecondary,
                        // headerBg: antdThemeConfig.global.colorBgSecondary,
                        headerBg: "#034ea2",
                        headerBorderRadius: 0,
                        cellPaddingBlockSM: antdThemeConfig.table.cellPaddingBlockSM,
                        colorBgContainer: '#fff'
                    },
                    Tabs: {
                        itemSelectedColor: antdThemeConfig.global.colorTextPrimary,
                        fontFamily: 'Nunito Sans',
                        cardBg: antdThemeConfig.global.colorBgTertiary
                    },
                    Divider: {
                        colorSplit: antdThemeConfig.global.colorLinePrimary,
                        marginLG: '10px',
                        lineWidth: 2
                    },
                    Modal: {
                        colorIcon: antdThemeConfig.global.colorBorderPrimary
                    },
                    Carousel: {
                        dotHeight: '6px',
                        dotActiveWidth: '20px',
                        dotWidth: '20px',

                    },

                },
            }}
        >
            {props.children}
        </ConfigProvider>
    )
}

export default AntdConfigProvider;