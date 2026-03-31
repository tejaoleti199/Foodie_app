import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Steps from './components/Steps';
import Reviews from './components/Reviews';
import { CTA, Footer } from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Modals from './components/Modals';
import Toasts from './components/Toasts';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Steps />
        <CTA />
        <Reviews />
      </main>

      <Footer />

      {/* Drawers & Notifications */}
      <CartDrawer />
      <Modals />
      <Toasts />
    </div>
  );
}

export default App;
