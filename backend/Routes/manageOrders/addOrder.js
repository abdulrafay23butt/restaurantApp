import express from 'express';
import Purchase from '../../Models/Purchase.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const { id, total } = req.body;
    console.log(id, total)
    try {
        if (!total || !id) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newPurchase = new Purchase({ user: id, paid: total })
        await newPurchase.save();

        res.status(200).json({ message: "Purchased Successfully" })
    } catch (err) {
        console.error('Error saving purchasing:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router