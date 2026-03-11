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
  const { addToCart } = useCart();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  return (
    <div className="search-page container py-10">
      <div className="search-header mb-10">
        <h1 className="text-3xl font-bold mb-2">
          {query ? `Résultats pour "${query}"` : "Tous nos produits"}
        </h1>
        <p className="text-muted">{filteredProducts.length} produit(s) trouvé(s)</p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="product-card"
            >
              <Link href={`/products/${product.id}`} className="product-link">
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                  {product.badge && <span className="product-badge">{product.badge}</span>}
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
      ) : (
        <div className="empty-search py-20 text-center">
          <div className="empty-icon mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchIcon size={64} color="var(--text-muted)" opacity={0.3} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Aucun résultat trouvé</h2>
          <p className="text-muted mb-8">Désolé, nous n'avons trouvé aucun produit correspondant à votre recherche.</p>
          <Link href="/" className="btn btn-primary">Retour à la boutique</Link>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .search-page { min-height: 70vh; }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .product-grid { grid-template-columns: 1fr; } }
      `}} />
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
