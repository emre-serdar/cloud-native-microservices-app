import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; // Importing shared CSS for Login and Signup
import api from '../utils/api';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);
            alert(`Logged in! Token: ${response.data.token}`);
            navigate('/chat'); // Redirect to chat page
        } catch (error: any) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Login</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                />
                <button type="submit" className="auth-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
