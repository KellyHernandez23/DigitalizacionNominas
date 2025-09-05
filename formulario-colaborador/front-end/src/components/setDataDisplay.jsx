// components/SatDataDisplay.jsx
import React from 'react';

const SatDataDisplay = ({ datos }) => {
  if (!datos) return null;

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      marginTop: '20px'
    }}>
      <h3>📋 Datos Completos de la Constancia Fiscal</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {/* Datos Personales */}
        <div>
          <h4>👤 Datos Personales</h4>
          <DataRow label="RFC" value={datos.rfc} />
          <DataRow label="CURP" value={datos.curp} />
          <DataRow label="Nombre" value={datos.nombre} />
          <DataRow label="Apellido Paterno" value={datos.apellidoPaterno} />
          <DataRow label="Apellido Materno" value={datos.apellidoMaterno} />
          <DataRow label="Fecha Nacimiento" value={datos.fechaNacimiento} />
        </div>

        {/* Domicilio Fiscal */}
        <div>
          <h4>🏠 Domicilio Fiscal</h4>
          <DataRow label="Domicilio" value={datos.domicilio} />
          <DataRow label="Colonia" value={datos.colonia} />
          <DataRow label="Ciudad" value={datos.ciudad} />
          <DataRow label="Municipio" value={datos.municipio} />
          <DataRow label="Estado" value={datos.estado} />
          <DataRow label="Código Postal" value={datos.codigoPostal} />
        </div>

        {/* Datos Fiscales */}
        <div>
          <h4>💰 Datos Fiscales</h4>
          <DataRow label="Régimen Fiscal" value={datos.regimenFiscal} />
          <DataRow label="Situación Fiscal" value={datos.situacionFiscal} />
          <DataRow label="Fecha Inicio Operaciones" value={datos.fechaInicioOperaciones} />
        </div>

        {/* Metadatos */}
        <div>
          <h4>📊 Metadatos</h4>
          <DataRow label="Fecha Consulta" value={new Date(datos.fechaConsulta).toLocaleString()} />
          <DataRow label="Tipo Constancia" value={datos.parametrosConsulta?.tipoInfo?.descripcion} />
          {datos.esMock && (
            <DataRow 
              label="⚠️ Nota" 
              value="Datos de prueba (servicio SAT no disponible)" 
              color="orange" 
            />
          )}
        </div>
      </div>

      {datos.parametrosConsulta?.urlOriginal && (
        <div style={{ marginTop: '15px', fontSize: '12px', wordBreak: 'break-all' }}>
          <strong>URL original:</strong> {datos.parametrosConsulta.urlOriginal}
        </div>
      )}
    </div>
  );
};

const DataRow = ({ label, value, color = 'black' }) => (
  <div style={{ marginBottom: '8px' }}>
    <strong style={{ display: 'inline-block', width: '150px' }}>
      {label}:
    </strong>
    <span style={{ color }}>{value || 'No disponible'}</span>
  </div>
);

export default SatDataDisplay;