import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
            <Link to="/">
        <img src="src/assets/New Project (12).png" style={{ height: '40px'}}/>
      </Link>
      <Link to="/" style={{}}>Home </Link>
      <Link to="/login">Login </Link>
      <Link to="/register">Register </Link>
      <Link to="/profile">Profile </Link>
      <Link to="/create-post">Create Post</Link>
    </nav>
  );
};

export default Navbar;
