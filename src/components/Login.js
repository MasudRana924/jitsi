import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyUsers } from '../dummyUsers';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find matching user
    const foundUser = dummyUsers.find(
      user => user.username === username && user.password === password && user.role === role
    );
    
    if (foundUser) {
      // Set user in app state (excluding password)
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Navigate to appropriate dashboard
      if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } else {
      setError('Invalid credentials. Try one of the demo accounts listed below.');
    }
  };

  // Helper function to fill in demo credentials
  const fillDemoCredentials = (userType) => {
    const demoUsers = dummyUsers.filter(user => user.role === userType);
    const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
    
    setUsername(randomUser.username);
    setPassword(randomUser.password);
    setRole(userType);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Telemedicine Portal</h2>
        <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          <p className="font-medium">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition font-medium"
        >
          Sign In
        </button>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600 mb-4">Need demo credentials?</p>
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => fillDemoCredentials('doctor')}
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition text-sm font-medium"
            >
              Doctor Demo
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('patient')}
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition text-sm font-medium"
            >
              Patient Demo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;