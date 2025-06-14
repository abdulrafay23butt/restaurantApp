// routes/branchRoutes.js
import express from 'express';
import Branch from '../../Models/Branch.js';

const router = express.Router();

// GET all branches
router.delete('/', async (req, res) => {
    const { id } = req.body
    console.log(id);
    try {
        const deleted = await Branch.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: "Branch not found" });
        }
        res.status(200).json({message: "Branch deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching branches', error });
    }
});

export default router;
