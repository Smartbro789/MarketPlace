const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const { checkAuth } = require('../utils/checkAuth');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Create a new product
router.post('/', checkAuth, async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
});

// Update product
router.put('/:id', checkAuth, async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
});

// Delete product
router.delete('/:id', checkAuth, async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
});

module.exports = router;