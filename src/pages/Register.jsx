import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setUser } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    birthday: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simular registro y actualizar contexto global
    setUser({
      fullName: formData.fullName,
      email: formData.email,
      city: formData.city,
      birthday: formData.birthday,
    });

    // Redirigir a la página de perfil
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Your Account</h2>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        type="date"
        name="birthday"
        value={formData.birthday}
        onChange={handleChange}
        placeholder="Birthday"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
