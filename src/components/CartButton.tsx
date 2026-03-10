'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function CartButton() {
  const { cartCount, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button className="nav-btn-icon cart-btn" onClick={() => setIsCartOpen(true)}>
      <ShoppingBag size={22} />
      {mounted && cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </button>
  );
}
