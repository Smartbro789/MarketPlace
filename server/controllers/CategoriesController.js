const express = require('express');
const router = express.Router();
const Category = require('../models/Categories');
const { checkAuth } = require('../utils/checkAuth');

// Get all categories
router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
});

// Create a new category
router.post('/', checkAuth, async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
});

// Update category
router.put('/:id', checkAuth, async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).send('Category not found');
    res.send(category);
});

// Delete category
router.delete('/:id', checkAuth, async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    res.send(category);
});

module.exports = router;

