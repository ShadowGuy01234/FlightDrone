// models/Product.js
import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String, required: true },
  slug: { type: String, lowercase: true, unique: true },
  shipping: { type: String },
},
  {
    timestamps: true,
  });

// Add a virtual field for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.discountedPrice && this.price > this.discountedPrice) {
    return Math.round(((this.price - this.discountedPrice) / this.price) * 100);
  }
  return 0;
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
