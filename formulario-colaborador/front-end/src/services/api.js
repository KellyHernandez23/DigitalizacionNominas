// 🔥 Obtener la URL base desde las variables de entorno
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

// 🔥 Opcional: Mostrar info en consola para debug
if (import.meta.env.DEV) {
  console.log('Modo:', import.meta.env.MODE);
  console.log('API Base:', API_BASE);
  console.log('Entorno:', import.meta.env.VITE_APP_ENV);
}

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
    console.log('Solicitando URL:', url); // Para debugs

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Servicios para PHP
export const EmpleadosService = {
  getByRFC: (rfc) => apiRequest('empleados.php', {
    method: 'POST',
    body: JSON.stringify({ rfc })
  }),
  
  getAll: () => apiRequest('empleados.php?action=getAll', {
    method: 'GET'
  })
};

export const ProspectosService = {
  create: (data) => apiRequest('prospectos.php', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  delete: (id) => apiRequest('prospectos.php', {
    method: 'POST',
    body: JSON.stringify({ id_prospecto: id, _method: 'DELETE' })
  }),
  
   addContacto: (data) => apiRequest('prospectos-contactos.php', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export const FirmasService = {
   upload: (data) => apiRequest('firmas.php', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest('firmas.php', {
    method: 'POST',
    body: JSON.stringify({ id_prospecto: id, _method: 'DELETE' })
  })
};

export const ContactosEmergenciaService = {
  create: (data) => apiRequest('contactos_emergencia.php', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest('contactos_emergencia.php', {
    method: 'POST',
    body: JSON.stringify({ id_contacto_emergencia: id, _method: 'DELETE' })
  })
};



