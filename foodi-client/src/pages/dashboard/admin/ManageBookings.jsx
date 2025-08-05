import React from 'react';
import useAuth from './../../../hooks/useAuth';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import { GiConfirmed } from "react-icons/gi";
import Swal from 'sweetalert2';

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get('/booking');
      return res.data;
    },
  });

  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/booking/${id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "The booking has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/booking/${id}/status`, { status });
      if (res.status === 200) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Booking status updated!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  return (
    <div>
      {/* Title and total bookings */}
      <div className='flex items-center justify-between m-4'>
        <h5>All Bookings</h5>
        <h5>Total Bookings: {bookings.length}</h5>
      </div>

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* Table head */}
            <thead className='bg-green text-white rounded-lg'>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Date</th>
                <th>Time</th>
                <th>Number of Guests</th>
                <th>Status</th>
                <th>Confirm Booking</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{booking.email}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.numberOfGuests}</td>
                  <td>{booking.status}</td>
                  <td className='text-center'>
                    {booking.status === "confirmed" ? (
                      "done"
                    ) : (
                      <button onClick={() => handleUpdateStatus(booking._id, 'confirmed')} className='btn btn-xs bg-green text-white'>
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteBooking(booking._id)} className='btn btn-xs bg-orange-500 text-white'>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
