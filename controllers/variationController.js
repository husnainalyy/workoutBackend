const Variation = require("../models/Variation");
const User = require("../models/User");

// Create Variation
const createVariation = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Variation name is required"
            });
        }

        const newVariation = new Variation({
            user: req.user._id,
            name
        });

        await newVariation.save();

        res.status(201).json({
            success: true,
            data: newVariation
        });

    } catch (error) {
        console.error("Variation creation error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Get All User's Variations
const getUserVariations = async (req, res) => {
    try {
        const variations = await Variation.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: variations
        });
    } catch (error) {
        console.error("Get variations error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Update Variation
const updateVariation = async (req, res) => {
    try {
        const { name } = req.body;
        const variationId = req.params.id;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "New variation name is required"
            });
        }

        const updatedVariation = await Variation.findOneAndUpdate(
            { _id: variationId, user: req.user._id },
            { name },
            { new: true, runValidators: true }
        );

        if (!updatedVariation) {
            return res.status(404).json({
                success: false,
                message: "Variation not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedVariation
        });

    } catch (error) {
        console.error("Update variation error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Delete Variation
const deleteVariation = async (req, res) => {
    try {
        const variationId = req.params.id;

        const deletedVariation = await Variation.findOneAndDelete({
            _id: variationId,
            user: req.user._id
        });

        if (!deletedVariation) {
            return res.status(404).json({
                success: false,
                message: "Variation not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Variation deleted successfully"
        });

    } catch (error) {
        console.error("Delete variation error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createVariation,
    getUserVariations,
    updateVariation,
    deleteVariation
};