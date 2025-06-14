// routes/branchRoutes.js
import express from 'express';
import Branch from '../../Models/Branch.js'; 

const router = express.Router();

// GET all branches
router.get('/', async (req, res) => {
    try {
        const branches = await Branch.find(); 
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching branches', error });
    }
});

export default router;
