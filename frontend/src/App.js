import React from 'react';
import './index.css';
import { Flex, Button, Image, Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import { FlexProps, SegmentedProps } from 'antd';

import logo from './Copy of NEWS.png';
import logo2 from './Copy of NEWS (1).gif';
import bgPic from './Newspapers_Getty.jpg'
import { useNavigate } from "react-router-dom";


const boxStyle = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};


const {  Header, Content, Footer } = Layout;

const { Title, Te } = Typography;

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

    function ll(e) {
      console.log("hello");
      navigate("/");
    }

    
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          padding: '50px 50px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
        }}
      >
        

        <img src={logo} className='bgImg' width={colorBgContainer} height={70} onMouseOver={e => (e.currentTarget.src = logo2)}
                onMouseOut={e => (e.currentTarget.src = logo)} onClick={ll} />

        <Title style={{ color: 'white', onClick:{ll}} }>ELECTION GUARD  </Title>

        
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