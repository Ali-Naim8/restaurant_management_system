import React from 'react';
import useAuth from './../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const Booking = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('access-token');

  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:6001/booking/email?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      return res.json();
    },
  });
  
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your<span className="text-green"> Bookings</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        {bookings.length > 0 ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-green text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Booking Date</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Time</th>
                      <th>Number of Guests</th>
                      <th>Special Requests</th>
                      <th>Status</th> {/* New Status Field */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.time}</td>
                        <td>{item.numberOfGuests}</td>
                        <td>{item.specialRequests}</td>
                        <td>{item.status}</td> {/* Render Status */}
                        <td>
                          <Link to="/contact" className="btn btn-xs bg-blue-500 text-white">
                            <FaEnvelope />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <div className="text-center mt-20">
            <p>No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
