import express from 'express';
import Booking from '../../Models/Booking.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const { reserveDetails, id } = req.body;
    const { name, phone, seats, date, time} = reserveDetails;
    
    console.log('Received booking request data:', { reserveDetails, id }); // Detailed log of incoming data

    try {
        if (!name || !phone || !seats || !date || !time || !id) {
            console.log('Missing fields:', { name, phone, seats, date, time, id }); // Log which fields are missing
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate phone type (if it's intended to be a Number in Mongoose)
        const parsedPhone = Number(phone);
        if (isNaN(parsedPhone)) {
            console.log('Invalid phone number format:', phone);
            return res.status(400).json({ error: "Phone number must be a valid number." });
        }

        // Validate date format (if needed, Mongoose Date can be flexible but stricter validation helps)
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            console.log('Invalid date format:', date);
            return res.status(400).json({ error: "Invalid date format." });
        }

        const newBooking = new Booking({ name, phone: parsedPhone, seats, user: id, date: parsedDate, time });
        await newBooking.save();

        res.status(200).json({ message: "Booking Added Successfully" });
    } catch (err) {
        console.error('Error saving booking to DB:', err); // Log the full Mongoose error
        // Check for Mongoose validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.keys(err.errors).map(key => err.errors[key].message);
            return res.status(400).json({ error: errors.join(', ') });
        } else if (err.name === 'CastError' && err.path === 'user') {
            return res.status(400).json({ error: 'Invalid user ID format.' });
        }
        res.status(500).json({ error: 'Internal server error: ' + err.message }); // Provide more context
    }
});

export default router;