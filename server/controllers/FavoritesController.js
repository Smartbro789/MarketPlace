const express = require('express');
const router = express.Router();
const Favorites = require('../models/Favorites');
const { checkAuth } = require('../utils/checkAuth');

// Get favorite products for a user
router.get('/:userId', checkAuth, async (req, res) => {
    const favorites = await Favorites.findOne({ userId: req.params.userId }).populate('products.productId');
    if (!favorites) return res.status(404).send('Favorites not found');
    res.send(favorites);
});

// Add product to favorites
router.post('/', checkAuth, async (req, res) => {
    const { userId, productId } = req.body;
    let favorites = await Favorites.findOne({ userId });

    if (favorites) {
        if (!favorites.products.includes(productId)) {
            favorites.products.push(productId);
        }
    } else {
        favorites = new Favorites({ userId, products: [productId] });
    }

    await favorites.save();
    res.status(201).send(favorites);
});

// Remove product from favorites
router.delete('/:userId/:productId', checkAuth, async (req, res) => {
    const favorites = await Favorites.findOne({ userId: req.params.userId });

    if (!favorites) return res.status(404).send('Favorites not found');

    favorites.products = favorites.products.filter(p => p.toString() !== req.params.productId);
    await favorites.save();
    res.send(favorites);
});

module.exports = router;