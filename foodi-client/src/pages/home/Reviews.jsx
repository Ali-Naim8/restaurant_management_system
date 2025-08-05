import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewCard from '../../components/ReviewCard';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // You can change the number of reviews per page here
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:6001/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsTransitioning(false);
    }, 300); // Adjust the transition duration as needed
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    
    return (
      <>
        {Array(fullStars).fill(<span key={`full-${fullStars}`}>&#9733;</span>)}
        {halfStars > 0 && <span key={`half`}>★</span>}
        {Array(emptyStars).fill(<span key={`empty-${emptyStars}`}>&#9734;</span>)}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Customer Reviews</h2>
        <p className="text-lg text-gray-600 mt-2">See what our customers have to say about us</p>
      </div>
      <div className={`flex flex-wrap justify-center my-8 gap-4 ${isTransitioning ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'}`}>
        {currentReviews.map(review => (
          <div key={review._id} className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/3">
            <h3 className="text-xl font-semibold">{review.name}</h3>
            <div className="text-yellow-500">
              {renderStars(review.rating)}
            </div>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-8 gap-2">
        {Array.from({ length: Math.ceil(reviews.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
