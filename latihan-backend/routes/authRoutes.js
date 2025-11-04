const express = require('express');
const router = express.Router();
const { register, login, getUsers } = require('../controllers/authController');

// Tidak ada authMiddleware di sini!
router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);

module.exports = router;
