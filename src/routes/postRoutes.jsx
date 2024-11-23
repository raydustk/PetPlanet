const express = require('express');
const router = express.Router();
const { createPost } = require('../controllers/postController');
const { validateToken } = require('../middlewares/authMiddleware');

// Ruta para crear una publicación de producto (con verificación de token)
router.post('/createPost', validateToken, createPost);

module.exports = router;
