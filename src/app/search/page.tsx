'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Search as SearchIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const categoryParam = searchParams.get('cat');
  const { addToCart } = useCart();

  const filteredProducts = products.filter(p => {
    const matchesQuery = !query || 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query);
    
    const matchesCategory = !categoryParam || p.category === categoryParam;
    
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="search-page">
      <header className="search-hero">
        <div className="container">
          <h1>
            {categoryParam ? categoryParam : query ? `Résultats pour "${query}"` : "Tous nos produits"}
          </h1>
          <p>{filteredProducts.length} produit(s) disponible(s)</p>
        </div>
      </header>

      <div className="container search-layout">
        {/* Simple Filter Sidebar - Visible on Desktop */}
        <aside className="search-filters">
          <div className="filter-group">
            <h4>Catégories</h4>
            <div className="filter-links">
              {['Électronique', 'Mode & Beauté', 'Maison', 'Produits Locaux'].map(cat => (
                <Link 
                  key={cat} 
                  href={`/search?cat=${cat}`}
                  className={categoryParam === cat ? 'active' : ''}
                >
                  {cat}
                </Link>
              ))}
              {categoryParam && <Link href="/search" className="clear-filter">Effacer les filtres</Link>}
            </div>
          </div>
        </aside>

        <main className="search-results-main">
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id} 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="product-card"
                >
                  <Link href={`/products/${product.id}`} className="product-link">
                    <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                      {product.badge && <span className="product-badge">{product.badge}</span>}
                    </div>
                  </Link>
                  <div className="product-info">
                    <div className="product-rating">
                      <Star size={12} fill="var(--secondary)" color="var(--secondary)" />
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
            <div className="empty-search">
              <div className="empty-icon"><SearchIcon size={48} /></div>
              <h2>Aucun produit trouvé</h2>
              <p>Essayez avec d'autres mots-clés ou parcourez nos catégories.</p>
              <Link href="/" className="btn btn-primary">Retour à l'accueil</Link>
            </div>
          )}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .search-page { min-height: 80vh; padding-bottom: 5rem; background: var(--background); }
        
        .search-hero { background: var(--hero-gradient); padding: 4rem 0; margin-bottom: 3rem; text-align: center; border-bottom: 1px solid var(--border); }
        .search-hero h1 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
        .search-hero p { color: var(--text-muted); font-weight: 600; }

        .search-layout { display: flex; flex-direction: column; gap: 2rem; }
        .search-filters { display: none; }

        /* Product Grid (Mobile First: 2 columns) */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .empty-search { text-align: center; padding: 5rem 1rem; }
        .empty-icon { width: 80px; height: 80px; background: var(--surface); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--text-muted); }
        .empty-search h2 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-main); }
        .empty-search p { color: var(--text-muted); margin-bottom: 2rem; }

        /* Shared Card Styles */
        .product-card { background: var(--card-bg); border-radius: var(--radius); border: 1px solid var(--border); overflow: hidden; }
        .product-image { height: 180px; background-size: cover; background-position: center; position: relative; background-color: var(--surface); }
        .product-badge { position: absolute; top: 10px; left: 10px; background: var(--primary); color: white; padding: 0.3rem 0.7rem; border-radius: 99px; font-size: 0.7rem; font-weight: 700; }
        .product-info { padding: 1rem; }
        .product-rating { display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; }
        .product-info h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-main); height: 2.5rem; overflow: hidden; }
        .product-footer { display: flex; justify-content: space-between; align-items: center; }
        .price { font-weight: 800; color: var(--primary); font-size: 1.1rem; }
        .price small { font-size: 0.7rem; opacity: 0.8; }
        .add-to-cart { width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition); }
        .add-to-cart:hover { background: var(--primary); color: white; border-color: var(--primary); }

        /* Tablet & Desktop */
        @media (min-width: 768px) {
          .search-hero h1 { font-size: 3rem; }
          .product-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          .product-image { height: 220px; }
        }

        @media (min-width: 1024px) {
          .search-layout { display: grid; grid-template-columns: 250px 1fr; }
          .search-filters { display: block; }
          .product-grid { grid-template-columns: repeat(3, 1fr); }
          
          .filter-group h4 { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 1.5rem; }
          .filter-links { display: flex; flex-direction: column; gap: 0.75rem; }
          .filter-links a { color: var(--text-main); font-weight: 600; text-decoration: none; padding: 0.75rem 1rem; border-radius: 10px; transition: var(--transition); }
          .filter-links a:hover { background: var(--surface); color: var(--primary); }
          .filter-links a.active { background: var(--primary); color: white; }
          .clear-filter { margin-top: 1rem; font-size: 0.85rem; color: var(--accent) !important; border: 1px solid var(--accent); text-align: center; }
        }
      ` }} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center">Chargement des résultats...</div>}>
      <SearchResults />
    </Suspense>
  );
}
