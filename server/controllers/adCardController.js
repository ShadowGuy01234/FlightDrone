import Ad from "../models/AdCard.js";
import slugify from "slugify";


export const createAdController = async (req, res) => {
    try {
        const { title, description, price, features, image } = req.body;
        if (!title || !description || !price || !features || !image) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const formattedFeatures = Array.isArray(features) ? features : features.split(',').map(item => item.trim());

        const ad = new Ad({ title, description, price, features: formattedFeatures, image, slug: slugify(title) });
        await ad.save();
        res.status(201).send({ success: true, message: 'Ad created successfully', ad });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error creating ad', error });
    }
};




export const updateAdController = async (req, res) => {
    try {
        const { title, description, price, features, image } = req.body;
        const { id } = req.params;
        if (!title || !description || !price || !features || !image) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const ad = await Ad.findByIdAndUpdate(id, { title, description, price, features, image, slug: slugify(title) }, { new: true });
        res.status(200).send({ success: true, message: 'Ad updated successfully', ad });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error updating ad', error });
    }
};

export const getAllAdsController = async (req, res) => {
    try {
        const ads = await Ad.find({});
        res.status(200).send({ success: true, ads, message: 'Ads fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error fetching ads', error });
    }
};

export const getSingleAdController = async (req, res) => {
    try {
        const ad = await Ad.findOne({ slug: req.params.slug });
        if (!ad) return res.status(404).send({ message: 'Ad not found' });
        res.status(200).send({ success: true, ad, message: 'Ad fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error fetching ad', error });
    }
};

export const deleteAdController = async (req, res) => {
    try {
        const { id } = req.params;
        const ad = await Ad.findByIdAndDelete(id);
        if (!ad) return res.status(404).send({ message: 'Ad not found' });
        res.status(200).send({ success: true, message: 'Ad deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error deleting ad', error });
    }
};
