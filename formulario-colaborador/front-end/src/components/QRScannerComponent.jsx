// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode'; 
// import { useSatData } from '../../../back-end/Hooks/useSatData';
// import SatDataDisplay from '../components/setDataDisplay.jsx';
// import { LoadSatDataIntoForm } from '../components/CollaboratorForm.jsx';
// import CollaboratorForm from '../components/CollaboratorForm.jsx';
// import '../components/templates/QRScannerComponent.css';

// const QRScannerComponent = () => {
//   const [scanResult, setScanResult] = useState('');
//   const [error, setError] = useState('');
//   const [isScannerInitialized, setIsScannerInitialized] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const scannerRef = useRef(null);
//   const { datosCompletos, loading, error: satError, obtenerDatosCompletos, reset } = useSatData();
  
//   // Detectar si es dispositivo móvil
//   useEffect(() => {
//     const checkIsMobile = () => {
//       return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//     };
    
//     setIsMobile(checkIsMobile());
    
//     // También verificar al cambiar el tamaño de la ventana
//     const handleResize = () => {
//       setIsMobile(checkIsMobile());
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Función para inicializar el escáner
//   const initializeScanner = useCallback(() => {
//     if (scannerRef.current || isScannerInitialized) return;

//     try {
//       console.log('Inicializando escáner...');
      
//       // Configuración diferente para móviles vs desktop
//       const qrboxSize = isMobile 
//         ? { width: 220, height: 220 } 
//         : { width: 250, height: 250 };
      
//       const scanner = new Html5QrcodeScanner('reader', {
//         qrbox: qrboxSize,
//         fps: 10,
//         supportedScanTypes: [],
//         showTorchButtonIfSupported: true,
//         showZoomSliderIfSupported: true,
//         aspectRatio: isMobile ? 1.0 : 1.7778,
//          rememberLastUsedCamera: true,
//       });

//       scanner.render(
//         (decodedText) => {
//           console.log('QR escaneado:', decodedText);
//           handleScanResult(decodedText);
//         },
//         (errorMessage) => {
//           console.log('Error del escáner:', errorMessage);
//           if (!errorMessage.includes('No MultiFormat Readers')) {
//             setError(errorMessage);
//           }
//         }
//       );

//       scannerRef.current = scanner;
//       setIsScannerInitialized(true);
      
//     } catch (err) {
//       console.error('Error inicializando escáner:', err);
//       setError('Error al inicializar la cámara: ' + err.message);
//     }
//   }, [isScannerInitialized, isMobile]);

//   // Función para limpiar el escáner
//   const cleanupScanner = useCallback(() => {
//     if (scannerRef.current) {
//       console.log('Limpiando escáner...');
//       scannerRef.current.clear().catch(err => {
//         console.log('Error limpiando escáner:', err);
//       });
//       scannerRef.current = null;
//     }
//     setIsScannerInitialized(false);
//   }, []);

//   // Efecto principal - controla cuándo inicializar/limpiar
//   useEffect(() => {
//     if (!datosCompletos && !loading && !isScannerInitialized) {
//       initializeScanner();
//     }

//     if ((datosCompletos || loading) && isScannerInitialized) {
//       cleanupScanner();
//     }

//     return () => {
//       if (scannerRef.current) {
//         cleanupScanner();
//       }
//     };
//   }, [datosCompletos, loading, isScannerInitialized, initializeScanner, cleanupScanner]);

//   const handleScanResult = async (decodedText) => {
//     try {
//       setScanResult(decodedText);
//       setError('');
//       await obtenerDatosCompletos(decodedText);
//     } catch (err) {
//       setError(err.message);
//       // Si hay error, permitir escanear de nuevo
//       setIsScannerInitialized(false);
//     }
//   };

//   const resetScanner = () => {
//     setScanResult('');
//     setError('');
//     reset();
//     cleanupScanner();
    
//     // Pequeño delay antes de reinicializar
//     setTimeout(() => {
//       if (!datosCompletos && !loading) {
//         initializeScanner();
//       }
//     }, 100);
//   };

//   // Verificar permisos de cámara
//   const checkCameraPermissions = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       stream.getTracks().forEach(track => track.stop());
//       return true;
//     } catch (err) {
//       setError('Permisos de cámara denegados. Por favor permite el acceso a la cámara.');
//       return false;
//     }
//   };

//   // Efecto para verificar permisos al montar el componente
//   useEffect(() => {
//     checkCameraPermissions();
//   }, []);

//   return (
//     <>
//       {datosCompletos && (
//         <CollaboratorForm datosSat={datosCompletos}/>
//       )}
      
//       <div className='container-scanner'>
//         {/* Solo mostrar escáner si no hay datos */}
//         {!datosCompletos && !loading && (
//           <>
//             <div className='scanner-placeholder'>
//               <div id="reader"></div>
//               {/* Mensaje de carga del escáner */}
//               {!isScannerInitialized && !error && (
//                 <div className='scanner-message'>
//                   <div className="scanner-icon">📷</div>
//                   <p>Inicializando cámara...</p>
//                   {isMobile && (
//                     <p className="mobile-tip">Asegúrate de mantener el dispositivo en posición horizontal para mejor escaneo</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {/* Botón para reiniciar manualmente el escáner */}
//         {!datosCompletos && !loading && isScannerInitialized && (
//           <div className="scanner-controls">
//             <button
//               onClick={resetScanner} 
//               className='reiniciar-button'
//             >
//               Reiniciar Escáner
//             </button>
//           </div>
//         )}

//         {/* Loading state */}
//         {loading && (
//           <div className='loading-state'>
//             <div className="loading-icon">⏳</div>
//             <h3>Consultando datos en el SAT</h3>
//             <p>Esto puede tomar unos segundos...</p>
//             <div className='loading-state-div'>
//               <div className='loading'></div>
//             </div>
//           </div>
//         )}

//         {/* Mostrar errores */}
//         {(error || satError) && (
//           <div className='error'>
//             <h4>❌ Error</h4>
//             <p>{error || satError}</p>
//             <button
//               onClick={resetScanner}
//               className='btn-error'
//             >
//               Reintentar
//             </button>
//           </div>
//         )}
        
//         {/* Información de ayuda */}
//         {!datosCompletos && !loading && (
//           <div className='info'>
//             <h4>💡 Instrucciones:</h4>
//             <ul>
//               <li>Asegúrate de permitir el acceso a la cámara cuando el navegador lo solicite</li>
//               <li>Enfoca el código QR de tu constancia fiscal</li>
//               <li>Buena iluminación ayuda al escaneo</li>
//               <li>Mantén estable el dispositivo</li>
//               {isMobile && <li>Usa el botón de flash si está disponible para mejorar el escaneo</li>}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default QRScannerComponent;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode'; 
import { useSatData } from '../../../back-end/Hooks/useSatData';
import CollaboratorForm from '../components/CollaboratorForm.jsx';
import '../components/templates/QRScannerComponent.css';
import InfoIcon from '@mui/icons-material/Info';

const QRScannerComponent = () => {
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [shouldInitializeScanner, setShouldInitializeScanner] = useState(true);
  const scannerRef = useRef(null);
  const { datosCompletos, loading, error: satError, obtenerDatosCompletos, reset } = useSatData();
  
  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkIsMobile());
    
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Verificar permisos de cámara
  useEffect(() => {
    const checkCameraPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setCameraPermission(true);
      } catch (err) {
        setError('Permisos de cámara denegados. Por favor permite el acceso a la cámara.');
        setCameraPermission(false);
      }
    };
    
    checkCameraPermissions();
  }, []);

  // Función para inicializar el escáner
  const initializeScanner = useCallback(() => {
    if (scannerRef.current) return;

    try {
      console.log('Inicializando escáner...');
      
      const qrboxSize = isMobile 
        ? { width: 250, height: 250 } 
        : { width: 300, height: 300 };
      
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: qrboxSize,
        fps: 10,
        supportedScanTypes: [],
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        aspectRatio: isMobile ? 1.0 : 1.7778,
        rememberLastUsedCamera: true,
        // Textos en español
        text: {
          title: "Escáner QR",
          header: "Escaneo con cámara",
          body: "Coloca el código QR dentro del marco",
          action: "Escanear",
          loading: "Cargando...",
          permissionTitle: "Permiso para usar la cámara",
          permissionAction: "Permitir",
          scanning: "Escaneando",
          scanButton: "Escanear con cámara",
          pickButton: "Seleccionar imagen",
          torchButton: "Encender linterna",
          torchOn: "Encendida",
          torchOff: "Apagada",
          waiting: "Esperando",
          unsupported: "No compatible",
          or: "o",
          noCamera: "Cámara no detectada",
          noCameraDescription: "No se ha detectado ninguna cámara en este dispositivo",
          noCameraAction: "Abrir configuración",
          noCameraPermission: "Sin permisos de cámara",
          noCameraPermissionDescription: "No tienes permisos para acceder a la cámara",
          noCameraPermissionAction: "Conceder permisos"
        }
      });

      scanner.render(
        (decodedText) => {
          console.log('QR escaneado:', decodedText);
          handleScanResult(decodedText);
        },
        (errorMessage) => {
          // Ignorar errores normales de escaneo
          if (!errorMessage.includes('No MultiFormat Readers') && 
              !errorMessage.includes('NotFoundException')) {
            console.log('Error del escáner:', errorMessage);
          }
        }
      );

      scannerRef.current = scanner;
      setShouldInitializeScanner(false);
    } catch (err) {
      console.error('Error inicializando escáner:', err);
      setError('Error al inicializar la cámara: ' + err.message);
    }
  }, [isMobile]);

  // Función para limpiar el escáner
  const cleanupScanner = useCallback(() => {
    if (scannerRef.current) {
      console.log('Limpiando escáner...');
      try {
        scannerRef.current.clear().then(() => {
          console.log('Escáner limpiado correctamente');
          scannerRef.current = null;
        }).catch(err => {
          console.log('Error limpiando escáner:', err);
          scannerRef.current = null;
        });
      } catch (err) {
        console.log('Error en cleanup:', err);
        scannerRef.current = null;
      }
    }
    setShouldInitializeScanner(true);
  }, []);

  // Efecto para controlar el escáner
  useEffect(() => {
    if (datosCompletos || loading) {
      // Si tenemos datos o estamos cargando, limpiar el escáner
      cleanupScanner();
    } else if (cameraPermission && shouldInitializeScanner && !scannerRef.current) {
      // Si tenemos permisos y debemos inicializar, y no hay escáner, inicializar
      initializeScanner();
    }
  }, [datosCompletos, loading, cameraPermission, shouldInitializeScanner, initializeScanner, cleanupScanner]);

  const handleScanResult = async (decodedText) => {
    try {
      setScanResult(decodedText);
      setError('');
      await obtenerDatosCompletos(decodedText);
    } catch (err) {
      setError(err.message);
    }
  };

  const resetScanner = () => {
    setScanResult('');
    setError('');
    reset();
    cleanupScanner();
  };

  // Forzar limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      cleanupScanner();
    };
  }, [cleanupScanner]);

  return (
    <>
      {datosCompletos && (
        <CollaboratorForm datosSat={datosCompletos}/>
      )}
      
      <div className='container-scanner'>
        {/* Solo mostrar escáner si no hay datos y no está cargando */}
        {!datosCompletos && !loading && cameraPermission && (
          <>
            <div className='scanner-placeholder'>
              <div id="reader"></div>
              {/* Mensaje de carga del escáner */}
              {!scannerRef.current && !error && (
                <div className='scanner-message'>
                  <div className="scanner-icon">📷</div>
                  <p>Inicializando cámara...</p>
                  {isMobile && (
                    <p className="mobile-tip">Asegúrate de mantener el dispositivo en posición horizontal para mejor escaneo</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="scanner-controls">
              <button
                onClick={resetScanner} 
                className='reiniciar-button'
              >
                Reiniciar Escáner
              </button>
            </div>
          </>
        )}

        {/* Loading state */}
        {loading && (
          <div className='loading-state'>
            <div className="loading-icon">⏳</div>
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
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#1976d2' }}>
               <InfoIcon /> <strong>Instrucciones:</strong>
            </div>
            <ul>
              <li>Asegúrate de permitir el acceso a la cámara cuando el navegador lo solicite</li>
              <li>Enfoca el código QR de tu constancia fiscal</li>
              <li>Buena iluminación ayuda al escaneo</li>
              <li>Mantén estable el dispositivo</li>
              {isMobile && <li>Usa el botón de flash si está disponible para mejorar el escaneo</li>}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default QRScannerComponent;