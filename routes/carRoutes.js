const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Car = require('../models/Car');
const multer = require('multer');
const path = require('path');

// Multer setup to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the upload folder
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the file name to include the current timestamp and original filename
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Create a new car listing with image upload
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { make, model, year, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  // Validate the required fields
  if (!make || !model || !year || !price || !description || !image) {
    return res.status(400).json({ message: 'All fields are required including image' });
  }

  try {
    // Create a new car listing
    const newCar = new Car({
      make,
      model,
      year,
      price,
      description,
      image,
      createdBy: req.user.id, // User ID from the authMiddleware
    });

    await newCar.save();
    res.status(201).json(newCar); // Send the created car listing in the response
  } catch (error) {
    console.error('Error creating car listing:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all pending car listings (Admin only)
router.get('/pending', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized access, admin only' });

  try {
    const pendingCars = await Car.find({ isApproved: false });
    res.json(pendingCars); // Send the pending cars list
  } catch (error) {
    console.error('Error fetching pending cars:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve a car listing (Admin only)
router.put('/approve/:id', authMiddleware, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized access, admin only' });

    // Approve the car listing
    car.isApproved = true;
    await car.save();
    res.json({ message: 'Car listing approved', car });
  } catch (error) {
    console.error('Error approving car:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reject a car listing (Admin only)
router.put('/reject/:id', authMiddleware, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized access, admin only' });

    // Remove the car listing from the database (reject)
    await car.remove();
    res.json({ message: 'Car listing rejected and removed' });
  } catch (error) {
    console.error('Error rejecting car:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fetch all cars (for normal users and admin)
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({ isApproved: true }); // Only show approved cars
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
