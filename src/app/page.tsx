'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingCart, Sparkles, ShieldCheck, Zap, Heart, Key } from "lucide-react";
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
            <span className="badge badge-featured mb-1">🚀 Plateforme Digitale Premium</span>
            <h1>Vos abonnements préférés, <span className="gradient-text">sans carte bancaire</span>.</h1>
            <p>Netflix, Apple Music, Spotify, iCloud+ et bien plus encore. Payez par T-Money ou Flooz et recevez vos accès instantanément.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={scrollToProducts}>
                Découvrir nos offres <ArrowRight size={20} />
              </button>
              <Link href="/about" className="btn btn-outline">
                Comment ça marche ?
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hero-image"
          >
            <div className="hero-blob digital-blob">
              <div className="floating-card card-1 digital-card">
                <Zap size={20} color="var(--secondary)" />
                <span>Livraison Instantanée</span>
              </div>
              <div className="floating-card card-2 digital-card">
                <ShieldCheck size={20} color="#10b981" />
                <span>Garantie 100%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section container">
        <div className="features-grid digital-features">
          <div className="feature-item">
            <div className="feature-icon"><Zap /></div>
            <div>
              <h3>Accès Rapide</h3>
              <p>Recevez vos identifiants ou l'activation sur votre compte rapidement.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><ShieldCheck /></div>
            <div>
              <h3>Paiement Local</h3>
              <p>T-Money & Flooz intégrés pour faciliter vos achats au Togo.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Key /></div>
            <div>
              <h3>Sécurité Garantie</h3>
              <p>Comptes officiels, renouvellements sécurisés, sans coupure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories container">
        <div className="section-header">
          <h2>Parcourir par univers</h2>
          <Link href="/search" className="view-all">Tout voir <ArrowRight size={16} /></Link>
        </div>
        
        <div className="category-grid">
          {categories.filter(c => c.name !== "Tout").map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5, borderColor: 'var(--primary)' }}
              className={`category-card cat-group`}
              onClick={() => {
                setActiveCategory(cat.name);
                scrollToProducts();
              }}
            >
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products container" id="products">
        <div className="section-header">
          <h2>{activeCategory === "Tout" ? "Services les plus populaires" : activeCategory}</h2>
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
              data-service={product.name.toLowerCase()}
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
                  <span className="price">{(product.price).toLocaleString('fr-FR')} <small>FCFA / mois</small></span>
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
      <section className="style-cta container digital-cta">
        <div className="cta-content">
          <span className="cta-eyebrow">✨ Ne ratez plus vos séries</span>
          <h2>Abonnez-vous simplement.</h2>
          <p>Nous facilitons l'accès au digital pour tous. Que vous souhaitiez renouveler votre abonnement Netflix ou augmenter votre espace iCloud, Charlee Store est votre partenaire de confiance.</p>
          <div className="cta-actions">
            <button className="btn btn-primary" onClick={scrollToProducts}>
              Voir le catalogue
            </button>
            <Link href="/contact" className="btn btn-outline">
              Demande spécifique
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
