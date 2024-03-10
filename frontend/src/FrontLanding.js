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
    <Wave fill="url(#gradient)">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="10%"  stopColor="#ADD8E6" />
          <stop offset="90%" stopColor="#00008B" />
        </linearGradient>
      </defs>
    </Wave>
  </div>)
}