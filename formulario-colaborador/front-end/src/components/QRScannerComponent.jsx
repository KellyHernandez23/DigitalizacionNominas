import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode'; 
import { useSatData } from '../../../back-end/Hooks/useSatData';
import SatDataDisplay from '../components/setDataDisplay.jsx';
import { LoadSatDataIntoForm } from '../components/CollaboratorForm.jsx';
import CollaboratorForm from '../components/CollaboratorForm.jsx';
import '../components/templates/QRScannerComponent.css';

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
    <div className='container-scanner'>

        {/* Solo mostrar escáner si no hay datos */}
        {!datosCompletos && !loading && (
          <>
            <div className='scanner-placeholder'>
              <div id="reader"></div>
              {/* Mensaje de carga del escáner */}
              {!isScannerInitialized && !error && (
                <div className='scanner-message'>
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
              className='reiniciar-button'
            >
              Reiniciar Escáner
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className='loading-state'>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <h3>Consultando datos en el SAT</h3>
            <p>Esto puede tomar unos segundos...</p>
            <div className='loading-state-div'>
              <div className='loading'></div>
            </div>
          </div>
        )}

        {/* Mostrar errores */}
        {(error || satError) && (
          <div className='error'>
            <h4>❌ Error</h4>
            <p>{error || satError}</p>
            <button
              onClick={resetScanner}
              className='btn-error'
            >
              Reintentar
            </button>
          </div>
        )}
        {/* Información de ayuda */}
        {!datosCompletos && !loading && (
          <div className='info'>
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