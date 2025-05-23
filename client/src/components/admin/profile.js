import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h2>Admin Profile</h2>
      <p>This is the admin profile page.</p>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </div>
  );
};

const styles = {
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AdminProfile;
