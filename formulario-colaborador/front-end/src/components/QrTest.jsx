// components/QRTest.jsx
import React from 'react';
import useSatQRParser from '../hooks/useSatQRParser';

const QRTest = () => {
  const { parsedData, error, isValid, parseQR } = useSatQRParser();

  const testQRs = [
    {
      name: 'QR válido con CURP',
      url: 'https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=HEHI930411M33_MEHI930411MDFRBR03'
    },
    {
      name: 'QR válido sin CURP',
      url: 'https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=ABC123456789'
    },
    {
      name: 'QR inválido',
      url: 'https://google.com?q=test'
    }
  ];

  return (
    <div>
      <h2>Testing QR Parser</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {testQRs.map((test, index) => (
          <button
            key={index}
            onClick={() => parseQR(test.url)}
            style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {test.name}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
          {error}
        </div>
      )}

      {parsedData && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: isValid ? '#d4edda' : '#fff3cd',
          border: `1px solid ${isValid ? '#c3e6cb' : '#ffeeba'}`,
          borderRadius: '4px'
        }}>
          <h3>Parsed Data ({isValid ? 'Válido' : 'Inválido'})</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QRTest;