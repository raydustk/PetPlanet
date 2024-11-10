import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo-link">
        <img src="src/assets/New Project (12).png" alt="Logo" />
      </Link>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar publicaciones..." 
        />
      </div>

      {/* Links */}
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/login" className="navbar-link">Login</Link>
      <Link to="/register" className="navbar-link">Register</Link>
      <Link to="/create-post" className="navbar-link">Create Post</Link>

      {/* Foto de perfil */}
      <Link to="/profile" className="pfp">
        <img src="src/assets/user_2550359 (1).png" alt="foto de perfil" />
      </Link>
    </nav>
  );
};

export default Navbar;
