const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Place a new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, phone, paymentMethod, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      deliveryAddress,
      phone,
      paymentMethod: paymentMethod || 'cod',
      notes: notes || '',
      status: 'confirmed'
    });

    // Simulate status progression
    setTimeout(async () => {
      try {
        await Order.findByIdAndUpdate(order._id, { status: 'preparing' });
      } catch (e) {}
    }, 15000);

    setTimeout(async () => {
      try {
        await Order.findByIdAndUpdate(order._id, { status: 'out_for_delivery' });
      } catch (e) {}
    }, 30000);

    setTimeout(async () => {
      try {
        await Order.findByIdAndUpdate(order._id, { status: 'delivered' });
      } catch (e) {}
    }, 60000);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get current user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
      .populate('items.menuItem');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
