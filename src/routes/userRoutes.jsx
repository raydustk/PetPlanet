const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { validateToken } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, (req, res) => {
    res.status(200).json({ message: 'Access granted!' });
});

module.exports = router;
