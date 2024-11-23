import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios'; // Para hacer la solicitud a la API

const Profile = () => {
  const { user, setUser } = useContext(GlobalContext);  // Obtienes el usuario desde el contexto global
  const [loading, setLoading] = useState(true);  // Para mostrar un mensaje de carga
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          // Si no hay usuario en el contexto, se hace la solicitud al backend
          const response = await axios.get('/profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,  // Suponiendo que el token está en el localStorage
            },
          });

          // Si obtienes los datos, actualizas el contexto global
          setUser(response.data);
        }
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, setUser]);  // Solo vuelve a ejecutarse si el `user` cambia

  if (loading) {
    return <p>Loading...</p>;  // Mientras se obtiene la información
  }

  if (error) {
    return <p>{error}</p>;  // Si ocurre un error
  }

  if (!user) {
    return <p>Please log in or register to view your profile.</p>;  // Si no hay usuario
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>City:</strong> {user.city || 'Not specified'}</p>
      <p><strong>Birthday:</strong> {user.birthday || 'Not specified'}</p>
    </div>
  );
};

export default Profile;
