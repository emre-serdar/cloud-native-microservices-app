require('dotenv').config();
const axios = require('axios');

// Hugging Face API key from .env file
const API_KEY = process.env.HUGGING_FACE_API_KEY;

// API Endpoint for Hugging Face's Falcon-7B-Instruct model
const endpoint = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct";

// Function to test Hugging Face API
async function testHuggingFace() {
    try {
        const response = await axios.post(
            endpoint,
            {
                inputs: "What is the capital of France?",
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );
        console.log("Response from Hugging Face API:");
        console.log(response.data);
    } catch (error) {
        console.error("Error while calling Hugging Face API:");
        console.error(error.response?.data || error.message);
    }
}

testHuggingFace();
