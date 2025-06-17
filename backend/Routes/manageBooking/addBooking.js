import express from 'express';
import Booking from '../../Models/Booking.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const { reserveDetails, id } = req.body;
    const { name, phone, seats, date, time} = reserveDetails;
    try {
        if (!name || !phone || !seats || !date || !time || !id) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newBooking = new Booking({ name, phone, seats, user:id, date, time })
        await newBooking.save();

        res.status(200).json({ message: "Booking Added Successfully" })
    } catch (err) {
        console.error('Error saving booking:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router