const express = require('express');
const router = express.Router();
const Comparison = require('../models/Comparison');
const { checkAuth } = require('../utils/checkAuth');

// Get comparison list for a user
router.get('/:userID', checkAuth, async (req, res) => {
    const comparison = await Comparison.findOne({ userId: req.params.userId }).populate('products.productId');
    if (!comparison) return res.status(404).send('Список порівнянь не існує');
    res.send(comparison);
});

// Add product to comparison
router.post('/', checkAuth, async (req, res) => {
    const { userId, productId } = req.body;
    let comparison = await Comparison.findOne({ userId });

    if (comparison) {
        if (!comparison.products.includes(productId)) {
            comparison.products.push(productId);
        }
    } else {
        comparison = new Comparison({ userId, products: [productId] });
    }

    await comparison.save();
    res.status(201).send(comparison);
});

// Remove product from comparison
router.delete('/:userId/:productId', checkAuth, async (req, res) => {
    const comparison = await Comparison.findOne({ userId: req.params.userId });

    if (!comparison) return res.status(404).send('Comparison not found');

    comparison.products = comparison.products.filter(p => p.toString() !== req.params.productId);
    await comparison.save();
    res.send(comparison);
});

module.exports = router;