
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [callStatus, setCallStatus] = useState(null);
  const [currentCallId, setCurrentCallId] = useState(null);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    // Redirect if not logged in or not a patient
    if (!user || user.role !== 'patient') {
      navigate('/login');
      return;
    }
    
    // Fetch available doctors
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${ENDPOINT}/api/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    
    fetchDoctors();
    
    // Set up WebSocket connection
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    
    // Authenticate socket connection
    newSocket.emit('userLogin', user.id);
    
    // Socket event listeners
    newSocket.on('callStatus', (data) => {
      setCallStatus(data.status);
      setCurrentCallId(data.callId);
    });
    
    newSocket.on('callAccepted', (data) => {
      setCallStatus('accepted');
      // Redirect to video call room
      navigate(`/call/${data.roomId}`);
    });
    
    newSocket.on('callRejected', () => {
      setCallStatus('rejected');
      setTimeout(() => setCallStatus(null), 3000); // Clear status after 3 seconds
    });
    
    newSocket.on('doctorStatusChanged', (data) => {
      setDoctors(prevDoctors => 
        prevDoctors.map(doctor => 
          doctor.id === data.doctorId 
            ? { ...doctor, online: data.online }
            : doctor
        )
      );
    });
    
    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [navigate, user]);
  
  const initiateCall = (doctorId) => {
    if (socket) {
      setCallStatus('initiating');
      socket.emit('initiateCall', {
        patientId: user.id,
        doctorId
      });
    }
  };
  
  return (
    <div className="patient-dashboard">
      <h2>Welcome, {user.name}</h2>
      
      {callStatus === 'initiating' && <p>Initiating call...</p>}
      {callStatus === 'ringing' && <p>Calling doctor...</p>}
      {callStatus === 'rejected' && <p>Call was rejected. Please try again later.</p>}
      
      <h3>Available Doctors</h3>
      <div className="doctors-list">
        {doctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <h4>{doctor.name}</h4>
            <p>Specialty: {doctor.specialty}</p>
            <div className={`status-indicator ${doctor.online ? 'online' : 'offline'}`}>
              {doctor.online ? 'Online' : 'Offline'}
            </div>
            <button 
              onClick={() => initiateCall(doctor.id)}
              disabled={!doctor.online || callStatus === 'ringing' || callStatus === 'initiating'}
            >
              Call Doctor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientDashboard;