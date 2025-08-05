const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookingSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'], // Add more status options as needed
    default: 'pending' // Set default status
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true
  },
  specialRequests: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
