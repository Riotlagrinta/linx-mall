'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories } from '@/data/products';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filteredProducts = products
        .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      const filteredCategories = categories
        .filter(c => c.name.toLowerCase().includes(query.toLowerCase()) && c.name !== "Tout")
        .slice(0, 3);
      setSuggestions([...filteredCategories, ...filteredProducts]);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsExpanded(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className={`search-container ${isExpanded ? 'expanded' : ''}`} ref={searchRef}>
      <form onSubmit={handleSearch} className="search-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher un produit..." 
            value={query}
            onFocus={() => setIsExpanded(true)}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" className="clear-btn" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
        <button type="submit" className="search-submit-btn">
          <span>Rechercher</span>
          <Search size={18} className="mobile-search-icon" />
        </button>
      </form>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="search-dropdown"
          >
            {query.length <= 1 ? (
              <div className="search-trends">
                <div className="dropdown-section">
                  <h4><TrendingUp size={14} /> Tendances</h4>
                  <div className="trend-tags">
                    {['iPhone', 'Nike', 'Tablette', 'Café Togo'].map(tag => (
                      <span key={tag} onClick={() => setQuery(tag)}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="dropdown-section">
                  <h4>Catégories</h4>
                  <div className="category-suggestions">
                    {categories.slice(1, 5).map(cat => (
                      <div key={cat.id} className="cat-suggest-item" onClick={() => {
                        setIsExpanded(false);
                        router.push(`/search?cat=${cat.name}`);
                      }}>
                        <span>{cat.icon} {cat.name}</span>
                        <ArrowRight size={14} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="search-results-preview">
                {suggestions.length > 0 ? (
                  suggestions.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="result-item"
                      onClick={() => {
                        setIsExpanded(false);
                        if (item.icon) router.push(`/search?cat=${item.name}`);
                        else router.push(`/products/${item.id}`);
                      }}
                    >
                      {item.image ? (
                        <div className="res-img" style={{ backgroundImage: `url(${item.image})` }} />
                      ) : (
                        <div className="res-icon">{item.icon}</div>
                      )}
                      <div className="res-info">
                        <span className="res-name">{item.name}</span>
                        <span className="res-type">{item.price ? `${item.price.toLocaleString()} FCFA` : 'Catégorie'}</span>
                      </div>
                      <ArrowRight size={14} className="res-arrow" />
                    </div>
                  ))
                ) : (
                  <div className="no-results">Aucun résultat pour "{query}"</div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .search-container { position: relative; flex: 1; max-width: 500px; z-index: 1000; }
        
        .search-bar {
          display: flex;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 0.35rem;
          transition: var(--transition);
        }
        .search-container.expanded .search-bar { border-color: var(--primary); box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1); }
        
        .search-input-wrapper { flex: 1; display: flex; align-items: center; padding: 0 0.75rem; gap: 0.75rem; }
        .search-icon { color: var(--text-muted); }
        .search-input-wrapper input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0.6rem 0;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          color: var(--text-main);
        }
        .clear-btn { background: var(--border); color: var(--text-muted); border-radius: 50%; padding: 2px; border: none; cursor: pointer; display: flex; }

        .search-submit-btn {
          background: var(--primary);
          color: white;
          padding: 0.6rem 1.25rem;
          border-radius: 10px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }
        .mobile-search-icon { display: none; }

        .search-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          right: 0;
          background: var(--card-bg);
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          overflow: hidden;
          padding: 1rem;
        }

        .dropdown-section { margin-bottom: 1.5rem; }
        .dropdown-section:last-child { margin-bottom: 0; }
        .dropdown-section h4 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        
        .trend-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .trend-tags span { background: var(--surface); padding: 0.5rem 1rem; border-radius: 10px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: var(--transition); border: 1px solid var(--border); }
        .trend-tags span:hover { border-color: var(--primary); color: var(--primary); }

        .category-suggestions { display: flex; flex-direction: column; gap: 0.5rem; }
        .cat-suggest-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--surface); border-radius: 12px; cursor: pointer; transition: var(--transition); }
        .cat-suggest-item:hover { background: var(--primary); color: white; }
        .cat-suggest-item:hover svg { color: white; }

        .result-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border-radius: 12px; cursor: pointer; transition: var(--transition); }
        .result-item:hover { background: var(--surface); }
        .res-img { width: 44px; height: 44px; border-radius: 10px; background-size: cover; background-position: center; border: 1px solid var(--border); }
        .res-icon { width: 44px; height: 44px; background: var(--surface); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .res-info { flex: 1; display: flex; flex-direction: column; }
        .res-name { font-weight: 700; font-size: 0.95rem; color: var(--text-main); }
        .res-type { font-size: 0.8rem; color: var(--primary); font-weight: 600; }
        .res-arrow { color: var(--border); transition: var(--transition); }
        .result-item:hover .res-arrow { color: var(--primary); transform: translateX(3px); }

        .no-results { padding: 2rem; text-align: center; color: var(--text-muted); font-weight: 600; }

        @media (max-width: 768px) {
          .search-container.expanded {
            position: fixed;
            inset: 0;
            background: var(--card-bg);
            padding: 1.5rem;
            max-width: none;
            height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .search-dropdown { position: relative; top: 0; box-shadow: none; border: none; padding: 1.5rem 0; flex: 1; overflow-y: auto; }
          .search-submit-btn span { display: none; }
          .mobile-search-icon { display: block; }
          .search-submit-btn { padding: 0.6rem; }
          .search-bar { border-radius: 16px; padding: 0.5rem; }
        }
      ` }} />
    </div>
  );
}
