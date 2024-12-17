const mongoose = require('mongoose');

const comparisonSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports = mongoose.model('Comparison', comparisonSchema);