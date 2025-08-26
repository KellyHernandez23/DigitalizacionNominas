
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import SignatureCanvas from 'react-signature-canvas';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from '@mui/material/OutlinedInput';

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
    <div style={{ padding: '20px' }}>
    <h2>Bienvenido</h2> 
    <h3>Formulario de Registro de Colaborador</h3>

      {/* Datos personales */}
      <h4>Datos del Colaborador</h4>
      <TextField id="outlined-basic" label="Nombre completo" variant="outlined" />
      <TextField label="Fecha de nacimiento" type="date" InputLabelProps={{ shrink: true }} />
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">Sexo</InputLabel>
        <NativeSelect
        
          defaultValue={30}
          inputProps={{
            name: 'sexo',
            id: 'uncontrolled-native'
          }}
          input={<OutlinedInput label="Sexo" />}
        >
          <option value={10}>Hombre</option>
          <option value={20}>Mujer</option>
          <option value={30}>Otro</option>
        </NativeSelect>
      </FormControl>
      <TextField id="outlined-basic" label="Estado de nacimiento" variant="outlined" />
      <button onClick={() => window.open('https://www.gob.mx/curp/')}>Consultar CURP</button><br />
      <TextField id="outlined-basic" label="CURP" variant="outlined" />

      {/* Consulta de RFC */}
      <button onClick={() => window.open('https://wwwmat.sat.gob.mx/aplicacion/31274/consulta-tu-clave-de-rfc-mediante-curp')}>Consultar RFC</button><br />
      <TextField id="outlined-basic" label="RFC" variant="outlined" /><br />

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

      {/* Datos del reclutador */}
      <h3>Datos del Reclutador</h3>
      <input type="text" placeholder="Nombre del reclutador" /><br />
      <input type="email" placeholder="Correo del reclutador" /><br />
      <input type="text" placeholder="Área del reclutador" /><br />

      {/* Aprobaciones */}
      <h3>Aprobaciones</h3>
      <input type="text" placeholder="Aprobación Área 1" /><br />
      <input type="text" placeholder="Aprobación Área 2" /><br />
      <input type="text" placeholder="Aprobación Área 3" /><br />

      {/* Notificación */}
      <h3>Notificación</h3>
      <input type="email" placeholder="Correo para notificación" /><br />
      <button onClick={() => alert('Correo de notificación enviado (simulado)')}>Enviar Notificación</button>
    </div>
  );
}

export default CollaboratorForm;
