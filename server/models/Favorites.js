const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Products' }
});

module.exports = mongoose.model('Favorites', favoritesSchema);