// src/services/api.js
import axios from 'axios';

// Crea una instancia de axios configurada con la URL base de tu backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto a la URL de tu backend si es diferente
});

// Agregar el token automáticamente en las cabeceras de todas las peticiones
api.interceptors.request.use(
  (config) => {
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');

    // Si existe el token, agregarlo a las cabeceras
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; // Exporta la instancia de axios configurada
