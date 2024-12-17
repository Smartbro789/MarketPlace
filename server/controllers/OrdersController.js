const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const { checkAuth } = require('../utils/checkAuth');

// Get all orders for a user
router.get('/:userId', checkAuth, async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
    res.send(orders);
});

// Get order by ID
router.get('/order/:id', checkAuth, async (req, res) => {
    const order = await Order.findById(req.params.id).populate('products.productId');
    if (!order) return res.status(404).send('Order not found');
    res.send(order);
});

module.exports = router;