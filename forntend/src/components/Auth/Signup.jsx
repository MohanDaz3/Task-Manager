import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Reuse the same CSS file

const Signup = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const username = e.target[0].value;
            const password = e.target[1].value;

            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/signup`, {
                username,
                password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store the JWT token in local storage
                alert("User created successfully and logged in!");
                navigate('/dashboard'); // Redirect to dashboard or other protected route
            }
        } catch (err) {
            console.error('Signup failed', err);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Signup</button>
                </form>
                {/* Links to Login and Home */}
                <div className="login-links">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                    <p>Go to <Link to="/">Home</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
