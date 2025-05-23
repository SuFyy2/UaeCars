import React, { useState } from 'react';
import axios from 'axios';

const PostCarForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!make || !model || !year || !price || !description || !image) {
      setError('All fields are required including the image.');
      return;
    }

    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      const response = await axios.post('http://localhost:5000/api/cars', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Car posted successfully:', response.data);
      alert('Car posted successfully');
    } catch (error) {
      console.error('Error posting car:', error);
      setError('Failed to post car. Try again later.');
    }
  };

  return (
    <div>
      <h2>Post a Car</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Make</label>
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
        </div>
        <div>
          <label>Model</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div>
          <label>Year</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={handleImageChange} required />
        </div>
        <button type="submit">Post Car</button>
      </form>
    </div>
  );
};

export default PostCarForm;
