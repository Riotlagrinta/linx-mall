'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingCart, Sparkles, ShieldCheck, Truck, Heart, Package } from "lucide-react";
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
            <span className="badge badge-featured mb-1">✨ Nouvelle Collection Disponible</span>
            <h1>La mode pour elle <span style={{color:'var(--secondary)'}}>{'&'}</span> pour lui.</h1>
            <p>Découvrez notre sélection de prêt-à-porter homme et femme soigneusement choisie. Élégance, confort et style togolais, livrés partout au Togo.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={scrollToProducts}>
                Découvrir la collection <ArrowRight size={20} />
              </button>
              <Link href="/search" className="btn btn-outline">
                Toutes les pièces
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
                <Package size={20} color="var(--secondary)" />
                <span>Livraison Express</span>
              </div>
              <div className="floating-card card-2">
                <ShieldCheck size={20} color="#10b981" />
                <span>Retour Gratuit</span>
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
              <h3>Paiement Sécurisé</h3>
              <p>T-Money, Flooz ou Cash à la livraison.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Sparkles /></div>
            <div>
              <h3>Qualité Garantie</h3>
              <p>Chaque pièce est inspectée avant expédition.</p>
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
        <div className="genre-tabs">
          <button className="genre-tab active" data-genre="all" onClick={(e) => {
            document.querySelectorAll('.genre-tab').forEach(t => t.classList.remove('active'));
            (e.currentTarget as HTMLButtonElement).classList.add('active');
            document.querySelectorAll<HTMLElement>('.cat-group').forEach(g => g.style.display = 'block');
          }}>Tout</button>
          <button className="genre-tab" data-genre="femme" onClick={(e) => {
            document.querySelectorAll('.genre-tab').forEach(t => t.classList.remove('active'));
            (e.currentTarget as HTMLButtonElement).classList.add('active');
            document.querySelectorAll<HTMLElement>('.cat-group').forEach(g => { g.style.display = g.dataset.genre === 'femme' || g.dataset.genre === 'mixte' ? 'block' : 'none'; });
          }}>👩 Femme</button>
          <button className="genre-tab" data-genre="homme" onClick={(e) => {
            document.querySelectorAll('.genre-tab').forEach(t => t.classList.remove('active'));
            (e.currentTarget as HTMLButtonElement).classList.add('active');
            document.querySelectorAll<HTMLElement>('.cat-group').forEach(g => { g.style.display = g.dataset.genre === 'homme' || g.dataset.genre === 'mixte' ? 'block' : 'none'; });
          }}>👨 Homme</button>
        </div>
        <div className="category-grid">
          {categories.filter(c => c.name !== "Tout").map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5, borderColor: 'var(--primary)' }}
              className={`category-card cat-group`}
              data-genre={'genre' in cat ? (cat as {genre: string}).genre : 'mixte'}
              onClick={() => {
                setActiveCategory(cat.name);
                scrollToProducts();
              }}
            >
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{'count' in cat ? (cat as {count: string}).count : ''}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products container" id="products">
        <div className="section-header">
          <h2>{activeCategory === "Tout" ? "Nos coups de cœur du moment" : activeCategory}</h2>
          <div className="filter-chips">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className={`chip ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                {cat.icon} {cat.name}
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
                    <Heart size={18} fill={isInWishlist(product.id) ? "var(--primary)" : "none"} />
                  </button>
                </div>
              </Link>
              <div className="product-info">
                <div className="product-rating">
                  <Star size={14} fill="var(--secondary)" color="var(--secondary)" />
                  <span>{product.rating}</span>
                </div>
                <span className="product-category-tag">{product.category}</span>
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

      {/* Style Guide CTA */}
      <section className="style-cta container">
        <div className="cta-content">
          <span className="cta-eyebrow">✨ Notre promesse</span>
          <h2>Le style, c'est une façon d'être.</h2>
          <p>Chaque pièce de notre collection est sélectionnée avec soin pour elle et pour lui. De la robe de soirée au costume, en passant par le look casual, nous habillons toutes les personnes du Togo.</p>
          <div className="cta-actions">
            <button className="btn btn-primary" onClick={scrollToProducts}>
              Explorer la collection
            </button>
            <Link href="/contact" className="btn btn-outline">
              Nous contacter
            </Link>
          </div>
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
          font-size: 2.4rem;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
          font-family: 'Cormorant Garamond', serif;
        }
        .hero-text p {
          font-size: 1.05rem;
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
          background: rgba(139, 34, 82, 0.08);
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
        .section-header h2 {
          font-size: 1.6rem;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
        }
        .view-all {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
          transition: gap 0.2s;
        }
        .view-all:hover { gap: 0.8rem; }

        .category-grid, .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .category-card {
          padding: 1.5rem 1rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          cursor: pointer;
          transition: var(--transition);
        }
        .category-card:hover { border-color: var(--primary); }
        .cat-icon { font-size: 2rem; margin-bottom: 0.5rem; display: block; }
        .category-card h3 { font-weight: 700; margin-bottom: 0.25rem; color: var(--text-main); }
        .category-card p { color: var(--text-muted); font-size: 0.8rem; }

        .product-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }
        .product-link { display: block; }
        .product-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .product-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: var(--primary);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
        }
        .wishlist-card-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: white;
          border: 1px solid var(--border);
          border-radius: 9999px;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow);
          transition: var(--transition);
          color: var(--primary);
        }
        .wishlist-card-btn:hover { background: var(--surface); }

        .product-info { padding: 1rem; }
        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
          font-weight: 600;
        }
        .product-category-tag {
          font-size: 0.7rem;
          color: var(--primary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.4rem;
          display: block;
        }
        .product-info h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          height: 2.8rem;
          overflow: hidden;
          line-height: 1.4;
        }
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .price {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--primary);
        }
        .price small { font-size: 0.7rem; font-weight: 500; color: var(--text-muted); }
        .add-to-cart {
          background: var(--primary);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        .add-to-cart:hover {
          background: var(--primary-hover);
          transform: scale(1.1);
        }

        .style-cta {
          margin-top: 5rem;
          padding: 4rem 2rem;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--primary) 0%, #6e1a41 100%);
          text-align: center;
          color: white;
        }
        .cta-eyebrow {
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0.8;
          margin-bottom: 1rem;
          display: block;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .style-cta h2 {
          font-size: 2.2rem;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }
        .style-cta p {
          opacity: 0.85;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        .style-cta .btn-primary {
          background: white;
          color: var(--primary);
        }
        .style-cta .btn-primary:hover {
          background: var(--surface);
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3);
        }
        .style-cta .btn-outline {
          border-color: rgba(255,255,255,0.5);
          color: white;
        }
        .style-cta .btn-outline:hover {
          border-color: white;
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .genre-tabs {
          display: flex;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }
        .genre-tab {
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          border: 1.5px solid var(--border);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          background: var(--card-bg);
          transition: var(--transition);
        }
        .genre-tab:hover { border-color: var(--primary); color: var(--primary); }
        .genre-tab.active { background: var(--primary); color: white; border-color: var(--primary); }

        .filter-chips {
          display: flex;
          overflow-x: auto;
          gap: 0.5rem;
          padding-bottom: 1rem;
          scrollbar-width: none;
        }
        .filter-chips::-webkit-scrollbar { display: none; }
        .chip {
          white-space: nowrap;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          border: 1.5px solid var(--border);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          background: var(--card-bg);
        }
        .chip:hover { border-color: var(--primary); color: var(--primary); }
        .chip.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        /* Tablet & Desktop */
        @media (min-width: 768px) {
          .category-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          .product-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          .hero-text h1 { font-size: 3.2rem; }
          .hero-actions { flex-direction: row; justify-content: center; }
          .section-header { flex-direction: row; justify-content: space-between; align-items: flex-end; }
          .cta-actions { flex-direction: row; justify-content: center; }
        }

        @media (min-width: 1024px) {
          .hero { text-align: left; padding: 6rem 0; }
          .hero-content { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 4rem; }
          .hero-actions { justify-content: flex-start; }
          .hero-image { display: flex; }
          .product-grid { grid-template-columns: repeat(4, 1fr); }
          .category-grid { grid-template-columns: repeat(5, 1fr); }
          .features-grid { flex-direction: row; justify-content: space-between; padding: 2.5rem; }
          .feature-item { flex: 1; }
          .product-image { height: 240px; }
          .product-info h3 { font-size: 1rem; height: auto; }
          .hero-text h1 { font-size: 3.8rem; }
        }
      ` }} />
    </div>
  );
}
