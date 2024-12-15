import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: { type: Object },
    isAdmin: { type: Boolean, default: false }
});

export default mongoose.model('Users', userSchema);