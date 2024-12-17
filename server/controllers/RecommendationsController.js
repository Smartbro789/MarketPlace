const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendations');
const { checkAuth } = require('../utils/checkAuth');

// Get recommendations for a user
router.get('/:userId', checkAuth, async (req, res) => {
    const recommendations = await Recommendation.find({ userId: req.params.userId }).populate('productId');
    res.send(recommendations);
});

// Create a new recommendation
router.post('/', checkAuth, async (req, res) => {
    const recommendation = new Recommendation(req.body);
    await recommendation.save();
    res.status(201).send(recommendation);
});

module.exports = router;