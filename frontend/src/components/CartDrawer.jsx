import React from 'react';
import { useApp } from '../context/AppContext';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, user, setIsAuthOpen, setIsOrderOpen } = useApp();

  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setIsAuthOpen(true);
      return;
    }
    setIsCartOpen(false);
    setIsOrderOpen(true);
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`overlay ${isCartOpen ? 'active' : ''}`} 
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="fas fa-shopping-basket"></i>
              <p>Your cart is empty</p>
              <button className="btn btn-primary btn-sm" onClick={() => setIsCartOpen(false)}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-img">
                    <img src={`/${item.image}`} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price * item.quantity}</div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, -1)}>
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, 1)}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item._id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <span>₹{getCartTotal()}</span>
            </div>
            <div className="cart-total-row">
              <span>Delivery Fee</span>
              <span>₹40</span>
            </div>
            <div className="cart-total-row cart-final-total">
              <span>Total</span>
              <span>₹{getCartTotal() + 40}</span>
            </div>
            <button className="btn btn-primary w-100" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
