import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from 'react-router-dom';
const JitsiMeetingPage = () => {
  const { roomId } = useParams(); // Get room ID from URL

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <JitsiMeeting
        roomName={roomId}
        domain='https://call.bloomattires.com/'
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
          disableModeratorIndicator: true,
        }}
        userInfo={{ displayName: "User" }}
        getIFrameRef={(iframeRef) => {
          if (iframeRef) {
            iframeRef.style.height = '600px';
            iframeRef.style.width = '800px';
          }
        }}
      />
    </div>
  );
};

export default JitsiMeetingPage;
