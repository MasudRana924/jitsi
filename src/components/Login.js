import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ENDPOINT}/api/login`, { email, password });
      
      if (response.data.success) {
        // Store user info in local storage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Connect to WebSocket and notify login
        const socket = socketIOClient(ENDPOINT);
        socket.emit('userLogin', response.data.user.id);
        
        // Store socket in localStorage (for simplicity)
        localStorage.setItem('socketId', socket.id);
        
        // Redirect to appropriate dashboard
        if (response.data.user.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;