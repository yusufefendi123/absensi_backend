const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController'); // ✅ tambahkan logout

// route
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout); // ✅ sekarang sudah dikenali

module.exports = router;
