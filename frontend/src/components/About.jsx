import React from 'react';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div className="about-visual reveal active">
          <div className="about-img-main">
            <img src="/images/about-img.png" alt="Chef preparing food" loading="lazy" />
            <div className="about-experience-badge">
              <span className="exp-number">10+</span>
              <span className="exp-text">Years of<br/>Experience</span>
            </div>
          </div>
        </div>

        <div className="about-content reveal active" style={{ transitionDelay: '0.2s' }}>
          <div className="section-subtitle">About Us</div>
          <h2 className="section-title">We craft the best food in the city</h2>
          <p className="about-desc">
            For over a decade, we've been passionate about bringing people together over exceptional food. 
            Our master chefs carefully select the freshest local ingredients to create dishes that delight both the palate and the eye.
          </p>
          
          <div className="about-features">
            <div className="about-feature">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="feature-text">
                <h3>Fresh Ingredients</h3>
                <p>Locally sourced, organic produce delivered daily.</p>
              </div>
            </div>
            
            <div className="about-feature">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <div className="feature-text">
                <h3>Fast Delivery</h3>
                <p>Hot and fresh food delivered in 30 minutes.</p>
              </div>
            </div>
          </div>

          <a href="#menu" className="btn btn-primary">
            Explore Menu <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
