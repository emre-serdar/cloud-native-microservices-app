const express = require('express');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../controllers/authController'); // Import your authController

const router = express.Router();

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Register route (Signup)
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

// Protected route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `Welcome to the protected route, your ID: ${req.user}` });
});

module.exports = router;
