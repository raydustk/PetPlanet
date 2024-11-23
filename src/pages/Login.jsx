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
      const response = await axios.post('/login', { username: email, password });
      const { token } = response.data;

      // Assuming your backend includes user details in the response:
      const userResponse = await axios.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(userResponse.data);
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
