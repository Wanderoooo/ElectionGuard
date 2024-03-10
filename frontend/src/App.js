import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './App.css'
const { Header, Content, Footer } = Layout;

const items = new Array(1).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

function App()  {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'left' }}>
        
        <Menu
          theme="dark"
          mode="horizontal"          
          style={{ flex: 1}}
        />
        
        <image src="./2.png"/>
        <h1 className='headerName'>ELECTION GUARD</h1>
        
        
        
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
        </div>

      </Content>
      <Footer style={{ textAlign: 'center' }}>
      </Footer>
    </Layout>
  );
};

export default App;