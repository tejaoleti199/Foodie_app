import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    { name: "Sarah Mitchell", role: "Regular Customer", text: "The Margherita Pizza was absolutely divine! Fresh basil, perfect crust, and the delivery was lightning fast.", img: "/images/pic-1.png", rating: 5 },
    { name: "John Davis", role: "Food Critic", text: "Finally, a food delivery service that cares about quality. The Wild Mushroom Risotto arrived piping hot.", img: "/images/pic-2.png", rating: 5 },
    { name: "Emily Chen", role: "Local Guide", text: "Their burgers are out of this world! The Smash Burger has become my go-to weekend treat.", img: "/images/pic-3.png", rating: 4 },
    { name: "Michael Thompson", role: "Chef", text: "As a chef myself, I'm usually critical of delivery food. Foodie has consistently exceeded my expectations.", img: "/images/pic-4.png", rating: 5 }
  ];

  return (
    <section id="reviews" className="section reviews">
      <div className="container">
        <div className="section-header text-center reveal active">
          <h2 className="section-title">What Our <span className="text-secondary">Customers</span> Say</h2>
        </div>

        <div className="reviews-slider reveal active">
          <div className="reviews-track" style={{ transform: `translateX(-${currentSlide * 100}%)`, display: 'flex', transition: 'transform 0.5s ease' }}>
            {reviews.map((r, i) => (
              <div key={i} className="review-card" style={{ minWidth: '100%', padding: '20px' }}>
                <div className="review-rating" style={{color: 'var(--accent-secondary)'}}>
                  {[...Array(r.rating)].map((_, idx) => <i key={idx} className="fas fa-star"></i>)}
                </div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-user" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                  <div className="review-avatar" style={{width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden'}}>
                    <img src={r.img} alt={r.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </div>
                  <div className="review-user-info">
                    <h4>{r.name}</h4>
                    <span>{r.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="review-controls" style={{display:'flex', justifyContent:'center', gap:'20px', marginTop:'20px'}}>
            <button className="review-btn" onClick={() => setCurrentSlide(prev => (prev === 0 ? reviews.length - 1 : prev - 1))} style={{background:'var(--surface-light)', border:'none', padding:'10px 20px', borderRadius:'50px', color:'white', cursor:'pointer'}}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <button className="review-btn" onClick={() => setCurrentSlide(prev => (prev === reviews.length - 1 ? 0 : prev + 1))} style={{background:'var(--surface-light)', border:'none', padding:'10px 20px', borderRadius:'50px', color:'white', cursor:'pointer'}}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
