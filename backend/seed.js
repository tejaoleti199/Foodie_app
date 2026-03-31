const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const seedData = [
  {
    name: 'Rainbow Veggie Sandwich',
    description: 'Fresh garden vegetables layered between artisan sourdough bread with herb cream cheese and tangy mustard dressing.',
    price: 250,
    originalPrice: 399,
    category: 'sandwiches',
    image: 'images/menu-1.jpg',
    rating: 4.5,
    prepTime: '15-20 min',
    serves: 1,
    isVeg: true
  },
  {
    name: 'Classic Smash Burger',
    description: 'Double smashed patties with melted cheddar, caramelized onions, pickles, and our signature smoky sauce.',
    price: 299,
    originalPrice: 449,
    category: 'burgers',
    image: 'images/menu-2.jpg',
    rating: 4.8,
    prepTime: '20-25 min',
    serves: 1,
    isVeg: false
  },
  {
    name: 'Truffle Mushroom Burger',
    description: 'Gourmet burger topped with sautéed mushrooms, truffle aioli, Swiss cheese, and crispy onion rings.',
    price: 349,
    originalPrice: 499,
    category: 'burgers',
    image: 'images/menu-3.jpg',
    rating: 4.7,
    prepTime: '25-30 min',
    serves: 1,
    isVeg: false
  },
  {
    name: 'Margherita Artisan Pizza',
    description: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil.',
    price: 399,
    originalPrice: 549,
    category: 'pizza',
    image: 'images/menu-4.jpg',
    rating: 4.9,
    prepTime: '20-30 min',
    serves: 2,
    isVeg: true
  },
  {
    name: 'Spicy Pepperoni Pizza',
    description: 'Loaded with premium pepperoni, mozzarella blend, roasted peppers, and chili-infused olive oil.',
    price: 449,
    originalPrice: 599,
    category: 'pizza',
    image: 'images/menu-5.jpg',
    rating: 4.6,
    prepTime: '20-30 min',
    serves: 2,
    isVeg: false
  },
  {
    name: 'Berry Stuffed French Toast',
    description: 'Thick-cut brioche French toast stuffed with mixed berries, cream cheese, topped with maple syrup.',
    price: 199,
    originalPrice: 299,
    category: 'desserts',
    image: 'images/menu-6.jpg',
    rating: 4.4,
    prepTime: '15-20 min',
    serves: 1,
    isVeg: true
  },
  {
    name: 'BBQ Glazed Wings',
    description: 'Crispy chicken wings tossed in smoky BBQ glaze, served with ranch dip and celery sticks.',
    price: 329,
    originalPrice: 449,
    category: 'starters',
    image: 'images/menu-7.jpg',
    rating: 4.7,
    prepTime: '25-30 min',
    serves: 2,
    isVeg: false
  },
  {
    name: 'Caesar Royale Salad',
    description: 'Crisp romaine hearts, shaved parmesan, garlic croutons, and house-made Caesar dressing.',
    price: 219,
    originalPrice: 329,
    category: 'salads',
    image: 'images/menu-8.jpg',
    rating: 4.3,
    prepTime: '10-15 min',
    serves: 1,
    isVeg: true
  },
  {
    name: 'Creamy Pesto Pasta',
    description: 'Al dente penne in a rich basil pesto cream sauce with sun-dried tomatoes and toasted pine nuts.',
    price: 349,
    originalPrice: 479,
    category: 'pasta',
    image: 'images/menu-9.jpg',
    rating: 4.5,
    prepTime: '20-25 min',
    serves: 1,
    isVeg: true
  },
  {
    name: 'Grilled Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers, onions, and mint chutney.',
    price: 279,
    originalPrice: 399,
    category: 'starters',
    image: 'images/dish-1.png',
    rating: 4.6,
    prepTime: '20-25 min',
    serves: 2,
    isVeg: true
  },
  {
    name: 'Wild Mushroom Risotto',
    description: 'Creamy Arborio rice slow-cooked with wild mushrooms, white wine, parmesan, and truffle oil.',
    price: 399,
    originalPrice: 549,
    category: 'pasta',
    image: 'images/dish-2.png',
    rating: 4.8,
    prepTime: '30-35 min',
    serves: 1,
    isVeg: true
  },
  {
    name: 'Mango Tango Smoothie',
    description: 'Tropical blend of fresh mango, passion fruit, coconut cream, and a hint of lime.',
    price: 149,
    originalPrice: 199,
    category: 'drinks',
    image: 'images/dish-3.png',
    rating: 4.4,
    prepTime: '5-10 min',
    serves: 1,
    isVeg: true
  }
];

const seedDatabase = async () => {
  try {
    await MenuItem.deleteMany({});
    const items = await MenuItem.insertMany(seedData);
    console.log(`🌱 Seeded ${items.length} menu items`);
    return items;
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    throw error;
  }
};

module.exports = { seedDatabase, seedData };
