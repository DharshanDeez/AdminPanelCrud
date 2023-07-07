import React, { useState, useEffect } from 'react';
import Navigation from "./Navigation"

const Subadmin = () => {
    const [subadmins, setSubadmins] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedSubadminId, setSelectedSubadminId] = useState('');

    useEffect(() => {
        fetchSubadmins();
    }, []);

    const fetchSubadmins = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:4000/admin/subadmins', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to retrieve subadmins');
            }

            const subadminsData = await response.json();
            setSubadmins(subadminsData);
        } catch (error) {
            console.error('Fetch subadmins error:', error);
            setErrorMessage('Failed to retrieve subadmins');
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCreateSubadmin = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:4000/admin/subadmins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to create subadmin');
            }

            setMessage('Subadmin created successfully');
            setUsername('');
            setPassword('');
            fetchSubadmins();
        } catch (error) {
            console.error('Create subadmin error:', error);
            setErrorMessage(error.message || 'Failed to create subadmin');
        }
    };

    const handleDeleteSubadmin = async (subadminId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:4000/admin/subadmins/${subadminId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete subadmin');
            }

            setMessage('Subadmin deleted successfully');
            fetchSubadmins();
        } catch (error) {
            console.error('Delete subadmin error:', error);
            setErrorMessage(error.message || 'Failed to delete subadmin');
        }
    };

    const handleUpdateSubadmin = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:4000/admin/subadmins/${selectedSubadminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update subadmin');
            }

            setMessage('Subadmin updated successfully');
            setUsername('');
            setPassword('');
            setSelectedSubadminId('');
            fetchSubadmins();
        } catch (error) {
            console.error('Update subadmin error:', error);
            setErrorMessage(error.message || 'Failed to update subadmin');
        }
    };

    const handleEditSubadmin = (subadminId) => {
        const subadmin = subadmins.find((subadmin) => subadmin._id === subadminId);
        setUsername(subadmin.username);
        setPassword('');
        setSelectedSubadminId(subadminId);
    };

    return (
        <>
            <Navigation />
            <div style={{ margin: '20px' }}>
                <h2>Subadmins</h2>
                {subadmins.length === 0 ? (
                    <p>No subadmins found</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {subadmins.map((subadmin) => (
                            <li key={subadmin._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                {subadmin.username}
                                <button
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '8px',
                                        marginLeft: '10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleDeleteSubadmin(subadmin._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '8px',
                                        marginLeft: '10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleEditSubadmin(subadmin._id)}
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <h3>{selectedSubadminId ? 'Update Subadmin' : 'Create Subadmin'}</h3>
                <form
                    onSubmit={selectedSubadminId ? handleUpdateSubadmin : handleCreateSubadmin}
                    style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}
                >
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
                        required
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
                        {selectedSubadminId ? 'Update' : 'Create'}
                    </button>
                </form>

                {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
                {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
            </div>
        </>
    );
};

export default Subadmin;
