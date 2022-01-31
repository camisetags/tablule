import React from 'react'
import ReactDOM from 'react-dom'
import {Layout, Menu, Breadcrumb, Image, Typography} from 'antd';
import "antd/dist/antd.css";
import App from './App';
import styles from './app.less';

const { Header, Content, Footer } = Layout;

var style_footer = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "70px",
    width: "100%",
};

var style_body = {
   padding: '0 200px',
   height: "1200px",
   width: "100%"
}
const { Title } = Typography;


ReactDOM.render(
  <React.StrictMode>
    <Layout className="layout">
      <Header style={{backgroundColor: "white"}}>
        <div className="logo"><Image width={200} src="cortex.png" /></div>
        <>
          <Title level={2} className={styles.title}>Sid Monitor</Title>
        </>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          {[<Menu.Item></Menu.Item>]} 
        </Menu>
      </Header>
      <Content style={style_body}>
        <Breadcrumb style={{ margin: '50px 0' }}>
        </Breadcrumb>
        <div className="site-layout-content">
          <App />
        </div>
      </Content>
      <Footer style={style_footer}>ps-tech ©2022 </Footer>
    </Layout>,
  </React.StrictMode>,
  document.getElementById('root')
)
