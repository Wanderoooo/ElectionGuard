import Wave from 'react-wavify'
import "./FrontLanding.css";
import logo from './thegif.gif'

export default function FrontLanding() {
  return (
    <div style={{backgroundColor: 'white'}}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '300px'}}>
      <h1 className="titleland" style={{ marginRight: '20px' }}>Your</h1>
      <h1 className="titletr" style={{ marginRight: '20px' }}>Truth</h1>
      <h1 className="titleland">Radar</h1>
      <img src={logo} style={{height: '180px'}} />
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