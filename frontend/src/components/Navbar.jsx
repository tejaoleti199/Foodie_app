import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { cart, user, setIsCartOpen, setIsAuthOpen, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* LOGO */}
        <a href="#" className="logo">
          <i className="fas fa-hamburger" style={{color: 'var(--accent-primary)', fontSize: '1.5rem'}}></i>
          <span>Foodie</span>
        </a>

        {/* MOBILE TOGGLE */}
        <div className={`hamburger ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* LINKS */}
        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <li><a href="#home" className="nav-link" onClick={() => setMobileOpen(false)}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setMobileOpen(false)}>About</a></li>
          <li><a href="#menu" className="nav-link" onClick={() => setMobileOpen(false)}>Menu</a></li>
          <li><a href="#how-it-works" className="nav-link" onClick={() => setMobileOpen(false)}>How It Works</a></li>
          <li><a href="#reviews" className="nav-link" onClick={() => setMobileOpen(false)}>Reviews</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => setMobileOpen(false)}>Contact</a></li>
        </ul>

        {/* CONTROLS */}
        <div className="nav-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <i className="fas fa-shopping-bag"></i>
            <span className={`cart-badge ${cartCount > 0 ? 'bump' : ''}`}>{cartCount}</span>
          </button>
          
          <button 
            className="btn btn-primary btn-sm auth-btn" 
            onClick={() => user ? logout() : setIsAuthOpen(true)}
            title={user ? 'Sign Out' : 'Sign In'}
          >
            <i className="fas fa-user"></i>
            <span>{user ? user.name.split(' ')[0] : 'Sign In'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
