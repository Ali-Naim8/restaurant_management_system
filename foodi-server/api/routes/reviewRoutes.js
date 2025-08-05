const express = require('express');
const router = express.Router();
const { addReview, getReviews, getReviewSummary } = require('../controllers/reviewControllers');

// Add a review
router.post('/', addReview);

// Get all reviews
router.get('/', getReviews);

// Get review summary
router.get('/summary', getReviewSummary);

module.exports = router;
