import React, { useState } from 'react';
import './App.css';
import { Select, Flex, Button, Image, Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import { FlexProps, SegmentedProps } from 'antd';

import logo from './Copy of NEWS.png';
import logo2 from './Copy of NEWS (1).gif';
import bgPic from './Newspapers_Getty2.jpg'
import { useNavigate } from "react-router-dom";
import FrontLanding from './FrontLanding';


const boxStyle = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px',
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

    const langVal = "en";
    // const titleY = "Your";
    // const titleT = "Trust";
    // const titleR = "Radar";

    const handleChange = (value) => {
      if(value == "en") {
         //langVal = "en";
        //  titleY = "Your";
        //  titleT = "Truth";
        //  titleR = "Radar";

        setTitleY("Your")
        setTitleT("Truth");
        setTitleR("Radar");
        setButton("Fake news? Let's check!");
        setTitle("What is Election Guard?");
        setDescr("Welcome to Election Guard! The platform integrates sentiment analysis, semantic disambiguation for precise truth discernment. Additionally, we have included additional languages for fake news detection for greater coverage and inclusivity. We ensure immutable transparency and inclusivity, safeguarding against digital deception. Join us in navigating the information landscape with clarity and confidence.");
        <FrontLanding onClick={mm} button={button} value={langVal} y={titleY} t={titleT} r={titleR}/>


      } else if (value == "fr") {
        //langVal = "fr";
        // titleY = "Votre";
        // titleT = "radar";
        // titleR = "de confiance";
        setButton("faux article de presse ? Vérifions !");
        setTitle("Qu'est-ce que Election Guard?");
        setDescr("Bienvenue à Election Guard ! La plateforme intègre l'analyse des sentiments, la désambiguïsation sémantique pour un discernement précis de la vérité. En outre, nous avons inclus des langues supplémentaires pour la détection des fausses nouvelles afin d'assurer une plus grande couverture et une plus grande inclusivité. Nous garantissons une transparence et une inclusivité immuables, en nous protégeant contre la tromperie numérique. Rejoignez-nous pour naviguer dans le paysage de l'information avec clarté et confiance.");
        setTitleY("Votre");
        setTitleT("Radar");
        setTitleR("Confiance");
        <FrontLanding onClick={mm} button={button} value={langVal} y={titleY} t={titleT} r={titleR}/>


      } else if (value == "sp") {
        //langVal = "sp";
        // titleY = "Su";
        // titleT = "radar";
        // titleR = "de confianza";
        setButton("¿Noticias falsas? Vamos a comprobarlo.");
        setTitle("¿Qué es la Election Guard?");
        setDescr("Bienvenido a Election Guard La plataforma integra análisis de sentimientos y desambiguación semántica para un discernimiento preciso de la verdad. Además, hemos incluido idiomas adicionales para la detección de noticias falsas para una mayor cobertura e inclusividad. Garantizamos transparencia e inclusividad inmutables, protegiendo contra el engaño digital. Únase a nosotros para navegar por el panorama informativo con claridad y confianza.");
        setTitleY("Su");
        setTitleT("Radar");
        setTitleR("Confianza");
        <FrontLanding onClick={mm} button={button} value={langVal} y={titleY} t={titleT} r={titleR}/>


      }
  };
  const [lang, setLang] = useState("en");
  const [button, setButton] = useState("Fake news? Let's check!");
  const [title, setTitle] = useState("What is Election Guard?");
  const [descr, setDescr] = useState("Welcome the Election Guard! The platform integrates sentiment analysis, semantic disambiguation for precise truth discernment. Additionally, we have included additional languages for fake news detection for greater coverage and inclusivity. We ensure immutable transparency and inclusivity, safeguarding against digital deception. Join us in navigating the information landscape with clarity and confidence.");
  const [titleY, setTitleY] = useState("Your");
  const [titleT, setTitleT] = useState("Truth");
  const [titleR, setTitleR] = useState("Radar");

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
          justifyContent: 'space-between',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <img src={logo} className='bgImg' width={colorBgContainer} height={70} onMouseOver={e => (e.currentTarget.src = logo2)}
                onMouseOut={e => (e.currentTarget.src = logo)} onClick={ll} />

        <Title style={{ color: 'white', fontWeight: 700} } className='title'>ELECTION GUARD</Title>
        </div>
        <Select
              defaultValue="English"
              style={{ width: 120, paddingRight:10}}
              onChange={handleChange}
              options={[
                { value: 'en', label: 'English',
                  butLa: "Fake news? Let's check!",
                  tiLa: 'What is Election Guard?',
                  desLa: "Welcome the Election Guard! The platform integrates sentiment analysis, semantic disambiguation for precise truth discernment. Additionally, we have included additional languages for fake news detection for greater coverage and inclusivity. We ensure immutable transparency and inclusivity, safeguarding against digital deception. Join us in navigating the information landscape with clarity and confidence."},
                { value: 'fr', label: 'Français',
                  butLa: "faux article de presse ? Vérifions !",
                  tiLa: "Qu'est-ce que Election Guard?",
                  desLa: "Bienvenue à la Election Guard ! La plateforme intègre l'analyse des sentiments, la désambiguïsation sémantique pour un discernement précis de la vérité. En outre, nous avons inclus des langues supplémentaires pour la détection des fausses nouvelles afin d'assurer une plus grande couverture et une plus grande inclusivité. Nous garantissons une transparence et une inclusivité immuables, en nous protégeant contre la tromperie numérique. Rejoignez-nous pour naviguer dans le paysage de l'information avec clarté et confiance." },
                { value: 'sp', label: 'Español', 
                  butLa: "¿Noticias falsas? Vamos a comprobarlo.", 
                  tiLa: "¿Qué es la Election Guard?",
                  desLa: "Bienvenido a la Election Guard La plataforma integra análisis de sentimientos y desambiguación semántica para un discernimiento preciso de la verdad. Además, hemos incluido idiomas adicionales para la detección de noticias falsas para una mayor cobertura e inclusividad. Garantizamos transparencia e inclusividad inmutables, protegiendo contra el engaño digital. Únase a nosotros para navegar por el panorama informativo con claridad y confianza."},
              ]}
          />
      </Header>
      <FrontLanding onClick={mm} button={button} value={langVal} y={titleY} t={titleT} r={titleR}/>
      <Content style={{ padding: '0',}}>
        
        <div
          style={{
            padding: 24,
            minHeight: 600,
            maxHeight: 800,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          
          
          
          <Flex style={boxStyle} justify={'baseline'} vertical={true}>

          {/* <img className='bgImg' src={bgPic} /> */}
          <div
          style={{
            padding: 5,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        ></div>
          
          <div
          style={{
            padding: 5,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        ></div>
          <h1 style={{color: '#00008B', fontSize: '50px'}}> {title}</h1>
          <h5 style={{color: '#00008B', fontSize: '20px', maxWidth: '1000px'}}>
            {descr}
          </h5>
          </Flex>

        

        </div>
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>
      </Footer>
    </Layout>
  );
};

export default App;