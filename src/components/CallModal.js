import React from 'react';

const CallModal = ({ isOpen, caller, onAccept, onReject, isDoctor }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <h3>{isDoctor ? `Incoming Call from ${caller}` : `Calling ${caller}`}</h3>
        {isDoctor ? (
          <div>
            <button onClick={onAccept} style={{ marginRight: '10px', backgroundColor: '#10b981', color: 'white' }}>Accept</button>
            <button onClick={onReject} style={{ backgroundColor: '#ef4444', color: 'white' }}>Decline</button>
          </div>
        ) : (
          <button onClick={onReject} style={{ backgroundColor: '#ef4444', color: 'white' }}>Cancel</button>
        )}
      </div>
    </div>
  );
};

export default CallModal;
