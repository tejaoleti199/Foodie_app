import React from 'react';

const CTA = () => {
  return (
    <section className="cta-banner reveal active" style={{ backgroundImage: "url('/images/g-3.jpg')" }}>
      <div className="cta-overlay"></div>
      <div className="container">
        <div className="cta-content">
          <h2>Are you ready to order <br /> with the best deals?</h2>
          <a href="#menu" className="btn btn-primary">
            Proceed to order <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        
        {/* Newsletter Box */}
        <div className="newsletter-card reveal active">
          <div className="newsletter-content">
            <h2>Join Our Newsletter</h2>
            <p>Subscribe to get updates on new recipes and heavy discounts!</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
              <div className="form-group" style={{display: 'flex', gap: '10px'}}>
                <input type="email" placeholder="Enter your email" required style={{flex: 1, padding: '15px', borderRadius:'8px', border:'1px solid #333', background:'rgba(0,0,0,0.2)', color:'white'}} />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </div>
            </form>
          </div>
          <div className="newsletter-visual">
             <img src="/images/order-img.jpg" alt="Discount offer" style={{ borderRadius: '15px' }} />
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-logo">Foodie</h3>
            <p className="footer-desc">
              Premium food delivery service serving the community with fresh, hot, and delicious meals every single day.
            </p>
            <div className="footer-social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="#">Food Delivery</a></li>
              <li><a href="#">Catering Services</a></li>
              <li><a href="#">Party Orders</a></li>
              <li><a href="#">Table Reservation</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Contact Us</h3>
            <ul className="footer-contact">
              <li><i className="fas fa-map-marker-alt"></i> 123 Foodie Street, Tech Park, NY 10001</li>
              <li><i className="fas fa-phone-alt"></i> +1 (123) 456-7890</li>
              <li><i className="fas fa-envelope"></i> hello@foodie.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Foodie Delivery App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export { CTA, Footer };
