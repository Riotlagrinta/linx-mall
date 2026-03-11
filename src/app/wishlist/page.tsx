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
    <div className="wishlist-page">
      <header className="wishlist-hero">
        <div className="container">
          <h1>Ma Liste de Souhaits</h1>
          <p>{wishlist.length} produit(s) sauvegardé(s)</p>
        </div>
      </header>

      <div className="container py-8">
        {wishlist.length > 0 ? (
          <div className="product-grid">
            {wishlist.map((product) => (
              <motion.div 
                key={product.id} 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="product-card"
              >
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                  <button 
                    className="remove-wishlist-btn"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="product-info">
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
          <div className="empty-state">
            <div className="empty-icon"><HeartOff size={48} /></div>
            <h2>Votre liste est vide</h2>
            <p>Vous n'avez pas encore de produits en favoris. Parcourez la boutique pour en ajouter.</p>
            <Link href="/" className="btn btn-primary">Explorer la boutique</Link>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .wishlist-page { min-height: 80vh; padding-bottom: 5rem; background: var(--background); }
        
        .wishlist-hero { background: var(--hero-gradient); padding: 4rem 0; text-align: center; border-bottom: 1px solid var(--border); }
        .wishlist-hero h1 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
        .wishlist-hero p { color: var(--text-muted); font-weight: 600; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .empty-state { text-align: center; padding: 5rem 1rem; max-width: 400px; margin: 0 auto; }
        .empty-icon { width: 80px; height: 80px; background: var(--surface); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--text-muted); }
        .empty-state h2 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-main); }
        .empty-state p { color: var(--text-muted); margin-bottom: 2rem; line-height: 1.5; }

        /* Shared Card Styles */
        .product-card { background: var(--card-bg); border-radius: var(--radius); border: 1px solid var(--border); overflow: hidden; position: relative; }
        .product-image { height: 180px; background-size: cover; background-position: center; position: relative; background-color: var(--surface); }
        
        .remove-wishlist-btn { position: absolute; top: 10px; right: 10px; width: 34px; height: 34px; border-radius: 50%; background: var(--card-bg); color: var(--accent); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: var(--shadow); z-index: 10; }
        
        .product-info { padding: 1rem; }
        .product-info h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-main); height: 2.5rem; overflow: hidden; }
        .product-footer { display: flex; justify-content: space-between; align-items: center; }
        .price { font-weight: 800; color: var(--primary); font-size: 1.1rem; }
        .price small { font-size: 0.7rem; opacity: 0.8; }
        .add-to-cart { width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition); }
        .add-to-cart:hover { background: var(--primary); color: white; border-color: var(--primary); }

        @media (min-width: 768px) {
          .wishlist-hero h1 { font-size: 3rem; }
          .product-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          .product-image { height: 220px; }
        }

        @media (min-width: 1024px) {
          .product-grid { grid-template-columns: repeat(4, 1fr); }
        }
      ` }} />
    </div>
  );
}
