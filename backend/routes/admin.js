const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Middleware to protect the admin routes
router.use(authMiddleware);

// Get all sub admins (Only accessible by admin)
router.get('/subadmins', async (req, res) => {
    try {
        // Check if the logged-in user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins can retrieve subadmins' });
        }

        // Retrieve all sub admins including their passwords
        const subAdmins = await User.find({ role: 'subadmin' });

        res.status(200).json(subAdmins);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve sub admins' });
    }
});
// Create a new sub admin (Only accessible by admin)
router.post('/subadmins', async (req, res) => {
    try {
        // Check if the logged-in user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins can create subadmins' });
        }

        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const subAdmin = new User({
            username,
            password: hashedPassword,
            role: 'subadmin',
        });

        await subAdmin.save();

        res.status(201).json({ message: 'Sub admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create sub admin' });
    }
});

// Update a sub admin
router.put('/subadmins/:id', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(req.params.id, {
            username,
            password: hashedPassword,
        });

        res.status(200).json({ message: 'Sub admin updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update sub admin' });
    }
});

// Delete a sub admin
router.delete('/subadmins/:id', async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Sub admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete sub admin' });
    }
});

module.exports = router;
