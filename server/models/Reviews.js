import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    reviewID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    text: { type: String, required: true },
    grade: { type: Number, min: 1, max: 5, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});

export default mongoose.model('Reviews', reviewSchema);