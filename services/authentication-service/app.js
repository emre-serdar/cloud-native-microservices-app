const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

module.exports = app;
