/* ═══════════════════════════════════════════════════
   FOODIE — Main Application JavaScript
   API Integration | Cart | Auth | Animations
   ═══════════════════════════════════════════════════ */

const API_BASE = window.location.origin + '/api';

// ═══════ STATE ═══════
let state = {
  cart: JSON.parse(localStorage.getItem('foodie_cart') || '[]'),
  user: JSON.parse(localStorage.getItem('foodie_user') || 'null'),
  token: localStorage.getItem('foodie_token') || null,
  menuItems: [],
  currentCategory: 'all',
  reviewIndex: 0,
};

// ═══════ DOM ELEMENTS ═══════
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ═══════ PRELOADER ═══════
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = $('#preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }
    initApp();
  }, 2000);
});

function initApp() {
  initNavbar();
  initScrollReveal();
  initHeroStats();
  loadMenuItems();
  updateCartUI();
  updateAuthUI();
  initMenuTabs();
  initCart();
  initAuth();
  initOrderModal();
  initNewsletter();
  initReviewSlider();
  initBackToTop();
  initSmoothScroll();
}

// ═══════ NAVBAR ═══════
function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks = $('#nav-links');
  const navLinkEls = $$('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      
      // Active state
      navLinkEls.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Active section tracking on scroll
  const sections = $$('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinkEls.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });
}

// ═══════ SCROLL REVEAL ═══════
function initScrollReveal() {
  const reveals = $$('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ═══════ HERO STATS COUNTER ═══════
function initHeroStats() {
  const statNums = $$('.stat-number[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));

  // Stats section counters
  const counters = $$('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, 0, target, 2500);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}

function animateCounter(el, start, end, duration) {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  const maxStep = Math.max(stepTime, 1);
  let current = start;
  
  const step = () => {
    const remaining = end - current;
    const delta = Math.max(1, Math.floor(Math.abs(remaining) / 20));
    current += delta * increment;
    
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      el.textContent = end.toLocaleString();
      return;
    }
    
    el.textContent = current.toLocaleString();
    requestAnimationFrame(step);
  };
  
  requestAnimationFrame(step);
}

// ═══════ MENU ITEMS ═══════
async function loadMenuItems() {
  try {
    const res = await fetch(`${API_BASE}/menu`);
    if (!res.ok) throw new Error('Failed to load menu');
    state.menuItems = await res.json();
    renderMenuItems();
  } catch (err) {
    console.error('Menu load error:', err);
    const grid = $('#menu-grid');
    grid.innerHTML = `
      <div class="menu-loading">
        <i class="fas fa-exclamation-circle" style="font-size:2rem;color:var(--accent-secondary);margin-bottom:16px;display:block;"></i>
        <p>Unable to load menu. Please make sure the server is running.</p>
      </div>
    `;
  }
}

function renderMenuItems() {
  const grid = $('#menu-grid');
  const items = state.currentCategory === 'all'
    ? state.menuItems
    : state.menuItems.filter(item => item.category === state.currentCategory);

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="menu-loading">
        <i class="fas fa-search" style="font-size:2rem;color:var(--text-muted);margin-bottom:16px;display:block;"></i>
        <p>No items found in this category</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map((item, idx) => `
    <div class="menu-card" style="animation-delay: ${idx * 0.08}s">
      <div class="menu-card-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="menu-card-badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}">
          ${item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
        </span>
        <span class="menu-card-rating">
          <i class="fas fa-star"></i> ${item.rating}
        </span>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-category">${item.category}</div>
        <h3 class="menu-card-name">${item.name}</h3>
        <p class="menu-card-desc">${item.description}</p>
        <div class="menu-card-meta">
          <span><i class="fas fa-clock"></i> ${item.prepTime}</span>
          <span><i class="fas fa-user"></i> Serves ${item.serves}</span>
        </div>
        <div class="menu-card-footer">
          <div class="menu-card-price">
            <span class="price-current">₹${item.price}</span>
            ${item.originalPrice ? `<span class="price-original">₹${item.originalPrice}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" data-id="${item._id}" onclick="addToCart('${item._id}')" aria-label="Add to cart">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ═══════ MENU TABS ═══════
function initMenuTabs() {
  const tabContainer = $('#menu-tabs');
  if (!tabContainer) return;

  tabContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.menu-tab');
    if (!tab) return;

    $$('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    state.currentCategory = tab.getAttribute('data-category');
    renderMenuItems();
  });
}

// ═══════ CART SYSTEM ═══════
function initCart() {
  const cartBtn = $('#cart-btn');
  const cartClose = $('#cart-close');
  const overlay = $('#overlay');
  const cartBrowseBtn = $('#cart-browse-btn');

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  if (cartBrowseBtn) {
    cartBrowseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeCart();
      document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Checkout button
  $('#checkout-btn').addEventListener('click', () => {
    if (!state.token) {
      closeCart();
      openAuthModal();
      showToast('Please sign in to place an order', 'info');
      return;
    }
    closeCart();
    openOrderModal();
  });
}

function openCart() {
  $('#cart-drawer').classList.add('open');
  $('#overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  $('#cart-drawer').classList.remove('open');
  $('#overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function addToCart(itemId) {
  const item = state.menuItems.find(i => i._id === itemId);
  if (!item) return;

  const existingIdx = state.cart.findIndex(i => i._id === itemId);
  
  if (existingIdx >= 0) {
    state.cart[existingIdx].quantity += 1;
  } else {
    state.cart.push({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();

  // Button animation
  const btn = document.querySelector(`.add-to-cart-btn[data-id="${itemId}"]`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<i class="fas fa-plus"></i>';
    }, 1200);
  }

  // Cart count bump
  const count = $('#cart-count');
  count.classList.add('bump');
  setTimeout(() => count.classList.remove('bump'), 300);

  showToast(`${item.name} added to cart!`, 'success');
}

function removeFromCart(itemId) {
  state.cart = state.cart.filter(i => i._id !== itemId);
  saveCart();
  updateCartUI();
  showToast('Item removed from cart', 'info');
}

function updateQuantity(itemId, delta) {
  const item = state.cart.find(i => i._id === itemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(itemId);
    return;
  }

  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('foodie_cart', JSON.stringify(state.cart));
}

function getCartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartUI() {
  const count = $('#cart-count');
  const cartItems = $('#cart-items');
  const cartFooter = $('#cart-footer');
  const cartEmpty = $('#cart-empty');
  const cartTotal = $('#cart-total');

  const totalItems = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  count.textContent = totalItems;

  if (state.cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty" id="cart-empty">
        <i class="fas fa-shopping-basket"></i>
        <p>Your cart is empty</p>
        <a href="#menu" class="btn btn-primary btn-sm" id="cart-browse-btn" onclick="closeCart(); return false;">Browse Menu</a>
      </div>
    `;
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'block';
  cartTotal.textContent = `₹${getCartTotal()}`;

  cartItems.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price * item.quantity}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQuantity('${item._id}', -1)">
            <i class="fas fa-minus"></i>
          </button>
          <span class="cart-item-qty">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity('${item._id}', 1)">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item._id}')">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

// ═══════ AUTH SYSTEM ═══════
function initAuth() {
  const authBtn = $('#auth-btn');
  const authClose = $('#auth-close');
  const authOverlay = $('#auth-overlay');
  const authTabs = $$('.auth-tab');
  const loginForm = $('#login-form');
  const registerForm = $('#register-form');

  authBtn.addEventListener('click', () => {
    if (state.user) {
      // Logout
      if (confirm('Are you sure you want to sign out?')) {
        logout();
      }
    } else {
      openAuthModal();
    }
  });

  authClose.addEventListener('click', closeAuthModal);
  authOverlay.addEventListener('click', closeAuthModal);

  // Tab switching
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.getAttribute('data-tab') === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
      } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
      }
    });
  });

  // Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('#login-email').value;
    const password = $('#login-password').value;
    const errorEl = $('#login-error');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.message || 'Login failed';
        return;
      }

      state.user = data.user;
      state.token = data.token;
      localStorage.setItem('foodie_user', JSON.stringify(data.user));
      localStorage.setItem('foodie_token', data.token);

      updateAuthUI();
      closeAuthModal();
      showToast(`Welcome back, ${data.user.name}! 🎉`, 'success');
      loginForm.reset();
      errorEl.textContent = '';
    } catch (err) {
      errorEl.textContent = 'Network error. Please try again.';
    }
  });

  // Register
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#register-name').value;
    const email = $('#register-email').value;
    const phone = $('#register-phone').value;
    const password = $('#register-password').value;
    const errorEl = $('#register-error');

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.message || 'Registration failed';
        return;
      }

      state.user = data.user;
      state.token = data.token;
      localStorage.setItem('foodie_user', JSON.stringify(data.user));
      localStorage.setItem('foodie_token', data.token);

      updateAuthUI();
      closeAuthModal();
      showToast(`Welcome to Foodie, ${data.user.name}! 🎉`, 'success');
      registerForm.reset();
      errorEl.textContent = '';
    } catch (err) {
      errorEl.textContent = 'Network error. Please try again.';
    }
  });
}

function openAuthModal() {
  $('#auth-modal').classList.add('active');
  $('#auth-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  $('#auth-modal').classList.remove('active');
  $('#auth-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function logout() {
  state.user = null;
  state.token = null;
  localStorage.removeItem('foodie_user');
  localStorage.removeItem('foodie_token');
  updateAuthUI();
  showToast('Signed out successfully', 'info');
}

function updateAuthUI() {
  const authBtnText = $('#auth-btn-text');
  const authBtn = $('#auth-btn');

  if (state.user) {
    authBtnText.textContent = state.user.name.split(' ')[0];
    authBtn.title = `Signed in as ${state.user.name}. Click to sign out.`;
  } else {
    authBtnText.textContent = 'Sign In';
    authBtn.title = 'Sign In';
  }
}

// ═══════ ORDER SYSTEM ═══════
function initOrderModal() {
  const orderClose = $('#order-modal-close');
  const orderOverlay = $('#order-overlay');
  const orderForm = $('#order-form');
  const successClose = $('#success-close-btn');
  const successOverlay = $('#success-overlay');

  orderClose.addEventListener('click', closeOrderModal);
  orderOverlay.addEventListener('click', closeOrderModal);

  successClose.addEventListener('click', closeSuccessModal);
  successOverlay.addEventListener('click', closeSuccessModal);

  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const address = $('#order-address').value;
    const phone = $('#order-phone').value;
    const notes = $('#order-notes').value;
    const errorEl = $('#order-error');

    try {
      const orderItems = state.cart.map(item => ({
        menuItem: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: getCartTotal(),
          deliveryAddress: address,
          phone,
          notes
        })
      });

      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.message || 'Order failed';
        return;
      }

      // Success!
      state.cart = [];
      saveCart();
      updateCartUI();
      closeOrderModal();
      openSuccessModal();
      showToast('Order placed successfully! 🎉', 'success');
      orderForm.reset();
      errorEl.textContent = '';
    } catch (err) {
      errorEl.textContent = 'Network error. Please try again.';
    }
  });
}

function openOrderModal() {
  const summary = $('#order-summary');
  summary.innerHTML = `
    ${state.cart.map(item => `
      <div class="order-summary-item">
        <span>${item.name} × ${item.quantity}</span>
        <span>₹${item.price * item.quantity}</span>
      </div>
    `).join('')}
    <div class="order-summary-total">
      <span>Total</span>
      <span>₹${getCartTotal()}</span>
    </div>
  `;

  // Pre-fill phone if available
  if (state.user && state.user.phone) {
    $('#order-phone').value = state.user.phone;
  }
  if (state.user && state.user.address) {
    $('#order-address').value = state.user.address;
  }

  $('#order-modal').classList.add('active');
  $('#order-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  $('#order-modal').classList.remove('active');
  $('#order-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function openSuccessModal() {
  $('#success-modal').classList.add('active');
  $('#success-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Animate timeline steps
  const steps = $$('#order-timeline .timeline-step');
  steps.forEach((step, i) => {
    step.classList.remove('active');
  });
  steps[0].classList.add('active');

  // Simulate status updates
  setTimeout(() => { if (steps[1]) steps[1].classList.add('active'); }, 3000);
  setTimeout(() => { if (steps[2]) steps[2].classList.add('active'); }, 6000);
  setTimeout(() => { if (steps[3]) steps[3].classList.add('active'); }, 10000);
}

function closeSuccessModal() {
  $('#success-modal').classList.remove('active');
  $('#success-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ═══════ NEWSLETTER ═══════
function initNewsletter() {
  const form = $('#newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#newsletter-email').value;
    if (email) {
      showToast('Subscribed successfully! Check your email for a 25% discount code. 🎉', 'success');
      form.reset();
    }
  });
}

// ═══════ REVIEW SLIDER ═══════
function initReviewSlider() {
  const track = $('#reviews-track');
  const prevBtn = $('#review-prev');
  const nextBtn = $('#review-next');
  const dotsContainer = $('#review-dots');
  
  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  let currentIndex = 0;
  let cardsPerView = window.innerWidth > 768 ? 2 : 1;

  // Create dots
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('review-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    const cardWidth = cards[0].offsetWidth + 30; // gap
    track.style.transform = `translateX(-${currentIndex * cardWidth * cardsPerView}px)`;

    dotsContainer.querySelectorAll('.review-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Auto-slide
  let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);

  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });

  // Handle resize
  window.addEventListener('resize', () => {
    cardsPerView = window.innerWidth > 768 ? 2 : 1;
  });
}

// ═══════ BACK TO TOP ═══════
function initBackToTop() {
  const btn = $('#back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ═══════ SMOOTH SCROLL ═══════
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ═══════ TOAST NOTIFICATIONS ═══════
function showToast(message, type = 'info') {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast', type);

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle'
  };

  toast.innerHTML = `
    <i class="${icons[type] || icons.info}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ═══════ CTA BANNER IMAGE FIX ═══════
// Fix the CTA banner background since images might be in different subdirectory
document.addEventListener('DOMContentLoaded', () => {
  const ctaBanner = document.querySelector('.cta-banner');
  if (ctaBanner) {
    ctaBanner.style.backgroundImage = "url('images/g-3.jpg')";
  }
});
