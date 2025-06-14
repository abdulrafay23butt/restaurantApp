// models/User.js
import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    manager: {
        type: String,
        required: true,
        trim: true
    },
    cuisines: {
        type: [String],
        enum: ['italian', 'chinese', 'indian', 'mexican', 'american', 'thai', 'japanese', 'french', 'mediterranean'],
        default: ['italian'],
        lowercase: true
    },
    image: {
        type: String
    }

}, {
    timestamps: true
});

const branch = mongoose.model('Branch', branchSchema);

export default branch;
