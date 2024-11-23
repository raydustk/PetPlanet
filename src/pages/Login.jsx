import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';

const Login = () => {
  const { setUser } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To show error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Save the token to localStorage for future use
      localStorage.setItem('token', response.data.token);

      // Set the user in the global context with response data (e.g., user info)
      setUser(response.data.user);

      // Clear the error message (if any)
      setError('');
      
      // Optionally redirect to a different page after login (e.g., dashboard)
      window.location.href = '/dashboard'; // Replace '/dashboard' with the correct route
      alert('Login successful!');
    } catch (err) {
      // Handle errors (e.g., invalid credentials or server error)
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
