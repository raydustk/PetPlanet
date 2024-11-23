import React, { useState } from 'react';
import axios from 'axios';

const CreateProductPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const userToken = localStorage.getItem('userToken'); 

      if (!userToken) {
        setError('Debes estar logueado para crear una publicación.');
        return;
      }

      const response = await axios.post('/posts/createPost', 
        { title, description, price },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      alert('Publicación de producto creada con éxito!');

      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      setError('Error al crear la publicación del producto.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Publicación de Producto</h2>
      <input
        type="text"
        placeholder="Título del Producto"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción del Producto"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio del Producto"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Crear Publicación</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateProductPost;
