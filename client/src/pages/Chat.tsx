import React, { useState } from 'react';
import '../styles/Chat.css'; // Importing the updated CSS file

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [userInput, setUserInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        // Add user input to the chat
        setMessages([...messages, { role: 'user', content: userInput }]);

        try {
            const response = await fetch('http://localhost:5001/api/llm/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userInput }),
            });
            const data = await response.json();

            // Parse and format the response to avoid question repetition
            const responseText = data.response[0]?.generated_text || 'No response from LLM.';
            const formattedResponse = responseText.replace(userInput, '').trim();

            // Add LLM response to the chat
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: formattedResponse },
            ]);
        } catch (error) {
            console.error('Error:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: 'Error communicating with LLM API.' },
            ]);
        } finally {
            setUserInput(''); // Clear user input
        }
    };

    return (
        <div className="chat-container">
            <h1 className="chat-title">Chat Page</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${
                            msg.role === 'user' ? 'message-user' : 'message-assistant'
                        }`}
                    >
                        <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
