import React, { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';

const Modals = () => {
  const { 
    isAuthOpen, setIsAuthOpen, 
    isOrderOpen, setIsOrderOpen, 
    isSuccessOpen, setIsSuccessOpen,
    setUser, setToken, showToast, cart, clearCart, user
  } = useApp();

  const [authTab, setAuthTab] = useState('login');
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');

  // Order Form State
  const [address, setAddress] = useState('');
  const [orderPhone, setOrderPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [orderError, setOrderError] = useState('');

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const endpoint = authTab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = authTab === 'login' ? { email, password } : { name, email, phone, password };
      
      const res = await axios.post(endpoint, payload);
      setUser(res.data.user);
      setToken(res.data.token);
      showToast(`Welcome ${res.data.user.name}! 🎉`, 'success');
      setIsAuthOpen(false);
      setEmail(''); setPassword(''); setName(''); setPhone('');
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setOrderError('');
    try {
      const orderItems = cart.map(item => ({
        menuItem: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      await axios.post('/api/orders', {
        items: orderItems,
        totalAmount: getCartTotal(),
        deliveryAddress: address,
        phone: orderPhone,
        notes
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('foodie_token')}` }
      });

      clearCart();
      setIsOrderOpen(false);
      setIsSuccessOpen(true);
      showToast('Order placed successfully! 🎉', 'success');
      setAddress(''); setNotes('');
    } catch (err) {
      setOrderError(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <>
      {/* ─── AUTH MODAL ─── */}
      <div className={`overlay ${isAuthOpen ? 'active' : ''}`} onClick={() => setIsAuthOpen(false)}></div>
      <div className={`modal auth-modal ${isAuthOpen ? 'active' : ''}`}>
        <button className="modal-close" onClick={() => setIsAuthOpen(false)}><i className="fas fa-times"></i></button>
        <div className="auth-header">
          <i className="fas fa-hamburger" style={{color: 'var(--accent-primary)', fontSize: '2rem', marginBottom: '10px'}}></i>
          <h2>Welcome to Foodie</h2>
        </div>
        
        <div className="auth-tabs">
          <button className={`auth-tab ${authTab === 'login' ? 'active' : ''}`} onClick={() => setAuthTab('login')}>Sign In</button>
          <button className={`auth-tab ${authTab === 'register' ? 'active' : ''}`} onClick={() => setAuthTab('register')}>Register</button>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          {authError && <div className="auth-error">{authError}</div>}
          
          {authTab === 'register' && (
            <div className="form-field">
              <i className="fas fa-user"></i>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Full Name" />
            </div>
          )}
          
          <div className="form-field">
            <i className="fas fa-envelope"></i>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email Address" />
          </div>

          {authTab === 'register' && (
            <div className="form-field">
              <i className="fas fa-phone"></i>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="Phone Number" />
            </div>
          )}
          
          <div className="form-field">
            <i className="fas fa-lock"></i>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            {authTab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>

      {/* ─── ORDER MODAL ─── */}
      <div className={`overlay ${isOrderOpen ? 'active' : ''}`} onClick={() => setIsOrderOpen(false)}></div>
      <div className={`modal order-modal ${isOrderOpen ? 'active' : ''}`}>
        <button className="modal-close" onClick={() => setIsOrderOpen(false)}><i className="fas fa-times"></i></button>
        <h2>Complete Your Order</h2>
        <div className="order-split">
          <div className="order-details-pane">
            <form onSubmit={handleOrder}>
              {orderError && <div className="form-error" style={{color: 'red'}}>{orderError}</div>}
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea rows="3" value={address} onChange={e => setAddress(e.target.value)} required placeholder="Full address with landmark"></textarea>
              </div>
              <div className="form-group">
                <label>Phone Number for Delivery</label>
                <input type="tel" value={orderPhone} onChange={e => setOrderPhone(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Delivery Notes (Optional)</label>
                <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g., Leave at the door" />
              </div>
              <button type="submit" className="btn btn-primary w-100">Place Order — ₹{getCartTotal() + 40}</button>
            </form>
          </div>
          <div className="order-summary-pane">
            <h3>Order Summary</h3>
            <div className="order-summary-items">
              {cart.map(item => (
                <div key={item._id} style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div style={{display:'flex', justifyContent:'space-between', borderTop:'1px solid #333', paddingTop:'10px'}}>
              <strong>Total</strong>
              <strong>₹{getCartTotal() + 40}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SUCCESS MODAL ─── */}
      <div className={`overlay ${isSuccessOpen ? 'active' : ''}`} onClick={() => setIsSuccessOpen(false)}></div>
      <div className={`modal success-modal ${isSuccessOpen ? 'active' : ''}`}>
        <button className="modal-close" onClick={() => setIsSuccessOpen(false)}><i className="fas fa-times"></i></button>
        <div className="success-icon-wrapper">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>Order Confirmed!</h2>
        <p>Your delicious food is being prepared.</p>
        
        <div className="order-status-timeline">
          <div className="timeline-step active">
            <div className="timeline-dot"><i className="fas fa-receipt"></i></div>
            <span>Confirmed</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step active">
            <div className="timeline-dot"><i className="fas fa-fire"></i></div>
            <span>Preparing</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="timeline-dot"><i className="fas fa-motorcycle"></i></div>
            <span>On the way</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <div className="timeline-dot"><i className="fas fa-home"></i></div>
            <span>Delivered</span>
          </div>
        </div>
        
        <button className="btn btn-primary w-100" onClick={() => setIsSuccessOpen(false)} style={{marginTop: '30px'}}>
          Continue Exploring
        </button>
      </div>
    </>
  );
};

export default Modals;
