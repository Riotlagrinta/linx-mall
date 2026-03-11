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
        .product-detail-page { padding-top: 2rem; padding-bottom: 5rem; }
        .breadcrumb { margin-bottom: 2rem; }
        .back-link { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); text-decoration: none; font-weight: 500; transition: var(--transition); }
        .back-link:hover { color: var(--primary); }

        .product-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .product-gallery { display: flex; flex-direction: column; gap: 1rem; }
        .main-image {
          height: 500px;
          background-size: cover;
          background-position: center;
          border-radius: 24px;
          background-color: var(--surface);
          position: relative;
          border: 1px solid var(--border);
        }
        .thumbnail-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .thumbnail { height: 100px; border-radius: 12px; background-size: cover; background-position: center; border: 1px solid var(--border); cursor: pointer; opacity: 0.7; transition: var(--transition); }
        .thumbnail:hover { opacity: 1; border-color: var(--primary); }

        .rating-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .stars { display: flex; align-items: center; gap: 0.25rem; }
        .rating-value { font-weight: 700; margin-left: 0.5rem; color: var(--text-main); }
        .review-count { color: var(--text-muted); font-size: 0.9rem; }

        .product-buying-info h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; line-height: 1.2; }
        .product-id { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 2rem; font-family: monospace; }

        .price-section { display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem; }
        .main-price { font-size: 2.5rem; font-weight: 800; color: var(--primary); }
        .main-price small { font-size: 1rem; margin-left: 5px; }
        .stock-status { display: flex; align-items: center; gap: 0.5rem; color: #10b981; font-weight: 600; font-size: 0.9rem; background: rgba(16, 185, 129, 0.1); padding: 0.5rem 1rem; border-radius: 99px; }

        .description { font-size: 1.1rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 2rem; }

        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2.5rem; }
        .spec-item { display: flex; align-items: center; gap: 0.75rem; color: var(--text-main); font-weight: 500; }

        .purchase-actions { display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; }
        .quantity-selector { display: flex; align-items: center; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; height: 56px; }
        .quantity-selector button { width: 50px; height: 100%; border: none; background: none; font-size: 1.2rem; cursor: pointer; color: var(--text-main); transition: var(--transition); }
        .quantity-selector button:hover { background: var(--border); }
        .quantity-selector span { width: 40px; text-align: center; font-weight: 700; color: var(--text-main); }
        
        .add-btn { flex: 1; height: 56px; border-radius: 14px; font-weight: 700; font-size: 1.1rem; display: flex; gap: 0.75rem; justify-content: center; }
        .btn-icon-outline { width: 56px; height: 56px; border-radius: 14px; border: 1px solid var(--border); background: none; color: var(--text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition); }
        .btn-icon-outline:hover { color: var(--accent); border-color: var(--accent); background: rgba(239, 68, 68, 0.05); }

        .trust-badges { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        .trust-item { display: flex; gap: 1rem; align-items: center; }
        .trust-item h6 { font-weight: 700; color: var(--text-main); margin-bottom: 0.15rem; }
        .trust-item p { font-size: 0.8rem; color: var(--text-muted); }
        .trust-item svg { color: var(--primary); }

        @media (max-width: 1024px) {
          .product-main { grid-template-columns: 1fr; gap: 2.5rem; }
          .main-image { height: 400px; }
        }
        @media (max-width: 768px) {
          .purchase-actions { flex-wrap: wrap; }
          .quantity-selector { width: 100%; justify-content: space-between; }
          .add-btn { order: 3; width: 100%; flex: none; }
          .specs-grid { grid-template-columns: 1fr; }
        }
      ` }} />
    </div>
  );
}
