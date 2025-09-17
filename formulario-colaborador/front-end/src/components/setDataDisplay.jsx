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
          <DataRow label="Situación" value={datos.situacionContribuyente} />
        </div>

        {/* Domicilio Fiscal */}
        <div>
          <h4>🏠 Domicilio Fiscal</h4>
          {datos.domicilio ? (
            <>
              <DataRow label="Estado" value={datos.domicilio.entidadFederativa} />
              <DataRow label="Municipio" value={datos.domicilio.municipio} />
              <DataRow label="Colonia" value={datos.domicilio.colonia} />
              <DataRow label="Calle" value={datos.domicilio.nombreVialidad} />
              <DataRow label="Número Ext" value={datos.domicilio.numeroExterior} />
              <DataRow label="Número Int" value={datos.domicilio.numeroInterior} />
              <DataRow label="CP" value={datos.domicilio.codigoPostal} />
            </>
          ) : (
            <p>No hay información de domicilio</p>
          )}
        </div>

        {/* Datos Fiscales */}
        <div>
          <h4>💰 Datos Fiscales</h4>
          <DataRow label="Régimen Fiscal" value={datos.regimenFiscal} />
          <DataRow label="Fecha Inicio Operaciones" value={datos.fechaInicioOperaciones} />
          <DataRow label="Fecha Alta Régimen" value={datos.fechaAltaRegimen} />
          <DataRow label="Administración Local" value={datos.administracionLocal} />
          <DataRow label="Email" value={datos.email} />
        </div>

        {/* Metadatos */}
        <div>
          <h4>📊 Metadatos</h4>
          <DataRow label="Fuente" value={datos.fuente || 'SAT'} />
          <DataRow label="Fecha Consulta" value={new Date(datos.fechaConsulta).toLocaleString()} />
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