import React from 'react';

const Steps = () => {
  return (
    <section id="how-it-works" className="section steps">
      <div className="container">
        <div className="section-header text-center reveal active">
          <div className="section-subtitle">How It Works</div>
          <h2 className="section-title">Get Your Food in 3 Easy Steps</h2>
        </div>

        <div className="steps-grid reveal active">
          <div className="step-card">
            <div className="step-icon">
              <img src="/images/step-1.jpg" alt="Choose Food" />
            </div>
            <h3>1. Choose Your Food</h3>
            <p>Browse our extensive menu and select the dishes you're craving today.</p>
          </div>
          
          <div className="step-connector">
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="step-card">
            <div className="step-icon">
              <img src="/images/step-2.jpg" alt="Easy Payment" />
            </div>
            <h3>2. Easy Payment</h3>
            <p>Pay securely online using credit card, debit card, or UPI.</p>
          </div>
          
          <div className="step-connector">
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="step-card">
            <div className="step-icon">
              <img src="/images/step-3.jpg" alt="Fast Delivery" />
            </div>
            <h3>3. Fast Delivery</h3>
            <p>Our delivery partner brings hot food right to your doorstep.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
