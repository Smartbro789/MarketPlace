import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    favoriteCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }],
    viewedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    recommendedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    ratingHistory: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
            grade: { type: Number, min: 1, max: 5 }
        }
    ],
    interactionData: { type: Object }
});

export default mongoose.model('UserProfile', userProfileSchema);