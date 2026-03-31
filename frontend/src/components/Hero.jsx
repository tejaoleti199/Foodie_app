import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    // Simple counter animation
    const animateCounter = (el, start, end, duration) => {
      const range = end - start;
      const stepTime = Math.abs(Math.floor(duration / range));
      let current = start;
      const step = () => {
        current += end > start ? 1 : -1;
        if ((end > start && current >= end) || (end < start && current <= end)) {
          el.textContent = end.toLocaleString();
          return;
        }
        el.textContent = current.toLocaleString();
        requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 500);
    };

    const statNums = document.querySelectorAll('.stat-number');
    statNums.forEach(el => animateCounter(el, 0, parseInt(el.getAttribute('data-count')), 2000));
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        
        <div className="hero-content reveal active">
          <div className="hero-badge">
            <span className="dot"></span>
            #1 Food Delivery in Town
          </div>
          <h1 className="hero-title">
            Savor Every <span className="text-gradient">Delicious</span> Moment
          </h1>
          <p className="hero-subtitle">
            Fresh ingredients, expert chefs, and lightning-fast delivery. 
            Experience restaurant-quality meals at your doorstep.
          </p>
          <div className="hero-cta">
            <a href="#menu" className="btn btn-primary">
              Order Now <i className="fas fa-arrow-right"></i>
            </a>
            <a href="#how-it-works" className="btn btn-outline">
              <i className="fas fa-play"></i> Watch Video
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number" data-count="50">0</span>+
              <span className="stat-label">Restaurants</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number" data-count="20">0</span>k+
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number" data-count="99">0</span>%
              <span className="stat-label">Positive Reviews</span>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal active" style={{ transitionDelay: '0.2s' }}>
          <div className="hero-glow"></div>
          <img src="/images/home-img-1.png" alt="Delicious dish" className="hero-plate" />
          
          <div className="floating-card card-1">
            <img src="/images/pic-1.png" alt="Paneer" />
            <div className="floating-card-info">
              <h4>Paneer Tikka</h4>
              <span className="price">₹279</span>
            </div>
          </div>
          
          <div className="floating-card card-2">
            <img src="/images/pic-2.png" alt="Special" />
            <div className="floating-card-info">
              <h4>Special Bowl</h4>
              <span className="price">₹349</span>
            </div>
          </div>
          
          <div className="floating-card card-3">
            <div className="rating-badge">
              <i className="fas fa-star text-warning"></i> 4.8
            </div>
            <span>Top Rated</span>
          </div>
        </div>

        <a href="#about" className="hero-scroll-indicator">
          <div className="mouse"></div>
          <span>Scroll Down</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
