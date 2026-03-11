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
          <Link href="/search" className="view-all">Voir tout <ArrowRight size={16} /></Link>
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
        .home-wrapper { padding-bottom: 4rem; overflow-x: hidden; }
        
        /* Base styles (Mobile First) */
        .hero {
          background: var(--hero-gradient);
          padding: 4rem 1.5rem;
          text-align: center;
        }
        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        .hero-text h1 {
          font-size: 2.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
        }
        .hero-text p {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          max-width: 100%;
        }
        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .hero-image { display: none; }

        .features-section {
          margin-top: -2rem;
          position: relative;
          z-index: 20;
          padding: 0 1rem;
        }
        .features-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: var(--card-bg);
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .feature-icon {
          width: 48px;
          height: 48px;
          background: rgba(37, 99, 235, 0.1);
          color: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .section-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
          margin-top: 4rem;
        }
        .section-header h2 { font-size: 1.5rem; }

        .category-grid, .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .category-card { padding: 1.5rem 1rem; }
        .product-image { height: 180px; }
        .product-info { padding: 1rem; }
        .product-info h3 { font-size: 0.95rem; height: 2.8rem; overflow: hidden; }
        .price { font-size: 1.1rem; }

        .seller-cta {
          margin-top: 5rem;
          padding: 4rem 1.5rem;
          border-radius: 24px;
        }
        .seller-cta h2 { font-size: 2rem; }

        .filter-chips {
          display: flex;
          overflow-x: auto;
          gap: 0.75rem;
          padding-bottom: 1rem;
          scrollbar-width: none;
        }
        .filter-chips::-webkit-scrollbar { display: none; }

        /* Tablet & Desktop Improvements (Progressive Enhancement) */
        @media (min-width: 768px) {
          .category-grid, .product-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          .hero-text h1 { font-size: 3.5rem; }
          .hero-actions { flex-direction: row; justify-content: center; }
          .section-header { flex-direction: row; justify-content: space-between; align-items: flex-end; }
        }

        @media (min-width: 1024px) {
          .hero { text-align: left; padding: 6rem 0; }
          .hero-content { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 4rem; }
          .hero-actions { justify-content: flex-start; }
          .hero-image { display: flex; }
          .product-grid { grid-template-columns: repeat(4, 1fr); }
          .category-grid { grid-template-columns: repeat(4, 1fr); }
          .features-grid { flex-direction: row; justify-content: space-between; padding: 2.5rem; }
          .feature-item { flex: 1; }
          .product-image { height: 220px; }
          .product-info h3 { font-size: 1.1rem; height: auto; }
        }
      ` }} />
    </div>
  );
}
