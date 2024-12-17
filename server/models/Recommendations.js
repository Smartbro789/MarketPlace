const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
    score: { type: Number, required: true },
});

module.exports = mongoose.model('Recommendations', recommendationSchema);