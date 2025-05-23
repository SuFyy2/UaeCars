const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isApproved: { type: Boolean, default: false }, // Admin approval flag
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
