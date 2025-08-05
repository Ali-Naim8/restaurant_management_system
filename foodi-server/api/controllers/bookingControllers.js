const Bookings = require("../models/Bookings");

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
      const bookings = await Bookings.find();
      res.status(200).json(bookings);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedBooking = await Bookings.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

// Get bookings using email
const getBookingByEmail = async(req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await Bookings.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a booking
const createBooking = async(req, res) => {
    const { fullName, email, phone, date, time, numberOfGuests, specialRequests } = req.body;
    try {
        const booking = await Bookings.create({
            fullName, email, phone, date, time, numberOfGuests, specialRequests
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a booking
const deleteBooking = async(req, res) => {
    const bookingId = req.params.id;
    try {
        const deletedBooking = await Bookings.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a booking
const updateBooking = async(req, res) => {
    const bookingId = req.params.id;
    const { fullName, email, phone, date, time, numberOfGuests, specialRequests } = req.body;
    try {
        const updatedBooking = await Bookings.findByIdAndUpdate(
            bookingId,
            { fullName, email, phone, date, time, numberOfGuests, specialRequests },
            { new: true, runValidators: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get single booking
const getSingleBooking = async(req, res) => {
    const bookingId = req.params.id;
    try {
        const booking = await Bookings.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBookings,
    getBookingByEmail,
    createBooking,
    deleteBooking,
    updateBooking,
    getSingleBooking,
    updateBookingStatus
}
