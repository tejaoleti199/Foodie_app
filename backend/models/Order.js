const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: String
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Delivery address is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'online'],
    default: 'cod'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
