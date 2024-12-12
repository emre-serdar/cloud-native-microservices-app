const bcrypt = require('bcryptjs'); // Bcrypt is used for hashing passwords
const jwt = require('jsonwebtoken'); // JWT is used for creating JSON web tokens
const User = require('../models/user'); // Import the User model for MongoDB interactions

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate the input fields
        if (!username || !email || !password) {
            console.log('Registration failed: Missing required fields'); // Log the failure reason
            return res.status(400).json({ message: 'All fields are required' }); // Return error response
        }

        // Check if the email already exists in the database
        let user = await User.findOne({ email });
        if (user) {
            console.log(`Registration failed: Email ${email} already exists`); // Log the failure reason
            return res.status(400).json({ message: 'User already exists' }); // Return error response
        }

        // Hash the password using bcrypt for security
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Plain Password: ", password); // Log the plain password (for debugging)
        console.log("Hashed Password: ", hashedPassword); // Log the hashed password

        // Create and save the new user in the database
        user = new User({ username, email, password: hashedPassword });
        console.log("Database: ", user.password); // Log the hashed password stored in the DB
        await user.save();

        console.log(`User ${email} created successfully`); // Log the successful creation
        res.status(201).json({ message: 'User created successfully' }); // Send success response
    } catch (error) {
        console.error('Error during registration:', error.message); // Log server error if any
        res.status(500).json({ message: 'Server error' }); // Send server error response
    }
};

// Login an existing user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate the input fields
        if (!email || !password) {
            console.log('Login failed: Missing required fields'); // Log the failure reason
            return res.status(400).json({ message: 'All fields are required' }); // Return error response
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`Login failed: User with email ${email} not found`); // Log failure
            return res.status(400).json({ message: 'Invalid credentials' }); // Return error response
        }

        // Log the input and stored passwords for debugging
        console.log("Login Input Password: ", password); // Log the provided password
        console.log("Stored Hashed Password from DB: ", user.password); // Log the stored hashed password

        // Compare the plain password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch"); // Log password mismatch
            return res.status(400).json({ message: 'Invalid credentials' }); // Return error response
        }

        console.log("Password matched"); // Log if passwords match

        // If password matches, generate JWT token for user authentication
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log(`Login successful for user ${email}`); // Log successful login

        // Send the token in the response for the client to use
        res.status(200).json({ token });
    } catch (error) {
        console.error('Server error during login:', error.message); // Log any server errors
        res.status(500).send('Server error'); // Send a server error response
    }
};