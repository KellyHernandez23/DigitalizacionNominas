import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode'; 
import { useSatData } from '../../../back-end/Hooks/useSatData';
import SatDataDisplay from '../components/setDataDisplay.jsx';
import { LoadSatDataIntoForm } from '../components/CollaboratorForm.jsx';
import CollaboratorForm from '../components/CollaboratorForm.jsx';

const QRScannerComponent = () => {
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [isScannerInitialized, setIsScannerInitialized] = useState(false);
  const scannerRef = useRef(null);
  const { datosCompletos, loading, error: satError, obtenerDatosCompletos, reset } = useSatData();
  
  // Función para inicializar el escáner
  const initializeScanner = useCallback(() => {
    if (scannerRef.current || isScannerInitialized) return;

    try {
      console.log('Inicializando escáner...');
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
        supportedScanTypes: [],
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
      });

      scanner.render(
        (decodedText) => {
          console.log('QR escaneado:', decodedText);
          handleScanResult(decodedText);
        },
        (errorMessage) => {
          console.log('Error del escáner:', errorMessage);
          if (!errorMessage.includes('No MultiFormat Readers')) {
            setError(errorMessage);
          }
        }
      );

      scannerRef.current = scanner;
      setIsScannerInitialized(true);
      
    } catch (err) {
      console.error('Error inicializando escáner:', err);
      setError('Error al inicializar la cámara: ' + err.message);
    }
  }, [isScannerInitialized]);

  //Función para limpiar el escáner
  const cleanupScanner = useCallback(() => {
    if (scannerRef.current) {
      console.log('Limpiando escáner...');
      scannerRef.current.clear().catch(err => {
        console.log('Error limpiando escáner:', err);
      });
      scannerRef.current = null;
    }
    setIsScannerInitialized(false);
  }, []);

  // Efecto principal - controla cuándo inicializar/limpiar
  useEffect(() => {
    if (!datosCompletos && !loading && !isScannerInitialized) {
      initializeScanner();
    }

    if ((datosCompletos || loading) && isScannerInitialized) {
      cleanupScanner();
    }

    // return () => {
    //   cleanupScanner();
    // };
  }, [datosCompletos, loading, isScannerInitialized, initializeScanner]);

  const handleScanResult = async (decodedText) => {
    try {
      setScanResult(decodedText);
      setError('');
      await obtenerDatosCompletos(decodedText);
    } catch (err) {
      setError(err.message);
      // Si hay error, permitir escanear de nuevo
      setIsScannerInitialized(false);
    }
  };

  const resetScanner = () => {
    setScanResult('');
    setError('');
    //reset();
    cleanupScanner();
    
    // Pequeño delay antes de reinicializar
    setTimeout(() => {
      if (!datosCompletos && !loading) {
        initializeScanner();
      }
    }, 100);
  };

  // Verificar permisos de cámara
  const checkCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      setError('Permisos de cámara denegados. Por favor permite el acceso a la cámara.');
      return false;
    }
  };

  // Efecto para verificar permisos al montar el componente
  useEffect(() => {
    checkCameraPermissions();
  }, []);

  return (
    <>
      {datosCompletos && (
          <CollaboratorForm datosSat={datosCompletos}/>

      )}
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>

        {/* Solo mostrar escáner si no hay datos */}
        {!datosCompletos && !loading && (
          <>
            <div style={{
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              border: '2px dashed #007bff',
              borderRadius: '8px',
              marginBottom: '20px',
              overflow: 'hidden'
            }}>
              <div id="reader" style={{
                width: '100%',
                minHeight: '300px'
              }}></div>

              {/* Mensaje de carga del escáner */}
              {!isScannerInitialized && !error && (
                <div style={{
                  position: 'absolute',
                  textAlign: 'center',
                  color: '#6c757d'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
                  <p>Inicializando cámara...</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Botón para reiniciar manualmente el escáner */}
        {!datosCompletos && !loading && isScannerInitialized && (
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <button
              onClick={resetScanner}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reiniciar Escáner
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <h3>Consultando datos en el SAT</h3>
            <p>Esto puede tomar unos segundos...</p>
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#e9ecef',
              borderRadius: '2px',
              margin: '20px 0'
            }}>
              <div style={{
                width: '75%',
                height: '100%',
                backgroundColor: '#007bff',
                borderRadius: '2px',
                animation: 'loading 1.5s infinite'
              }}></div>
            </div>
          </div>
        )}

        {/* Mostrar errores */}
        {(error || satError) && (
          <div style={{
            padding: '15px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            <h4>❌ Error</h4>
            <p>{error || satError}</p>
            <button
              onClick={resetScanner}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Mostrar datos completos cuando estén listos */}
        {datosCompletos && (
          <>
            <div>
              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginTop: '20px'
              }}>
                
              </div>
            </div>
          </>
        )}

        {/* Información de ayuda */}
        {!datosCompletos && !loading && (
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>💡 Instrucciones:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Asegúrate de permitir el acceso a la cámara cuando el navegador lo solicite</li>
              <li>Enfoca el código QR de tu constancia fiscal</li>
              <li>Buena iluminación ayuda al escaneo</li>
              <li>Mantén estable el dispositivo</li>
            </ul>
          </div>
        )}

        <style>
          {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}
        </style>
      </div></>
  );
};

export default QRScannerComponent;