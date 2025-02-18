import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, lowercase: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Added price field
    features: { type: [String], required: true }, // Added features field
    image: { type: String, required: true }
}, { timestamps: true });

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
