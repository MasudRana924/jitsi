import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import VideoCall from './components/VideoCall';

const App = () => {
  const [user, setUser] = useState(null);

  // Protected route component
  const ProtectedRoute = ({ element, requiredRole }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }

    return element;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="w-3/4 mx-auto py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Telemedicine Portal</h1>
            </div>
            {user && (
              <button
                onClick={() => setUser(null)}
                className="group flex items-center px-4 py-2 rounded-md border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
              >
                <span className="text-gray-700 group-hover:text-indigo-600 font-medium">Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-gray-500 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </header>

        <main className="max-w-6xl mx-auto my-8 px-4">
          <Routes>
            <Route
              path="/"
              element={user ? (
                <Navigate to={user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'} />
              ) : (
                <Login setUser={setUser} />
              )}
            />
            <Route
              path="/patient-dashboard"
              element={<ProtectedRoute element={<PatientDashboard user={user} />} requiredRole="patient" />}
            />
            <Route
              path="/doctor-dashboard"
              element={<ProtectedRoute element={<DoctorDashboard user={user} />} requiredRole="doctor" />}
            />
            <Route
              path="/video-call/:roomName/:otherUserId"
              element={<ProtectedRoute element={<VideoCall user={user} />} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;