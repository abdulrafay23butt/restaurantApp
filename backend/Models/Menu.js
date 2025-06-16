// models/Menu.js
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
