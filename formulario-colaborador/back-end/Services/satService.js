// services/satService.js
import { parseSatHtmlResponse, parseSatHtmlWithRegex, parseSatHtmlSimple } from './satHtmlParser';



/**
 * Servicio para consultar datos completos al SAT
 */
export class SatService {
  static async obtenerDatosCompletos(parametrosQR) {
    try {
      console.log('Iniciando consulta SAT con parámetros:', parametrosQR);
      
      // 1. Primero intentamos con el endpoint principal
       let datos = await this.consultarEndpointPrincipal(parametrosQR);
      
      if (!datos) {
        throw new Error('No se recibió respuesta del SAT');
      }     

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
}