'use client';

import { Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MobileMenuButton() {
  const { setIsMenuOpen } = useCart();

  return (
    <button className="mobile-menu-btn-trigger" onClick={() => setIsMenuOpen(true)}>
      <Menu size={24} />
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-menu-btn-trigger {
          display: none;
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          padding: 0.5rem;
          margin-left: -0.5rem;
        }
        @media (max-width: 768px) {
          .mobile-menu-btn-trigger {
            display: block;
          }
        }
      ` }} />
    </button>
  );
}
