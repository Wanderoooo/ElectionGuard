import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Progress, Flex, Typography, ConfigProvider } from 'antd';
import { Input, Select, Space, Tooltip } from 'antd';
import { useNavigate } from "react-router-dom";
import ProgressLine from "./ProgressLine";
import "./History.css";
import axios from 'axios';
import logo from "./Copy of NEWS.png"
import logo2 from "./Copy of NEWS (1).gif";

const { Title, Te } = Typography;
const SERVERHOST = 3001;
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

function History() {
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
    const [news, setnw] = useState("News");
    const [hf, sethf] = useState("ANALYSIS OF YOUR NEWS ARTICLE");
    const [hs, seths] = useState("ARTICLE SUMMARY");

    const [f, setf] = useState("FAKE");
    const [n, setn] = useState("NEGATIVITY");
    const [p, setp] = useState("POLARIZING");
    const [b, setb] = useState("BIAS");
    const [c, setc] = useState("CRITICALITY");
    const [lr, setlr] = useState("LEFT/RIGHT LEANING");

    const [loadings, setLoadings] = useState([]);

    const [state, setState] = useState(0);
    const navigate = useNavigate();

    const handleChange = (value) => {
        setLang({ value })
        if (value=="en") {
            setAnalyzer("ANALYZE");
            setmm("Menu");
            setnw("News");
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
            setnw("informations");
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
            setnw("noticias");
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
    function ll(e) {
        console.log("hello");
        navigate("/news");
    }
    function analyze(e) {

        setStatus("normal");
        const input = {"input": state.text, "language": lang.value} 
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
          });

        axios.post(`http://localhost:${SERVERHOST}/classify/traits`, input)
        .then(response => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                return newLoadings;
              });

            console.log((response.data[0]));
            setNegativity((response.data[0]*100).toFixed(2));
            setPolarizing((response.data[1]*100).toFixed(2));
            setBias((response.data[2]*100).toFixed(2));
            setCriticality((response.data[3]* 100).toFixed(2));
            setFake((response.data[4]* 100).toFixed(2));
            setLeft((response.data[5]* 100).toFixed(2));


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
                <Title style={{ color: 'white', fontFamily:'Cinzel' , fontWeight: 500} }>ELECTION GUARD</Title>

                <Menu theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}>
                    <Menu.Item onClick={mm} key="Main Menu" >
                        <span level={5} style={{ color: 'white' }} className="nav-text">{mainmenu}</span>
                    </Menu.Item>
                    <Menu.Item onClick={ll} key="News" >
                        <span level={5} style={{ color: 'white' }} className="nav-text">{news}</span>
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

export default History;