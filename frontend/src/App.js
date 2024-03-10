import React from 'react';
import './index.css';
import { Button, Image, Breadcrumb, Layout, Menu, theme } from 'antd';
import logo from './2.png';
import bgPic from './Newspapers_Getty.jpg'
import { useNavigate } from "react-router-dom";



const {  Header, Content, Footer } = Layout;


const items = new Array(1).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `ELECTION GUARD`,
}));



function App() {

  const navigate = useNavigate();
    function mm(e) {
        console.log("hello");
        navigate("/app");
    }


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={logo} width={50}/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          
          <img className='bgImg' src={bgPic} width={colorBgContainer - 10} height={400 }/>

          <Button onClick={mm} type="primary">Fake news?</Button>
  
        </div>
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>
      </Footer>
    </Layout>
  );
};

export default App;