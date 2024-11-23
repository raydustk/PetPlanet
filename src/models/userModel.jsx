const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// Create a new user
const createUser = async (email, username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id',
        [email, username, hashedPassword]
    );
    return result.rows[0].id;
};

// Find a user by username
const findUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
};

// Find a user by email
const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

module.exports = { createUser, findUserByUsername, findUserByEmail };
