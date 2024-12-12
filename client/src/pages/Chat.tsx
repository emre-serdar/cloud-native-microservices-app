import React, { useState } from 'react';

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const newMessages = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);

    try {
      const response = await fetch('http://localhost:5001/api/llm/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.response) {
        setMessages([...newMessages, { role: 'bot', content: data.response[0].generated_text }]);
      } else {
        setMessages([...newMessages, { role: 'bot', content: 'Error: Unable to fetch response.' }]);
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'bot', content: 'Error communicating with server.' }]);
    }

    setPrompt('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
