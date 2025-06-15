// routes/branchRoutes.js
import express from 'express';
import User from '../../Models/User.js';
import Branch from '../../Models/Branch.js'

const router = express.Router();

// GET all managers and workers
router.get('/', async (req, res) => {
    try {
        const assignedManagerIds = await Branch.find().distinct('manager');
        // console.log(assignedManagerIds)

        const unassignedManagers = await User.find({
            role: 'manager',
            _id: { $nin: assignedManagerIds }
        });
        // console.log("unassignedManagers", unassignedManagers)

        res.status(200).json(unassignedManagers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching unassigned managers', error });
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
