require('dotenv').config();
const axios = require('axios');

// Hugging Face API key and endpoint
const API_KEY = process.env.HUGGING_FACE_API_KEY;
const endpoint = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct";

// Function to send requests to Hugging Face API
exports.sendToLLMApi = async (prompt) => {
    try {
        const response = await axios.post(
            endpoint,
            {
                inputs: prompt,
                parameters: {
                    max_new_tokens: 300, // Limit response length
                    temperature: 0.7,  // Control randomness
                    top_p: 0.9,        // Choose high-probability words
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error communicating with LLM API:", error.response?.data || error.message);
        throw new Error("Failed to communicate with LLM API");
    }
};

