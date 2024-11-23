import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';  // Importamos el contexto para obtener el usuario

const Navbar = () => {
  const { user, setUser } = useContext(GlobalContext);  // Accedemos al usuario desde el contexto

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    setUser(null); // Limpiar el contexto del usuario
  };

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
      
      {/* Si el usuario está autenticado, mostramos opciones de perfil y logout */}
      {user ? (
        <>
          <Link to="/profile" className="navbar-link">Profile</Link>
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/register" className="navbar-link">Register</Link>
        </>
      )}

      {/* Foto de perfil */}
      {user && (
        <Link to="/profile" className="pfp">
          <img src="src/assets/user_2550359 (1).png" alt="foto de perfil" />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
