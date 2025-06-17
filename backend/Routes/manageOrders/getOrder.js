import express from 'express';
import Purchase from '../../Models/Purchase.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const branchId = req.params.id;

        const profit = await Purchase.find({ branchId: branchId });
        
        res.status(200).json(profit);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;