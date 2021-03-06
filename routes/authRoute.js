const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protectedRoute = require('../middlewares/protectedRoute');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protectedRoute, authController.me);
router.post('/logout', protectedRoute, authController.logout);

module.exports = router;