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
            { inputs: prompt },
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
