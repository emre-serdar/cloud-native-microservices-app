const express = require('express');
const { generateResponse } = require('../controllers/chatController');

const router = express.Router();

// Route to generate LLM response
router.post('/generate', generateResponse);

module.exports = router;
