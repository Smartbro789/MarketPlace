const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    grade: { type: Number, min: 1, max: 5 },
    category: { type: String, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

module.exports = mongoose.model('Products', productSchema);