import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const AdminRequests = () => {
  const [pendingCars, setPendingCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchPending = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/cars/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingCars(res.data);
    } catch (err) {
      console.error('Error fetching pending cars:', err);
      alert('Failed to fetch pending listings');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/cars/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPending();
    } catch (err) {
      console.error('Error approving car:', err);
      alert('Approval failed');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/cars/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPending();
    } catch (err) {
      console.error('Error rejecting car:', err);
      alert('Rejection failed');
    }
  };

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Pending Car Listings</h2>
      {loading ? (
        <p>Loading listings...</p>
      ) : pendingCars.length === 0 ? (
        <p>No pending car listings.</p>
      ) : (
        pendingCars.map((car) => (
          <div key={car._id} style={{ border: '1px solid #ccc', padding: 16, marginBottom: 20, borderRadius: 8 }}>
            <h3>{car.make} {car.model} ({car.year})</h3>
            <p><strong>Price:</strong> AED {car.price}</p>
            <p><strong>Description:</strong> {car.description}</p>
            <img
              src={`http://localhost:5000/uploads/${car.image}`}
              alt={car.model}
              style={{ width: 300, borderRadius: 8, marginBottom: 10 }}
            />
            <br />
            <button onClick={() => handleApprove(car._id)} style={{ marginRight: 10, background: 'green', color: 'white' }}>
              Approve
            </button>
            <button onClick={() => handleReject(car._id)} style={{ background: 'red', color: 'white' }}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminRequests;
