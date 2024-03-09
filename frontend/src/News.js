import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Button} from 'antd';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Header, Content, Footer, Sider} = Layout;
const items = new Array(1).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `Main Menu`,
}));

function News() {
    const navigate = useNavigate();
    function mm(e) {
        console.log("hello");
        navigate("/app");
    }
    function analyze(e) {

    }
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
      return (
        <Layout>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div className="demo-logo" />
            <h1>ELECTION GUARD</h1>

            <Menu onClick={mm} theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}>
            <Menu.Item key="Main Menu" >
                <label className="nav-text">Main Menu</label>
            </Menu.Item>
            </Menu>

          </Header>
          <Content
            style={{
              padding: '0 48px',
            }}
          >
            <Layout
              style={{
                padding: '24px 0',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Sider
                style={{
                  background: colorBgContainer,
                }}
                width={200}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{
                    height: '100%',
                  }}
                  items={items}
                />
              </Sider>
              <Content
                style={{
                  padding: '0 24px',
                  minHeight: 280,
                }}
              >
               
               
            <Input placeholder="URL Link" />
            <br />
            <br />
            <TextArea rows={20} placeholder="Content"/>            
            <br />
            <br/>
            <Button type="primary" onClick={analyze} >ANALYZE</Button> 

              </Content>
            </Layout>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
          </Footer>
        </Layout>
      );
}

export default News;