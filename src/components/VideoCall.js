import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

function VideoCall() {
  const { roomId } = useParams();
  const [jitsiAPI, setJitsiAPI] = useState(null);
  const [socket, setSocket] = useState(null);
  const [callId, setCallId] = useState(null);
  const navigate = useNavigate();
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Set up WebSocket connection
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    
    // Authenticate socket connection
    newSocket.emit('userLogin', user.id);
    
    // Initialize Jitsi Meet API
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomId,
      width: '100%',
      height: '100%',
      parentNode: document.getElementById('jitsi-container'),
      userInfo: {
        displayName: user.name
      },
      configOverwrite: {
        prejoinPageEnabled: false,
        startWithAudioMuted: false,
        startWithVideoMuted: false
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_BACKGROUND: '#3c4043'
      }
    };
    
    // Load Jitsi script
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement('script');
      script.src = `https://meet.jit.si/external_api.js`;
      script.async = true;
      
      script.onload = () => {
        const api = new window.JitsiMeetExternalAPI(domain, options);
        setJitsiAPI(api);
        
        // Handle Jitsi events
        api.addEventListeners({
          readyToClose: () => {
            if (socket && callId) {
              socket.emit('endCall', callId);
            }
            navigate(-1);
          }
        });
      };
      
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    } else {
      const api = new window.JitsiMeetExternalAPI(domain, options);
      setJitsiAPI(api);
    }
    
    // Socket event listeners
    newSocket.on('callEnded', (data) => {
      setCallId(data.callId);
      if (jitsiAPI) {
        jitsiAPI.executeCommand('hangup');
      }
      navigate(-1);
    });
    
    // Cleanup on component unmount
    return () => {
      if (jitsiAPI) {
        jitsiAPI.dispose();
      }
      newSocket.disconnect();
    };
  }, [navigate, user, roomId, jitsiAPI, callId]);
  
  const endCall = () => {
    if (jitsiAPI) {
      jitsiAPI.executeCommand('hangup');
    }
    if (socket && callId) {
      socket.emit('endCall', callId);
    }
    navigate(-1);
  };
  
  return (
    <div className="video-call-container">
      <div id="jitsi-container" style={{ width: '100%', height: '90vh' }}></div>
      <div className="call-controls">
        <button className="end-call-btn" onClick={endCall}>
          End Call
        </button>
      </div>
    </div>
  );
}

export default VideoCall;