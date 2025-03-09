import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#3b82f6', color: 'white' }}>
      <h2>TeleMed Connect</h2>
      {user && (
        <div>
          <span>Hi, {user.name}</span>
          <button onClick={onLogout} style={{ marginLeft: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
