import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

function DoctorDashboard() {
  const [incomingCall, setIncomingCall] = useState(null);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    // Redirect if not logged in or not a doctor
    if (!user || user.role !== 'doctor') {
      navigate('/login');
      return;
    }
    
    // Set up WebSocket connection
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    
    // Authenticate socket connection
    newSocket.emit('userLogin', user.id);
    
    // Socket event listeners
    newSocket.on('incomingCall', (data) => {
      setIncomingCall(data);
      // Play sound to alert doctor
      const audio = new Audio('/sound/call-ring.mp3');
      audio.play();
    });
    
    newSocket.on('joinRoom', (data) => {
      navigate(`/call/${data.roomId}`);
    });
    
    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [navigate, user]);
  
  const handleCallResponse = (response) => {
    if (socket && incomingCall) {
      socket.emit('callResponse', {
        callId: incomingCall.callId,
        response
      });
      
      if (response === 'rejected') {
        setIncomingCall(null);
      }
    }
  };
  
  return (
    <div className="doctor-dashboard">
      <h2>Welcome, Dr. {user.name}</h2>
      <div className="status-panel">
        <div className="status-indicator online">
          You are Online
        </div>
        <p>Patients can now see you are available for consultations</p>
      </div>
      
      {incomingCall && (
        <div className="incoming-call-alert">
          <h3>Incoming Call</h3>
          <p>A patient is calling you</p>
          <div className="call-actions">
            <button 
              className="accept-call" 
              onClick={() => handleCallResponse('accepted')}
            >
              Accept
            </button>
            <button 
              className="reject-call" 
              onClick={() => handleCallResponse('rejected')}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;