import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                setError('Authentication failed');
                return;
            }

            const { token } = await response.json();
            // Store the token in localStorage
            localStorage.setItem('token', token);

            // Assuming successful login, navigate to the dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to login');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '50px',
            }}
        >
            <h1 style={{ marginBottom: '20px' }}>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    style={{
                        marginBottom: '10px',
                        padding: '8px',
                        width: '200px',
                    }}
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    style={{
                        marginBottom: '10px',
                        padding: '8px',
                        width: '200px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '8px',
                        width: '100px',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
