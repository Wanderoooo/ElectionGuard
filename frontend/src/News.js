import React, {useState} from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Progress, Flex} from 'antd';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import ProgressLine from "./ProgressLine";

const { TextArea } = Input;
const { Header, Content, Footer, Sider} = Layout;
const items = new Array(1).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `Main Menu`,
}));

function News() {
    const [confidence, setConfidence] = useState(0);
    const [state, setState] = useState(0);
    const navigate = useNavigate();
    function mm(e) {
        console.log("hello");
        navigate("/app");
    }
    function analyze(e) {
        setConfidence(state.text);
        console.log(state);
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
              <Content
                style={{
                  padding: '0 24px',
                  minHeight: 280,
                }}
              >
               
               
            <Input placeholder="URL Link" />
            <br />
            <br />
            <TextArea rows={20} placeholder="Content" onChange={e => setState({ text: e.target.value })}/>            
            <br />
            <br/>
            <Button type="primary" onClick={analyze} >ANALYZE</Button> 

              </Content>

              <Content
                style={{
                padding: '100px 100px',
                  background: colorBgContainer,
                  textAlign: 'center',
                  alignItems: 'center',
                  color: 'black',
                }}
                width={200}
              >
                  <Flex gap="small" wrap="wrap">
                    <Progress type="circle" percent={75} />
                    <h1>CONFIDENCE</h1>
                </Flex>

                <Flex gap="small" wrap="wrap">
                    <Progress type="circle" percent={75} />
                    <h1>TOXICITY</h1>
                </Flex>

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