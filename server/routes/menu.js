const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// @route   GET /api/menu
// @desc    Get all menu items (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category, available } = req.query;
    const filter = {};

    if (category && category !== 'all') {
      filter.category = category.toLowerCase();
    }
    if (available !== undefined) {
      filter.isAvailable = available === 'true';
    }

    const menuItems = await MenuItem.find(filter).sort({ category: 1, name: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/menu/:id
// @desc    Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/menu/categories/list
// @desc    Get all unique categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
