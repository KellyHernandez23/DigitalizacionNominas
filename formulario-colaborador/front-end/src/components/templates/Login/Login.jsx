import React, { useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { 
  Sheet, 
  Modal, 
  ModalClose, 
  CssBaseline, 
  Typography, 
  FormControl, 
  FormLabel, 
  Input,
  Button, 
  Link, 
  Select, 
  Option 
} from '@mui/joy';
import LogoAlze from '../../../assets/img/logo_alze.png';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css'
import InfoIcon from '@mui/icons-material/Info';
import { EmpleadosService} from '../../../services/api';


const Login = () => {
  const [rfc, setRfc] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();
  const [id, setId]= useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setId('');

    try {
      const data = await EmpleadosService.getByRFC(rfc);
      console.log('Respuesta del servicio:', data);
      if(data.success){
        setError('');
        console.log('Empleado:', data.user);
        setId(data.user.id);
        setOpen(true)
      }
      else{
        setOpen(true)
      }
    } catch (error) {
      setOpen(true)
      console.error('Error de conexión:', error);
      setError('Error de conexión con el servidor');
    }
  };

   const handleModalAction = () => {
    if (id) {
      setOpen(false);
    } else {
      navigate('/collaborator-form');
      setOpen(false);
    }
  };

  return (
    <main>
      <CssVarsProvider>
        <CssBaseline />
        
        {/* Modal */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Sheet
            variant="outlined"
            sx={{ 
              maxWidth: 500, 
              borderRadius: 'md', 
              p: 3, 
              boxShadow: 'lg' 
            }}
          >
            <ModalClose 
              variant="plain" 
              sx={{ m: 1 }} 
              onClick={() => setOpen(false)}
            />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="text.tertiary"
              sx={{ fontWeight: 'mb', mb: 1 }}
              
            ><div style={{display:'flex', gap:'.5rem'}}><InfoIcon /> Información</div>  
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary"> 
              {id !== '' ? `El RFC ya existe y se encuentra asociado con el ID: ${id}.` :
              'El RFC no existe en la base de datos. Por favor, procede a llenar el formulario.'
                }
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                sx={{ mt: 2 }} 
                onClick={handleModalAction}
              >
                {id !== '' ? 'Finalizar' : 'Ir al formulario'}
              </Button>
            </div>
            
          </Sheet>
        </Modal>

        {/* Formulario principal */}
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
              <img 
                src={LogoAlze} 
                alt="Logo Alze" 
                style={{ height: '8rem', marginRight: '0.5rem' }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h3>Bienvenido</h3>
            </div>
          </Typography>
          
          <p>Antes de llenar tus datos, vamos a verificar, si existe un registro previo</p>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl sx={{ mb: 2 }}>
              <FormLabel>RFC</FormLabel>
              <Input
                name="rfc"
                type="text"
                value={rfc}
                onChange={e => setRfc(e.target.value)}
                placeholder="Ingresa tu RFC"
                required
              />
            </FormControl>
            
            {error && (
              <Typography color="danger" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            
            <Button
              type="submit"
              variant="solid"
              fullWidth
            >
              Buscar
            </Button>
          </form>
        </Sheet>
      </CssVarsProvider>
    </main>
  );
};

export default Login;