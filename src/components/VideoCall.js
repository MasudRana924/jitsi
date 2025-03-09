import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const VideoCall = ({ user, roomId }) => {
  return (
    <div style={styles.container}>
      <JitsiMeeting
        roomName={roomId}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: false,
        }}
        userInfo={{
          displayName: user.name,
        }}
        onApiReady={(externalApi) => {
          console.log('Jitsi Meet API is ready', externalApi);
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

export default VideoCall;