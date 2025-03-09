import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CallModal from './CallModal';

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [doctors, setDoctors] = useState([]);
  const [incomingCall, setIncomingCall] = useState(null);
  const [outgoingCall, setOutgoingCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 const [socket, setSocket] = useState(null);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jitsi-back.onrender.com/api/doctors');
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        setLoading(false);
      }
    };
    fetchDoctors();

    // Socket event listeners would be set up here
    // Example (pseudocode):
    socket.on('incomingCall', (data) => {
      setIncomingCall(data);
    });
    
    socket.on('callAccepted', (data) => {
      // Redirect to call room
      navigate(`/call/${data.roomId}`);
    });
    
    return () => {
      socket.off('incomingCall');
      socket.off('callAccepted');
    };
  }, [navigate,socket]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCallRequest = (doctorId, doctorName) => {
    // Set outgoing call state
    setOutgoingCall({ doctorId, doctorName });
    
    // Socket emit would go here
    // Example:
    socket.emit('callRequest', { 
      patientId: user.id,
      patientName: user.name,
      doctorId: doctorId
    });
  };

  const handleAcceptCall = () => {
    // Accept the call logic
    // Example:
    socket.emit('acceptCall', { callId: incomingCall.callId });
    setIncomingCall(null);
    // Navigate to call room
    navigate(`/call/${incomingCall.roomId}`);
  };

  const handleRejectCall = () => {
    // Reject call logic
    // Example:
    socket.emit('rejectCall', { callId: incomingCall.callId });
    setIncomingCall(null);
  };

  const handleCancelOutgoingCall = () => {
    // Cancel outgoing call logic
    // Example:
    socket.emit('cancelCall', { doctorId: outgoingCall.doctorId });
    setOutgoingCall(null);
  };

  const dashboardStyles = {
    container: {
      fontFamily: "'Roboto', 'Helvetica', sans-serif",
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      color: '#333'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      marginBottom: '30px',
      borderBottom: '1px solid #e0e0e0',
      paddingBottom: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#2563eb',
      margin: '0'
    },
    welcomeMessage: {
      fontSize: '16px',
      color: '#4b5563',
      marginTop: '5px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '500',
      color: '#1f2937',
      marginBottom: '15px'
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    doctorCard: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      border: '1px solid #e5e7eb'
    },
    doctorNameContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px'
    },
    doctorAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '15px',
      fontSize: '18px',
      fontWeight: '600',
      color: '#4b5563'
    },
    doctorInfo: {
      flex: '1'
    },
    doctorName: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0 0 5px 0',
      color: '#111827'
    },
    doctorSpecialty: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0'
    },
    statusIndicator: {
      display: 'inline-block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginRight: '6px'
    },
    onlineStatus: {
      color: '#059669',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      marginTop: '5px'
    },
    offlineStatus: {
      color: '#dc2626',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      marginTop: '5px'
    },
    callButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '10px 15px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%',
      marginTop: '15px',
      transition: 'background-color 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    disabledCallButton: {
      backgroundColor: '#9ca3af',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '10px 15px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'not-allowed',
      width: '100%',
      marginTop: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '50px',
      color: '#6b7280'
    },
    errorContainer: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      padding: '15px',
      borderRadius: '6px',
      marginBottom: '20px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 0',
      color: '#6b7280'
    }
  };

  return (
    <div style={dashboardStyles.container}>
      <Navbar user={user} onLogout={handleLogout} />
      <div style={dashboardStyles.content}>
        <div style={dashboardStyles.header}>
          <div>
            <h1 style={dashboardStyles.headerTitle}>
              {user?.role === 'patient' ? 'Find a Doctor' : 'Your Dashboard'}
            </h1>
            <p style={dashboardStyles.welcomeMessage}>
              Welcome back, {user?.name || 'User'}
            </p>
          </div>
        </div>

        {error && (
          <div style={dashboardStyles.errorContainer}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={dashboardStyles.loadingContainer}>
            Loading doctors...
          </div>
        ) : (
          <>
            {user?.role === 'patient' && (
              <>
                <h2 style={dashboardStyles.sectionTitle}>Available Doctors</h2>
                {doctors.length === 0 ? (
                  <div style={dashboardStyles.emptyState}>
                    No doctors are available at the moment. Please check back later.
                  </div>
                ) : (
                  <div style={dashboardStyles.cardContainer}>
                    {doctors.map(doctor => (
                      <div key={doctor.id} style={dashboardStyles.doctorCard}>
                        <div style={dashboardStyles.doctorNameContainer}>
                          <div style={dashboardStyles.doctorAvatar}>
                            {doctor.name?.charAt(0)?.toUpperCase() || 'D'}
                          </div>
                          <div style={dashboardStyles.doctorInfo}>
                            <h3 style={dashboardStyles.doctorName}>{doctor.name}</h3>
                            <p style={dashboardStyles.doctorSpecialty}>{doctor.specialty}</p>
                          </div>
                        </div>
                        
                        <div style={doctor.online ? dashboardStyles.onlineStatus : dashboardStyles.offlineStatus}>
                          <span 
                            style={{
                              ...dashboardStyles.statusIndicator,
                              backgroundColor: doctor.online ? '#059669' : '#dc2626'
                            }}
                          />
                          {doctor.online ? 'Available Now' : 'Currently Offline'}
                        </div>
                        
                        <button 
                          onClick={() => handleCallRequest(doctor.id, doctor.name)} 
                          disabled={!doctor.online}
                          style={doctor.online ? dashboardStyles.callButton : dashboardStyles.disabledCallButton}
                        >
                          {doctor.online ? 'Start Video Consultation' : 'Doctor Unavailable'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {user?.role === 'doctor' && (
              <div>
                <h2 style={dashboardStyles.sectionTitle}>Your Patient Dashboard</h2>
                {/* Doctor-specific dashboard content would go here */}
                <p>You're currently set as {user.online ? 'available' : 'unavailable'} for consultations.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Call Modals */}
      <CallModal 
        isOpen={incomingCall !== null} 
        caller={incomingCall?.patientName || ''} 
        onAccept={handleAcceptCall} 
        onReject={handleRejectCall} 
        isDoctor={user?.role === 'doctor'} 
      />
      
      <CallModal 
        isOpen={outgoingCall !== null} 
        caller={outgoingCall?.doctorName || ''} 
        onAccept={() => {}} 
        onReject={handleCancelOutgoingCall} 
        isDoctor={false}
        isOutgoing={true}
      />
    </div>
  );
};

export default Dashboard;