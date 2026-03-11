'use client';

import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Trash2, HeartOff } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-page container py-10">
      <div className="section-header mb-10">
        <h1 className="text-3xl font-bold">Ma Liste de Souhaits</h1>
        <p className="text-muted">{wishlist.length} produit(s) sauvegardé(s)</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="product-grid">
          {wishlist.map((product) => (
            <motion.div 
              key={product.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="product-card"
            >
              <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                <button 
                  className="remove-wishlist-btn"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Retirer des favoris"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="product-info">
                <div className="product-rating">
                  <Star size={14} fill="var(--secondary)" color="var(--secondary)" />
                  <span>{product.rating}</span>
                </div>
                <Link href={`/products/${product.id}`} className="product-name-link">
                  <h3>{product.name}</h3>
                </Link>
                <div className="product-footer">
                  <span className="price">{(product.price).toLocaleString('fr-FR')} <small>FCFA</small></span>
                  <button className="add-to-cart" onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}>
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="empty-state py-20 text-center">
          <div className="empty-icon mb-6" style={{ display: 'flex', justifyContent: 'center' }}>
            <HeartOff size={80} color="var(--text-muted)" opacity={0.2} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Votre liste est vide</h2>
          <p className="text-muted mb-8">Vous n'avez pas encore ajouté de produits à vos favoris.</p>
          <Link href="/" className="btn btn-primary">Découvrir nos produits</Link>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .wishlist-page { min-height: 70vh; }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .remove-wishlist-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: white;
          color: var(--accent);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow);
          transition: var(--transition);
        }
        .remove-wishlist-btn:hover {
          background: var(--accent);
          color: white;
          transform: scale(1.1);
        }

        @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .product-grid { grid-template-columns: 1fr; } }
      `}} />
    </div>
  );
}
