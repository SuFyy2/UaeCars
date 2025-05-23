const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, default: '' },  // Add mobile field
    location: { type: String, default: '' }, // Add location field
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' }, // Add gender field
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
