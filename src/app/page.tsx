'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingCart, Zap, ShieldCheck, Truck, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products, categories } from "@/data/products";
import Link from "next/link";

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState("Tout");

  const filteredProducts = activeCategory === "Tout" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <span className="badge badge-featured mb-1">🎉 Lancement Officiel</span>
            <h1>Le futur du commerce au Togo commence ici.</h1>
            <p>Achetez, vendez et faites-vous livrer en un clin d'œil sur la plateforme la plus sécurisée du pays.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={scrollToProducts}>
                Explorer la boutique <ArrowRight size={20} />
              </button>
              <Link href="/vendeur" className="btn btn-outline">
                Devenir vendeur
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hero-image"
          >
            <div className="hero-blob">
              <div className="floating-card card-1">
                <Zap size={20} color="var(--secondary)" />
                <span>Livraison Express</span>
              </div>
              <div className="floating-card card-2">
                <ShieldCheck size={20} color="#10b981" />
                <span>Paiement Sécurisé</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section container">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon"><Truck /></div>
            <div>
              <h3>Livraison Partout</h3>
              <p>À Lomé et dans toutes les régions du Togo.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><ShieldCheck /></div>
            <div>
              <h3>Paiement Garanti</h3>
              <p>T-Money, Flooz ou Cash à la livraison.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Zap /></div>
            <div>
              <h3>Support 24/7</h3>
              <p>Une équipe dédiée pour vous accompagner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories container">
        <div className="section-header">
          <h2>Parcourir par catégories</h2>
          <a href="#" className="view-all">Voir tout <ArrowRight size={16} /></a>
        </div>
        <div className="category-grid">
          {categories.filter(c => c.name !== "Tout").map((cat) => (
            <motion.div 
              key={cat.id} 
              whileHover={{ y: -5, borderColor: 'var(--primary)' }}
              className="category-card"
              onClick={() => setActiveCategory(cat.name)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products container" id="products">
        <div className="section-header">
          <h2>{activeCategory === "Tout" ? "Les coups de cœur du moment" : activeCategory}</h2>
          <div className="filter-chips">
            {categories.map((cat) => (
              <span 
                key={cat.id} 
                className={`chip ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ y: -8 }}
              className="product-card"
            >
              <Link href={`/products/${product.id}`} className="product-link">
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <button 
                    className={`wishlist-card-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                  >
                    <Heart size={18} fill={isInWishlist(product.id) ? "var(--accent)" : "none"} />
                  </button>
                </div>
              </Link>
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
      </section>

      {/* Seller CTA */}
      <section className="seller-cta container">
        <div className="cta-content">
          <h2>Vous avez des produits à vendre ?</h2>
          <p>Rejoignez des centaines de marchands togolais et boostez votre chiffre d'affaires avec Linx Mall.</p>
          <Link href="/vendeur" className="btn btn-primary btn-lg" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            Ouvrir ma boutique gratuite
          </Link>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .home-wrapper { padding-bottom: 4rem; overflow: hidden; }
        
        .hero {
          background: var(--hero-gradient);
          padding: 6rem 0;
          transition: var(--transition);
        }
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
        }
        .hero-text h1 {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
        }
        .hero-text p {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          max-width: 500px;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
        }
        
        .hero-image {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .hero-blob {
          width: 400px;
          height: 400px;
          background: var(--primary);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          position: relative;
          opacity: 0.15;
          filter: blur(40px);
        }
        .floating-card {
          position: absolute;
          background: var(--card-bg);
          padding: 1rem 1.5rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          z-index: 10;
          border: 1px solid var(--border);
          color: var(--text-main);
          white-space: nowrap;
        }
        .card-1 { top: 20%; left: -10%; }
        .card-2 { bottom: 20%; right: -5%; }

        .features-section {
          margin-top: -3rem;
          position: relative;
          z-index: 20;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          background: var(--card-bg);
          padding: 2.5rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          transition: var(--transition);
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .feature-icon {
          width: 54px;
          height: 54px;
          background: rgba(37, 99, 235, 0.1);
          color: var(--primary);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .feature-item h3 { font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-main); }
        .feature-item p { font-size: 0.9rem; color: var(--text-muted); }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          margin-top: 5rem;
        }
        .section-header h2 { color: var(--text-main); font-size: 1.8rem; font-weight: 700; }
        .view-all {
          color: var(--primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .category-card {
          background: var(--card-bg);
          padding: 2.5rem 1.5rem;
          border-radius: var(--radius);
          text-align: center;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: var(--transition);
        }
        .category-card:hover {
          box-shadow: var(--shadow);
          transform: translateY(-5px);
        }
        .cat-icon { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
        .category-card h3 { font-size: 1.125rem; margin-bottom: 0.5rem; color: var(--text-main); }
        .category-card p { font-size: 0.875rem; color: var(--text-muted); }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .product-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: var(--transition);
        }
        .product-image {
          height: 220px;
          background-size: cover;
          background-position: center;
          position: relative;
          padding: 1rem;
          background-color: var(--surface);
        }
        .product-badge {
          background: var(--primary);
          color: white;
          padding: 0.35rem 0.85rem;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
          z-index: 5;
          position: relative;
        }
        
        .product-info { padding: 1.5rem; }
        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }
        .product-info h3 { font-size: 1.1rem; margin-bottom: 1.25rem; color: var(--text-main); font-weight: 600; }
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .price { font-weight: 800; font-size: 1.35rem; color: var(--primary); }
        .price small { font-size: 0.8rem; font-weight: 600; margin-left: 2px; }
        .add-to-cart {
          background: var(--surface);
          color: var(--text-main);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          border: 1px solid var(--border);
        }
        .add-to-cart:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 8px 15px rgba(37, 99, 235, 0.2);
        }

        .wishlist-card-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--card-bg);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow);
          color: var(--text-muted);
          transition: var(--transition);
          border: 1px solid var(--border);
          z-index: 10;
        }
        .wishlist-card-btn:hover { transform: scale(1.1); color: var(--accent); }
        .wishlist-card-btn.active { color: var(--accent); border-color: var(--accent); }

        .seller-cta {
          margin-top: 7rem;
          background: linear-gradient(135deg, var(--text-main) 0%, #1e293b 100%);
          border-radius: 32px;
          padding: 5rem 2rem;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .cta-content { position: relative; z-index: 2; max-width: 650px; margin: 0 auto; }
        .seller-cta h2 { font-size: 2.8rem; margin-bottom: 1.5rem; font-weight: 800; letter-spacing: -1px; }
        .seller-cta p { font-size: 1.2rem; opacity: 0.9; margin-bottom: 2.5rem; line-height: 1.6; }
        .btn-lg { padding: 1.25rem 3rem; font-size: 1.125rem; border-radius: 16px; }

        .chip {
          padding: 0.6rem 1.5rem;
          background: var(--surface);
          border-radius: 99px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: var(--transition);
        }
        .chip.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
        .chip:hover:not(.active) { background: var(--border); color: var(--text-main); }

        .product-link { display: block; text-decoration: none; }
        .product-name-link { text-decoration: none; color: inherit; }
        .product-name-link:hover h3 { color: var(--primary); }
        
        @media (max-width: 1024px) {
          .hero-text h1 { font-size: 2.8rem; }
          .category-grid, .product-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }
        @media (max-width: 768px) {
          .hero-content { grid-template-columns: 1fr; text-align: center; }
          .hero-text p { margin: 0 auto 2.5rem; }
          .hero-actions { justify-content: center; flex-direction: column; }
          .hero-image { display: none; }
          .seller-cta h2 { font-size: 2rem; }
        }
      ` }} />
    </div>
  );
}
