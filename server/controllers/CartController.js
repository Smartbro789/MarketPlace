const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { checkAuth } = require('../utils/checkAuth');

router.get('/:userId', checkAuth, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    if (!cart) return res.status(404).send('Кошик порожній');
    res.send(cart);
});

router.post('/', checkAuth, async (req, res) => {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (cart) {
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
    } else {
        cart = new Cart({ userId, products: [{ productId, quantity }] });
    }

    await cart.save();
    res.status(201).send(cart);
});

router.put('/:userId/:productId', checkAuth, async (req, res) => {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.status(404).send('Кошик порожній');

    const productIndex = cart.products.findIndex(p => p.productId.toString() === req.params.productId);
    if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.send(cart);
    } else {
        res.status(404).send('Товар не знайдено в кошику');
    }
});

router.delete('/:userId/:productId', checkAuth, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.status(404).send('Кошик порожній');

    cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
    await cart.save();
    res.send(cart);
});

module.exports = router;