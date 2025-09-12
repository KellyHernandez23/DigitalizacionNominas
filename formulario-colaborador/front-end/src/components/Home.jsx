import QRScannerComponent from './QRScannerComponent';
import { useState } from 'react'; 
import { Button, Alert } from '@mui/material';
import CollaboratorForm, { LoadSatDataIntoForm } from './CollaboratorForm';
import './templates/Home.css';

function Home() {
    const [showScanner, setShowScanner] = useState(false);
    const [satData, setSatData] = useState(null);
    const [scannerKey, setScannerKey] = useState(0);
    const [formKey, setFormKey] = useState(0);
    const [showForm, setShowForm] = useState(false);

    // Función para toggle del escáner
    const toggleScanner = () => {
        if (showForm) {
            setShowForm(false); 
        }
        setShowScanner(!showScanner);
        setScannerKey(prev => prev + 1);
    };

    // Función para toggle del formulario
    const toggleForm = () => {
        if (showScanner) {
            setShowScanner(false); 
        }
        setShowForm(!showForm);
    };

    // Función para resetear el formulario
    const resetForm = () => {
        setSatData(null);
        setShowScanner(false);
        setShowForm(false);
    };

    return (
        <div className='font'>
            <h2 style={{ paddingBottom:'1rem'}}>Bienvenido</h2> 
            <p style={{ paddingBottom:'1rem'}}>El uso de estos datos es confidencial y serán tratados conforme a la ley. 
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
                    style={{ marginRight: '10px', marginBottom:'1rem' }}
                    startIcon={showScanner ? '📷' : '🔍'}
                >
                    {showScanner ? 'Ocultar Escáner' : 'Escanear Constancia Fiscal'}
                </Button>
                
                {/* Botón para mostrar/ocultar el formulario */}
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={toggleForm}
                    style={{ marginRight: '10px', marginBottom:'1rem' }}
                >
                    {showForm ? 'Ocultar Formulario' : 'Ir al Formulario'}
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

            {/* Mostrar escáner solo si showScanner es true */}
            {showScanner && (
                <div key={scannerKey}>
                    <QRScannerComponent key={formKey} onDataScanned={(data) => setSatData(data)} />
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

            {/* Mostrar formulario solo si showForm es true */}
            {showForm && (
                <div style={{ marginTop: '20px' }}>
                    <CollaboratorForm 
                        satData={satData} 
                        // Pasa cualquier otra prop que necesite tu formulario
                    />
                </div>
            )}
        </div>
    );
}

export default Home;