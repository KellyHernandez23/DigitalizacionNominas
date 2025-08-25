
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import SignatureCanvas from 'react-signature-canvas';

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
      <h2>Formulario de Registro de Colaborador</h2>

      {/* Datos personales */}
      <h3>Datos del Colaborador</h3>
      <input type="text" placeholder="Nombre completo" /><br />
      <input type="date" placeholder="Fecha de nacimiento" /><br />
      <select>
        <option value="">Sexo</option>
        <option value="H">Hombre</option>
        <option value="M">Mujer</option>
      </select><br />
      <input type="text" placeholder="Estado de nacimiento" /><br />
      <button onClick={() => window.open('https://www.gob.mx/curp/')}>Consultar CURP</button><br />
      <input type="text" placeholder="CURP" /><br />

      {/* Consulta de RFC */}
      <button onClick={() => window.open('https://wwwmat.sat.gob.mx/aplicacion/31274/consulta-tu-clave-de-rfc-mediante-curp')}>Consultar RFC</button><br />
      <input type="text" placeholder="RFC" /><br />

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
