// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const isAdmin = user?.email === 'sufiyan@gmail.com';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      {isAdmin ? (
        <>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/admin/requests" style={styles.link}>Requests</Link>
          <Link to="/admin/profile" style={styles.link}>Profile</Link>
        </>
      ) : (
        <>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/buy-cars" style={styles.link}>Buy Cars</Link>
          <Link to="/my-cars" style={styles.link}>Sell Cars</Link>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        </>
      )}
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <button onClick={handleLogout} style={styles.loginButton}>Logout</button>
        ) : (
          <Link to="/login" style={styles.loginButton}>Login / Register</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  loginButton: {
    color: '#1976d2',
    backgroundColor: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Navbar;
