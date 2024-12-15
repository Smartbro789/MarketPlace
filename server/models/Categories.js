import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    categoryID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true }
});

export default mongoose.model('Categories', categorySchema);