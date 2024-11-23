const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/userModel'); // Update to use findUserByEmail
const bcrypt = require('bcryptjs');

// Generate a JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Validate user credentials
const validateCredentials = async (email, password) => {
    const user = await findUserByEmail(email); // Adjust to query by email
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
};

module.exports = { generateToken, validateCredentials };
