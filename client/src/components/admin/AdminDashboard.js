import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the user is an admin
    if (!token || storedUser?.email !== 'sufiyan@gmail.com') {
      navigate('/'); // Redirect to home if not an admin or not logged in
    } else {
      setUser(storedUser); // Set user info if it's an admin
    }

    setLoading(false); // Set loading to false after checking auth
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading text until auth check is complete
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user?.name || 'Admin'}!</p>
      
      <div>
        <h3>Pending Car Listings</h3>
        {/* Add future admin tools here like listing cars to approve */}
      </div>
    </div>
  );
};

export default AdminDashboard;
