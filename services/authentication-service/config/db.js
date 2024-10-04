const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to the MongoDB URI from .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Stop the app if connection fails
    }
};

module.exports = connectDB;
