const express = require('express');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../schema/user');
const  validateObjectId= require('../middleware/index');

const router = express.Router();



// Get all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));

// Get all users with pagination
router.get('/pagination', asyncHandler(async (req, res) => {

    let { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', search = '' } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    try {
        
        const searchQuery = search
            ? { name: { $regex: search, $options: 'i' } } // Case-insensitive search by name
            : {};

        // Fetch paginated and sorted users
        const users = await User.find(searchQuery)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        // Get total document count for pagination info
        const totalUsers = await User.countDocuments(searchQuery);

        res.status(200).json({
            message: "Users fetched successfully",
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            data: users
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

// Get a user by ID
router.get('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
}));

// Create a new user
router.post('/', asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return res.status(409).json({ error: 'Email already exists' });
    }

    const newUser = await User.create({ name, email, phone });
    res.status(201).json({ message: 'User created successfully', user: newUser });
}));

// Update a user
router.put('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const { _id, createdAt, ...allowedUpdates } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        allowedUpdates,
        { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: 'Successfully updated', updatedUser });
}));

// Delete a user
router.delete('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: 'Successfully deleted', deletedUser });
}));




module.exports = router;
