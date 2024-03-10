import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Progress, Flex, Typography, ConfigProvider } from 'antd';
import { Input, Select, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import ProgressLine from "./ProgressLine";
import "./News.css";
import axios from 'axios';
import logo from "./Copy of NEWS.png"
import logo2 from "./Copy of NEWS (1).gif";

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
    const [lang, setLang] = useState("en");
    const [summary, setSummary] = useState("summarizing!");

    const [state, setState] = useState(0);
    const navigate = useNavigate();

    const handleChange = (value) => {
        setLang({ value })
    };

    function mm(e) {
        console.log("hello");
        navigate("/");
    }
    function analyze(e) {
        setStatus("normal");
        console.log(state);
        const input = {"input": state.text} 
        axios.post(`http://localhost:${SERVERHOST}/classify/traits`, input)
        .then(response => {
        
            setNegativity((response.data[0]*100).toFixed(2));
            setPolarizing((response.data[1]*100).toFixed(2));
            setBias((response.data[2]*100).toFixed(2));
            setCriticality((response.data[3]* 100).toFixed(2));

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
                    padding: '50px 50px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                <div className="demo-logo" />
                <img src={logo} className='bgImg' width={colorBgContainer} height={70} onMouseOver={e => (e.currentTarget.src = logo2)}
                    onMouseOut={e => (e.currentTarget.src = logo)} />
                <Title style={{ color: 'white' }}>ELECTION GUARD</Title>

                <Menu onClick={mm} theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}>
                    <Menu.Item key="Main Menu" >
                        {/* <text level={5} style={{ color: 'white' }} className="nav-text">Main Menu</text> */}
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
                        <div>
                            <Select
                                defaultValue="English"
                                style={{ width: 120, paddingRight: 10 }}
                                onChange={handleChange}
                                options={[
                                    { value: 'en', label: 'English' },
                                    { value: 'fr', label: 'French' },
                                    { value: 'es', label: 'Spanish' },
                                ]}
                            />
                            <ConfigProvider contentFontSizeLG={20}>
                                <Button style={{ padding: "0px 20px" }} size="large" type="primary" onClick={analyze} >ANALYZE</Button>
                            </ConfigProvider>
                        </div>

                    </Content>

                    <Content
                        style={{
                            padding: '20px 20px',
                            background: colorBgContainer,
                            textAlign: 'center',
                            color: 'black',
                            alignItems: 'center',
                        }}
                        width={200}
                    >
                        <Flex vertical={true} style={{
                            padding: '20px 20px',
                            background: colorBgContainer,
                            textAlign: 'center',
                            alignItems: 'center',
                            color: 'black',
                        }}>
                            <h2>ANALYSIS OF YOUR NEWS ARTICLE</h2>

                            <Flex vertical={false} style={{
                                textJustify: 'center',
                                alignItems: 'center',
                                textAlign: 'center',

                            }}>
                                <Flex vertical={true} gap="small" wrap="wrap" style={{
                                    padding: '20px 20px',
                                    background: colorBgContainer,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                }}>
                                    <Progress type="circle" percent={negativity} strokeColor="red" success={{ percent: 0, strokeColor: "red" }} status={status} />
                                    <h3>NEGATIVITY</h3>
                                </Flex>

                                <Flex vertical={true} gap="small" wrap="wrap" style={{
                                    padding: '20px 20px',
                                    background: colorBgContainer,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                }}>
                                    <Progress type="circle" percent={polarizing} strokeColor="red" success={{ percent: 0, strokeColor: "red" }} status={status} />
                                    <h3>POLARIZING</h3>
                                </Flex>

                                <Flex vertical={true} gap="small" wrap="wrap" style={{
                                    padding: '20px 20px',
                                    background: colorBgContainer,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                }}>
                                    <Progress type="circle" percent={bias} strokeColor="red" success={{ percent: 0, strokeColor: "red" }} status={status} />
                                    <h3>BIAS</h3>
                                </Flex>

                                <Flex vertical={true} gap="small" wrap="wrap" style={{
                                    padding: '20px 20px',
                                    background: colorBgContainer,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                }}>
                                    <Progress type="circle" percent={criticality} strokeColor="red" success={{ percent: 0, strokeColor: "red" }} status={status} />
                                    <h3>CRITICALITY</h3>
                                </Flex>
                            </Flex>
                        </Flex>

                    </Content>

                    <Content style={{
                        padding: '20px 100px',
                        background: colorBgContainer,
                        textAlign: 'center',
                        alignItems: 'center',
                        color: 'black',
                    }}>
                        <div style={{
                            padding: '25px 25px',
                            background: colorBgContainer,
                            textAlign: 'center',
                            alignItems: 'center',
                            color: 'black',
                        }}>
                            <h2>ARTICLE SUMMARY</h2>
                        </div>

                        <div style={{
                            padding: '25px 25px',
                            background: colorBgContainer,
                            textAlign: 'center',
                            alignItems: 'center',
                            color: 'black',
                        }}>
                            <h3>SUMMARY OF YOUR ARTICLE</h3>
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