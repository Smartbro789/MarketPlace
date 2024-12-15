import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});

export default mongoose.model('Orders', orderSchema);