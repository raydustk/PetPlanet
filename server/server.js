const express = require('express');
const dotenv = require('dotenv');
const { createUser, findUserByUsername } = require('./models/User');
const { createPost } = require('./models/Post');  // Suponiendo que tienes un modelo para publicaciones
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
app.use(cors());  // Permite todas las solicitudes desde cualquier origen

const cors = require('cors');

// Configuración CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:5175',  // Asegúrate de que la URL de tu frontend esté aquí
  methods: 'GET, POST, PUT, DELETE', // Métodos que permite
  allowedHeaders: 'Content-Type, Authorization' // Encabezados permitidos
}));


dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET; // Cargar la clave secreta desde el archivo .env

app.use(express.json());

// Middleware para proteger las rutas que requieren autenticación
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Obtiene el token desde el header 'Authorization'

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Verifica si el token es válido
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }

    req.user = user; // Añadir información del usuario al objeto de solicitud (req)
    next(); // Continuar al siguiente middleware o ruta
  });
};

// Ruta de registro
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const userId = await createUser(username, hashedPassword);

    // Generar un token
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });

    // Responder con el mensaje de éxito y el token
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Ruta de inicio de sesión
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario por nombre de usuario
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Comparar la contraseña proporcionada con la contraseña hasheada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generar un token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Responder con el token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Ruta protegida para crear publicaciones (requiere autenticación)
app.post('/api/posts/createPost', authenticateToken, async (req, res) => {
  const { title, description, price } = req.body;

  try {
    // Crear una publicación asociada al usuario autenticado
    const postId = await createPost(req.user.id, title, description, price);

    res.status(201).json({
      message: 'Post created successfully',
      post: { title, description, price },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong while creating the post' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
