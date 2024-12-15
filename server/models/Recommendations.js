import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
    algorithmType: { type: String, required: true },
    parameters: { type: Object }
});

export default mongoose.model('Recommendations', recommendationSchema);