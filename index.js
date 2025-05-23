const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

//carRoutes
const carRoutes = require('./routes/carRoutes');
app.use('/api/cars', carRoutes);


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // Example: /api/users/register

// Test route
app.get('/', (req, res) => {
  res.send('Mawqif (UAE Used Cars Broker) API is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });
