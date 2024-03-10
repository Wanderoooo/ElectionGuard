import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Progress, Flex } from 'antd';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import ProgressLine from "./ProgressLine";
import axios from 'axios';

const SERVERHOST = 3001;
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;
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
        const input = {"input": state.text} 
        axios.post(`http://localhost:${SERVERHOST}/classify/sentiment`, input)
        .then(response => {
  
          console.log('Success:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
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
                        <TextArea rows={20} placeholder="Content" onChange={e => setState({ text: e.target.value })} />
                        <br />
                        <br />
                        <Button type="primary" onClick={analyze} >ANALYZE</Button>

                    </Content>

                    <Content
                        style={{
                            display: 'flex',
                            padding: '100px 100px',
                            background: colorBgContainer,
                            textAlign: 'center',
                            alignItems: 'vertical',
                            color: 'black',
                        }}
                        width={200}
                    >
                        <div style={{
                                padding: '100px 25px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                            <h1>ANALYSIS OF YOUR NEWS ARTICLE</h1>
                        </div>
                        <div>
                            <Flex gap="small" wrap="wrap" style={{
                                padding: '25px 25px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                                <Progress type="circle" percent={75} />
                                <h1>NEGATIVITY</h1>
                            </Flex>

                            <Flex gap="small" wrap="wrap" style={{
                                padding: '25px 25px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                                <Progress type="circle" percent={75} />
                                <h1>INCENDIARY</h1>
                            </Flex>
                        </div>

                        <div>
                            <Flex gap="small" wrap="wrap" style={{
                                padding: '25px 25px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                                <Progress type="circle" percent={75} />
                                <h1>BIAS</h1>
                            </Flex>

                            <Flex gap="small" wrap="wrap" style={{
                                padding: '25px 25px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                                <Progress type="circle" percent={75} />
                                <h1>CRITICALITY</h1>
                            </Flex>
                        </div>


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