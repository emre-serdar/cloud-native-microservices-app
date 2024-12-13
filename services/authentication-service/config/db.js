const mongoose = require('mongoose');

const connectDB = async () => {
    // Check if the environment is not 'test', then connect
    if (process.env.NODE_ENV !== 'test') {
        try {
            // Connect to the MongoDB URI from the environment variables
            const conn = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB connected: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
