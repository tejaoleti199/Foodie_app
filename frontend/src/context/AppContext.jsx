import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // ─── State ──────────────────────────────────────────────
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('foodie_cart') || '[]'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('foodie_user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('foodie_token') || null);
  const [menuItems, setMenuItems] = useState([]);
  const [toasts, setToasts] = useState([]);
  
  // Modals / Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // ─── Effects ──────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('foodie_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle Auth Persistence
  useEffect(() => {
    if (user && token) {
      localStorage.setItem('foodie_user', JSON.stringify(user));
      localStorage.setItem('foodie_token', token);
    } else {
      localStorage.removeItem('foodie_user');
      localStorage.removeItem('foodie_token');
    }
  }, [user, token]);

  // ─── Actions ──────────────────────────────────────────────
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`${item.name} added to cart!`, 'success');
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i._id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === itemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => setCart([]);

  const logout = () => {
    setUser(null);
    setToken(null);
    showToast('Signed out successfully', 'info');
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      user, setUser, token, setToken, logout,
      menuItems, setMenuItems,
      toasts, showToast,
      isCartOpen, setIsCartOpen,
      isAuthOpen, setIsAuthOpen,
      isOrderOpen, setIsOrderOpen,
      isSuccessOpen, setIsSuccessOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};
