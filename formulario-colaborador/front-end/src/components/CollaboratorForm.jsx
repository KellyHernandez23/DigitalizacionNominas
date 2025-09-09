import React, { useState, useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import SignatureCanvas from 'react-signature-canvas';
import { FormControl, TextField, InputLabel, Select, MenuItem, 
  Card, CardContent, Typography, CardActions, 
  Button, Divider, Radio, RadioGroup, FormControlLabel, FormLabel, CircularProgress, Box,
Snackbar, Alert} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import './templates/CollaboratorForm.css';

function CollaboratorForm({ datosSat}) {
  //#region Estados
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const webcamRef = useRef(null);
  const signatureRef = useRef(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);



  // Estados del prospecto
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefonoCasa, setTelefonoCasa] = useState('');
  const [telefonoCelular, setTelefonoCelular] = useState('');
  const [estadoNacimiento, setEstadoNacimiento] = useState('');
  const [curp, setCurp] = useState('');
  const [rfc, setRfc] = useState('');
  const [umf, setUmf] = useState('');
  const [nss, setNss] = useState('');
  const [noCuenta, setNoCuenta] = useState('');
  const [cp, setCp] = useState('');
  const [noExterior, setNoExterior] = useState('');
  const [noInterior, setNoInterior] = useState('');  
  const [tieneHijos, setTieneHijos] = useState('');
  const [cantidadHijos, setCantidadHijos] = useState('');
  const [infonavit, setInfonavit] = useState('');
  const [fonacot, setFonacot] = useState('');
  const [pension, setPension] = useState('');
  const [nombreMadre, setNombreMadre] = useState('');
  const [nombrePadre, setNombrePadre] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [calle, setCalle] = useState('');
  const [colonia, setColonia] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [escolaridad, setEscolaridad] = useState('');
  const [hijos, setHijos] = useState('');
  const [alergias, setAlergias] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [nombreEmergencia, setNombreEmergencia] = useState('');
  const [telefonoContactoEmergencia, setTelefonoContactoEmergencia] = useState('');
  const [nombreEmergenciaO, setNombreEmergenciaO] = useState('');
  const [telefonoContactoEmergenciaO, setTelefonoContactoEmergenciaO] = useState('');
  const [parentescoO, setParentescoO] = useState('');
  const [procedimientosMedicos, setProcedimientosMedicos] = useState('');


  //#endregion

//#region Función para resetear el formulario (modificada)
  const resetForm = () => {
    // Resetear todos los campos
    setNombre('');
    setApellidoPaterno('');
    setApellidoMaterno('');
    setEmail('');
    setEmailError('');
    setTelefonoCasa('');
    setTelefonoCelular('');
    setEstadoNacimiento('');
    setCurp('');
    setRfc('');
    setUmf('');
    setNss('');
    setNoCuenta('');
    setCp('');
    setNoExterior('');
    setNoInterior('');
    setTieneHijos('');
    setCantidadHijos('');
    setInfonavit('');
    setFonacot('');
    setPension('');
    setNombreMadre('');
    setNombrePadre('');
    setTipoSangre('');
    setCalle('');
    setColonia('');
    setLocalidad('');
    setMunicipio('');
    setEstado('');
    setFechaNacimiento('');
    setSexo('');
    setEstadoCivil('');
    setEscolaridad('');
    setHijos('');
    setAlergias('');
    setParentesco('');
    setNombreEmergencia('');
    setTelefonoContactoEmergencia('');
    setNombreEmergenciaO('');
    setTelefonoContactoEmergenciaO('');
    setParentescoO('');
    setProcedimientosMedicos('');
    setPhoto(null);
    setSignature(null);
    setShowScanner(false);
    setSatData(null);
    setScannerKey(prev => prev + 1);
  };
  //#endregion

  //#region Handlers
  const handleChangeInfonavit = (event) => {
    setInfonavit(event.target.value);
  };
  
  const handleChangeFonacot = (event) => {
    setFonacot(event.target.value);
  };
  
  const handleChangePension = (event) => {
    setPension(event.target.value);
  };

  const handleChangeSexo = (event) => {
    setSexo(event.target.value);
  };

  const handleChangeEstadoCivil = (event) => {
    setEstadoCivil(event.target.value);
  };

  const handleChangeEscolaridad = (event) => {
    setEscolaridad(event.target.value);
  };

  const handleChangeParentesco = (event) => {
    setParentesco(event.target.value);
  };

  const handleChangeParentescoO = (event) => {
    setParentescoO(event.target.value);
  };

  const handleRadioChange = (event) => {
    setTieneHijos(event.target.value);
    if (event.target.value === "No") {
      const numero = "0";
      console.log(numero);
      setCantidadHijos(numero);
    }
  };

  const handleHijosInput = (value) => {
    const numericValue = value.replace(/[^1-9]/g, '').slice(0, 2);
    setCantidadHijos(numericValue);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  const saveSignature = () => {
    const sigData = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(sigData);
  };

  const handleCurpUpper = (event) => {
    setCurp(event.target.value.toUpperCase());
  }

  const handleRfcUpper = (event) => {
    setRfc(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  }

  const handleNumberOnly = (setter, max) => (event) => {
    setter(event.target.value.replace(/[^0-9]/g, '').slice(0, max));
  }

  const handleNumber = (setter, max) => (event) => {
    setter(event.target.value.replace(/[^0-9]/g, '').slice(0, max));
  }

  const handleTextOnly = (setter, max) => e => {
    let value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, '').slice(0, max);
    value = value.replace(/\b([a-zA-ZáéíóúÁÉÍÓÚ])([a-zA-ZáéíóúÁÉÍÓÚ]*)/g, 
      (match, first, rest) => first.toUpperCase() + rest.toLowerCase()
    );
    setter(value);
  };

  const handleTextCapitalize = (setter, max) => e => {
    let value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ0-9\s]/g, '').slice(0, max);
    value = value.replace(/\b([a-zA-ZáéíóúÁÉÍÓÚ])([a-zA-ZáéíóúÁÉÍÓÚ]*)/g, 
      (match, first, rest) => first.toUpperCase() + rest.toLowerCase()
    );
    setter(value);
  };

  const handleTextNumer = (setter, max) => e => {
    let value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ0-9\s]/g, '').slice(0, max);
    value = value.replace(/\b([a-zA-ZáéíóúÁÉÍÓÚ0-9])([a-zA-ZáéíóúÁÉÍÓÚ0-9]*)/g, 
      (match, first, rest) => first.toUpperCase() + rest.toLowerCase()
    );
    setter(value);
  };

  const handleTextUpper = (setter, max) => e => {
    let value = e.target.value.replace(/[^a-zA-Z+\s]/g, '').slice(0, max);
    value = value.toUpperCase();
    setter(value);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value.toLowerCase();
    setEmail(emailValue);
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue && !emailPattern.test(emailValue)) {
      setEmailError('Formato de email inválido');
    } else {
      setEmailError('');
    }
  }

  const handleSave = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // 1. Primero guardar el contacto de emergencia principal
    const contactoResponse = await fetch('http://localhost:5000/api/add-contacto-emergencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nombre_contacto: nombreEmergencia,
        telefono: telefonoContactoEmergencia,
        parentesco: parentesco
      }),
    });

    if (!contactoResponse.ok) {
      throw new Error(`Error al guardar contacto: ${contactoResponse.status}`);
    }

      const contactoData = await contactoResponse.json();
      console.log('Contacto principal guardado:', contactoData);

      // 2. Guardar contacto opcional si existe
      let contactoOpcionalData = null;
      if (nombreEmergenciaO && telefonoContactoEmergenciaO && parentescoO) {
        const contactoOpcionalResponse = await fetch('http://localhost:5000/api/add-contacto-emergencia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            nombre_contacto: nombreEmergenciaO,
            telefono: telefonoContactoEmergenciaO,
            parentesco: parentescoO
          }),
        });
        
        if (!contactoOpcionalResponse.ok) {
          console.warn('Error al guardar contacto opcional');
          } else {
          contactoOpcionalData = await contactoOpcionalResponse.json();
          console.log('Contacto opcional guardado:', contactoOpcionalData);
      }
    }

          // 3. Guardar el prospecto (sin IDs de contactos ya que usamos tabla intermedia)
          const prospectoResponse = await fetch('http://localhost:5000/api/add-prospecto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            nombre_prospecto: nombre, apellido_paterno_prospecto: apellidoPaterno, apellido_materno_prospecto: apellidoMaterno, 
            fecha_nacimiento: fechaNacimiento, sexo: sexo, lugar_nacimiento: estadoNacimiento, 
            estado_civil: estadoCivil, curp: curp, rfc: rfc, nss: nss, umf: umf, numero_cuenta: noCuenta, 
            calle: calle, numero_exterior: noExterior, numero_interior: noInterior, colonia: colonia, 
            codigo_postal: cp, localidad: localidad, municipio: municipio, estado: estado, numero_celular: telefonoCelular, 
            telefono_casa: telefonoCasa, correo_cfdi: email, escolaridad: escolaridad, hijos: cantidadHijos, 
            nombre_padre: nombrePadre, nombre_madre: nombreMadre, tipo_sangre: tipoSangre, alergias: alergias, 
            procedimientos_medicos: procedimientosMedicos, 
            infonavit: infonavit, fonacot: fonacot, pension_alimenticia: pension, id_detalles_puesto: null
            }),
          });

            if (!prospectoResponse.ok) {
              throw new Error(`Error al guardar prospecto: ${prospectoResponse.status}`);
            }

              const prospectoData = await prospectoResponse.json();
              console.log('Prospecto guardado:', prospectoData);

              // 4. Crear relación con contacto principal en tabla intermedia
              const relacionPrincipalResponse = await fetch('http://localhost:5000/api/add-prospecto-contacto', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  id_prospecto: prospectoData.id, 
                  id_contacto_emergencia: contactoData.id
                }),
              });

              if (!relacionPrincipalResponse.ok) {
                throw new Error(`Error al crear relación principal: ${relacionPrincipalResponse.status}`);
    }

                const relacionPrincipalData = await relacionPrincipalResponse.json();
                console.log('Relación principal creada:', relacionPrincipalData);

                // 5. Crear relación con contacto opcional si existe
                if (contactoOpcionalData) {
                  const relacionOpcionalResponse = await fetch('http://localhost:5000/api/add-prospecto-contacto', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                      id_prospecto: prospectoData.id,
                      id_contacto_emergencia: contactoOpcionalData.id
                    }),
                  });

                  if (!relacionOpcionalResponse.ok) {
                    console.warn('Error al crear relación opcional');
                  } else {
                    const relacionOpcionalData = await relacionOpcionalResponse.json();
                    console.log('Relación opcional creada:', relacionOpcionalData);
                  }
                }

                // Éxito - todos los datos guardados
                setError('');
                setSuccess(true);
                resetForm();

    } catch (error) {
      console.error('Error completo:', error);
        setError('Error: ' + error.message);
        setSuccess(false);
  }finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError('');
  };
  //#endregion


   // Efecto para cargar datos SAT cuando estén disponibles
  useEffect(() => {
    if (datosSat) {
      console.log('Datos SAT recibidos en CollaboratorForm:', datosSat);
      loadSatDataIntoForm(datosSat);
    }
  }, [datosSat]);

// Función para cargar datos SAT en el formulario
  const loadSatDataIntoForm = (datos) => {
    if (!datos) return;

    console.log('Cargando datos SAT en formulario:', datos);
    
    // Datos personales
    if (datos.nombre) setNombre(datos.nombre);
    if (datos.apellidoPaterno) setApellidoPaterno(datos.apellidoPaterno);
    if (datos.apellidoMaterno) setApellidoMaterno(datos.apellidoMaterno);
    if (datos.curp) setCurp(datos.curp);
    if (datos.rfc) setRfc(datos.rfc);
    // if (datos.fechaNacimiento) {
    //   setFechaNacimiento(formatDateForInput(datos.fechaNacimiento));
    //}
    
    // Domicilio
    if (datos.domicilio) {
      const dom = datos.domicilio;
      if (dom.entidadFederativa) setEstado(dom.entidadFederativa);
      if (dom.municipio) setMunicipio(dom.municipio);
      if (dom.colonia) setColonia(dom.colonia);
      if (dom.nombreVialidad) setCalle(dom.nombreVialidad);
      if (dom.numeroExterior) setNoExterior(dom.numeroExterior);
      if (dom.numeroInterior) setNoInterior(dom.numeroInterior);
      if (dom.codigoPostal) setCp(dom.codigoPostal);
    }
  };
  // Función auxiliar para formatear fecha
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  
  //#endregion

  return (
    <div className='font container'>

{/* Mostrar loader mientras se carga */}
      {loading && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 9999 
          }}
        >
          <CircularProgress size={60} sx={{ color: 'white' }} />
          <Typography variant="h6" sx={{ color: 'white', ml: 2 }}>
            Guardando datos...
          </Typography>
        </Box>
      )}

{/* Mensajes de éxito y error */}
      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          ¡Todos los datos guardados exitosamente!
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    <Card className='card size'>
      <h4>Formulario de Registro</h4>
      <div>
        <TextField 
          id="Nombre" 
          className='textfield padding-label' 
          label="Nombre(s)" 
          variant="standard" 
          size="small"
          value={nombre}
            onChange={(e) => handleTextOnly(setNombre, 35)(e)}
          inputProps={{maxLength:35}}
          required={true}/>
        <TextField 
          id="ApellidoPaterno padding-label" 
          className='textfield' 
          label="Apellido Paterno" 
          variant="standard" 
          size="small"
          value={apellidoPaterno}
          onChange={(e) => handleTextOnly(setApellidoPaterno, 30)(e)}
          inputProps={{maxLength:30}}
          required={true}/>
        <TextField 
          id="ApellidoMaterno" 
          className='textfield' 
          label="Apellido Materno" 
          variant="standard" 
          size="small"
          value={apellidoMaterno}
          onChange={(e) => handleTextOnly(setApellidoMaterno, 30)(e)}
          inputProps={{maxLength:30}}
          required={true}/>
      </div>
      <div>
        <TextField id="FechaNacimiento" 
        className='textfield' 
        label="Fecha de nacimiento" 
        variant='standard' 
        type="date" 
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        InputLabelProps={{ shrink: true }} 
        size='small' 
        required={true} />
         <FormControl className='select-sexo' variant="standard" size='small' required={true}>
           <InputLabel className='' id="select-sexo" size='small'>Sexo</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              value={sexo}
              onChange={handleChangeSexo}
              label="Sexo"
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="Hombre">Hombre</MenuItem>
              <MenuItem value="Mujer">Mujer</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
          <div className='display'>
          <TextField 
            id="standard-basic" 
            className='textfield' 
            label="Estado de nacimiento" 
            variant="standard" 
            size='small' 
            value={estadoNacimiento}
            onChange={(e) => handleTextOnly(setEstadoNacimiento, 30)(e)}
            inputProps={{ maxLength: 30 }}
            required={true}
          />
          </div>
      
      </div>
      <div>
         <FormControl className='select' variant="standard" size='small' required={true}>
           <InputLabel className='select' id="select-escolaridad" size='small'>Escolaridad</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              label="Escolaridad"
              value={escolaridad}
              onChange={handleChangeEscolaridad}
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="Primaria">Primaria</MenuItem>
              <MenuItem value="Secundaria">Secundaria</MenuItem>
              <MenuItem value="Preparatoria">Preparatoria</MenuItem>
              <MenuItem value="Licenciatura">Licenciatura</MenuItem>
              <MenuItem value="Posgrado">Posgrado</MenuItem>
            </Select>
          </FormControl>
          <div className='display'>
             <FormControl className='select' variant="standard" size='small' required={true}>
           <InputLabel className='select' id="select-escolaridad" size='small'>Estado Civil</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              label="Estado Civil"
              value={estadoCivil}
              onChange={handleChangeEstadoCivil}
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="Soltero">Soltero(a)</MenuItem>
              <MenuItem value="Casado">Casado(a)</MenuItem>
              <MenuItem value="Viudo">Viudo(a)</MenuItem>
              <MenuItem value="Divorciado">Divorciado(a)</MenuItem>
              <MenuItem value="UnionLibre">Unión Libre</MenuItem>
            </Select>
          </FormControl>
          </div>
         

      </div>
      <div >
        <TextField 
          id="standard-basic" 
          className='textfield-rfc' 
          label="CURP" 
          variant="standard" 
          size='small'  
          value={curp}
          onChange={(e) => handleCurpUpper(e)}
          inputProps={{ maxLength: 18 }}
          required={true}
        />
        <div>
        <Button 
          onClick={() => window.open('https://www.gob.mx/curp/')} 
          className='btn-consultar'
          variant="contained"
          size="small"
          color='inherit'
        >Consultar CURP</Button>
        </div>
        
      </div>
      <div>
        <TextField 
          id="standard-basic" 
          className='textfield-rfc' 
          label="RFC" 
          variant="standard"
          value={rfc}
          onChange={(e) => handleRfcUpper(e)}
          inputProps={{ maxLength: 13 }}
          required={true}
        />
        <div>
          <Button 
          onClick={() => window.open('https://wwwmat.sat.gob.mx/aplicacion/31274/consulta-tu-clave-de-rfc-mediante-curp')} 
          variant="contained"
          className='btn-consultar'
          size="small"
          color='inherit'
          >Consultar RFC</Button>
        </div>
      </div>
      <div>
        <TextField 
          id="standard-basic" 
          className='textfield' 
          label="NSS" 
          variant="standard"
          value={nss}
          type='number'
          onChange={(e) => handleNumberOnly(setNss, 11)(e)}
          inputProps={{ maxLength: 11 }}
          required={true}/>
          <TextField 
          id="standard-basic" 
          className='textfield' 
          label="UMF" 
          variant="standard"
          value={umf}
          onChange={(e) => handleTextNumer(setUmf, 20)(e)}
          inputProps={{ maxLength: 20 }}
          required={true}/>
          <TextField 
          id="standard-basic" 
          className='textfield' 
          label="No. de Cuenta" 
          variant="standard"
          type='number'
          value={noCuenta}
          onChange={(e) => handleNumberOnly(setNoCuenta, 25)(e)}
          inputProps={{ maxLength: 25 }}
          required={true}/>
      </div>
      <div>
         <TextField 
          placeholder='ejemplo@dominio.com'
          id="Email" 
          className='textfield' 
          label="Email" 
          variant="standard" 
          size="small"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          error={!!emailError}
          helperText={emailError}
          inputProps={{maxLength:35}}
          required={true}
        />
        <TextField 
          id="TelefonoCasa" 
          className='textfield' 
          label="Teléfono Casa" 
          variant="standard" 
          size="small"
          type='number'
          value={telefonoCasa}
          onChange={(e) => handleNumberOnly(setTelefonoCasa, 10)(e)}
          inputProps={{maxLength:10}}
          required={false}/>
        <TextField 
          id="TelefonoMovil" 
          className='textfield' 
          label="Teléfono Móvil" 
          variant="standard" 
          size="small"
          type='number'
          value={telefonoCelular}
          onChange={(e) => handleNumberOnly(setTelefonoCelular, 10)(e)}
          inputProps={{maxLength:10}}
          required={true}/>
      </div>

      <Divider style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }} />
      <h4>Dirección</h4>
      <div>
        <TextField
          id="Calle"
          className='textfield'
          label="Calle"
          variant="standard"
          size="small"
          value={calle}
          onChange={(e) => handleTextCapitalize(setCalle, 50)(e)}
          inputProps={{maxLength:20}}
          required={true}
        />
        <TextField
          id="Colonia"
          className='textfield'
          label="Colonia"
          variant="standard"
          size="small"
          value={colonia}
          onChange={(e) => handleTextCapitalize(setColonia, 50)(e)}
          inputProps={{maxLength:20}}
          required={true}
        />
        <TextField
          id="NoExterior"
          className='textfield'
          label="Número Exterior"
          variant="standard"
          size="small"
          value={noExterior}
          onChange={(e) => handleNumber(setNoExterior, 5)(e)}
          inputProps={{maxLength:5}}
          required={true}
        />
         <TextField
          id="NoInterior"
          className='textfield'
          label="Número Interior"
          variant="standard"
          size="small"
          value={noInterior}
          onChange={(e) => handleNumber(setNoInterior, 5)(e)}
          inputProps={{maxLength:5}}
          required={false}
        />
        </div>
        <div>
        <TextField
          id="CP"
          className='textfield'
          label="Código Postal"
          variant="standard"
          size="small"
          value={cp}
          type='number'
          onChange={(e) => handleNumberOnly(setCp, 5)(e)}
          inputProps={{maxLength:5}}
          required={true}
        />
        <TextField
          id="Localidad"
          className='textfield'
          label="Localidad"
          variant="standard"
          size="small"
          value={localidad}
          onChange={(e) => handleTextCapitalize(setLocalidad, 40)(e)}
          inputProps={{maxLength:40}}
          required={true}/>
          <TextField
          id="Municipio"
          className='textfield'
          label="Municipio"
          variant="standard"
          size="small"
          value={municipio}
          onChange={(e) => handleTextCapitalize(setMunicipio, 30)(e)}
          inputProps={{maxLength:30}}
          required={true}/>
          <TextField
          id="Estado"
          className='textfield'
          label="Estado"
          variant="standard"
          size="small"
          value={estado}
          onChange={(e) => handleTextOnly(setEstado, 30)(e)}
          inputProps={{maxLength:30}}
          required={true}/>
      </div>
      <Divider style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }} />
      <h4>Contactos de emergencia</h4>
      <div>
        <TextField
          id="NombreContactoEmergencia"
          className='textfield'
          label="Nombre"
          variant="standard"
          size="small"
          value={nombreEmergencia}
          onChange={(e) => handleTextOnly(setNombreEmergencia, 100)(e)}
          inputProps={{maxLength:100}}
          required={true}
        />
         <FormControl className='select-sexo' variant="standard" size='small' required={true}>
           <InputLabel className='select-sexo' id="select-parentesco" size='small'>Parentesco</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              label="Parentesco"
              value={parentesco}
              onChange={(e) => handleChangeParentesco(e)}
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="Padre">Padre</MenuItem>
              <MenuItem value="Madre">Madre</MenuItem>
              <MenuItem value="Esposo">Esposo(a)</MenuItem>
              <MenuItem value="Hijo">Hijo(a)</MenuItem>
              <MenuItem value="Hermano">Hermano(a)</MenuItem>
            </Select>
          </FormControl>
          <div className='display'>
          <TextField
            id="TelefonoContactoEmergencia"
            className='textfield'
            label="Teléfono"
            variant="standard"
            size="small"
            type='number'
            value={telefonoContactoEmergencia}
            onChange={(e) => handleNumberOnly(setTelefonoContactoEmergencia, 10)(e)}
            inputProps={{maxLength:10}}
            required={true}
          />
          </div>
        
      </div>
      <div>
        <TextField
          id="NombreContactoEmergenciaO"
          className='textfield'
          label="Nombre"
          variant="standard"
          size="small"
          value={nombreEmergenciaO}
          onChange={(e) => handleTextOnly(setNombreEmergenciaO, 100)(e)}
          inputProps={{maxLength:100}}
          required={false}
        />
        <FormControl className='select-sexo' variant="standard" size='small' required={false}>
           <InputLabel className='select-sexo' id="select-parentescoO" size='small'>Parentesco</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              label="Parentesco"
              value={parentescoO}
              onChange={(e) => handleChangeParentescoO(e)}
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="Padre">Padre</MenuItem>
              <MenuItem value="Madre">Madre</MenuItem>
              <MenuItem value="Esposo">Esposo(a)</MenuItem>
              <MenuItem value="Hijo">Hijo(a)</MenuItem>
              <MenuItem value="Hermano">Hermano(a)</MenuItem>
            </Select>
          </FormControl>
          <div className='display'>
            <TextField
          id="TelefonoContactoEmergenciaO"
          className='textfield'
          label="Teléfono"
          variant="standard"
          size="small"
          type='number'
          value={telefonoContactoEmergenciaO}
          onChange={(e) => handleNumberOnly(setTelefonoContactoEmergenciaO, 10)(e)}
          inputProps={{maxLength:10}}
          required={false}
        />
          </div>
        
      </div>

       <Divider style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }} />

      <h4>Datos médicos</h4>
      <div>
        <TextField
          id="TipoSangre"
          className='textfield'
          label="Tipo de Sangre"
          variant="standard"
          size="small"
          value={tipoSangre}
          onChange={(e) => handleTextUpper(setTipoSangre, 3)(e)}
          inputProps={{maxLength:3}}
          required={true}
        />
        <TextField
          id="Alergias"
          className='textfield'
          label="Alergias"
          variant="standard"
          size="small"
          value={alergias}
          onChange={(e) => setAlergias(e.target.value)}
          inputProps={{maxLength:200}}
          required={false}
        />
        <TextField
          id="ProcedimientosMedicos"
          className='textfield'
          label="Procedimientos Médicos"
          variant="standard"
          size="small"
          value={procedimientosMedicos}
          onChange={(e) => setProcedimientosMedicos(e.target.value)}
          inputProps={{maxLength:100}}
          required={false}
        />
      </div>
       <Divider style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }} />
       <h4>Información adicional</h4>
       <div>
        <TextField
          id="NombreMadre"
          className='textfield-padres'
          label="Nombre de la Madre"
          variant="standard"
          size="small"
          value={nombreMadre}
          onChange={(e) => handleTextOnly(setNombreMadre, 80)(e)}
          inputProps={{maxLength:80}}
          required={true}
        />
        <TextField
          id="NombrePadre"
          className='textfield-padres'
          label="Nombre del Padre"
          variant="standard"
          size="small"
          value={nombrePadre}
          onChange={(e) => handleTextOnly(setNombrePadre, 80)(e)}
          inputProps={{maxLength:80}}
          required={true}
        />
        <div style={{display:'flex', alignItems:'center'}}>
          <label className='label'>¿Tiene hijos? *</label>
        </div>
     <FormControl style={{paddingTop:0}}> 
     
        <RadioGroup className='radio-group-container'
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={tieneHijos}
        onChange={(e) => handleRadioChange(e)}
        required={true}
      >
        <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
        <FormControlLabel value="No" control={<Radio />} label="No" />

      </RadioGroup>
      
    </FormControl>
     {tieneHijos === "Sí" && (
        <TextField
          label="¿Cuántos?"
          variant="standard"
          type='number'
          className='textfield-hijos'
          value={cantidadHijos}
          onChange={(e) => handleHijosInput(e.target.value)}
          required={true}
          inputProps={{ 
            min: 1,
            max: 99,
            pattern: '[0-9]*'
          }}
        />
      )}
       </div>

       <Divider style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }} />

        <h4>Adeudos</h4>
       <div className='div-adeudos'>
      <FormControl className='radio-group-container'>
      <FormLabel id="demo-controlled-radio-buttons-group">Infonavit *</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={infonavit}
        onChange={(e) => handleChangeInfonavit(e)}
        required={true}
      >
        <FormControlLabel value={true} control={<Radio />} label="Sí" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Fonacot *</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={fonacot}
        onChange={(e) => handleChangeFonacot(e)}
        required={true}
      >
        <FormControlLabel value={true} control={<Radio />} label="Sí" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Pensión Alimenticia *</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={pension}
        onChange={(e) => handleChangePension(e)}
        required={true}
      >
        <FormControlLabel value={true} control={<Radio />} label="Sí" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>

       </div>
    </Card>
        <div className='btn-save'>
        <Button 
          variant="contained" 
          onClick={handleSave} 
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          disabled={loading} // Deshabilitar botón durante la carga
        >
          {loading ? 'Guardando...' : 'Guardar datos'}
        </Button>
      </div>      
    
      
      {/* Captura de fotografía */}
      {/* <h3>Fotografía</h3>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={240} />
      <button onClick={capturePhoto}>Tomar Foto</button><br />
      {photo && <img src={photo} alt="Foto capturada" width={160} />} */}

      {/* Firma digital */}
      {/* <h3>Firma Digital</h3>
      <SignatureCanvas ref={signatureRef} canvasProps={{ width: 320, height: 100, className: 'sigCanvas' }} />
      <button onClick={saveSignature}>Guardar Firma</button><br />
      {signature && <img src={signature} alt="Firma" width={160} />} */}

    </div>
  );
}

export const LoadSatDataIntoForm = CollaboratorForm;
export default CollaboratorForm;