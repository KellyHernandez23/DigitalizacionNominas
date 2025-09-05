// hooks/useSatData.js
import { useState, useCallback } from 'react';
import { SatService } from '../Services/satService.js';
import { useSatQRParser } from '../../back-end/Hooks/useSatQRParser.js';

export const useSatData = () => {
  const [datosCompletos, setDatosCompletos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { parseQR } = useSatQRParser();

  const obtenerDatosCompletos = useCallback(async (qrUrl) => {
    setLoading(true);
    setError('');
    setDatosCompletos(null);

    try {
      // 1. Primero parsear el QR
      const parametrosQR = parseQR(qrUrl);
      
      if (!parametrosQR || !parametrosQR.isValid) {
        throw new Error('QR inválido o no pertenece al SAT');
      }

      // 2. Obtener datos completos del SAT
      const datos = await SatService.obtenerDatosCompletos(parametrosQR);
      
      // 3. Enriquecer con datos del QR
      const datosEnriquecidos = {
        ...datos,
        parametrosConsulta: parametrosQR,
        fechaConsulta: new Date().toISOString(),
        urlQR: qrUrl
      };

      setDatosCompletos(datosEnriquecidos);
      return datosEnriquecidos;

    } catch (err) {
      const errorMsg = err.message || 'Error al obtener datos del SAT';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [parseQR]);

  const reset = useCallback(() => {
    setDatosCompletos(null);
    setError('');
    setLoading(false);
  }, []);

  return {
    datosCompletos,
    loading,
    error,
    obtenerDatosCompletos,
    reset
  };
};