import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Progress, Flex, Typography, ConfigProvider } from 'antd';
import { Input, Select, Space, Tooltip } from 'antd';
import { useNavigate } from "react-router-dom";
import ProgressLine from "./ProgressLine";
import "./News.css";
//import axios from 'axios';
import logo from "./Copy of NEWS.png"
import logo2 from "./Copy of NEWS (1).gif";

const { Title, Te } = Typography;
const SERVERHOST = 3001;
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

function News() {
    const [negativity, setNegativity] = useState(-1);
    const [polarizing, setPolarizing] = useState(-1);
    const [bias, setBias] = useState(-1);
    const [criticality, setCriticality] = useState(-1);
    const [fake, setFake] = useState(-1);
    const [status, setStatus] = useState("exception");
    const [left, setLeft] = useState(-1);
    const [lang, setLang] = useState("en");
    const [summary, setSummary] = useState("summarizing!");
    const [analyzer, setAnalyzer] = useState("Analyze");
    const [mainmenu, setmm] = useState("Menu");
    const [hf, sethf] = useState("ANALYSIS OF YOUR NEWS ARTICLE");
    const [hs, seths] = useState("ARTICLE SUMMARY");

    const [f, setf] = useState("FAKE");
    const [n, setn] = useState("NEGATIVITY");
    const [p, setp] = useState("POLARIZING");
    const [b, setb] = useState("BIAS");
    const [c, setc] = useState("CRITICALITY");
    const [lr, setlr] = useState("LEFT/RIGHT LEANING");


    const [state, setState] = useState(0);
    const navigate = useNavigate();

    const handleChange = (value) => {
        setLang({ value })
        if (value=="en") {
            setAnalyzer("ANALYZE");
            setmm("Menu");
            sethf("ANALYSIS OF YOUR NEWS ARTICLE");
            seths("ARTICLE SUMMARY");

            setf("FAKE");
            setn("NEGATIVITY");
            setp("POLARIZING");
            setb("BIAS");
            setc("CRITICALITY");
            setlr("LEFT/RIGHT LEANING");
        } else if (value == "fr") {
            setAnalyzer("ANALYSER");
            setmm("Menu");
            sethf("ANALYSE DE VOTRE ARTICLE DE PRESSE");
            seths("RÉSUMÉ DE L'ARTICLE");

            setf("FAUX");
            setn("NÉGATIVITÉ");
            setp("POLARISATION");
            setb("BIAS");
            setc("CRITICITÉ");
            setlr("TENDANCE GAUCHE/DROITE");
        } else {
            setAnalyzer("ANALICE");
            setmm("Menú");
            sethf("ANÁLISIS DE SU ARTÍCULO PERIODÍSTICO")
            seths("RESUMEN DEL ARTÍCULO");

            setf("FALSO");
            setn("NEGATIVIDAD");
            setp("POLARIZACIÓN");
            setb("BIAS");
            setc("CRÍTICA");
            setlr("INCLINACIÓN IZQUIERDA/DERECHA");
        }
    };

    function mm(e) {
        console.log("hello");
        navigate("/");
    }
    function analyze(e) {
        setStatus("normal");
        setNegativity(state.text);
        setPolarizing(state.text);
        setBias(state.text);
        setCriticality(state.text);
        setFake(state.text);
        setLeft(state.text);

        // setNegativity(state.text);
        // console.log(state);
        // const input = {"input": state.text} 
        // axios.post(`http://localhost:${SERVERHOST}/classify/sentiment`, input)
        // .then(response => {

        //   console.log('Success:', response.data);
        //   let negativity = response.data[0] * 100
        //   setNegativity(negativity.toFixed(2));
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        // });
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
                        <span level={5} style={{ color: 'white' }} className="nav-text">{mainmenu}</span>
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


                        <Input placeholder="URL" />
                        <br />
                        <br />
                        <TextArea rows={20} placeholder="" onChange={e => setState({ text: e.target.value })} />
                        <br />
                        <br />
                        <div>
                            <Select
                                defaultValue="English"
                                style={{ width: 120, paddingRight: 10 }}
                                onChange={handleChange}
                                options={[
                                    { value: 'en', label: 'English' },
                                    { value: 'fr', label: 'Français' },
                                    { value: 'es', label: 'Español' },
                                ]}
                            />
                            <ConfigProvider contentFontSizeLG={20}>
                                <Button style={{ padding: "0px 20px" }} size="large" type="primary" onClick={analyze} >{analyzer}</Button>
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
                            <h2>{hf}</h2>

                            <Flex vertical={true} gap="small" wrap="wrap" style={{
                                padding: '20px 20px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                                <Progress type="circle" percent={fake} strokeColor="red" success={{ percent: 0, strokeColor: "red" }} status={status} />
                                <h3>{f}</h3>
                            </Flex>

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
                                    <h3>{n}</h3>
                                </Flex>

                                <Flex vertical={true} gap="small" wrap="wrap" style={{
                                    padding: '20px 20px',
                                    background: colorBgContainer,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                }}>
                                    <Progress type="circle" percent={polarizing} strokeColor="red" success={{ percent: 0, strokeColor: "red" }} status={status} />
                                    <h3>{p}</h3>
                                </Flex>

                                <Flex vertical={true} gap="small" wrap="wrap" style={{
                                    padding: '20px 20px',
                                    background: colorBgContainer,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                }}>
                                    <Progress type="circle" percent={bias} strokeColor="red" success={{ percent: 0, strokeColor: "red" }} status={status} />
                                    <h3>{b}</h3>
                                </Flex>

                                <Flex vertical={true} gap="small" wrap="wrap" style={{
                                    padding: '20px 20px',
                                    background: colorBgContainer,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                }}>
                                    <Progress type="circle" percent={criticality} strokeColor="red" success={{ percent: 0, strokeColor: "red" }} status={status} />
                                    <h3>{c}</h3>
                                </Flex>
                            </Flex>


                            <Flex vertical={true} gap="big" wrap="wrap" style={{
                                padding: '20px 0px',
                                background: colorBgContainer,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'black',
                            }}>
                                <Progress percent={left} showInfo={false} strokeColor="blue" trailColor="red"/>
                                <h3>{lr}</h3>
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
                            <h2>{hs}</h2>
                        </div>

                        <div style={{
                            padding: '25px 25px',
                            background: colorBgContainer,
                            textAlign: 'center',
                            alignItems: 'center',
                            color: 'black',
                        }}>
                            {/* <h3>SUMMARY OF YOUR ARTICLE</h3> */}
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