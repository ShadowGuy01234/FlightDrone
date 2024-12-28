// models/Product.js
import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String, required: true },
  slug: { type: String, lowercase: true, unique: true },
  shipping: { type: String },
}
  ,
  {
    timestamps: true,
  }

);

const Product = mongoose.model('Product', productSchema);

export default Product;
