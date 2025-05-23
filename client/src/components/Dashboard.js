import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);

      // ✅ Correct API endpoint to match your Express route
      axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setMobile(res.data.mobile || '');
        setLocation(res.data.location || '');
        setGender(res.data.gender || '');
      })
      .catch(err => {
        console.error('Failed to load profile extras:', err);
        setMessage('Failed to load profile data.');
      });
    }
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      // ✅ Correct API endpoint to match your Express route
      await axios.put('/api/users/profile', {
        mobile,
        location,
        gender
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setMessage('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user ? user.name : 'User'}</h2>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout}>Logout</button>

      <div style={{ marginTop: '20px' }}>
        <label>Mobile:</label>
        <input value={mobile} onChange={(e) => setMobile(e.target.value)} />

        <label>Location:</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />

        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={handleSave}>Save</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
