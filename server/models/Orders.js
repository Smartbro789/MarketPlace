const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Orders', orderSchema);