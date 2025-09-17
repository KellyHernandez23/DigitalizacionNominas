export const parseSatHtmlResponse = (html) => {
  try {
    console.log('Parseando HTML del SAT...');
    
    // Crear un parser de HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extraer el RFC primero
    const rfc = extractRfc(doc);
    
    // Extraer todos los datos
    const datos = {
      rfc: rfc,
      ...extractDatosIdentificacion(doc),
      ...extractDatosUbicacion(doc),
      ...extractDatosFiscales(doc)
    };
    
    console.log('Datos extraídos del SAT:', datos);
    return datos;
    
  } catch (error) {
    console.error('Error parseando HTML del SAT:', error);
    // Fallback a regex parsing
    return parseSatHtmlWithRegex(html);
  }
};

/**
 * Extrae el RFC del documento
 */
const extractRfc = (doc) => {
  // Buscar el texto que contiene el RFC
  const listItems = doc.querySelectorAll('ul[data-role="listview"] li');
  for (const item of listItems) {
    const text = item.textContent;
    if (text.includes('RFC:')) {
      const match = text.match(/RFC:\s*([A-Z0-9]+)/i);
      if (match && match[1]) {
        return match[1];
      }
    }
  }
  return null;
};

/**
 * Extrae datos de identificación
 */
const extractDatosIdentificacion = (doc) => {
  const data = {};
  
  // Encontrar la sección de identificación
  const sections = doc.querySelectorAll('ul[data-role="listview"]');
  for (const section of sections) {
    const header = section.querySelector('li[data-role="list-divider"]');
    if (header && header.textContent.includes('Datos de Identificación')) {
      
      // Extraer datos de las tablas internas
      const tables = section.querySelectorAll('table.ui-panelgrid');
      for (const table of tables) {
        const rows = table.querySelectorAll('tr[role="row"]');
        for (const row of rows) {
          const cells = row.querySelectorAll('td[role="gridcell"]');
          if (cells.length >= 2) {
            const labelElement = cells[0].querySelector('span[style*="font-weight: bold"]');
            if (labelElement) {
              const label = labelElement.textContent.replace(':', '').trim();
              const value = cells[1].textContent.trim();
              
              // Mapear etiquetas a campos
              switch (label) {
                case 'CURP':
                  data.curp = value;
                  break;
                case 'Nombre':
                  data.nombre = value;
                  break;
                case 'Apellido Paterno':
                  data.apellidoPaterno = value;
                  break;
                case 'Apellido Materno':
                  data.apellidoMaterno = value;
                  break;
                case 'Fecha Nacimiento':
                  data.fechaNacimiento = value;
                  break;
                case 'Fecha de Inicio de operaciones':
                  data.fechaInicioOperaciones = value;
                  break;
                case 'Situación del contribuyente':
                  data.situacionContribuyente = value;
                  break;
                case 'Fecha del último cambio de situación':
                  data.fechaUltimoCambio = value;
                  break;
              }
            }
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
const extractDatosUbicacion = (doc) => {
  const data = { domicilio: {} };
  
  const sections = doc.querySelectorAll('ul[data-role="listview"]');
  for (const section of sections) {
    const header = section.querySelector('li[data-role="list-divider"]');
    if (header && header.textContent.includes('Datos de Ubicación')) {
      
      const tables = section.querySelectorAll('table.ui-panelgrid');
      for (const table of tables) {
        const rows = table.querySelectorAll('tr[role="row"]');
        for (const row of rows) {
          const cells = row.querySelectorAll('td[role="gridcell"]');
          if (cells.length >= 2) {
            const labelElement = cells[0].querySelector('span[style*="font-weight: bold"]');
            if (labelElement) {
              const label = labelElement.textContent.replace(':', '').trim();
              const value = cells[1].textContent.trim();
              
              switch (label) {
                case 'Entidad Federativa':
                  data.domicilio.entidadFederativa = value;
                  break;
                case 'Municipio o delegación':
                  data.domicilio.municipio = value;
                  break;
                case 'Colonia':
                  data.domicilio.colonia = value;
                  break;
                case 'Tipo de vialidad':
                  data.domicilio.tipoVialidad = value;
                  break;
                case 'Nombre de la vialidad':
                  data.domicilio.nombreVialidad = value;
                  break;
                case 'Número exterior':
                  data.domicilio.numeroExterior = value;
                  break;
                case 'Número interior':
                  data.domicilio.numeroInterior = value;
                  break;
                case 'CP':
                  data.domicilio.codigoPostal = value;
                  break;
                case 'Correo electrónico':
                  data.email = value;
                  break;
                case 'AL':
                  data.administracionLocal = value;
                  break;
              }
            }
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
const extractDatosFiscales = (doc) => {
  const data = {};
  
  const sections = doc.querySelectorAll('ul[data-role="listview"]');
  for (const section of sections) {
    const header = section.querySelector('li[data-role="list-divider"]');
    if (header && header.textContent.includes('Características fiscales')) {
      
      const tables = section.querySelectorAll('table.ui-panelgrid');
      for (const table of tables) {
        const rows = table.querySelectorAll('tr[role="row"]');
        for (const row of rows) {
          const cells = row.querySelectorAll('td[role="gridcell"]');
          if (cells.length >= 2) {
            const labelElement = cells[0].querySelector('span[style*="font-weight: bold"]');
            if (labelElement) {
              const label = labelElement.textContent.replace(':', '').trim();
              const value = cells[1].textContent.trim();
              
              switch (label) {
                case 'Régimen':
                  data.regimenFiscal = value;
                  break;
                case 'Fecha de alta':
                  data.fechaAltaRegimen = value;
                  break;
              }
            }
          }
        }
      }
      break;
    }
  }
  
  return data;
};

/**
 * Función alternativa usando expresiones regulares - MÁS CONFIABLE
 */
export const parseSatHtmlWithRegex = (html) => {
  console.log('Usando parsing por regex...');
  
  const patterns = {
    rfc: /RFC:\s*([A-Z0-9]{10,13})/i,
    curp: /CURP:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    nombre: /Nombre:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    apellidoPaterno: /Apellido Paterno:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    apellidoMaterno: /Apellido Materno:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    fechaNacimiento: /Fecha Nacimiento:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    fechaInicioOperaciones: /Fecha de Inicio de operaciones:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    situacionContribuyente: /Situación del contribuyente:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    entidadFederativa: /Entidad Federativa:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    municipio: /Municipio o delegación:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    colonia: /Colonia:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    tipoVialidad: /Tipo de vialidad:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    nombreVialidad: /Nombre de la vialidad:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    numeroExterior: /Número exterior:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    numeroInterior: /Número interior:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    codigoPostal: /CP:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    email: /Correo electrónico:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    administracionLocal: /AL:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    regimenFiscal: /Régimen:.*?<td[^>]*style=[^>]*>([^<]+)/is,
    fechaAltaRegimen: /Fecha de alta:.*?<td[^>]*style=[^>]*>([^<]+)/is
  };

  const datos = {};
  
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = html.match(pattern);
    if (match && match[1]) {
      datos[key] = match[1].trim();
      
      // Limpiar valores vacíos
      if (datos[key] === '' || datos[key] === ' ') {
        datos[key] = null;
      }
    }
  }
  
  // Estructurar datos de domicilio
  if (datos.entidadFederativa || datos.municipio || datos.colonia) {
    datos.domicilio = {
      entidadFederativa: datos.entidadFederativa,
      municipio: datos.municipio,
      colonia: datos.colonia,
      tipoVialidad: datos.tipoVialidad,
      nombreVialidad: datos.nombreVialidad,
      numeroExterior: datos.numeroExterior,
      numeroInterior: datos.numeroInterior,
      codigoPostal: datos.codigoPostal
    };
    
    // Eliminar duplicados
    delete datos.entidadFederativa;
    delete datos.municipio;
    delete datos.colonia;
    delete datos.tipoVialidad;
    delete datos.nombreVialidad;
    delete datos.numeroExterior;
    delete datos.numeroInterior;
    delete datos.codigoPostal;
  }
  
  return datos;
};

/**
 * Versión simplificada para extraer solo datos básicos
 */
export const parseSatHtmlSimple = (html) => {
  const datos = {};
  
  // Extraer usando una estrategia más simple
  const regex = /<span style="font-weight: bold;">([^<]+):<\/span><\/td><td[^>]*style="[^"]*text-align:left;[^"]*">([^<]+)/g;
  
  let match;
  while ((match = regex.exec(html)) !== null) {
    const label = match[1].trim();
    const value = match[2].trim();
    
    // Mapear etiquetas a campos
    const fieldMap = {
      'CURP': 'curp',
      'Nombre': 'nombre',
      'Apellido Paterno': 'apellidoPaterno',
      'Apellido Materno': 'apellidoMaterno',
      'Fecha Nacimiento': 'fechaNacimiento',
      'Fecha de Inicio de operaciones': 'fechaInicioOperaciones',
      'Situación del contribuyente': 'situacionContribuyente',
      'Entidad Federativa': 'entidadFederativa',
      'Municipio o delegación': 'municipio',
      'Colonia': 'colonia',
      'Tipo de vialidad': 'tipoVialidad',
      'Nombre de la vialidad': 'nombreVialidad',
      'Número exterior': 'numeroExterior',
      'Número interior': 'numeroInterior',
      'CP': 'codigoPostal',
      'Correo electrónico': 'email',
      'AL': 'administracionLocal',
      'Régimen': 'regimenFiscal',
      'Fecha de alta': 'fechaAltaRegimen'
    };
    
    if (fieldMap[label] && value && value !== '') {
      datos[fieldMap[label]] = value;
    }
  }
  
  return datos;
};