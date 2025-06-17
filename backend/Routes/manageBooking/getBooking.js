import express from 'express';
import Booking from '../../Models/Booking.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Find bookings associated with this user ID
        const bookings = await Booking.find({ user: userId });

        // Mongoose find() returns an empty array if no documents match, not null/undefined.
        // So, we can directly send the bookings array.
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;