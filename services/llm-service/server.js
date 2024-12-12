const express = require('express');
const cors = require('cors');
const chatRoutes = require('./src/routes/chatRoutes'); // Correct path to routes

const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Mount the chat routes
app.use('/api/llm', chatRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
