const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');
const { checkAuth } = require('../utils/checkAuth');

// Get all reviews for a product
router.get('/product/:productId', async (req, res) => {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId');
    res.send(reviews);
});

// Create a new review
router.post('/', checkAuth, async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
});

// Update review
router.put('/:id', checkAuth, async (req, res) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).send('Review not found');
    res.send(review);
});

// Delete review
router.delete('/:id', checkAuth, async (req, res) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).send('Review not found');
    res.send(review);
});

module.exports = router;