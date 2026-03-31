import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import axios from 'axios';

const Menu = () => {
  const { menuItems, setMenuItems, addToCart } = useApp();
  const [category, setCategory] = React.useState('all');
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        // Map to API endpoint. Proxy config inside Vite is recommended, but we can use direct URL
        const res = await axios.get('/api/menu');
        setMenuItems(res.data);
      } catch (err) {
        console.error('Failed to load menu', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [setMenuItems]);

  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);

  return (
    <section id="menu" className="section menu">
      <div className="container">
        <div className="section-header text-center reveal active">
          <div className="section-subtitle">Our Menu</div>
          <h2 className="section-title">Discover Our Signature Dishes</h2>
        </div>

        <div className="menu-tabs reveal active">
          {['all', 'burgers', 'pizza', 'salads', 'sandwiches', 'pasta', 'starters', 'desserts', 'drinks'].map(cat => (
            <button 
              key={cat}
              className={`menu-tab ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="menu-loading">
            <div className="loader-circle" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map((item, idx) => (
              <div 
                key={item._id} 
                className="menu-card reveal active" 
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="menu-card-img">
                  <img src={`/${item.image}`} alt={item.name} loading="lazy" />
                  <span className={`menu-card-badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
                    {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                  </span>
                  <span className="menu-card-rating">
                    <i className="fas fa-star"></i> {item.rating}
                  </span>
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-category">{item.category}</div>
                  <h3 className="menu-card-name">{item.name}</h3>
                  <p className="menu-card-desc">{item.description}</p>
                  <div className="menu-card-meta">
                    <span><i className="fas fa-clock"></i> {item.prepTime}</span>
                    <span><i className="fas fa-user"></i> Serves {item.serves}</span>
                  </div>
                  <div className="menu-card-footer">
                    <div className="menu-card-price">
                      <span className="price-current">₹{item.price}</span>
                      {item.originalPrice && <span className="price-original">₹{item.originalPrice}</span>}
                    </div>
                    <button 
                      className="add-to-cart-btn" 
                      onClick={() => addToCart(item)}
                      aria-label="Add to cart"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
