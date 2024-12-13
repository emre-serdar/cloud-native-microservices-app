import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the AI Language Platform</h1>
            <p className="home-description">
                Explore the power of advanced AI models and enjoy a seamless chat experience.
            </p>
            <div className="home-buttons">
                <button className="home-button" onClick={() => navigate('/login')}>
                    Login
                </button>
                <button className="home-button" onClick={() => navigate('/signup')}>
                    Signup
                </button>
            </div>
        </div>
    );
}

export default Home;
