'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const variants = isMobile 
    ? { initial: { y: '100%', x: 0 }, animate: { y: 0, x: 0 }, exit: { y: '100%', x: 0 } }
    : { initial: { x: '100%', y: 0 }, animate: { x: 0, y: 0 }, exit: { x: '100%', y: 0 } };

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
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-drawer"
          >
            <div className="cart-header">
              <div className="header-drag-handle"></div>
              <h2>Mon Panier</h2>
              <button onClick={() => setIsCartOpen(false)} className="cart-close">
                <X size={24} />
              </button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-icon-wrapper">
                    <ShoppingBag size={48} />
                  </div>
                  <h3>Votre panier est vide</h3>
                  <p>Il est temps de commencer votre shopping !</p>
                  <button onClick={() => setIsCartOpen(false)} className="btn btn-primary" style={{ marginTop: '1rem' }}>Continuer vos achats</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-img" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="cart-item-info">
                      <div className="item-top">
                        <h4>{item.name}</h4>
                        <button className="remove-btn-minimal" onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="cart-item-price">{(item.price).toLocaleString('fr-FR')} <small>FCFA</small></div>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary">
                  <span className="total-label">Total estimé</span>
                  <span className="cart-total-price">{(cartTotal).toLocaleString('fr-FR')} <small>FCFA</small></span>
                </div>
                <Link 
                  href="/checkout" 
                  className="btn btn-primary btn-checkout"
                  onClick={() => setIsCartOpen(false)}
                >
                  Commander maintenant
                </Link>
              </div>
            )}
            
            <style dangerouslySetInnerHTML={{ __html: `
              .cart-overlay {
                position: fixed;
                inset: 0;
                background: rgba(15, 23, 42, 0.4);
                backdrop-filter: blur(8px);
                z-index: 10000;
              }
              
              /* Base styles (Mobile: Bottom Sheet) */
              .cart-drawer {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 85vh;
                background: var(--card-bg);
                z-index: 10001;
                display: flex;
                flex-direction: column;
                box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
                border-radius: 32px 32px 0 0;
                overflow: hidden;
                border: 1px solid var(--border);
                border-bottom: none;
              }
              
              .cart-header {
                padding: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid var(--border);
                position: relative;
              }
              .header-drag-handle {
                position: absolute;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 5px;
                background: var(--border);
                border-radius: 99px;
              }
              .cart-header h2 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
              .cart-close { background: var(--surface); color: var(--text-muted); padding: 0.5rem; border-radius: 12px; display: flex; transition: var(--transition); cursor: pointer; border: none; }
              
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
                text-align: center;
                padding: 2rem;
              }
              .empty-icon-wrapper { width: 100px; height: 100px; background: var(--surface); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-muted); margin-bottom: 1.5rem; }
              .empty-cart h3 { font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
              .empty-cart p { color: var(--text-muted); }

              .cart-item {
                display: flex;
                gap: 1.25rem;
                padding-bottom: 1.25rem;
                border-bottom: 1px solid var(--border);
              }
              .cart-item-img {
                width: 90px;
                height: 90px;
                border-radius: 20px;
                background-size: cover;
                background-position: center;
                background-color: var(--surface);
                border: 1px solid var(--border);
                flex-shrink: 0;
              }
              .cart-item-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
              .item-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; }
              .item-top h4 { font-size: 1rem; font-weight: 700; color: var(--text-main); line-height: 1.3; }
              .remove-btn-minimal { background: none; border: none; color: var(--text-muted); padding: 4px; cursor: pointer; transition: var(--transition); }
              .remove-btn-minimal:hover { color: var(--accent); }
              
              .cart-item-price { font-weight: 800; color: var(--primary); font-size: 1.1rem; }
              .cart-item-price small { font-size: 0.75rem; margin-left: 2px; }
              
              .quantity-controls {
                display: flex;
                align-items: center;
                background: var(--surface);
                border: 1px solid var(--border);
                border-radius: 14px;
                width: fit-content;
                padding: 2px;
              }
              .quantity-controls button {
                background: var(--card-bg);
                border: none;
                width: 32px;
                height: 32px;
                border-radius: 10px;
                color: var(--text-main);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
              }
              .quantity-controls span { font-weight: 800; font-size: 1rem; min-width: 36px; text-align: center; color: var(--text-main); }
              
              .cart-footer {
                padding: 1.5rem;
                border-top: 1px solid var(--border);
                background: var(--card-bg);
                box-shadow: 0 -10px 30px rgba(0,0,0,0.03);
              }
              .cart-summary {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-bottom: 1.5rem;
              }
              .total-label { color: var(--text-muted); font-weight: 600; font-size: 0.95rem; }
              .cart-total-price { font-size: 1.6rem; font-weight: 900; color: var(--text-main); line-height: 1; }
              .cart-total-price small { font-size: 0.9rem; color: var(--primary); }
              
              .btn-checkout { width: 100%; height: 60px; border-radius: 18px; font-size: 1.1rem; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-content: center; }

              /* Desktop Improvements (Side Drawer) */
              @media (min-width: 768px) {
                .cart-drawer {
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: auto;
                  width: 420px;
                  height: 100vh;
                  border-radius: 0;
                  border-left: 1px solid var(--border);
                  border-top: none;
                }
                .header-drag-handle { display: none; }
                .cart-header { padding: 2rem; }
                .cart-items { padding: 2rem; }
                .cart-footer { padding: 2rem; }
              }
            ` }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
