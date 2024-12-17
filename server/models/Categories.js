const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('Categories', categorySchema);