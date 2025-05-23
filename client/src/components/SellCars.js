import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCarForm from './AddCarForm'; 

const SellCars = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login'); // If user data doesn't exist, redirect to login
      return;
    }

    setUser(userData);
    setLoading(false); // Set loading to false after user is fetched
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message until user data is fetched
  }

  return (
    <div>
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <p>Sell your car here!</p>

      {/* Add Car Form Section */}
      <AddCarForm />
    </div>
  );
};

export default SellCars;
