const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🆕 IMPORT du rate limiting
const { generalLimiter } = require('../middleware/rateLimiter');

// ✅ APPLIQUER le rate limiting sur chaque route
router.get('/', generalLimiter, async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(filter).populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Rate limiting aussi sur la route single product
router.get('/:id', generalLimiter, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;