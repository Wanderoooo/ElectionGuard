import Wave from 'react-wavify'
import "./FrontLanding.css";
import logo from './thegif.gif'
import { RightCircleOutlined } from '@ant-design/icons';

export default function FrontLanding({onClick, button}) {
  return (
    <div style={{backgroundColor: 'white'}}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '150px', marginTop: '90px'}}>
      <h1 className="titleland" style={{ marginRight: '20px' }}>Your</h1>
      <h1 className="titletr" style={{ marginRight: '20px' }}>Truth</h1>
      <h1 className="titleland">Radar</h1>
      <img src={logo} style={{height: '180px'}} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '80px'}}>
    <RightCircleOutlined style={{color: '#00008B', fontSize: '32px'}} />
      <a style={{fontSize: '20px', color: '#00008B', marginLeft: '10px'}} onClick={onClick}>{button}</a>
    </div>
    <Wave mask="url(#mask)" fill="#1277b0" >
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0" stopColor="white" />
      <stop offset="0.5" stopColor="black" />
    </linearGradient>
    <mask id="mask">
      <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)"  />
    </mask>
  </defs>
</Wave>
  </div>)
}