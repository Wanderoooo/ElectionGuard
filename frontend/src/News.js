import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Progress, Flex, Typography,ConfigProvider } from 'antd';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import ProgressLine from "./ProgressLine";
import "./News.css";
import axios from 'axios';

const { Title, Te } = Typography;
const SERVERHOST = 3001;
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;
const items = new Array(1).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `Main Menu`,
}));

function News() {
    const [negativity, setNegativity] = useState(-1);
    const [polarizing, setPolarizing] = useState(-1);
    const [bias, setBias] = useState(-1);
    const [criticality, setCriticality] = useState(-1);
    const [status, setStatus] = useState("exception");

    const [state, setState] = useState(0);
    const navigate = useNavigate();
    function mm(e) {
        console.log("hello");
        navigate("/");
    }
    function analyze(e) {
<<<<<<< HEAD
        setStatus("normal");
        setNegativity(state.text);
        setPolarizing(state.text);
        setBias(state.text);
        setCriticality(state.text);
=======
        // setNegativity(state.text);
        console.log(state);
        const input = {"input": state.text} 
        axios.post(`http://localhost:${SERVERHOST}/classify/sentiment`, input)
        .then(response => {
  
          console.log('Success:', response.data);
          let negativity = response.data.percentage * 100
          setNegativity(negativity.toFixed(2));
        })
        .catch(error => {
          console.error('Error:', error);
        });
>>>>>>> 38b22eedeb923971cb590b934889c9620addbb31
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
                <div className="demo-logo" />
                <Title style={{ color: 'white' }}>ELECTION GUARD</Title>

                <Menu onClick={mm} theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}>
                    <Menu.Item key="Main Menu" >
                        <text level={5} style={{ color: 'white' }} className="nav-text">Main Menu</text>
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
                        <ConfigProvider contentFontSizeLG={20}>
                            <Button size="large" type="primary" onClick={analyze} >ANALYZE</Button>
                        </ConfigProvider>

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
                                <Progress type="circle" percent={negativity} strokeColor="red" success={ {percent: 0, strokeColor: "red"}} status={status} />
                                <h1>NEGATIVITY</h1>
                            </Flex>

                            <Flex gap="small" wrap="wrap" style={{
                                padding: '25px 25px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                                <Progress type="circle" percent={polarizing} strokeColor="red" success={ {percent: 0, strokeColor: "red"}} status={status}/>
                                <h1>POLARIZING</h1>
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
                                <Progress type="circle" percent={bias} strokeColor="red" success={ {percent: 0, strokeColor: "red"}} status={status}/>
                                <h1>BIAS</h1>
                            </Flex>

                            <Flex gap="small" wrap="wrap" style={{
                                padding: '25px 25px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                                <Progress type="circle" percent={criticality} strokeColor="red" success={ {percent: 0, strokeColor: "red"}} status={status}/>
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