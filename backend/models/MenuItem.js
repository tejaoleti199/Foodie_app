const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['burgers', 'pizza', 'sandwiches', 'pasta', 'starters', 'desserts', 'drinks', 'salads'],
    lowercase: true
  },
  image: {
    type: String,
    required: [true, 'Image path is required']
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  prepTime: {
    type: String,
    default: '20-30 min'
  },
  serves: {
    type: Number,
    default: 1
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVeg: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
