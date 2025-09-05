// services/satService.js
import {parseSatHtmlWithRegex, parseSatHtmlResponse} from './satHtmlParser';


/**
 * Servicio para consultar datos completos al SAT
 */
export class SatService {
  static async obtenerDatosCompletos(parametrosQR) {
    try {
      console.log('Iniciando consulta SAT con parámetros:', parametrosQR);
      
      // 1. Primero intentamos con el endpoint principal
      let datos = await this.consultarEndpointPrincipal(parametrosQR);
      
      // 2. Si falla, intentamos con endpoints alternativos
    //   if (!datos || !datos.rfc) {
    //     console.log('Endpoint principal falló, intentando alternativos...');
    //     datos = await this.consultarEndpointsAlternativos(parametrosQR);
    //   }
      
      return datos;
      
    } catch (error) {
      console.error('Error en servicio SAT:', error);
      throw new Error('No se pudieron obtener los datos del SAT');
    }
  }

  /**
   * Consulta al endpoint principal del SAT
   */
  static async consultarEndpointPrincipal(parametros) {
    try {
      console.log('Consultando endpoint principal...');
      
      // El SAT suele requerir una solicitud POST con form data
      const formData = new URLSearchParams();
      formData.append('D1', parametros.tipo);
      formData.append('D2', parametros.version);
      formData.append('D3', parametros.rfcCompleto);

      const response = await fetch(
    `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=${parametros.tipo}&D2=${parametros.version}&D3=${parametros.rfcCompleto}`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml',
        },
        credentials: 'omit'
    }
);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      const responseData = await response.text();
      
      console.log('Respuesta del endpoint principal:', {
        status: response.status,
        contentType: contentType,
        length: responseData.length
      });

      if (contentType?.includes('application/json')) {
        try {
          return JSON.parse(responseData);
        } catch (e) {
          console.warn('No se pudo parsear como JSON, intentando HTML...');
          return this.parseHtmlResponse(responseData);
        }
      } else if (contentType?.includes('text/html')) {
        return parseSatHtmlResponse(responseData);
      } else {
        console.warn('Formato de respuesta no reconocido:', contentType);
        return this.parseHtmlResponse(responseData); // Intentar de todos modos
      }
      
    } catch (error) {
      console.warn('Error en endpoint principal:', error.message);
      return null;
    }
  }

  /**
   * Consulta a endpoints alternativos del SAT
   */
  static async consultarEndpointsAlternativos(parametros) {
    try {
      console.log('Intentando endpoints alternativos...');
      
      // Lista de endpoints alternativos que podrían funcionar
      const endpoints = [
        'https://siat.sat.gob.mx/app/qr/consultaQR',
        'https://siat.sat.gob.mx/PTSC/consultaQR',
        'https://siat.sat.gob.mx/app/qr/'
      ];

      for (const endpoint of endpoints) {
        try {
          console.log(`Probando endpoint: ${endpoint}`);
          
          const formData = new URLSearchParams();
          formData.append('D1', parametros.tipo);
          formData.append('D2', parametros.version);
          formData.append('D3', parametros.rfcCompleto);

          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json, text/html'
            },
            mode: 'cors',
            credentials: 'omit'
          });

          if (response.ok) {
            const data = await response.text();
            console.log(`Endpoint ${endpoint} respondió OK`);
            
            // Intentar parsear la respuesta
            const parsedData = response.headers.get('content-type')?.includes('application/json') 
              ? JSON.parse(data) 
              : this.parseHtmlResponse(data);
              
            if (parsedData && parsedData.rfc) {
              return parsedData;
            }
          }
        } catch (endpointError) {
          console.warn(`Error en endpoint ${endpoint}:`, endpointError.message);
          continue; // Continuar con el siguiente endpoint
        }
      }
      
      return null; // Ningún endpoint alternativo funcionó
      
    } catch (error) {
      console.warn('Error en endpoints alternativos:', error.message);
      return null;
    }
  }

  /**
   * Generar datos mock para desarrollo
   */
  static generarDatosMock(parametros) {
    console.log('Generando datos mock...');
    
    // Extraer información del RFC y CURP para generar datos realistas
    const [rfc, curp] = parametros.rfcCompleto.split('_');
    
    // Datos de ejemplo basados en el RFC/CURP
    return {
      rfc: rfc,
      curp: curp || this.generarCurpFromRfc(rfc),
      nombre: this.generarNombreFromRfc(rfc),
      apellidoPaterno: this.extraerApellidoFromRfc(rfc),
      apellidoMaterno: this.generarApellidoMaterno(rfc),
      fechaNacimiento: this.extraerFechaNacimientoFromRfc(rfc),
      domicilio: 'AV. PRINCIPAL #123, COL. CENTRO',
      ciudad: 'CIUDAD DE MÉXICO',
      estado: 'CIUDAD DE MÉXICO',
      municipio: 'BENITO JUÁREZ',
      colonia: 'CENTRO',
      codigoPostal: '01000',
      regimenFiscal: 'Régimen General de Ley Personas Morales',
      fechaInicioOperaciones: '2020-01-15',
      situacionFiscal: 'VIGENTE',
      esMock: true,
      fechaConsulta: new Date().toISOString()
    };
  }

  // Helpers para generar datos mock realistas
  static generarNombreFromRfc(rfc) {
    if (!rfc) return 'JUAN PEREZ LOPEZ';
    
    // Usar las primeras letras del RFC para generar nombre
    const nombres = {
      'HEH': 'HECTOR HERNANDEZ',
      'HEC': 'HECTOR CERVANTES', 
      'MAP': 'MARIA ANTONIA PEREZ',
      'JAG': 'JOSE ANTONIO GARCIA',
      'AAB': 'ANA ALICIA BERNAL',
      'RRO': 'ROBERTO RODRIGUEZ'
    };
    
    const prefijo = rfc.substring(0, 3);
    return nombres[prefijo] || 'JUAN PEREZ LOPEZ';
  }

  static extraerApellidoFromRfc(rfc) {
    return rfc.substring(0, 3); // Primeras 3 letras del RFC
  }

  static generarApellidoMaterno(rfc) {
    const apellidos = ['LOPEZ', 'GARCIA', 'MARTINEZ', 'RODRIGUEZ', 'HERNANDEZ'];
    return apellidos[Math.floor(Math.random() * apellidos.length)];
  }

  static extraerFechaNacimientoFromRfc(rfc) {
    // Los dígitos 4-9 del RFC de persona física son la fecha (AAMMDD)
    if (rfc.length >= 10 && /^[A-Z]/.test(rfc)) {
      try {
        const fechaStr = rfc.substring(4, 10);
        if (/^\d{6}$/.test(fechaStr)) {
          const anio = '19' + fechaStr.substring(0, 2);
          const mes = fechaStr.substring(2, 4);
          const dia = fechaStr.substring(4, 6);
          return `${dia}/${mes}/${anio}`;
        }
      } catch (e) {
        console.warn('Error extrayendo fecha del RFC:', e);
      }
    }
    return '15/08/1985';
  }

  static generarCurpFromRfc(rfc) {
    if (rfc && rfc.length >= 10) {
      return rfc.substring(0, 10) + 'ABCDEF01';
    }
    return 'MOCKCURP123456789';
  }
}

// Función de conveniencia para uso directo
export const obtenerDatosSat = async (qrUrl) => {
  try {
    // Primero parsear el QR
    const { parseSatQR } = await import('../../back-end/Hooks/useSatQRParser');
    const parametros = parseSatQR(qrUrl);
    
    if (!parametros) {
      throw new Error('QR inválido');
    }
    
    return await SatService.obtenerDatosCompletos(parametros);
  } catch (error) {
    console.error('Error en obtenerDatosSat:', error);
    throw error;
  }
};