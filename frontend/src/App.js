import React from 'react';
import './index.css';
import { Flex, Button, Image, Breadcrumb, Layout, Menu, theme } from 'antd';
import { FlexProps, SegmentedProps } from 'antd';

import logo from './2.png';
import bgPic from './Newspapers_Getty.jpg'
import { useNavigate } from "react-router-dom";


const boxStyle = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};


const {  Header, Content, Footer } = Layout;


const items = new Array(1).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `ELECTION GUARD`,
}));



function App() {

  const navigate = useNavigate();
    function mm(e) {
        console.log("hello");
        navigate("/news");
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
            minHeight: 500,
            maxHeight: 700,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          
          
          
          <Flex style={boxStyle} justify={'baseline'} vertical={true}>

          <img className='bgImg' src={bgPic} width={colorBgContainer - 10} height={400 }/>
          <Button onClick={mm} type="primary">Fake news?</Button>

          </Flex>



        </div>
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>
      </Footer>
    </Layout>
  );
};

export default App;