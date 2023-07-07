import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Retrieve the JWT token from localStorage or your authentication state
        const token = localStorage.getItem('token');

        if (token) {
            // Decode the JWT token to extract the user role
            const decodedToken = decodeToken(token);
            const role = decodedToken.role;

            setUserRole(role);
        }
    }, []);

    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    };

    const handleLogout = () => {
        // Perform logout logic
        // For example, clear session, remove token, etc.
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
            <ul
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                }}
            >
                <li style={{ marginRight: '10px' }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        Dashboard
                    </Link>
                </li>
                {userRole === 'admin' && (
                    <li style={{ marginRight: '10px' }}>
                        <Link to="/createsubadmin" style={{ textDecoration: 'none' }}>
                            Create Subadmin
                        </Link>
                    </li>
                )}
                <li style={{ marginRight: '10px' }}>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        Profile
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
