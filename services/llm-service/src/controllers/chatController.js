const { sendToLLMApi } = require('../utils/llmApi');

exports.generateResponse = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    try {
        const response = await sendToLLMApi(prompt);
        res.status(200).json({ response: response || "No response from LLM." });
    } catch (error) {
        console.error('Error generating response:', error.message);
        res.status(500).json({ message: 'Error generating response from LLM API' });
    }
};
