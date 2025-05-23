import React, { useState, useRef } from 'react';
import axios from 'axios';

const AddCarForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('You must be logged in to post a car.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('make', make);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);

      await axios.post('http://localhost:5000/api/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Car listing submitted for review!');

      // Reset form
      setMake('');
      setModel('');
      setYear('');
      setPrice('');
      setDescription('');
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error posting car:', error);
      alert('Failed to submit car listing.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add New Car Listing</h2>
      <input
        type="text"
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price (AED)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Submit Car</button>
    </form>
  );
};

export default AddCarForm;
