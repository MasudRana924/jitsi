import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from 'react-router-dom';

const Call = () => {
  const { roomId } = useParams();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <JitsiMeeting
        roomName={roomId}
        domain='https://call.bloomattires.com/'
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
        }}
        userInfo={{
          displayName: JSON.parse(localStorage.getItem('user')).name,
        }}
      />
    </div>
  );
};

export default Call;