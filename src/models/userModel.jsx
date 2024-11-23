const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
        [username, hashedPassword]
    );
    return result.rows[0].id;
};

// Buscar un usuario por nombre de usuario
const findUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
};

module.exports = { createUser, findUserByUsername };
