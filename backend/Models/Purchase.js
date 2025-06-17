// models/User.js
import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    paid: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const purchase = mongoose.model('Purchase', purchaseSchema);

export default purchase;
