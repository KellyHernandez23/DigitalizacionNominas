import '../../components/templates/Header.css'
// import LogoAramLuz from '../assets/logo_AramLuz.png';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '../atoms/Menu.jsx';

function Header({ username }) {
  return (
      <header className="header">
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Menu />
          {/* <img src={LogoAramLuz} alt="Logo Aram Luz" style={{ height: '40px', marginRight: '0.5rem' }} /> */}
          <button className='btn-return'><HomeIcon color='#1D192B' /></button>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <h3>Hola, <span>{username}</span></h3>
          <LogoutIcon color='#1D192B' />
        </div>
      </div>
      </header>
)}

export default Header;