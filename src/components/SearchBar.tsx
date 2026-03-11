'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input 
        type="text" 
        placeholder="Rechercher un produit, une marque..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-btn">
        <Search size={20} />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .search-bar {
          flex: 1;
          max-width: 600px;
          display: flex;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 0.25rem;
          transition: var(--transition);
        }
        .search-bar:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .search-bar input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0.5rem 1rem;
          font-family: inherit;
          outline: none;
          color: var(--text-main);
        }
        .search-bar input::placeholder {
          color: var(--text-muted);
        }
        .search-btn {
          background: var(--primary);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: calc(var(--radius) - 4px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        .search-btn:hover {
          background: #1d4ed8;
        }
      ` }} />
    </form>
  );
}
