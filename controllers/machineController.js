const Machine = require("../models/Machine");
const User = require("../models/User");

// Create Machine
const createMachine = async (req, res) => {
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Machine name is required"
            });
        }

        // Create machine
        const newMachine = new Machine({
            user: req.user._id,
            name
        });

        await newMachine.save();

        res.status(201).json({
            success: true,
            data: newMachine
        });

    } catch (error) {
        console.error("Machine creation error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Get All User's Machines
const getUserMachines = async (req, res) => {
    try {
        const machines = await Machine.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: machines
        });
    } catch (error) {
        console.error("Get machines error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Update Machine
const updateMachine = async (req, res) => {
    try {
        const { name } = req.body;
        const machineId = req.params.id;

        // Validate input
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "New machine name is required"
            });
        }

        const updatedMachine = await Machine.findOneAndUpdate(
            { _id: machineId, user: req.user._id },
            { name },
            { new: true, runValidators: true }
        );

        if (!updatedMachine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedMachine
        });

    } catch (error) {
        console.error("Update machine error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Delete Machine
const deleteMachine = async (req, res) => {
    try {
        const machineId = req.params.id;

        const deletedMachine = await Machine.findOneAndDelete({
            _id: machineId,
            user: req.user._id
        });

        if (!deletedMachine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Machine deleted successfully"
        });

    } catch (error) {
        console.error("Delete machine error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createMachine,
    getUserMachines,
    updateMachine,
    deleteMachine
};