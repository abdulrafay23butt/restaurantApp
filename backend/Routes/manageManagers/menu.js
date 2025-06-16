import express from 'express';
import multer from 'multer';
import Menu from '../../Models/Menu.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = path.join('uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Add a new menu item
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category, branch, manager } = req.body;
        const image = req.file ? req.file.filename : null;
        console.log('Received fields:', { name, price, category, branch, manager, image });
        // Validate required fields
        if (!name || !price || !category || !branch || !manager) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        // Convert price to number
        const priceNum = Number(price);
        if (isNaN(priceNum)) {
            return res.status(400).json({ error: 'Price must be a number.' });
        }
        // Validate ObjectId format for branch and manager
        const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);
        if (!isValidObjectId(branch)) {
            return res.status(400).json({ error: 'Invalid branch ID.' });
        }
        if (!isValidObjectId(manager)) {
            return res.status(400).json({ error: 'Invalid manager ID.' });
        }
        const newMenu = new Menu({ name, price: priceNum, category, branch, manager, image });
        await newMenu.save();
        res.status(201).json({ message: 'Menu item added successfully', menu: newMenu });
    } catch (err) {
        console.error('Error in menu POST:', err);
        res.status(500).json({ error: err.message });
    }
});

// Update a menu item
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category, branch, manager } = req.body;
        let updateFields = { name, price, category, branch, manager };
        if (req.file) {
            updateFields.image = req.file.filename;
        }
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!updatedMenu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item updated successfully', menu: updatedMenu });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
    try {
        const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get menu items for a manager and branch
router.get('/', async (req, res) => {
    try {
        const { manager, branch } = req.query;
        if (!manager || !branch) {
            return res.status(400).json({ error: 'Manager and branch are required.' });
        }
        const menuItems = await Menu.find({ manager, branch });
        res.status(200).json(menuItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router; 