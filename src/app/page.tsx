'use client';

import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingCart, Zap, ShieldCheck, Truck } from "lucide-react";

const categories = [
  { id: 1, name: "Électronique", icon: "💻", count: "1.2k+ produits" },
  { id: 2, name: "Mode & Beauté", icon: "👗", count: "850+ produits" },
  { id: 3, name: "Maison", icon: "🏠", count: "430+ produits" },
  { id: 4, name: "Produits Locaux", icon: "🇹🇬", count: "210+ produits" },
];

const featuredProducts = [
  {
    id: 1,
    name: "Smartphone NexGen Pro",
    price: "155.000",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    badge: "Populaire"
  },
  {
    id: 2,
    name: "Écouteurs Linx Buds",
    price: "25.000",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    badge: "Nouveau"
  },
  {
    id: 3,
    name: "Montre Connectée S1",
    price: "45.000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    badge: "Promo"
  },
  {
    id: 4,
    name: "Tablette WorkTab 10",
    price: "120.000",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    badge: "Exclusivité"
  }
];

export default function Home() {
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
              <button className="btn btn-primary">
                Explorer la boutique <ArrowRight size={20} />
              </button>
              <button className="btn btn-outline">
                Devenir vendeur
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hero-image"
          >
            <div className="image-placeholder">
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
      <section className="features container">
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
      </section>

      {/* Categories Grid */}
      <section className="categories container">
        <div className="section-header">
          <h2>Parcourir par catégories</h2>
          <a href="#" className="view-all">Voir tout <ArrowRight size={16} /></a>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <motion.div 
              key={cat.id} 
              whileHover={{ y: -5 }}
              className="category-card"
            >
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products container">
        <div className="section-header">
          <h2>Les coups de cœur du moment</h2>
          <div className="filter-chips">
            <span className="chip active">Tout</span>
            <span className="chip">Électronique</span>
            <span className="chip">Mode</span>
          </div>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              whileHover={{ y: -8 }}
              className="product-card"
            >
              <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                <span className="product-badge">{product.badge}</span>
                <button className="wishlist-btn"><HeartIcon /></button>
              </div>
              <div className="product-info">
                <div className="product-rating">
                  <Star size={14} fill="var(--secondary)" color="var(--secondary)" />
                  <span>{product.rating}</span>
                </div>
                <h3>{product.name}</h3>
                <div className="product-footer">
                  <span className="price">{product.price} <small>FCFA</small></span>
                  <button className="add-to-cart">
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
          <button className="btn btn-primary btn-lg">Ouvrir ma boutique gratuite</button>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .home-wrapper { padding-bottom: 4rem; }
        
        .hero {
          background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
          padding: 6rem 0;
          overflow: hidden;
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
          background: linear-gradient(to right, var(--primary), var(--text-main));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
        }
        .image-placeholder {
          width: 100%;
          aspect-ratio: 1;
          background: var(--primary);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          position: relative;
          opacity: 0.1;
        }
        .floating-card {
          position: absolute;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          z-index: 10;
        }
        .card-1 { top: 20%; left: -10%; }
        .card-2 { bottom: 20%; right: -5%; }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin: -3rem auto 4rem;
          background: white;
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          position: relative;
          z-index: 20;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .feature-icon {
          width: 48px;
          height: 48px;
          background: #dbeafe;
          color: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-item h3 { font-size: 1rem; margin-bottom: 0.25rem; }
        .feature-item p { font-size: 0.875rem; color: var(--text-muted); }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          margin-top: 4rem;
        }
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
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius);
          text-align: center;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.3s;
        }
        .category-card:hover {
          background: white;
          border-color: var(--primary);
          box-shadow: var(--shadow);
        }
        .cat-icon { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
        .category-card h3 { font-size: 1.125rem; margin-bottom: 0.5rem; }
        .category-card p { font-size: 0.875rem; color: var(--text-muted); }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .product-card {
          background: white;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: all 0.3s;
        }
        .product-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          position: relative;
          padding: 1rem;
        }
        .product-badge {
          background: var(--primary);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .wishlist-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow);
        }
        .product-info { padding: 1.25rem; }
        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .product-info h3 { font-size: 1rem; margin-bottom: 1rem; }
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .price { font-weight: 800; font-size: 1.25rem; color: var(--primary); }
        .price small { font-size: 0.75rem; font-weight: 600; margin-left: 2px; }
        .add-to-cart {
          background: var(--surface);
          color: var(--text-main);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .add-to-cart:hover {
          background: var(--primary);
          color: white;
        }

        .seller-cta {
          margin-top: 6rem;
          background: var(--text-main);
          border-radius: 24px;
          padding: 4rem;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-content { position: relative; z-index: 2; max-width: 600px; margin: 0 auto; }
        .seller-cta h2 { font-size: 2.5rem; margin-bottom: 1rem; }
        .seller-cta p { font-size: 1.125rem; opacity: 0.8; margin-bottom: 2rem; }
        .btn-lg { padding: 1rem 2.5rem; font-size: 1.125rem; }

        .chip {
          padding: 0.5rem 1.25rem;
          background: var(--surface);
          border-radius: 99px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid var(--border);
        }
        .chip.active { background: var(--primary); color: white; border-color: var(--primary); }

        @media (max-width: 1024px) {
          .hero-text h1 { font-size: 2.5rem; }
          .category-grid, .product-grid { grid-template-columns: repeat(2, 1fr); }
          .features { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .hero-content { grid-template-columns: 1fr; text-align: center; }
          .hero-text p { margin: 0 auto 2.5rem; }
          .hero-actions { justify-content: center; }
          .hero-image { display: none; }
        }
      ` }} />
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
