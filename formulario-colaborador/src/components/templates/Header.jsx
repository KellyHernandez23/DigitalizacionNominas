import '../../components/templates/Header.css'
import LogoGpoAlze from '../../assets/img/logo_alze.png';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '../atoms/Menu.jsx';
import { useNavigate } from 'react-router-dom';

function Header({ username }) {
  const navigate = useNavigate(); 
  if (navigate('/')){
    
  }
  return (
      <header className="header">
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {username ? (<><Menu /><img src={LogoGpoAlze} alt="Logo Grupo Alze" style={{ height: '40px', marginRight: '0.5rem' }} /></>): <img src={LogoGpoAlze} alt="Logo Grupo Alze" style={{height: '50px', marginRight: '0.5rem' }} />}
          {username ? <button className='btn-return' style={{borderColor: 'transparent'}}><HomeIcon color='primary' border='none' /></button> : <div></div>}
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {username ? <h3>Hola, <span>{username}</span></h3> : <h3></h3>}
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
            onClick={() => navigate('/')}
          >
            <LogoutIcon color='#1D192B'/>
          </button>
        </div>
      </div>
      </header>
)}

export default Header;