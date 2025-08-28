import React, { useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import LogoAlze from '../../../assets/img/logo_alze.png';
import { useNavigate } from 'react-router-dom'; 

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content', mb: 2 }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      setError('');
      if (onLogin) onLogin(username);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <main>
      <CssVarsProvider>
        <ModeToggle />
        <CssBaseline />
        <Sheet
          sx={{
            width: 350,
            mx: 'auto',
            my: 8,
            py: 4,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: '5px 65px 5px 65px',
            boxShadow: 'md',
            alignItems: 'center',
          }}
          variant="outlined"
        >
          <Typography level="h4" component="h1">
            <div>
              <img src={LogoAlze} alt="Logo Alze" style={{ height: '9rem', marginRight: '0.5rem' }} />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <h3>Iniciar sesión</h3>
            </div>
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Usuario</FormLabel>
              <Input
                name="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Usuario"
                required
              />
            </FormControl>
            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
            </FormControl>
            {error && (
              <Typography color="danger" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="solid" fullWidth >
              Entrar
            </Button>
          </form>
          <Typography
            endDecorator={
            <Link href="/collaborator-form"
                  onClick={e => {
                    e.preventDefault();
                    navigate('/collaborator-form');
                    }}>Entra como invitado
            </Link>
            }
            sx={{ fontSize: 'sm', alignSelf: 'center', mt: 1 }}
          >
            ¿No tienes cuenta?
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </main>
  );
};

export default Login;