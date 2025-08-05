const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingControllers');
const verifyToken = require('../middleware/verifyToken');

// Routes for managing bookings

router.get('/', verifyToken, bookingController.getAllBookings);
router.get('/email', verifyToken, bookingController.getBookingByEmail);
router.post('/', bookingController.createBooking);
router.delete('/:id', bookingController.deleteBooking);
router.put('/:id', bookingController.updateBooking);
router.get('/:id', bookingController.getSingleBooking);
router.patch('/:id/status', bookingController.updateBookingStatus);


module.exports = router;
