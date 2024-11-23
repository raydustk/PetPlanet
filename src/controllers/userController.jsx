const { createUser, findUserByUsername } = require('../models/userModel');
const { generateToken, validateCredentials } = require('../services/authService');


const registerUser = async (req, res, next) => {
    try {
        const { email, username, password, fullName, city, birthday } = req.body;

        // Verificar si ya existe el usuario
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            const error = new Error('El nombre de usuario ya está en uso');
            error.statusCode = 400;
            throw error;
        }

        // Crear el usuario
        const userId = await createUser(email, username, password, fullName, city, birthday);
        res.status(201).json({ id: userId });
    } catch (err) {
        next(err);
    }
};


const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await validateCredentials(username, password);
        const token = generateToken(user.id);

        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};



module.exports = { registerUser, loginUser };
