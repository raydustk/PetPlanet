const pool = require('../config/database');

// Crear una nueva publicación
const createPost = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const userId = req.user.id; // Obtener el id del usuario autenticado desde el token

    if (!title || !description || !price) {
      const error = new Error('Todos los campos son obligatorios.');
      error.statusCode = 400;
      throw error;
    }

    const result = await pool.query(
      'INSERT INTO posts (user_id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING id',
      [userId, title, description, price]
    );

    res.status(201).json({ message: 'Post created successfully', postId: result.rows[0].id });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost };
