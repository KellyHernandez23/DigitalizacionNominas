// services/satHtmlParser.js

/**
 * Parsea el HTML del SAT y extrae todos los datos de la constancia fiscal
 * @param {string} html - HTML response del SAT
 * @returns {Object} Datos estructurados
 */
export const parseSatHtmlResponse = (html) => {
  try {
    console.log('Parseando HTML del SAT...');
    
    // Crear un parser de HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extraer datos de identificación
    const identificacionData = extractIdentificationData(doc);
    
    // Extraer datos de ubicación
    const ubicacionData = extractLocationData(doc);
    
    // Extraer datos fiscales
    const fiscalData = extractFiscalData(doc);
    
    // Combinar todos los datos
    const datosCompletos = {
      ...identificacionData,
      ...ubicacionData,
      ...fiscalData,
      fechaConsulta: new Date().toISOString(),
      fuente: 'SAT'
    };
    
    console.log('Datos extraídos del SAT:', datosCompletos);
    return datosCompletos;
    
  } catch (error) {
    console.error('Error parseando HTML del SAT:', error);
    throw new Error('No se pudieron extraer los datos del HTML del SAT');
  }
};

/**
 * Extrae datos de identificación personal
 */
const extractIdentificationData = (doc) => {
  const data = {};
  
  // Buscar la tabla de datos de identificación
  const identificationTables = doc.querySelectorAll('ul[data-role="listview"]');
  
  for (const table of identificationTables) {
    const header = table.querySelector('li[data-role="list-divider]');
    if (header && header.textContent.includes('Datos de Identificación')) {
      const rows = table.querySelectorAll('tr[role="row"]');
      
      for (const row of rows) {
        const cells = row.querySelectorAll('td[role="gridcell"]');
        if (cells.length >= 2) {
          const label = cells[0].textContent.trim();
          const value = cells[1].textContent.trim();
          
          // Mapear las etiquetas a nombres de campo consistentes
          switch (label) {
            case 'CURP:':
              data.curp = value;
              break;
            case 'Nombre:':
              data.nombre = value;
              break;
            case 'Apellido Paterno:':
              data.apellidoPaterno = value;
              break;
            case 'Apellido Materno:':
              data.apellidoMaterno = value;
              break;
            case 'Fecha Nacimiento:':
              data.fechaNacimiento = value;
              break;
            case 'Fecha de Inicio de operaciones:':
              data.fechaInicioOperaciones = value;
              break;
            case 'Situación del contribuyente:':
              data.situacionContribuyente = value;
              break;
            case 'Fecha del último cambio de situación:':
              data.fechaUltimoCambio = value;
              break;
          }
        }
      }
      break;
    }
  }
  
  return data;
};

/**
 * Extrae datos de ubicación
 */
const extractLocationData = (doc) => {
  const data = {};
  data.domicilio = {};
  
  const locationTables = doc.querySelectorAll('ul[data-role="listview"]');
  
  for (const table of locationTables) {
    const header = table.querySelector('li[data-role="list-divider]');
    if (header && header.textContent.includes('Datos de Ubicación')) {
      const rows = table.querySelectorAll('tr[role="row"]');
      
      for (const row of rows) {
        const cells = row.querySelectorAll('td[role="gridcell"]');
        if (cells.length >= 2) {
          const label = cells[0].textContent.trim();
          const value = cells[1].textContent.trim();
          
          switch (label) {
            case 'Entidad Federativa:':
              data.domicilio.entidadFederativa = value;
              break;
            case 'Municipio o delegación:':
              data.domicilio.municipio = value;
              break;
            case 'Colonia:':
              data.domicilio.colonia = value;
              break;
            case 'Tipo de vialidad:':
              data.domicilio.tipoVialidad = value;
              break;
            case 'Nombre de la vialidad:':
              data.domicilio.nombreVialidad = value;
              break;
            case 'Número exterior:':
              data.domicilio.numeroExterior = value;
              break;
            case 'Número interior:':
              data.domicilio.numeroInterior = value;
              break;
            case 'CP:':
              data.domicilio.codigoPostal = value;
              break;
            case 'Correo electrónico:':
              data.email = value;
              break;
            case 'AL:':
              data.administracionLocal = value;
              break;
          }
        }
      }
      break;
    }
  }
  
  return data;
};

/**
 * Extrae datos fiscales
 */
const extractFiscalData = (doc) => {
  const data = {};
  
  const fiscalTables = doc.querySelectorAll('ul[data-role="listview"]');
  
  for (const table of fiscalTables) {
    const header = table.querySelector('li[data-role="list-divider]');
    if (header && header.textContent.includes('Características fiscales')) {
      const rows = table.querySelectorAll('tr[role="row"]');
      
      for (const row of rows) {
        const cells = row.querySelectorAll('td[role="gridcell"]');
        if (cells.length >= 2) {
          const label = cells[0].textContent.trim();
          const value = cells[1].textContent.trim();
          
          switch (label) {
            case 'Régimen:':
              data.regimenFiscal = value;
              break;
            case 'Fecha de alta:':
              data.fechaAltaRegimen = value;
              break;
          }
        }
      }
      break;
    }
  }
  
  return data;
};

/**
 * Extrae el RFC del HTML
 */
export const extractRfcFromHtml = (html) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Buscar el texto que contiene el RFC
    const rfcText = doc.querySelector('ul[data-role="listview"] li')?.textContent;
    if (rfcText && rfcText.includes('RFC:')) {
      const match = rfcText.match(/RFC:\s*([A-Z0-9]+)/i);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extrayendo RFC del HTML:', error);
    return null;
  }
};

/**
 * Función alternativa usando expresiones regulares directas
 */
export const parseSatHtmlWithRegex = (html) => {
  const patterns = {
    rfc: /RFC:\s*([A-Z0-9]+)/i,
    curp: /CURP:.*?<td[^>]*>([^<]+)/is,
    nombre: /Nombre:.*?<td[^>]*>([^<]+)/is,
    apellidoPaterno: /Apellido Paterno:.*?<td[^>]*>([^<]+)/is,
    apellidoMaterno: /Apellido Materno:.*?<td[^>]*>([^<]+)/is,
    fechaNacimiento: /Fecha Nacimiento:.*?<td[^>]*>([^<]+)/is,
    fechaInicioOperaciones: /Fecha de Inicio de operaciones:.*?<td[^>]*>([^<]+)/is,
    situacionContribuyente: /Situación del contribuyente:.*?<td[^>]*>([^<]+)/is,
    entidadFederativa: /Entidad Federativa:.*?<td[^>]*>([^<]+)/is,
    municipio: /Municipio o delegación:.*?<td[^>]*>([^<]+)/is,
    colonia: /Colonia:.*?<td[^>]*>([^<]+)/is,
    nombreVialidad: /Nombre de la vialidad:.*?<td[^>]*>([^<]+)/is,
    numeroExterior: /Número exterior:.*?<td[^>]*>([^<]+)/is,
    numeroInterior: /Número interior:.*?<td[^>]*>([^<]+)/is,
    codigoPostal: /CP:.*?<td[^>]*>([^<]+)/is,
    regimenFiscal: /Régimen:.*?<td[^>]*>([^<]+)/is,
    fechaAltaRegimen: /Fecha de alta:.*?<td[^>]*>([^<]+)/is
  };

  const datos = {};
  
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = html.match(pattern);
    if (match && match[1]) {
      datos[key] = match[1].trim();
    }
  }
  
  return datos;
};