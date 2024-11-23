const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const createUser = async (email, username, password, fullName, city, birthday) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `INSERT INTO users (email, username, password, full_name, city, birthday) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [email, username, hashedPassword, fullName, city, birthday]
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
