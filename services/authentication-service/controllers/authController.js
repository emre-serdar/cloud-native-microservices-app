const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password and log it for debugging
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Plain Password: ", password);
        console.log("Hashed Password: ", hashedPassword);

        user = new User({ username, email, password: hashedPassword });
        console.log("Database: ", user.password )
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Debugging log to check if password is passed correctly
        console.log("Login Input Password: ", password);
        console.log("Stored Hashed Password from DB: ", user.password);

        // Compare plain text password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("Password matched");

        // If password matches, generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token in the response
        res.json({ token });
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).send('Server error');
    }
};



