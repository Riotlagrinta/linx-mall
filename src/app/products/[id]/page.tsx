'use client';

import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ShieldCheck, Truck, ArrowLeft, Heart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import Link from 'next/link';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    setProduct(found || null);
  }, [id]);

  if (!product) return <div className="container py-10">Produit introuvable...</div>;

  return (
    <div className="product-detail-page container">
      <div className="breadcrumb">
        <Link href="/" className="back-link">
          <ArrowLeft size={18} /> Retour à la boutique
        </Link>
      </div>

      <div className="product-main">
        {/* Gallery */}
        <div className="product-gallery">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="main-image"
            style={{ backgroundImage: `url(${product.image})` }}
          >
            <span className="product-badge">{product.badge}</span>
          </motion.div>
          <div className="thumbnail-grid">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="thumbnail" style={{ backgroundImage: `url(${product.image})` }} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-buying-info">
          <div className="product-meta">
            <div className="rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "var(--secondary)" : "none"} color="var(--secondary)" />
                ))}
                <span className="rating-value">{product.rating}</span>
              </div>
              <span className="review-count">({product.reviews} avis)</span>
            </div>
            <h1>{product.name}</h1>
            <p className="product-id">SKU: LX-{product.id}00-TG</p>
          </div>

          <div className="price-section">
            <span className="main-price">{(product.price).toLocaleString('fr-FR')} <small>FCFA</small></span>
            <span className="stock-status"><Check size={16} /> En stock (Expédié sous 24h)</span>
          </div>

          <p className="description">{product.description}</p>

          <div className="specs-grid">
            {product.specs.map((spec: string, i: number) => (
              <div key={i} className="spec-item">
                <Check size={14} color="var(--primary)" />
                <span>{spec}</span>
              </div>
            ))}
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button 
              className="btn btn-primary add-btn"
              onClick={() => {
                for(let i=0; i<quantity; i++) {
                  addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
                }
              }}
            >
              <ShoppingCart size={20} /> Ajouter au panier
            </button>
            <button className="btn-icon-outline">
              <Heart size={20} />
            </button>
          </div>

          <div className="trust-badges">
            <div className="trust-item">
              <Truck size={20} />
              <div>
                <h6>Livraison Gratuite</h6>
                <p>À partir de 50.000 FCFA</p>
              </div>
            </div>
            <div className="trust-item">
              <ShieldCheck size={20} />
              <div>
                <h6>Garantie Linx</h6>
                <p>12 mois de protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .product-detail-page { padding-top: 1.5rem; padding-bottom: 5rem; overflow-x: hidden; }
        .breadcrumb { margin-bottom: 1.5rem; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: 0.9rem; }

        /* Base styles (Mobile First) */
        .product-main {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .product-gallery { display: flex; flex-direction: column; gap: 0.75rem; }
        .main-image {
          height: 350px;
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          background-color: var(--surface);
          position: relative;
          border: 1px solid var(--border);
        }
        .thumbnail-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
        .thumbnail { height: 70px; border-radius: 10px; background-size: cover; background-position: center; border: 1px solid var(--border); cursor: pointer; opacity: 0.7; }

        .product-buying-info h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; line-height: 1.2; }
        .rating-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .stars { display: flex; align-items: center; gap: 0.2rem; }
        .rating-value { font-weight: 700; font-size: 0.9rem; color: var(--text-main); }
        .review-count { color: var(--text-muted); font-size: 0.85rem; }
        .product-id { color: var(--text-muted); font-size: 0.75rem; margin-bottom: 1.5rem; font-family: monospace; }

        .price-section { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .main-price { font-size: 2rem; font-weight: 800; color: var(--primary); }
        .stock-status { display: inline-flex; align-items: center; gap: 0.4rem; color: #10b981; font-weight: 700; font-size: 0.8rem; background: rgba(16, 185, 129, 0.1); padding: 0.4rem 0.8rem; border-radius: 99px; width: fit-content; }

        .description { font-size: 1rem; line-height: 1.5; color: var(--text-muted); margin-bottom: 1.5rem; }

        .specs-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; margin-bottom: 2rem; }
        .spec-item { display: flex; align-items: center; gap: 0.6rem; color: var(--text-main); font-weight: 600; font-size: 0.9rem; }

        .purchase-actions { display: grid; grid-template-columns: 1fr 60px; gap: 1rem; margin-bottom: 2.5rem; }
        .quantity-selector { grid-column: span 2; display: flex; align-items: center; justify-content: space-between; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; height: 56px; padding: 0 1rem; }
        .quantity-selector button { width: 44px; height: 44px; border-radius: 10px; border: none; background: var(--card-bg); font-size: 1.2rem; cursor: pointer; color: var(--text-main); font-weight: 700; box-shadow: var(--shadow); }
        .quantity-selector span { font-weight: 800; font-size: 1.1rem; }
        
        .add-btn { height: 56px; border-radius: 14px; font-weight: 700; font-size: 1.05rem; display: flex; gap: 0.75rem; justify-content: center; }
        .btn-icon-outline { height: 56px; border-radius: 14px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text-muted); display: flex; align-items: center; justify-content: center; transition: var(--transition); }

        .trust-badges { display: grid; grid-template-columns: 1fr; gap: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
        .trust-item { display: flex; gap: 1rem; align-items: center; }
        .trust-item h6 { font-weight: 700; font-size: 0.95rem; color: var(--text-main); margin-bottom: 0.1rem; }
        .trust-item p { font-size: 0.8rem; color: var(--text-muted); }
        .trust-item svg { color: var(--primary); flex-shrink: 0; }

        /* Tablet & Desktop (Progressive Enhancement) */
        @media (min-width: 768px) {
          .product-detail-page { padding-top: 3rem; }
          .product-buying-info h1 { font-size: 2.2rem; }
          .price-section { flex-direction: row; align-items: center; gap: 2rem; }
          .specs-grid { grid-template-columns: 1fr 1fr; }
          .trust-badges { grid-template-columns: 1fr 1fr; }
          .quantity-selector { grid-column: auto; width: 140px; }
          .purchase-actions { grid-template-columns: auto 1fr auto; }
        }

        @media (min-width: 1024px) {
          .product-main { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
          .main-image { height: 550px; }
          .thumbnail-grid { gap: 1rem; }
          .thumbnail { height: 100px; }
          .product-buying-info h1 { font-size: 3rem; }
          .description { font-size: 1.15rem; margin-bottom: 2.5rem; }
        }
      ` }} />
    </div>
  );
}
