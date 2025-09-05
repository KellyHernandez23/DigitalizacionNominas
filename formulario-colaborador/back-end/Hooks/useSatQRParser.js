// hooks/useSatQRParser.js
import { useState, useCallback } from 'react';

/**
 * Parsea la URL del QR del SAT y extrae los parámetros
 * @param {string} qrUrl - URL del código QR
 * @returns {Object|null} Objeto con parámetros parseados o null si es inválido
 */
export const parseSatQR = (qrUrl) => {
  if (!qrUrl || typeof qrUrl !== 'string') {
    console.error('URL del QR inválida');
    return null;
  }

  try {
    // Limpiar la URL por si tiene espacios o caracteres extraños
    const cleanedUrl = qrUrl.trim();
    
    // Verificar si es una URL válida del SAT
    if (!cleanedUrl.includes('siat.sat.gob.mx')) {
      console.warn('URL no pertenece al SAT:', cleanedUrl);
      return null;
    }

    // Crear objeto URL (maneja tanto URLs completas como relativas)
    let url;
    try {
      url = new URL(cleanedUrl);
    } catch (e) {
      // Si falla, intentar con base URL
      url = new URL(cleanedUrl, 'https://siat.sat.gob.mx');
    }

    const params = new URLSearchParams(url.search);
    
    // Extraer parámetros principales
    const tipo = params.get('D1');
    const version = params.get('D2');
    const rfcCompleto = params.get('D3');
    const id = params.get('D4');

    // Validar parámetros obligatorios
    if (!tipo || !version || !rfcCompleto) {
      console.error('Parámetros obligatorios faltantes en el QR');
      return null;
    }

    // Parsear RFC y CURP
    const { rfc, curp } = parseRfcCurp(rfcCompleto);

    return {
      tipo: parseInt(tipo, 10),
      version: parseInt(version, 10),
      rfcCompleto: rfcCompleto,
      rfc: rfc,
      id: id,
      urlOriginal: cleanedUrl,
      parametrosAdicionales: getAdditionalParams(params)
    };

  } catch (error) {
    console.error('Error parsing SAT QR URL:', error);
    return null;
  }
};

/**
 * Parsea el campo D3 que puede contener RFC y CURP
 * @param {string} rfcCompleto - Cadena con RFC y posible CURP
 * @returns {Object} Objeto con RFC y CURP separados
 */
const parseRfcCurp = (rfcCompleto) => {
  if (!rfcCompleto) return { rfc: '', curp: '' };

  // El formato típico es: RFC_CURP o solo RFC
  const parts = rfcCompleto.split('_');
  
  if (parts.length === 2) {
    return {
      rfc: parts[1],
      curp: parts[0]
    };
  } else if (parts.length === 1) {
    return {
      rfc: parts[1],
      curp: ''
    };
  } else {
    // Caso con múltiples underscores (inusual)
    return {
      rfc: parts[1],
      curp: parts.slice(1).join('_')
    };
  }
};

/**
 * Extrae parámetros adicionales del QR
 * @param {URLSearchParams} params - Parámetros de la URL
 * @returns {Object} Parámetros adicionales
 */
const getAdditionalParams = (params) => {
  const additional = {};
  
  // Recoger todos los parámetros que no son D1-D4
  for (const [key, value] of params.entries()) {
    if (!key.startsWith('D')) {
      additional[key] = value;
    }
  }

  // También obtener parámetros D5 en adelante
  for (let i = 5; i <= 10; i++) {
    const paramName = `D${i}`;
    const value = params.get(paramName);
    if (value) {
      additional[paramName] = value;
    }
  }

  return additional;
};

/**
 * Valida si un RFC tiene formato válido
 * @param {string} rfc - RFC a validar
 * @returns {boolean} True si el formato es válido
 */
export const isValidRfc = (rfc) => {
  if (!rfc) return false;
  
  // Patrón para RFC de persona física (13 caracteres)
  const patternFisica = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;
  
  // Patrón para RFC de persona moral (12 caracteres)
  const patternMoral = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;
  
  return patternFisica.test(rfc) || patternMoral.test(rfc);
};

/**
 * Obtiene información del tipo de constancia
 * @param {number} tipo - Tipo de constancia (D1)
 * @returns {Object} Información del tipo
 */
export const getTipoConstanciaInfo = (tipo) => {
  const tipos = {
    10: { descripcion: 'Constancia de Situación Fiscal', vigente: true },
    20: { descripcion: 'Constancia de Sellos Digitales', vigente: true },
    30: { descripcion: 'Constancia de Registro de RFC', vigente: true },
    // Agregar más tipos según documentación del SAT
  };

  return tipos[tipo] || { descripcion: 'Tipo desconocido', vigente: false };
};

/**
 * Hook personalizado para usar el parser de QR del SAT
 */
export const useSatQRParser = () => {
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const parseQR = useCallback((qrUrl) => {
    try {
      setError('');
      setIsValid(false);
      
      const result = parseSatQR(qrUrl);
      
      if (!result) {
        setError('URL del QR inválida o no pertenece al SAT');
        setParsedData(null);
        return null;
      }

      // Validar RFC y CURP
      const rfcValido = isValidRfc(result.rfc);

      if (!rfcValido) {
        setError('RFC en el QR no tiene formato válido');
      }

      const tipoInfo = getTipoConstanciaInfo(result.tipo);
      
      const enhancedData = {
        ...result,
        isValidRfc: rfcValido,
        tipoInfo: tipoInfo,
        isValid: rfcValido && tipoInfo.vigente
      };

      setParsedData(enhancedData);
      setIsValid(enhancedData.isValid);
      
      return enhancedData;

    } catch (err) {
      const errorMsg = `Error al procesar QR: ${err.message}`;
      setError(errorMsg);
      setParsedData(null);
      setIsValid(false);
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setParsedData(null);
    setError('');
    setIsValid(false);
  }, []);

  return {
    parsedData,
    error,
    isValid,
    parseQR,
    reset,
    isValidRfc
  };
};

export default useSatQRParser;