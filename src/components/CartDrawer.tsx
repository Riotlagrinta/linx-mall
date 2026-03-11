'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cart-overlay"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-drawer"
          >
            <div className="cart-header">
              <h2>Mon Panier</h2>
              <button onClick={() => setIsCartOpen(false)} className="cart-close">
                <X size={24} />
              </button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} />
                  <p>Votre panier est vide</p>
                  <button onClick={() => setIsCartOpen(false)} className="btn btn-outline" style={{ border: '1px solid var(--border)', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>Continuer vos achats</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-img" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <div className="cart-item-price">{(item.price).toLocaleString('fr-FR')} FCFA</div>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary">
                  <span>Total</span>
                  <span className="cart-total-price">{(cartTotal).toLocaleString('fr-FR')} FCFA</span>
                </div>
                <Link 
                  href="/checkout" 
                  className="btn btn-primary btn-block"
                  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={() => setIsCartOpen(false)}
                >
                  Commander ({cart.reduce((a, b) => a + b.quantity, 0)})
                </Link>
              </div>
            )}
            
            <style dangerouslySetInnerHTML={{ __html: `
              .cart-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(4px);
                z-index: 10000;
              }
              .cart-drawer {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                max-width: 400px;
                background: var(--surface);
                z-index: 10001;
                display: flex;
                flex-direction: column;
                box-shadow: -10px 0 30px rgba(0,0,0,0.1);
                border-left: 1px solid var(--border);
              }
              .cart-header {
                padding: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid var(--border);
              }
              .cart-header h2 { font-size: 1.25rem; font-weight: 700; color: var(--text-main); }
              .cart-close { background: none; color: var(--text-muted); padding: 0.5rem; border-radius: 50%; display: flex; transition: var(--transition); cursor: pointer; border: none; }
              .cart-close:hover { background: var(--border); color: var(--text-main); }
              
              .cart-items {
                flex: 1;
                overflow-y: auto;
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
              }
              .empty-cart {
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                color: var(--text-muted);
                text-align: center;
              }
              .cart-item {
                display: flex;
                gap: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border);
              }
              .cart-item-img {
                width: 80px;
                height: 80px;
                border-radius: var(--radius);
                background-size: cover;
                background-position: center;
                background-color: var(--border);
              }
              .cart-item-info { flex: 1; display: flex; flex-direction: column; }
              .cart-item-info h4 { font-size: 0.95rem; color: var(--text-main); margin-bottom: 0.25rem; }
              .cart-item-price { font-weight: 700; color: var(--primary); font-size: 1rem; margin-bottom: 0.75rem; }
              .cart-item-actions { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
              
              .quantity-controls {
                display: flex;
                align-items: center;
                background: var(--background);
                border: 1px solid var(--border);
                border-radius: 99px;
                overflow: hidden;
              }
              .quantity-controls button {
                background: none;
                border: none;
                padding: 0.5rem 0.75rem;
                color: var(--text-main);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: var(--transition);
              }
              .quantity-controls button:hover { background: var(--border); }
              .quantity-controls span { font-weight: 600; font-size: 0.9rem; min-width: 24px; text-align: center; color: var(--text-main); }
              
              .remove-btn { color: var(--accent); background: rgba(239, 68, 68, 0.1); padding: 0.5rem; border-radius: 8px; display: flex; transition: var(--transition); cursor: pointer; border: none; }
              .remove-btn:hover { background: var(--accent); color: white; }
              
              .cart-footer {
                padding: 1.5rem;
                border-top: 1px solid var(--border);
                background: var(--surface);
              }
              .cart-summary {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                font-weight: 600;
                color: var(--text-main);
                font-size: 1.1rem;
              }
              .cart-total-price { font-size: 1.3rem; font-weight: 800; color: var(--primary); }
              .btn-block { width: 100%; display: flex; justify-content: center; padding: 1rem; border-radius: 12px; font-weight: 700; font-size: 1.05rem; cursor: pointer; border: none; background: var(--primary); color: white; }
            ` }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
