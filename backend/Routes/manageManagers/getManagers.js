// routes/branchRoutes.js
import express from 'express';
import User from '../../Models/User.js'; // assuming this model represents branches

const router = express.Router();

// GET all managers and workers
router.get('/', async (req, res) => {
    try {
        const users = await User.find({
            role: { $in: ['worker', 'branch manager', 'head branch manager'] }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching managers/workers', error });
    }
});

// PUT update user details and role
router.put('/:id', async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

export default router;
