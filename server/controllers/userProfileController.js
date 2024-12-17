const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userProfile');
const { checkAuth } = require('../utils/checkAuth');

// Get user profile
router.get('/:userId', checkAuth, async (req, res) => {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).send('Profile not found');
    res.send(profile);
});

// Update user profile
router.put('/:userId', checkAuth, async (req, res) => {
    const profile = await UserProfile.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true });
    if (!profile) return res.status(404).send('Profile not found');
    res.send(profile);
});

module.exports = router;