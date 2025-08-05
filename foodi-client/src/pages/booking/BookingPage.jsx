import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider'; // Import your AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BookingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    fullName: '',
    email: user ? user.email : '',
    phone: '',
    date: '',
    time: '',
    numberOfGuests: '',
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if user is signed in
    if (!user) {
      Swal.fire({
        title: 'Please login to book a table',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    // Validation for date
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    if (selectedDate < currentDate) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a future date.',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:6001/booking', formData);
      console.log('Booking created:', response.data);
      Swal.fire({
        title: 'Booking Created!',
        text: 'Your booking has been successfully created.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        onClose: () => {
          setFormData({
            fullName: '',
            email: user ? user.email : '',
            phone: '',
            date: '',
            time: '',
            numberOfGuests: '',
            specialRequests: ''
          });
        }
      });
    } catch (error) {
      console.error('Error creating booking:', error.response?.data || error.message);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create booking. Please try again later.',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Book a Table</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required disabled={user ? true : false} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
            <input type="time" id="time" name="time" value={formData.time} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
        </div>
        <div>
          <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700">Number of Guests</label>
          <input type="number" id="numberOfGuests" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Special Requests</label>
          <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
        </div>
        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="btn bg-green text-white w-48"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
