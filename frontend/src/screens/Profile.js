import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Profile = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState({});
    const [showChangePassword, setShowChangePassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMessage('');
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await fetch('http://localhost:4000/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to retrieve profile');
            }

            const profileData = await response.json();
            setProfile(profileData);
        } catch (error) {
            console.error('Fetch profile error:', error);
        }
    };

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password don't match");
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await fetch('http://localhost:4000/profile/updatepassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update password');
            }

            setMessage('Password updated successfully');
        } catch (error) {
            console.error('Update password error:', error);
            setMessage(error.message || 'Failed to update password');
        }
    };

    return (
        <div>
            <Navigation />
            <div
                style={{
                    maxWidth: '400px',
                    margin: '0 auto',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginTop: "20px"
                }}
            >
                <h2>Profile</h2>
                <div>
                    <p><strong>Name:</strong>&nbsp;{profile.username}</p>
                    {/* Add more profile details as needed */}
                </div>
                {!showChangePassword && (
                    <button
                        onClick={() => setShowChangePassword(true)}
                        style={{
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Change Password
                    </button>
                )}
                {showChangePassword && (
                    <div>
                        <h3>Change Password</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="currentPassword" style={{ display: 'block', marginBottom: '5px' }}>
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    value={currentPassword}
                                    onChange={handleCurrentPasswordChange}
                                    required
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px' }}>
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    required
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Update Password
                            </button>
                        </form>
                        {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
