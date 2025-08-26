
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import SignatureCanvas from 'react-signature-canvas';
import { FormControl, TextField, InputLabel, Select, MenuItem, 
  Card, CardContent, Typography, CardActions, 
  Button} from '@mui/material';
import './templates/CollaboratorForm.css';

function CollaboratorForm() {
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const webcamRef = useRef(null);
  const signatureRef = useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  const saveSignature = () => {
    const sigData = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(sigData);
  };

  return (
    <div className='font' style={{ padding: '20px' }}>
    <h2>Bienvenido</h2> 
    <p>El uso de estos datos es confidencial y serán tratados conforme a la ley. 
        Te comprometes a proporcionar información verídica y completa, ya que será utilizada para tu proceso de ingreso y contratación.</p>
    <Card className='size' 
    style={{padding: '2.5rem', borderRadius:'2rem'}}
    >
      <h4>Formulario de Registro</h4>
      <div>
        <TextField id="Nombre" className='textfield' label="Nombre(s)" variant="standard" size="small"/>
        <TextField id="ApellidoPaterno" className='textfield' label="Apellido Paterno" variant="standard" size="small"/>
        <TextField id="ApellidoMaterno" className='textfield' label="Apellido Materno" variant="standard" size="small"/>
      </div>
      <div>
        <TextField id="FechaNacimiento" className='textfield' label="Fecha de nacimiento" variant='standard' type="date" InputLabelProps={{ shrink: true }} size='small' />
         <FormControl style={{width: '23rem', height: '35px', paddingTop:'0px', }} variant="standard" size='small' >
           <InputLabel style={{width: '23rem', height: '35px', paddingBottom:'0px', }} id="select-sexo" size='small'>Sexo</InputLabel>
            <Select 
              id="demo-simple-select-standard"
              //value={sexo}
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
      <TextField id="standard-basic" className='textfield' label="Estado de nacimiento" variant="standard" size='small' />
      </div>
      <div >
        <TextField id="standard-basic" className='textfield-rfc' label="CURP" variant="standard" size='small' />
        <div>
        <Button 
          onClick={() => window.open('https://www.gob.mx/curp/')} 
          variant="contained"
          size="small"
          color='inherit'
        >Consultar CURP</Button>
        </div>
        
      </div>
      <div>
        <TextField id="standard-basic" className='textfield-rfc' label="RFC" variant="standard"/>
        <div>
          <Button 
          onClick={() => window.open('https://wwwmat.sat.gob.mx/aplicacion/31274/consulta-tu-clave-de-rfc-mediante-curp')} 
          variant="contained"
          size="small"
          color='inherit'
          >Consultar RFC</Button>
        </div>
      </div>

    </Card>
      
      {/* Captura de fotografía */}
      <h3>Fotografía</h3>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={240} />
      <button onClick={capturePhoto}>Tomar Foto</button><br />
      {photo && <img src={photo} alt="Foto capturada" width={160} />}

      {/* Firma digital */}
      <h3>Firma Digital</h3>
      <SignatureCanvas ref={signatureRef} canvasProps={{ width: 320, height: 100, className: 'sigCanvas' }} />
      <button onClick={saveSignature}>Guardar Firma</button><br />
      {signature && <img src={signature} alt="Firma" width={160} />}

    </div>
  );
}

export default CollaboratorForm;
