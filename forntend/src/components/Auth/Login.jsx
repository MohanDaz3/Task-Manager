import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Reuse the same CSS file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/login`, {
                username,
                password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store the JWT token in local storage
                alert("Login Successful");
                navigate('/dashboard'); // Redirect to dashboard after successful login
            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.error('Login failed', err);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {/* Links to Signup and Home */}
                <div className="login-links">
                    <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                    <p>Go to <Link to="/">Home</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
