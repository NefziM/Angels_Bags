const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  images: [String],
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 0 },
  customizationOptions: {
    colors: [String],
    sizes: [String],
    personalization: {
      available: Boolean,
      maxCharacters: Number
    }
  },
  featured: { type: Boolean, default: false },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);