import '../components/templates/CollaboratorForm.css';
import QRScannerComponent from './QRScannerComponent';
import { useState } from 'react'; 
import { Button, Alert } from '@mui/material';
import CollaboratorForm, { LoadSatDataIntoForm } from './CollaboratorForm';

function Home() {
    const [showScanner, setShowScanner] = useState(false);
    const [satData, setSatData] = useState(null);
    const [scannerKey, setScannerKey] = useState(0);
     const [formKey, setFormKey] = useState(0);

// Función para toggle del escáner
  const toggleScanner = () => {
    setShowScanner(!showScanner);
    setScannerKey(prev => prev + 1);
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setSatData(null);
    setShowScanner(false);
    // También podrías querer resetear otros estados aquí
  };

  return (
    <div>
        <h2>Bienvenido</h2> 
        <p>El uso de estos datos es confidencial y serán tratados conforme a la ley. 
            Te comprometes a proporcionar información verídica y completa, ya que será utilizada para tu proceso de ingreso y contratación.</p>

             <div style={{ 
        marginBottom: '20px', 
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={toggleScanner}
          style={{ marginRight: '10px' }}
          startIcon={showScanner ? '📷' : '🔍'}
        >
          {showScanner ? 'Ocultar Escáner' : 'Escanear Constancia Fiscal'}
        </Button>
        
        {satData && (
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={resetForm}
            style={{ marginLeft: '10px' }}
          >
            Limpiar Datos
          </Button>
        )}
      </div>

      {/* Mostrar escáner */}
      {showScanner && (
        <div key={scannerKey}>
          <QRScannerComponent key={formKey}  onDataScanned={(data) => setSatData(data)} />
        </div>
      )}

      {/* Indicador de datos cargados */}
      {satData && !showScanner && (
        <Alert 
          severity="success" 
          style={{ marginBottom: '20px' }}
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={() => setShowScanner(true)}
            >
              Escanear otro
            </Button>
          }
        >
          ✅ Datos de la constancia fiscal cargados automáticamente
        </Alert>
      )}
    </div>

    
  );
}

export default Home;
