'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, ShoppingBag, Heart, User, Settings, Info, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function MobileMenu() {
  const { isMenuOpen, setIsMenuOpen } = useCart();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Accueil', href: '/' },
    { icon: <ShoppingBag size={20} />, label: 'Boutique', href: '#' },
    { icon: <Heart size={20} />, label: 'Favoris', href: '#' },
    { icon: <User size={20} />, label: 'Mon Compte', href: '#' },
    { icon: <Info size={20} />, label: 'À Propos', href: '#' },
    { icon: <Phone size={20} />, label: 'Contact', href: '#' },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="menu-overlay"
            onClick={() => setIsMenuOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-menu"
          >
            <div className="menu-header">
              <div className="logo-container">
                <Image 
                  src="/images/logo.png.jpeg" 
                  alt="Linx Mall Logo" 
                  width={32} 
                  height={32} 
                />
                <div className="logo-text">
                  <span className="logo-linx">Linx</span>
                  <span className="logo-mall">Mall</span>
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="menu-close">
                <X size={24} />
              </button>
            </div>

            <nav className="menu-nav">
              {menuItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  className="menu-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="menu-footer">
              <div className="user-brief">
                <div className="user-avatar">K</div>
                <div className="user-info">
                  <p className="user-name">Kelvyn K.</p>
                  <p className="user-status">Client Premium</p>
                </div>
                <Settings size={20} className="settings-icon" />
              </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              .menu-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(4px);
                z-index: 10000;
              }
              .mobile-menu {
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                width: 80%;
                max-width: 300px;
                background: var(--surface);
                z-index: 10001;
                display: flex;
                flex-direction: column;
                box-shadow: 10px 0 30px rgba(0,0,0,0.1);
                border-right: 1px solid var(--border);
              }
              .menu-header {
                padding: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid var(--border);
              }
              .menu-close { background: none; color: var(--text-muted); padding: 0.5rem; border-radius: 50%; display: flex; border: none; cursor: pointer; }
              
              .menu-nav {
                flex: 1;
                padding: 1.5rem 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
              }
              .menu-link {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border-radius: 12px;
                color: var(--text-main);
                text-decoration: none;
                font-weight: 500;
                transition: var(--transition);
              }
              .menu-link:hover {
                background: var(--bg-main);
                color: var(--primary);
              }
              .menu-icon { color: var(--text-muted); }
              .menu-link:hover .menu-icon { color: var(--primary); }

              .menu-footer {
                padding: 1.5rem;
                border-top: 1px solid var(--border);
                background: var(--bg-main);
              }
              .user-brief {
                display: flex;
                align-items: center;
                gap: 1rem;
              }
              .user-avatar {
                width: 40px;
                height: 40px;
                background: var(--primary);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
              }
              .user-info { flex: 1; }
              .user-name { font-weight: 600; color: var(--text-main); font-size: 0.95rem; }
              .user-status { font-size: 0.75rem; color: var(--text-muted); }
              .settings-icon { color: var(--text-muted); cursor: pointer; }
            ` }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
