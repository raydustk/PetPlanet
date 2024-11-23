import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios';

const Login = () => {
  const { setUser } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos de login al backend
      const response = await axios.post('/api/login', { username: email, password });
      const { token } = response.data;  // Obtener el token JWT de la respuesta

      // Guardar el token en el localStorage o en el contexto
      localStorage.setItem('token', token);  // Guarda el token en el localStorage

      // Asumiendo que el backend incluye los detalles del usuario en la respuesta, como el nombre
      setUser({ username: email });  // Guardar los detalles del usuario en el contexto (global)

      setError('');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
