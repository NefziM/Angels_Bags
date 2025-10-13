const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  slug: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);