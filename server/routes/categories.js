const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET category and its products by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const products = await Product.find({ category: category._id }).populate('category');
    
    // Retourner la catégorie ET les produits
    res.json({ 
      category, 
      products 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;