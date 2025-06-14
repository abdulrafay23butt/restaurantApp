// routes/branchRoutes.js
import express from 'express';
import User from '../../Models/User.js'; // assuming this model represents branches

const router = express.Router();

// GET all branches
router.get('/', async (req, res) => {
    try {
        const users = await User.find({
            role: { $regex: 'manager', $options: 'i' }
        }); // fetch all documents
        // console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching managers', error });
    }
});

export default router;
