
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import SignatureCanvas from 'react-signature-canvas';
import { FormControl, TextField, InputLabel, Select, MenuItem, 
  Card, CardContent, Typography, CardActions, 
  Button, Divider, Radio, RadioGroup, FormControlLabel, FormLabel} from '@mui/material';
import './templates/CollaboratorForm.css';
import { LabelOffRounded } from '@mui/icons-material';

function CollaboratorForm() {
  //#region 
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const webcamRef = useRef(null);
  const signatureRef = useRef(null);
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
  const [telefonoContactoEmergencia, setTelefonoContactoEmergencia] = useState('');
  const [telefonoContactoEmergenciaO, setTelefonoContactoEmergenciaO] = useState('');
  const [tieneHijos, setTieneHijos] = useState('');
  const [cantidadHijos, setCantidadHijos] = useState('');
  const [infonavit, setInfonavit] = React.useState('');
  const [fonacot, setFonacot] = useState('');
  const [pension, setPension] = useState('');
  const [nombreMadre, setNombreMadre] = useState('');
  const [nombrePadre, setNombrePadre] = useState('');
  const [nombreEmergencia, setNombreEmergencia] = useState('');
  const [nombreEmergenciaO, setNombreEmergenciaO] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [calle, setCalle] = useState('');
  const [colonia, setColonia] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [estado, setEstado] = useState('');
//#endregion
  //#region 
  const handleChangeInfonavit = (event) => {
    setInfonavit(event.target.value);
  };
  const handleChangeFonacot = (event) => {
    setFonacot(event.target.value);
  };
  const handleChangePension = (event) => {
    setPension(event.target.value);
  };

  const handleRadioChange = (event) => {
    setTieneHijos(event.target.value);
    if (event.target.value === 'No') {
      setCantidadHijos('');
    }
  };

  const handleHijosInput = (value) => {
    // Limitar a números y máximo 2 dígitos
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
    setter(event.target.value.toUpperCase().replace(/[^0-9]/g, '').slice(0, max));
  }

  const handleNumber = (setter, max) => (event) => {
    setter(event.target.value.toUpperCase().replace(/[^aeiouAEIOU0-9]/g, '').slice(0, max));
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
  
  // Validación opcional en tiempo real
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValue && !emailPattern.test(emailValue)) {
    setEmailError('Formato de email inválido');
  } else {
    setEmailError('');
  }
}
//#endregion

  return (
    <div className='font container'>
    <h2>Bienvenido</h2> 
    <p>El uso de estos datos es confidencial y serán tratados conforme a la ley. 
        Te comprometes a proporcionar información verídica y completa, ya que será utilizada para tu proceso de ingreso y contratación.</p>
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
          onChange={handleTextOnly(setNombre, 35)}
          inputProps={{maxLength:35}}
          required={true}/>
        <TextField 
          id="ApellidoPaterno padding-label" 
          className='textfield' 
          label="Apellido Paterno" 
          variant="standard" 
          size="small"
          value={apellidoPaterno}
          onChange={handleTextOnly(setApellidoPaterno, 30)}
          inputProps={{maxLength:30}}
          required={true}/>
        <TextField 
          id="ApellidoMaterno" 
          className='textfield' 
          label="Apellido Materno" 
          variant="standard" 
          size="small"
          value={apellidoMaterno}
          onChange={handleTextOnly(setApellidoMaterno, 30)}
          inputProps={{maxLength:30}}
          required={true}/>
      </div>
      <div>
        <TextField id="FechaNacimiento" className='textfield' label="Fecha de nacimiento" variant='standard' type="date" InputLabelProps={{ shrink: true }} size='small' required={true} />
         <FormControl className='select-sexo' variant="standard" size='small' required={true}>
           <InputLabel className='' id="select-sexo" size='small'>Sexo</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              label="Sexo"
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value={10}>Hombre</MenuItem>
              <MenuItem value={20}>Mujer</MenuItem>
              <MenuItem value={30}>Otro</MenuItem>
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
            onChange={handleTextOnly(setEstadoNacimiento, 30)}
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
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value={10}>Primaria</MenuItem>
              <MenuItem value={20}>Secundaria</MenuItem>
              <MenuItem value={30}>Preparatoria</MenuItem>
              <MenuItem value={40}>Licenciatura</MenuItem>
              <MenuItem value={50}>Posgrado</MenuItem>
            </Select>
          </FormControl>
          <div className='display'>
             <FormControl className='select' variant="standard" size='small' required={true}>
           <InputLabel className='select' id="select-escolaridad" size='small'>Estado Civil</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              label="Estado Civil"
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value={10}>Soltero(a)</MenuItem>
              <MenuItem value={20}>Casado(a)</MenuItem>
              <MenuItem value={30}>Viudo(a)</MenuItem>
              <MenuItem value={40}>Divorciado(a)</MenuItem>
              <MenuItem value={50}>Unión Libre</MenuItem>
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
          onChange={handleCurpUpper}
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
          onChange={handleRfcUpper}
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
          onChange={handleNumberOnly(setNss, 11)}
          inputProps={{ maxLength: 11 }}
          required={true}/>
          <TextField 
          id="standard-basic" 
          className='textfield' 
          label="UMF" 
          variant="standard"
          value={umf}
          onChange={handleTextNumer(setUmf, 20)}
          inputProps={{ maxLength: 20 }}
          required={true}/>
          <TextField 
          id="standard-basic" 
          className='textfield' 
          label="No. de Cuenta" 
          variant="standard"
          type='number'
          value={noCuenta}
          onChange={handleNumberOnly(setNoCuenta, 25)}
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
          onChange={handleEmailChange}
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
          onChange={handleNumberOnly(setTelefonoCasa, 10)}
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
          onChange={handleNumberOnly(setTelefonoCelular, 10)}
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
          onChange={handleTextCapitalize(setCalle, 50)}
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
          onChange={handleTextCapitalize(setColonia, 50)}
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
          onChange={handleNumber(setNoExterior, 5)}
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
          onChange={handleNumber(setNoInterior, 5)}
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
          onChange={handleNumberOnly(setCp, 5)}
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
          onChange={handleTextCapitalize(setLocalidad, 40)}
          inputProps={{maxLength:40}}
          required={true}/>
          <TextField
          id="Municipio"
          className='textfield'
          label="Municipio"
          variant="standard"
          size="small"
          value={municipio}
          onChange={handleTextCapitalize(setMunicipio, 30)}
          inputProps={{maxLength:30}}
          required={true}/>
          <TextField
          id="Estado"
          className='textfield'
          label="Estado"
          variant="standard"
          size="small"
          value={estado}
          onChange={handleTextOnly(setEstado, 30)}
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
          onChange={handleTextOnly(setNombreEmergencia, 100)}
          inputProps={{maxLength:100}}
          required={true}
        />
         <FormControl className='select-sexo' variant="standard" size='small' required={true}>
           <InputLabel className='select-sexo' id="select-parentesco" size='small'>Parentesco</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              label="Parentesco"
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value={10}>Padre</MenuItem>
              <MenuItem value={20}>Madre</MenuItem>
              <MenuItem value={30}>Esposo(a)</MenuItem>
              <MenuItem value={40}>Hijo(a)</MenuItem>
              <MenuItem value={50}>Hermano(a)</MenuItem>
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
            onChange={handleNumberOnly(setTelefonoContactoEmergencia, 10)}
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
          onChange={handleTextOnly(setNombreEmergenciaO, 100)}
          inputProps={{maxLength:100}}
          required={false}
        />
        <FormControl className='select-sexo' variant="standard" size='small' required={true}>
           <InputLabel className='select-sexo' id="select-parentescoO" size='small'>Parentesco</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              label="Parentesco"
              style={{paddingTop:'0px !important'}}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value={10}>Padre</MenuItem>
              <MenuItem value={20}>Madre</MenuItem>
              <MenuItem value={30}>Esposo(a)</MenuItem>
              <MenuItem value={40}>Hijo(a)</MenuItem>
              <MenuItem value={50}>Hermano(a)</MenuItem>
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
          onChange={handleNumberOnly(setTelefonoContactoEmergenciaO, 10)}
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
          onChange={handleTextUpper(setTipoSangre, 3)}
          inputProps={{maxLength:3}}
          required={true}
        />
        <TextField
          id="Alergias"
          className='textfield'
          label="Alergias"
          variant="standard"
          size="small"
          inputProps={{maxLength:200}}
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
          onChange={handleTextOnly(setNombreMadre, 80)}
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
          onChange={handleTextOnly(setNombrePadre, 80)}
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
        onChange={handleRadioChange}
        required={true}
      >
        <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      
      </RadioGroup>
      
    </FormControl>
     {tieneHijos === 'Sí' && (
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
        onChange={handleChangeInfonavit}
        required={true}
      >
        <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Fonacot *</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={fonacot}
        onChange={handleChangeFonacot}
        required={true}
      >
        <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Pensión Alimenticia *</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={pension}
        onChange={handleChangePension}
        required={true}
      >
        <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>

       </div>

    </Card>
      
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

export default CollaboratorForm;
