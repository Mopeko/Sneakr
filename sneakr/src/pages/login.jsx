import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Account from '../Account.json';
import axios from 'axios';
import logincss from '../styles/login.css';
import user2Account from '../user2Account.json';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/login', { username, password }) 
            .then(response => {
                if (response.data.success) {
                    localStorage.clear();
                    localStorage.setItem('account', JSON.stringify(response.data.account));
                    navigate('/');
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;