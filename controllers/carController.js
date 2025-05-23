const Car = require('../models/Car');

// Create a new car listing (status = pending)
const createCarListing = async (req, res) => {
  try {
    const { make, model, year, price, description } = req.body;
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const newCar = new Car({
      make,
      model,
      year,
      price,
      description,
      image: req.file.filename, // ⬅️ use the uploaded filename
      userId,
      status: 'pending'
    });

    await newCar.save();
    res.status(201).json({ message: 'Car submitted for review', car: newCar });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit car', error: error.message });
  }
};

// Get all APPROVED car listings
const getAllCarListings = async (req, res) => {
  try {
    const cars = await Car.find({ status: 'approved' }).populate('userId', 'name email');
    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars', error: error.message });
  }
};

// Get a single car listing by ID
const getCarListingById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('userId', 'name email');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch car', error: error.message });
  }
};

// Delete a car listing (user-only)
const deleteCarListing = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (car.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this car' });
    }

    await car.remove();
    res.status(200).json({ message: 'Car listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete car', error: error.message });
  }
};

// Admin: Approve a car listing
const approveCarListing = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.status = 'approved';
    await car.save();
    res.status(200).json({ message: 'Car listing approved', car });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve car', error: error.message });
  }
};

// Admin: View all pending car submissions
const getPendingCarListings = async (req, res) => {
  try {
    const cars = await Car.find({ status: 'pending' }).populate('userId', 'name email');
    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending cars', error: error.message });
  }
};

module.exports = {
  createCarListing,
  getAllCarListings,
  getCarListingById,
  deleteCarListing,
  approveCarListing,
  getPendingCarListings
};
