const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const bcrypt = require("bcrypt")

// Middleware to protect the profile route
router.use(authMiddleware);

// Get user profile
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).select('-password');

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user profile' });
    }
});

// Update user password
router.put('/updatepassword', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        // Check if the current password is valid
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update password' });
    }
});

module.exports = router;
