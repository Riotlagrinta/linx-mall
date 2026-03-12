'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, MapPin, Star, MessageCircle, Phone, 
  ShieldCheck, Share2, Info, ShoppingBag, ArrowLeft,
  Facebook, Instagram, Twitter
} from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ShopPublicPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  
  // Simulation de données de boutique
  const shop = {
    id: resolvedParams.id,
    name: "Kara Boutique",
    description: "Spécialiste de la mode et de l'électronique haut de gamme au Togo. Nous sélectionnons les meilleurs produits pour vous garantir qualité et durabilité.",
    location: "Lomé, Hedzranawoé",
    rating: 4.9,
    reviews: 850,
    sales: "2.5k+",
    joined: "Janvier 2024",
    isVerified: true,
    logo: "K",
    cover: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
  };

  // Filtrer les produits de cette boutique (simulation)
  const shopProducts = products.slice(0, 4);

  return (
    <div className="shop-public-page">
      {/* Shop Hero / Cover */}
      <section className="shop-hero">
        <div className="shop-cover" style={{ backgroundImage: `url(${shop.cover})` }}>
          <div className="cover-overlay"></div>
        </div>
        <div className="container">
          <div className="shop-profile-header">
            <div className="shop-avatar-main">
              {shop.logo}
              {shop.isVerified && <div className="verified-badge"><ShieldCheck size={16} /></div>}
            </div>
            <div className="shop-main-info">
              <div className="shop-title-row">
                <h1>{shop.name}</h1>
                <div className="shop-actions-top">
                  <button className="icon-btn-circle"><Share2 size={18} /></button>
                  <button className="icon-btn-circle"><Info size={18} /></button>
                </div>
              </div>
              <p className="shop-bio">{shop.description}</p>
              <div className="shop-meta-row">
                <span className="meta-item"><MapPin size={14} /> {shop.location}</span>
                <span className="meta-item"><Star size={14} className="star-icon" /> {shop.rating} ({shop.reviews} avis)</span>
                <span className="meta-item"><ShoppingBag size={14} /> {shop.sales} ventes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <div className="container sticky-contact-container">
        <div className="contact-bar-shop">
          <a href={`https://wa.me/22890000000`} className="contact-btn whatsapp">
            <MessageCircle size={20} /> <span>Message</span>
          </a>
          <a href="tel:+22890000000" className="contact-btn call">
            <Phone size={20} /> <span>Appeler</span>
          </a>
          <button className="btn btn-primary follow-btn">Suivre la boutique</button>
        </div>
      </div>

      {/* Shop Content */}
      <section className="shop-content py-12">
        <div className="container">
          <div className="content-layout">
            {/* Sidebar Desktop */}
            <aside className="shop-sidebar-info">
              <div className="card-panel">
                <h3>À propos</h3>
                <p className="text-muted text-sm mb-6">Membre depuis {shop.joined}</p>
                <div className="sidebar-stats">
                  <div className="s-stat"><strong>99%</strong><span>Réponse</span></div>
                  <div className="s-stat"><strong>24h</strong><span>Livraison</span></div>
                </div>
                <div className="shop-socials mt-6">
                  <a href="#"><Facebook size={20} /></a>
                  <a href="#"><Instagram size={20} /></a>
                  <a href="#"><Twitter size={20} /></a>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="shop-products-main">
              <div className="section-header-shop">
                <h2>Articles en vente ({shopProducts.length})</h2>
                <div className="filter-select">
                  <select>
                    <option>Plus récents</option>
                    <option>Prix croissant</option>
                    <option>Prix décroissant</option>
                  </select>
                </div>
              </div>

              <div className="product-grid">
                {shopProducts.map((product) => (
                  <motion.div 
                    key={product.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="product-card"
                  >
                    <Link href={`/products/${product.id}`} className="product-link">
                      <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                        {product.badge && <span className="product-badge">{product.badge}</span>}
                      </div>
                    </Link>
                    <div className="product-info">
                      <Link href={`/products/${product.id}`} className="product-name-link">
                        <h3>{product.name}</h3>
                      </Link>
                      <div className="product-footer">
                        <span className="price">{(product.price).toLocaleString('fr-FR')} <small>FCFA</small></span>
                        <button className="add-to-cart" onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}>
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .shop-public-page { background: var(--background); min-height: 100vh; padding-bottom: 5rem; }
        
        .shop-hero { position: relative; padding-bottom: 2rem; }
        .shop-cover { height: 200px; background-size: cover; background-position: center; position: relative; }
        .cover-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5)); }
        
        .shop-profile-header { display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: -50px; position: relative; z-index: 10; padding: 0 1.5rem; }
        .shop-avatar-main { width: 100px; height: 100px; background: var(--primary); color: white; border-radius: 30px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 900; border: 6px solid var(--background); box-shadow: var(--shadow-lg); position: relative; }
        .verified-badge { position: absolute; bottom: -5px; right: -5px; background: #2563eb; color: white; padding: 4px; border-radius: 50%; border: 3px solid var(--background); }
        
        .shop-main-info { margin-top: 1.5rem; width: 100%; }
        .shop-title-row { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem; }
        .shop-title-row h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); }
        .shop-actions-top { display: flex; gap: 0.5rem; }
        .icon-btn-circle { width: 36px; height: 36px; border-radius: 50%; background: var(--surface); border: 1px solid var(--border); color: var(--text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        
        .shop-bio { color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .shop-meta-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; color: var(--text-muted); font-weight: 600; font-size: 0.85rem; }
        .meta-item { display: flex; align-items: center; gap: 0.4rem; }
        .star-icon { color: #f59e0b; fill: #f59e0b; }

        .sticky-contact-container { margin-top: 2rem; position: sticky; top: 80px; z-index: 100; }
        .contact-bar-shop { background: var(--card-bg); border: 1px solid var(--border); padding: 0.75rem; border-radius: 20px; box-shadow: var(--shadow-lg); display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .contact-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem; border-radius: 14px; font-weight: 700; text-decoration: none; font-size: 0.9rem; }
        .contact-btn.whatsapp { background: #25d366; color: white; }
        .contact-btn.call { background: var(--surface); color: var(--text-main); border: 1px solid var(--border); }
        .follow-btn { grid-column: span 2; height: 50px; border-radius: 14px; }

        .content-layout { display: flex; flex-direction: column; gap: 3rem; margin-top: 3rem; }
        .shop-sidebar-info { display: none; }

        .section-header-shop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .section-header-shop h2 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
        .filter-select select { background: var(--surface); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 10px; font-family: inherit; font-size: 0.85rem; color: var(--text-main); }

        .product-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .product-card { background: var(--card-bg); border-radius: 20px; border: 1px solid var(--border); overflow: hidden; }
        .product-image { height: 180px; background-size: cover; background-position: center; position: relative; background-color: var(--surface); }
        .product-info { padding: 1rem; }
        .product-info h3 { font-size: 0.9rem; font-weight: 700; color: var(--text-main); height: 2.4rem; overflow: hidden; margin-bottom: 1rem; }
        .product-footer { display: flex; justify-content: space-between; align-items: center; }
        .price { font-weight: 800; color: var(--primary); font-size: 1rem; }
        .add-to-cart { width: 36px; height: 36px; border-radius: 10px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-main); }

        @media (min-width: 1024px) {
          .shop-cover { height: 350px; border-radius: 0 0 40px 40px; }
          .shop-profile-header { flex-direction: row; text-align: left; align-items: flex-end; gap: 2.5rem; margin-top: -80px; padding: 0; }
          .shop-avatar-main { width: 160px; height: 160px; border-radius: 45px; font-size: 4rem; }
          .shop-title-row { justify-content: flex-start; gap: 2rem; }
          .shop-title-row h1 { font-size: 2.5rem; }
          .shop-meta-row { justify-content: flex-start; }
          
          .contact-bar-shop { grid-template-columns: auto auto 200px; width: fit-content; margin-left: auto; padding: 0.5rem; }
          .contact-btn { padding: 0.75rem 1.5rem; }
          .follow-btn { grid-column: auto; height: auto; }

          .content-layout { display: grid; grid-template-columns: 300px 1fr; gap: 4rem; }
          .shop-sidebar-info { display: block; }
          .sidebar-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
          .s-stat { background: var(--surface); padding: 1rem; border-radius: 16px; text-align: center; }
          .s-stat strong { display: block; font-size: 1.1rem; color: var(--text-main); }
          .s-stat span { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
          .shop-socials { display: flex; gap: 1rem; justify-content: center; }
          .shop-socials a { color: var(--text-muted); transition: var(--transition); }
          .shop-socials a:hover { color: var(--primary); }

          .product-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          .product-image { height: 220px; }
        }
      ` }} />
    </div>
  );
}
