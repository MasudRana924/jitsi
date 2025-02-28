import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { JITSI_DOMAIN } from '../config';

const VideoCall = ({ user }) => {
  const { roomName, otherUserId } = useParams();
  const [callEnded, setCallEnded] = useState(false);
  const navigate = useNavigate();
  console.log("user", user);
  console.log("roomName", roomName);

  // In a real app, you would fetch the other user's details from your backend
  const otherUser = {
    id: otherUserId,
    name: user.role === 'doctor' ? 'Patient' : 'Doctor',
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      // Any cleanup code when component unmounts
    };
  }, []);

  const handleApiReady = (externalApi) => {
    // You can add custom event listeners here
    externalApi.addListener('videoConferenceLeft', () => {
      setCallEnded(true);
      // Wait a bit before redirecting
      setTimeout(() => {
        navigate(user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
      }, 2000);
    });
  };

  // Format the display name based on user role
  const displayName = user.role === 'doctor' ? `Dr. ${user.name}` : user.name;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold flex items-center">
            <span className="mr-2">
              {user.role === 'doctor' ? '👨‍⚕️' : '🧑'}
            </span>
            {user.role === 'doctor' 
              ? `Consultation with ${otherUser.name}` 
              : `Consultation with ${otherUser.name}`}
          </h2>
          <div className="hidden md:block px-4 py-2 rounded-full bg-white bg-opacity-20 text-sm">
            Room: {roomName}
          </div>
        </div>
      </div>
      
      {callEnded ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
            <div className="mb-6 text-red-500 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Call Ended</h3>
            <p className="mb-6 text-gray-600">Thank you for participating. Redirecting to dashboard...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          {/* Video container with fixed height and centered in window */}
          <div className="relative w-full max-w-4xl shadow-xl rounded-lg overflow-hidden">
            {/* Small pill showing connection status */}
            <div className="absolute top-4 right-4 z-10 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Connected
            </div>
            
            <div className="h-96" style={{ height: '500px' }}>
              <JitsiMeeting
                domain={JITSI_DOMAIN}
                roomName={roomName}
                configOverwrite={{
                  startWithAudioMuted: false,
                  disableModeratorIndicator: true,
                  startScreenSharing: false,
                  enableEmailInStats: false,
                  prejoinPageEnabled: false,
                  notifications: {
                    notify60SecondsLeft: true
                  },
                  toolbarButtons: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'select-background', 'download', 'mute-everyone',
                  ]
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
                  displayName: displayName
                }}
                onApiReady={handleApiReady}
                getIFrameRef={(iframeRef) => {
                  iframeRef.style.height = '100%';
                  iframeRef.style.width = '100%';
                  iframeRef.style.border = 'none';
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="bg-white p-3 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>
          {user.role === 'doctor' ? 'Medical Consultation Platform' : 'Patient Portal'} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default VideoCall;