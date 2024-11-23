const jwt = require('jsonwebtoken');

// Middleware para validar el token de JWT
const validateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Obtener el token de las cabeceras

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided.' });
  }

  try {
    // Verificar el token con la clave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Almacenamos la información del usuario verificado en req.user
    next();  // Continuar con la siguiente función del controlador
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = { validateToken };
