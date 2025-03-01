// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import PatientDashboard from './components/PatientDashboard';
// import DoctorDashboard from './components/DoctorDashboard';
// import VideoCall from './components/VideoCall';

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/patient/dashboard" element={<PatientDashboard />} />
//           <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
//           <Route path="/call/:roomId" element={<VideoCall />} />
//           <Route path="/" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JitsiMeeting } from '@jitsi/react-sdk';
import io from 'socket.io-client';
import { JITSI_DOMAIN } from './config';
const socket = io('http://localhost:5000');

// Navbar Component
const Navbar = ({ user, onLogout }) => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 24px',
      backgroundColor: '#3b82f6',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ 
        fontWeight: 'bold', 
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        TeleMed Connect
      </div>
      {user && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          fontSize: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span>Hi, {user.name}</span>
          </div>
          <button 
            onClick={onLogout}
            style={{
              backgroundColor: '#1e40af',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e3a8a'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

// Call Modal Component
const CallModal = ({ isOpen, caller, onAccept, onReject, isDoctor }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        width: '400px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          backgroundColor: isDoctor ? '#bfdbfe' : '#e0f2fe',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2v5h5" stroke={isDoctor ? '#2563eb' : '#0284c7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 6v11c0 1.1046-.8954 2-2 2H5c-1.10457 0-2-.8954-2-2V5c0-1.10457.89543-2 2-2h11l5 3z" stroke={isDoctor ? '#2563eb' : '#0284c7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 9.5v5M7 12h5" stroke={isDoctor ? '#2563eb' : '#0284c7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h3 style={{ 
          margin: '0 0 8px 0',
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1e293b'
        }}>
          {isDoctor 
            ? `Incoming Call` 
            : `Calling Doctor`}
        </h3>
        
        <p style={{
          margin: '0 0 24px 0',
          color: '#64748b',
          fontSize: '1rem'
        }}>
          {isDoctor ? `Patient ${caller} is requesting a consultation` : `${caller}`}
        </p>
        
        {isDoctor ? (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
            <button 
              onClick={onAccept}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              Accept
            </button>
            <button 
              onClick={onReject}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.36 6.64A9 9 0 0 1 20.77 15M5.64 5.64A9 9 0 1 0 18.36 18.36m0-11.72v-5m-3 0h3-3zM4.73 4.73L19.07 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Decline
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              display: 'inline-block',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '4px solid #3b82f6',
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>
              {`
                @keyframes spin {
                  to {
                    transform: rotate(360deg);
                  }
                }
              `}
            </style>
            <p style={{ color: '#64748b', margin: '0' }}>Please wait while connecting...</p>
            <button 
              onClick={onReject}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '8px',
                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.36 6.64A9 9 0 0 1 20.77 15M5.64 5.64A9 9 0 1 0 18.36 18.36m0-11.72v-5m-3 0h3-3zM4.73 4.73L19.07 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [roomId, setRoomId] = useState('');
  console.log("roomID",roomId)
  const [callStarted, setCallStarted] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [outgoingCall, setOutgoingCall] = useState(null);

  useEffect(() => {
    // Fetch doctors list
    const fetchDoctors = async () => {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    };
    fetchDoctors();

    // Listen for incoming calls (for doctors)
    socket.on('incomingCall', (data) => {
      if (data && data.roomId && data.patientId && data.patientName) {
        setIncomingCall(data);
      } else {
        console.error('Invalid incoming call data:', data);
      }
    });

    // Listen for call responses (for patients)
    socket.on('callResponse', (data) => {
      if (data && data.roomId && data.accepted !== undefined) {
        setOutgoingCall(null); // Close the modal
        if (data.accepted) {
          setRoomId(data.roomId);
          setCallStarted(true);
        } else {
          alert('Call rejected by doctor');
        }
      } else {
        console.error('Invalid call response data:', data);
      }
    });

    // Listen for doctor status changes
    socket.on('doctorStatusChanged', (data) => {
      if (data && data.doctorId && data.online !== undefined) {
        setDoctors(prevDoctors =>
          prevDoctors.map(doctor =>
            doctor.id === data.doctorId ? { ...doctor, online: data.online } : doctor
          )
        );
      } else {
        console.error('Invalid doctor status data:', data);
      }
    });

    return () => {
      socket.off('incomingCall');
      socket.off('callResponse');
      socket.off('doctorStatusChanged');
    };
  }, []);

  const handleLogin = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/login', { email, password });
    if (response.data.success) {
      setUser(response.data.user);
      socket.emit('userLogin', response.data.user.id);
    }
  };

  const handleLogout = () => {
    try {

      if (user && user.id) {
        socket.emit('userLogout');
      }
      setUser(null);
      setCallStarted(false);
      setRoomId('');
      setIncomingCall(null);
      setOutgoingCall(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCallRequest = (doctorId, doctorName) => {
    if (user && user.id) {
      socket.emit('requestCall', { 
        patientId: user.id,
        patientName: user.name,
        doctorId 
      });
      // Show calling modal to patient
      setOutgoingCall({ 
        doctorId,
        doctorName
      });
    } else {
      console.error('User not logged in or invalid user ID');
    }
  };

  const handleCallResponse = (accepted) => {
    if (incomingCall && incomingCall.roomId && incomingCall.patientId && user && user.id) {
      socket.emit('callResponse', {
        roomId: incomingCall.roomId,
        patientId: incomingCall.patientId,
        doctorId: user.id,
        accepted
      });
      setIncomingCall(null);
      if (accepted) {
        setRoomId(incomingCall.roomId);
        setCallStarted(true);
      }
    } else {
      console.error('Invalid incoming call or user data');
    }
  };

  const cancelOutgoingCall = () => {
    setOutgoingCall(null);
    socket.emit('cancelCall', { 
      patientId: user.id,
      doctorId: outgoingCall.doctorId 
    });
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      
      {!user ? (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h2>Login</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            handleLogin(email, password);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          {user.role === 'patient' && (
            <div>
              <h3>Available Doctors</h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '15px' 
              }}>
                {doctors.map(doctor => (
                  <li key={doctor.id} style={{ 
                    padding: '15px', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #eee',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div>
                      <strong>{doctor.name}</strong> 
                      <div>{doctor.specialty}</div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '5px',
                        marginTop: '5px' 
                      }}>
                        <span style={{ 
                          width: '10px', 
                          height: '10px', 
                          borderRadius: '50%', 
                          backgroundColor: doctor.online ? '#059669' : '#dc2626',
                          display: 'inline-block'
                        }}></span>
                        <span style={{ color: doctor.online ? '#059669' : '#dc2626' }}>
                          {doctor.online ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCallRequest(doctor.id, doctor.name)} 
                      disabled={!doctor.online}
                      style={{ 
                        backgroundColor: doctor.online ? '#059669' : '#9ca3af', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 10px', 
                        borderRadius: '5px', 
                        cursor: doctor.online ? 'pointer' : 'not-allowed',
                        marginTop: '5px'
                      }}
                    >
                      Call Doctor
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Call modals */}
          <CallModal 
            isOpen={incomingCall !== null}
            caller={incomingCall?.patientName}
            onAccept={() => handleCallResponse(true)}
            onReject={() => handleCallResponse(false)}
            isDoctor={true}
          />
          
          <CallModal 
            isOpen={outgoingCall !== null}
            caller={outgoingCall?.doctorName}
            onAccept={() => {}}
            onReject={cancelOutgoingCall}
            isDoctor={false}
          />
          
          {callStarted && roomId && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <JitsiMeeting
                roomName={roomId}
                domain={JITSI_DOMAIN}
                configOverwrite={{
                  startWithAudioMuted: true,
                  startWithVideoMuted: false,
                  prejoinPageEnabled: false,
                  disableModeratorIndicator: true,
                  enableEmailInStats: false,
                  toolbarButtons: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'select-background', 'download', 'mute-everyone',
                  ],
                }}
                interfaceConfigOverwrite={{
                  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                  SHOW_JITSI_WATERMARK: false,
                  DEFAULT_BACKGROUND: '#f9fafb',
                  TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                    'tileview'
                  ],
                }}
                userInfo={{
                  displayName: user.name,
                }}
                onApiReady={(externalApi) => {
                  console.log('Jitsi Meet API is ready', externalApi);
                }}
                getIFrameRef={(iframeRef) => {
                  if (iframeRef) {
                    iframeRef.style.height = '600px';
                    iframeRef.style.width = '600px';
                    iframeRef.style.border = 'none';
                    iframeRef.style.borderRadius = '10px';
                    iframeRef.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    iframeRef.style.maxWidth = '100%';
                    iframeRef.style.margin = '0 auto';
                  }
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;