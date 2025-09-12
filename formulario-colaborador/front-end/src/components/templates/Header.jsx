// import '../../components/templates/Header.css'
// import LogoGpoAlze from '../../assets/img/logo_alze.png';
// // import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import HomeIcon from '@mui/icons-material/Home';
// import LogoutIcon from '@mui/icons-material/Logout';
// import Menu from '../atoms/Menu.jsx';
// import { useNavigate } from 'react-router-dom';

// function Header({ username }) {
//   const navigate = useNavigate(); 
//   if (navigate('/')){
    
//   }
//   return (
//       <header className="header">
//        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
//           {username ? (<><Menu /><img src={LogoGpoAlze} alt="Logo Grupo Alze" style={{ height: '40px', marginRight: '0.5rem' }} /></>): <img src={LogoGpoAlze} alt="Logo Grupo Alze" style={{height: '50px', marginRight: '0.5rem' }} />}
//           {username ? <button className='btn-return' style={{borderColor: 'transparent'}}><HomeIcon color='primary' border='none' /></button> : <div></div>}
//         </div>
//         <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
//           {username ? <h3>Hola, <span>{username}</span></h3> : <h3></h3>}
//           <button
//             style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
//             onClick={() => navigate('/')}
//           >
//             <LogoutIcon color='#1D192B'/>
//           </button>
//         </div>
//       </div>
//       </header>
// )}

// export default Header;


import '../../components/templates/Header.css';
import LogoGpoAlze from '../../assets/img/logo_alze.png';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '../atoms/Menu.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleHome = () => {
    navigate('/collaborator-form');
  };

  // No mostrar header en la página de login
  if (location.pathname === '/') {
    return null;
  }

  return (
    <header className="header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {/* Mostrar menú y logo solo si hay usuario autenticado */}
          {user ? (
            <>
              <Menu />
              <img 
                src={LogoGpoAlze} 
                alt="Logo Grupo Alze" 
                style={{ height: '40px', marginRight: '0.5rem' }} 
              />
            </>
          ) : (
            <img 
              src={LogoGpoAlze} 
              alt="Logo Grupo Alze" 
              style={{ height: '50px', marginRight: '0.5rem' }} 
            />
          )}
          
          {/* Botón de home solo para usuarios autenticados */}
          {user && (
            <button 
              className='btn-return' 
              style={{ borderColor: 'transparent', background: 'none', cursor: 'pointer' }}
              onClick={handleHome}
            >
              <HomeIcon color='primary' />
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {/* Mostrar nombre de usuario si está autenticado */}
          {user && (
            <h3>Hola, <span>{user.nombre || user.username}</span></h3>
          )}
          
          {/* Botón de logout solo para usuarios autenticados */}
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogoutIcon color='#1D192B'/>
            </button>
        </div>
      </div>
    </header>
  );
}

export default Header;