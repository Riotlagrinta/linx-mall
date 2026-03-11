'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, ShoppingBag, Heart, User, Settings, Sparkles, LayoutDashboard, Info, Truck, HelpCircle, Briefcase } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileMenu() {
  const { isMenuOpen, setIsMenuOpen } = useCart();

  const menuItems = [
    { icon: <Home size={22} />, label: 'Accueil', href: '/' },
    { icon: <ShoppingBag size={22} />, label: 'Boutique', href: '/search' },
    { icon: <Truck size={22} />, label: 'Suivi de commande', href: '/tracking' },
    { icon: <Heart size={22} />, label: 'Ma Wishlist', href: '/wishlist' },
    { icon: <User size={22} />, label: 'Mon Compte', href: '/login' },
  ];

  const supportItems = [
    { icon: <HelpCircle size={22} />, label: "Centre d'aide", href: '/help' },
    { icon: <Info size={22} />, label: 'À Propos', href: '/about' },
    { icon: <Briefcase size={22} />, label: 'Recrutement', href: '/careers' },
  ];

  const sellerItems = [
    { icon: <Sparkles size={22} />, label: 'Espace Vendeur', href: '/vendeur' },
    { icon: <LayoutDashboard size={22} />, label: 'Tableau de bord', href: '/vendeur/dashboard' },
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
                <Image src="/images/logo.png.jpeg" alt="Linx Mall" width={32} height={32} className="logo-img" />
                <span className="logo-name">Linx Mall</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="menu-close">
                <X size={24} />
              </button>
            </div>

            <div className="menu-content">
              <nav className="menu-section">
                <span className="section-label">Navigation</span>
                {menuItems.map((item, idx) => (
                  <Link key={idx} href={item.href} className="menu-link" onClick={() => setIsMenuOpen(false)}>
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <nav className="menu-section">
                <span className="section-label">Support & Infos</span>
                {supportItems.map((item, idx) => (
                  <Link key={idx} href={item.href} className="menu-link" onClick={() => setIsMenuOpen(false)}>
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <nav className="menu-section">
                <span className="section-label">Vendre</span>
                {sellerItems.map((item, idx) => (
                  <Link key={idx} href={item.href} className="menu-link seller-link" onClick={() => setIsMenuOpen(false)}>
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="menu-footer">
              <div className="user-profile-brief">
                <div className="avatar">K</div>
                <div className="info">
                  <p className="name">Kelvyn Karaboka</p>
                  <p className="role">Client Premium</p>
                </div>
                <button className="settings-btn"><Settings size={20} /></button>
              </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              .menu-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(8px); z-index: 10000; }
              .mobile-menu { position: fixed; top: 0; left: 0; bottom: 0; width: 85%; max-width: 320px; background: var(--card-bg); z-index: 10001; display: flex; flex-direction: column; box-shadow: 20px 0 50px rgba(0,0,0,0.1); border-right: 1px solid var(--border); }

              .menu-header { padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
              .logo-container { display: flex; align-items: center; gap: 0.75rem; }
              .logo-img { border-radius: 8px; }
              .logo-name { font-weight: 800; font-size: 1.2rem; color: var(--text-main); letter-spacing: -0.5px; }
              .menu-close { background: var(--surface); color: var(--text-muted); padding: 0.5rem; border-radius: 12px; border: none; cursor: pointer; }

              .menu-content { flex: 1; padding: 1.5rem; overflow-y: auto; }
              .menu-section { margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
              .section-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; padding-left: 0.75rem; }

              .menu-link { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 16px; color: var(--text-main); text-decoration: none; font-weight: 600; transition: var(--transition); }
              .menu-link:hover { background: var(--surface); color: var(--primary); }
              .menu-icon { color: var(--text-muted); display: flex; align-items: center; }
              .menu-link:hover .menu-icon { color: var(--primary); }
              .seller-link { color: var(--primary); }
              .seller-link .menu-icon { color: var(--primary); }

              .menu-footer { padding: 1.5rem; border-top: 1px solid var(--border); background: var(--surface); }
              .user-profile-brief { display: flex; align-items: center; gap: 1rem; }
              .avatar { width: 44px; height: 44px; background: var(--primary); color: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; }
              .info { flex: 1; }
              .name { font-weight: 700; color: var(--text-main); font-size: 0.95rem; margin-bottom: 2px; }
              .role { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
              .settings-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0.5rem; border-radius: 10px; transition: var(--transition); }
              .settings-btn:hover { background: var(--border); color: var(--text-main); }
            ` }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
