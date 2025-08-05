import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-green">{review.name}</h2>
        <p className="text-gray-600 mt-1">Rating: <span className="text-green">{review.rating}</span></p>
        <p className="text-green mt-1">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
