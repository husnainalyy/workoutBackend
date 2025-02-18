const User = require("../models/User");

// Get authenticated user's profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-__v -createdAt -updatedAt');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const updates = {
            name: req.body.name,
            username: req.body.username,
            image: req.body.image,
            membership: req.body.membership
        };

        // Validate membership type
        if (updates.membership && !['premium', 'freemium'].includes(updates.membership)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid membership type'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-__v -createdAt -updatedAt');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: error.code === 11000 ? 'Username already exists' : 'Server error'
        });
    }
};

// Delete user permanently
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user._id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User account deleted permanently'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    deleteUser
};