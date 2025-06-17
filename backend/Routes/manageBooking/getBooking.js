import express from 'express';
import Booking from '../../Models/Booking.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const branchId = req.params.id;
        // console.log(branchId)

        const bookings = await Booking.find({user: id});

        if (!bookings) {
            return res.status(404).json({ error: 'Bookings not found.' });
        }
        // console.log("branch.menu",branch.menu)

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;