import Hero from "../models/Hero.js";

// Create hero slide
export const createHero = async (req, res) => {
    try {
        const hero = await Hero.create(req.body);
        res.status(201).json({
            success: true,
            message: "Hero slide created successfully",
            hero,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating hero slide",
            error: error.message,
        });
    }
};

// Get all hero slides
export const getAllHeros = async (req, res) => {
    try {
        const heros = await Hero.find().sort("order");
        res.status(200).json({
            success: true,
            heros,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching hero slides",
            error: error.message,
        });
    }
};

// Update hero slide
export const updateHero = async (req, res) => {
    try {
        const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json({
            success: true,
            message: "Hero slide updated successfully",
            hero,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating hero slide",
            error: error.message,
        });
    }
};

// Delete hero slide
export const deleteHero = async (req, res) => {
    try {
        await Hero.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Hero slide deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting hero slide",
            error: error.message,
        });
    }
}; 