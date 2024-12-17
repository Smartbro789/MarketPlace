const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const Cart = require('../models/Cart');
const { checkAuth } = require('../utils/checkAuth');
const stripe = require('stripe')('your_stripe_secret_key');

router.post('/', checkAuth, async (req, res) => {
    const { userId, paymentMethodId } = req.body;

    // Retrieve cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) return res.status(400).send('Кошик порожній');

    // Calculate total amount
    const totalAmount = cart.products.reduce((total, item) => total + item.quantity * item.product.price, 0);

    // Create a new order
    const order = new Order({
        userId,
        products: cart.products,
        totalAmount,
    });

    // Process payment
    try {
        await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Amount in cents
            currency: 'uah',
            payment_method: paymentMethodId,
            confirm: true,
        });

        await order.save();
        // Clear the cart after successful checkout
        await Cart.findOneAndDelete({ userId });
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send('Оплата невдала: ' + error.message);
    }
});

module.exports = router;