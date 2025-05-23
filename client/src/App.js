import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import BuyCars from './components/BuyCars';
import MyCars from './components/SellCars';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminRequests from './components/admin/request';
import AdminProfile from './components/admin/profile';

const isAdmin = (user) => user?.email === 'sufiyan@gmail.com';

const RedirectIfAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && isAdmin(user) && !location.pathname.startsWith('/admin')) {
      navigate('/admin/dashboard');
    }
  }, [navigate, location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <RedirectIfAdmin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buy-cars" element={<BuyCars />} />
        <Route path="/my-cars" element={<MyCars />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
