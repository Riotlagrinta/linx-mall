'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, 
  Settings, Bell, Plus, Search, TrendingUp, ArrowUpRight, 
  CheckCircle, Clock, AlertCircle, Sparkles
} from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';

export default function SellerDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: "Ventes totales", value: "850.000", unit: "FCFA", icon: <TrendingUp size={20} />, trend: "+12.5%", color: "blue" },
    { label: "Commandes", value: "24", unit: "", icon: <ShoppingCart size={20} />, trend: "+5", color: "orange" },
    { label: "Produits actifs", value: "12", unit: "", icon: <Package size={20} />, trend: "0", color: "green" },
    { label: "Visiteurs", value: "1.2k", unit: "", icon: <Users size={20} />, trend: "+18%", color: "purple" }
  ];

  const recentOrders = [
    { id: "LX-102", customer: "Amivi D.", amount: 45000, status: "pending", date: "Il y a 2h" },
    { id: "LX-101", customer: "Koffi A.", amount: 155000, status: "completed", date: "Il y a 5h" },
    { id: "LX-100", customer: "Fousseni M.", amount: 25000, status: "completed", date: "Hier" }
  ];

  return (
    <div className="seller-dashboard">
      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="product-modal"
          >
            <div className="modal-header">
              <h3>Ajouter un nouveau produit</h3>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form className="add-product-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Nom du produit</label>
                <input type="text" placeholder="Ex: Smartphone NexGen Pro" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Prix (FCFA)</label>
                  <input type="number" placeholder="0" />
                </div>
                <div className="form-group">
                  <label>Catégorie</label>
                  <select>
                    <option>Électronique</option>
                    <option>Mode & Beauté</option>
                    <option>Maison</option>
                    <option>Produits Locaux</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Décrivez votre produit en quelques lignes..." rows={3}></textarea>
              </div>
              <div className="form-group">
                <label>Image du produit</label>
                <div className={`image-upload-zone ${previewImage ? 'has-preview' : ''}`}>
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <Plus size={32} />
                      <p>Cliquez pour choisir une photo</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Publier le produit</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="vendor-logo">
            <Sparkles size={24} />
          </div>
          <div className="vendor-info">
            <h4>Kara Boutique</h4>
            <span className="badge-status">Vendeur Certifié</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link href="/vendeur/dashboard" className="nav-item active"><LayoutDashboard size={20} /> Dashboard</Link>
          <a href="#" className="nav-item"><Package size={20} /> Mes Produits</a>
          <a href="#" className="nav-item"><ShoppingCart size={20} /> Commandes</a>
          <a href="#" className="nav-item"><BarChart3 size={20} /> Statistiques</a>
          <div className="nav-divider"></div>
          <a href="#" className="nav-item"><Settings size={20} /> Paramètres</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="content-header">
          <div className="header-left">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Rechercher une commande..." />
            </div>
          </div>
          <div className="header-actions">
            <button className="upgrade-premium-btn">
              <Sparkles size={16} /> 
              <span>Devenir Premium</span>
            </button>
            <button className="icon-btn notification-btn">
              <Bell size={20} />
              <span className="pulse-dot"></span>
            </button>
            <button className="btn btn-primary add-product-btn" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={18} /> <span>Produit</span>
            </button>
          </div>
        </header>

        <section className="dashboard-hero">
          <div className="welcome-text">
            <h1>Bienvenue, Kara Boutique ! 👋</h1>
            <p>Aujourd'hui est une excellente journée pour vendre.</p>
          </div>
          <div className="date-display">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </section>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
            >
              <div className={`stat-icon-wrapper ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="stat-data">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-value-row">
                  <h3>{stat.value} <small>{stat.unit}</small></h3>
                  <span className="stat-trend-tag">{stat.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-grid-layout">
          {/* Recent Orders */}
          <div className="card-panel orders-panel">
            <div className="panel-header">
              <h3>Dernières commandes</h3>
              <Link href="#" className="view-all-link">Tout voir <ArrowUpRight size={14} /></Link>
            </div>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID Commande</th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">#{order.id}</td>
                      <td className="customer-name">{order.customer}</td>
                      <td className="order-amount">{order.amount.toLocaleString()} <small>FCFA</small></td>
                      <td>
                        <span className={`badge-pill ${order.status}`}>
                          {order.status === 'completed' ? 'Livré' : 'En attente'}
                        </span>
                      </td>
                      <td className="order-date">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="card-panel products-panel">
            <div className="panel-header">
              <h3>Meilleurs produits</h3>
            </div>
            <div className="top-products-stack">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="mini-product-item">
                  <div className="mini-img" style={{ backgroundImage: `url(${product.image})` }}></div>
                  <div className="mini-info">
                    <h4>{product.name}</h4>
                    <p>{product.price.toLocaleString()} FCFA</p>
                  </div>
                  <div className="mini-stats">
                    <span className="sales-count">12</span>
                    <span className="sales-label">ventes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .seller-dashboard { 
          display: flex;
          flex-direction: column;
          min-height: 100vh; 
          background: var(--background); 
        }
        
        /* Base styles (Mobile First) */
        .dashboard-sidebar { display: none; }
        
        .dashboard-content { padding: 1.5rem; width: 100%; }
        
        .content-header { 
          display: flex; 
          flex-direction: column; 
          gap: 1.5rem; 
          margin-bottom: 2rem; 
        }
        .header-left { width: 100%; }
        .search-box { width: 100%; padding: 0.6rem 1rem; border-radius: 12px; }
        
        .header-actions { 
          display: grid; 
          grid-template-columns: 1fr auto auto;
          gap: 0.75rem; 
          width: 100%;
        }
        .upgrade-premium-btn { padding: 0.6rem 1rem; font-size: 0.75rem; border-radius: 10px; }
        .add-product-btn span { display: none; }
        .add-product-btn { width: 42px; height: 42px; padding: 0; border-radius: 10px; }

        .dashboard-hero { margin-bottom: 2rem; }
        .dashboard-hero h1 { font-size: 1.5rem; }
        .dashboard-hero p { font-size: 0.9rem; }
        .date-display { display: none; }

        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .stat-card { padding: 1.25rem; border-radius: 20px; gap: 1rem; }
        .stat-icon-wrapper { width: 40px; height: 40px; }
        .stat-value-row h3 { font-size: 1.25rem; }
        .stat-trend-tag { font-size: 0.65rem; padding: 2px 6px; }

        .dashboard-grid-layout { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem; }
        .card-panel { padding: 1.5rem; border-radius: 20px; }
        .table-responsive { overflow-x: auto; margin: 0 -1.5rem; padding: 0 1.5rem; }
        .dashboard-table { min-width: 500px; }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        .product-modal {
          background: var(--card-bg);
          width: 100%;
          max-width: 600px;
          border-radius: 24px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--surface);
        }
        .modal-header h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
        .close-btn { font-size: 2rem; background: none; border: none; color: var(--text-muted); cursor: pointer; line-height: 1; }
        
        .add-product-form { padding: 2rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem; background: var(--card-bg); }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.9rem; font-weight: 700; color: var(--text-main); }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.8rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-main);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--primary); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        .image-upload-zone {
          height: 180px;
          border: 2px dashed var(--border);
          border-radius: 16px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          background: var(--surface);
          overflow: hidden;
        }
        .image-upload-zone:hover { border-color: var(--primary); background: rgba(37, 99, 235, 0.05); }
        .image-upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
        .upload-placeholder { text-align: center; color: var(--text-muted); }
        .upload-placeholder p { font-size: 0.85rem; font-weight: 600; margin-top: 0.5rem; }
        .image-upload-zone img { width: 100%; height: 100%; object-fit: cover; }

        .modal-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          background: var(--surface);
        }

        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr; }
          .modal-header, .add-product-form, .modal-footer { padding: 1.5rem; }
        }

        /* Desktop Improvements */
        @media (min-width: 1024px) {
          .seller-dashboard { display: grid; grid-template-columns: 280px 1fr; }
          .dashboard-sidebar { 
            display: flex; 
            background: var(--card-bg); 
            border-right: 1px solid var(--border); 
            padding: 2.5rem 1.5rem; 
            flex-direction: column; 
            position: sticky;
            top: 0;
            height: 100vh;
          }
          .dashboard-content { padding: 2rem 3.5rem; }
          .content-header { flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
          .header-left { width: 400px; }
          .header-actions { display: flex; width: auto; }
          .add-product-btn { width: auto; padding: 0.85rem 1.75rem; }
          .add-product-btn span { display: inline; }
          .dashboard-hero h1 { font-size: 2.2rem; }
          .date-display { display: block; }
          .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
          .dashboard-grid-layout { display: grid; grid-template-columns: 1.8fr 1fr; gap: 2rem; }
        }
      ` }} />
    </div>
  );
}
