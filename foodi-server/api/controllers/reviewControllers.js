const Review = require('../models/Reviews');

// Add a new review
const addReview = async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;
    const review = new Review({ name, email, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
};

const getReviews = async (req, res) => {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 });
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  };

  const getReviewSummary = async (req, res) => {
    try {
      const reviews = await Review.find();
      const reviewCount = reviews.length;
      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount;
  
      res.status(200).json({ averageRating, reviewCount });
    } catch (error) {
      console.error('Error fetching review summary:', error);
      res.status(500).json({ error: 'Failed to fetch review summary' });
    }
  };
  
  module.exports = { addReview, getReviews, getReviewSummary };