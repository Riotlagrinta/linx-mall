'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, 
  Settings, Bell, Plus, Search, TrendingUp, ArrowUpRight, ArrowRight,
  CheckCircle, Clock, AlertCircle, Sparkles, Wand2,
  Calendar, CreditCard, ChevronRight, MoreVertical,
  ArrowDownRight, ShoppingBag, Percent, Tag
} from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';
import AICopilot from '@/components/AICopilot';

// Custom Simple Line Chart using SVG
const SalesChart = () => (
  <div className="chart-container">
    <svg viewBox="0 0 400 150" className="line-chart">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path 
        d="M0,120 Q50,110 80,80 T160,60 T240,90 T320,40 T400,20" 
        fill="none" 
        stroke="var(--primary)" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path 
        d="M0,120 Q50,110 80,80 T160,60 T240,90 T320,40 T400,20 V150 H0 Z" 
        fill="url(#chartGradient)" 
      />
      {/* Grid Lines */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="150" stroke="var(--border)" strokeWidth="1" strokeDasharray="4" />
      ))}
    </svg>
    <div className="chart-labels">
      <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span>
    </div>
  </div>
);

export default function SellerDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
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
    { label: "Stock total", value: "156", unit: "art.", icon: <Package size={20} />, trend: "-2", color: "green" },
    { label: "Revenu net", value: "720.500", unit: "FCFA", icon: <CreditCard size={20} />, trend: "+8.2%", color: "purple" }
  ];

  const recentOrders = [
    { id: "LX-102", customer: "Amivi D.", amount: 45000, status: "pending", date: "Il y a 2h" },
    { id: "LX-101", customer: "Koffi A.", amount: 155000, status: "completed", date: "Il y a 5h" },
    { id: "LX-100", customer: "Fousseni M.", amount: 25000, status: "completed", date: "Hier" }
  ];

  const alerts = [
    { id: 1, type: 'warning', message: "Stock faible: Smartphone NexGen Pro (2 restants)", time: "Il y a 10 min" },
    { id: 2, type: 'info', message: "Nouveau message d'un client sur 'Robe d'Été'", time: "Il y a 45 min" }
  ];

  return (
    <div className="seller-dashboard">
      <AICopilot />
      
      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
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
                  <div className="label-row-ai">
                    <label>Description</label>
                    <button type="button" className="ai-gen-btn">
                      <Wand2 size={14} /> <span>Générer avec l'IA</span>
                    </button>
                  </div>
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
      </AnimatePresence>

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
          <Link href="/vendeur/dashboard" className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <a href="#" className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <Package size={20} /> Mes Produits
          </a>
          <a href="#" className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={20} /> Commandes
          </a>
          <a href="#" className="nav-item"><Users size={20} /> Clients</a>
          <a href="#" className="nav-item"><Percent size={20} /> Promotions</a>
          <a href="#" className="nav-item"><BarChart3 size={20} /> Rapports</a>
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
              <input type="text" placeholder="Rechercher une commande, un produit..." />
            </div>
          </div>
          <div className="header-actions">
            <button className="upgrade-premium-btn">
              <Sparkles size={16} /> 
              <span>Devenir Premium</span>
            </button>
            <div className="icon-btn notification-btn">
              <Bell size={20} />
              <span className="pulse-dot"></span>
            </div>
            <button className="btn btn-primary add-product-btn" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={18} /> <span>Produit</span>
            </button>
          </div>
        </header>

        <section className="dashboard-hero">
          <div className="welcome-text">
            <h1>Salut, Kara Boutique ! 👋</h1>
            <p>Voici ce qui se passe dans votre boutique aujourd'hui.</p>
          </div>
          <div className="quick-info">
            <div className="date-display">
              <Calendar size={16} />
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>
        </section>

        {/* System Alerts */}
        <div className="alerts-container mb-8">
          {alerts.map(alert => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={alert.id} 
              className={`alert-item ${alert.type}`}
            >
              <AlertCircle size={18} />
              <span className="alert-msg">{alert.message}</span>
              <span className="alert-time">{alert.time}</span>
              <button className="alert-close">×</button>
            </motion.div>
          ))}
        </div>

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
                  <span className={`stat-trend-tag ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
                    {stat.trend.startsWith('+') ? <TrendingUp size={12} /> : <ArrowDownRight size={12} />}
                    {stat.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-grid-layout">
          {/* Sales Analytics */}
          <div className="card-panel analytics-panel">
            <div className="panel-header">
              <div>
                <h3>Performance des ventes</h3>
                <p className="text-muted">Évolution de votre chiffre d'affaires</p>
              </div>
              <select className="period-select">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
              </select>
            </div>
            <SalesChart />
          </div>

          {/* Quick Actions */}
          <div className="card-panel actions-panel">
            <div className="panel-header">
              <h3>Actions rapides</h3>
            </div>
            <div className="quick-actions-grid">
              <button className="q-action">
                <div className="q-icon"><ShoppingBag size={20} /></div>
                <span>Voir Boutique</span>
              </button>
              <button className="q-action">
                <div className="q-icon"><Tag size={20} /></div>
                <span>Créer Promo</span>
              </button>
              <button className="q-action">
                <div className="q-icon"><BarChart3 size={20} /></div>
                <span>Exporter PDF</span>
              </button>
              <button className="q-action">
                <div className="q-icon"><Users size={20} /></div>
                <span>Support</span>
              </button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card-panel orders-panel">
            <div className="panel-header">
              <h3>Dernières commandes</h3>
              <Link href="#" className="view-all-link">Tout voir <ArrowRight size={14} /></Link>
            </div>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Actions</th>
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
                      <td>
                        <button className="action-dot-btn"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="card-panel products-panel">
            <div className="panel-header">
              <h3>Produits les plus vendus</h3>
            </div>
            <div className="top-products-stack">
              {products.slice(0, 3).map((product) => (
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
        
        .content-header { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; }
        .header-left { width: 100%; }
        .search-box { display: flex; align-items: center; gap: 0.75rem; background: var(--surface); border: 1px solid var(--border); padding: 0.6rem 1.25rem; border-radius: 14px; width: 100%; }
        .search-box input { border: none; background: none; outline: none; flex: 1; font-family: inherit; color: var(--text-main); }
        
        .header-actions { display: grid; grid-template-columns: 1fr auto auto; gap: 0.75rem; width: 100%; }
        .upgrade-premium-btn { display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 0.6rem 1rem; border-radius: 12px; font-weight: 700; font-size: 0.75rem; }
        .icon-btn { width: 42px; height: 42px; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--text-muted); position: relative; }
        .pulse-dot { position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; background: var(--accent); border-radius: 50%; border: 2px solid var(--surface); }
        .add-product-btn { height: 42px; padding: 0 1rem; border-radius: 12px; }
        .add-product-btn span { display: none; }

        .dashboard-hero { margin-bottom: 2rem; }
        .dashboard-hero h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-main); }
        .dashboard-hero p { color: var(--text-muted); font-size: 0.9rem; }
        .date-display { display: none; }

        .alerts-container { display: flex; flex-direction: column; gap: 0.75rem; }
        .alert-item { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 16px; font-size: 0.85rem; font-weight: 600; position: relative; }
        .alert-item.warning { background: rgba(245, 158, 11, 0.1); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.2); }
        .alert-item.info { background: rgba(37, 99, 235, 0.1); color: #2563eb; border: 1px solid rgba(37, 99, 235, 0.2); }
        .alert-time { margin-left: auto; font-size: 0.75rem; opacity: 0.7; margin-right: 1.5rem; }
        .alert-close { position: absolute; right: 10px; background: none; border: none; font-size: 1.2rem; color: currentColor; cursor: pointer; }

        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .stat-card { background: var(--card-bg); padding: 1.25rem; border-radius: 20px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 1rem; }
        .stat-icon-wrapper { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .stat-icon-wrapper.blue { background: rgba(37, 99, 235, 0.1); color: #2563eb; }
        .stat-icon-wrapper.orange { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .stat-icon-wrapper.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .stat-icon-wrapper.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        
        .stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .stat-value-row { display: flex; flex-direction: column; gap: 0.5rem; }
        .stat-value-row h3 { font-size: 1.2rem; font-weight: 800; color: var(--text-main); }
        .stat-trend-tag { font-size: 0.65rem; font-weight: 700; display: flex; align-items: center; gap: 2px; padding: 2px 6px; border-radius: 6px; width: fit-content; }
        .stat-trend-tag.up { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .stat-trend-tag.down { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .dashboard-grid-layout { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem; }
        .card-panel { background: var(--card-bg); border-radius: 24px; border: 1px solid var(--border); padding: 1.5rem; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .panel-header h3 { font-size: 1.1rem; font-weight: 800; color: var(--text-main); }
        .period-select { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 4px 8px; font-size: 0.8rem; color: var(--text-main); }

        .chart-container { height: 180px; width: 100%; display: flex; flex-direction: column; }
        .line-chart { width: 100%; height: 100%; overflow: visible; }
        .chart-labels { display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }

        .quick-actions-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        .q-action { background: var(--surface); border: 1px solid var(--border); padding: 1.25rem 1rem; border-radius: 16px; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; cursor: pointer; transition: var(--transition); }
        .q-action:hover { border-color: var(--primary); background: rgba(37, 99, 235, 0.05); }
        .q-icon { width: 40px; height: 40px; background: var(--card-bg); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); box-shadow: var(--shadow); }
        .q-action span { font-size: 0.85rem; font-weight: 700; color: var(--text-main); }

        .table-responsive { overflow-x: auto; margin: 0 -1.5rem; padding: 0 1.5rem; }
        .dashboard-table { width: 100%; border-collapse: collapse; min-width: 500px; }
        .dashboard-table th { text-align: left; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; padding: 1rem 0; border-bottom: 1px solid var(--border); }
        .dashboard-table td { padding: 1.25rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
        .action-dot-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; }

        .mini-product-item { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
        .mini-img { width: 48px; height: 48px; border-radius: 10px; background-size: cover; background-position: center; border: 1px solid var(--border); }
        .mini-info h4 { font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin-bottom: 2px; }
        .mini-info p { font-size: 0.8rem; color: var(--primary); font-weight: 700; }
        .mini-stats { margin-left: auto; text-align: right; }
        .sales-count { display: block; font-size: 1rem; font-weight: 800; color: var(--text-main); }
        .sales-label { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; }

        /* Modal Styles */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 1rem; }
        .product-modal { background: var(--card-bg); width: 100%; max-width: 600px; border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); overflow: hidden; max-height: 90vh; display: flex; flex-direction: column; }
        .modal-header { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--surface); }
        .close-btn { font-size: 2rem; background: none; border: none; color: var(--text-muted); cursor: pointer; line-height: 1; }
        .add-product-form { padding: 2rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem; background: var(--card-bg); }
        .label-row-ai { display: flex; justify-content: space-between; align-items: center; }
        .ai-gen-btn { display: flex; align-items: center; gap: 0.4rem; background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%); color: white; padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: var(--transition); }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.9rem; font-weight: 700; color: var(--text-main); }
        .form-group input, .form-group select, .form-group textarea { padding: 0.8rem 1rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; font-size: 0.95rem; outline: none; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .image-upload-zone { height: 160px; border: 2px dashed var(--border); border-radius: 16px; position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; background: var(--surface); overflow: hidden; }
        .image-upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
        .image-upload-zone img { width: 100%; height: 100%; object-fit: cover; }
        .modal-footer { padding: 1.5rem 2rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 1rem; background: var(--surface); }

        /* Desktop Improvements */
        @media (min-width: 1024px) {
          .seller-dashboard { display: grid; grid-template-columns: 280px 1fr; }
          .dashboard-sidebar { 
            display: flex; background: var(--card-bg); border-right: 1px solid var(--border); padding: 2.5rem 1.5rem; flex-direction: column; position: sticky; top: 0; height: 100vh;
          }
          .sidebar-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 3.5rem; }
          .vendor-logo { width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 15px rgba(37, 99, 235, 0.25); }
          .vendor-info h4 { font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px; }
          .badge-status { font-size: 0.7rem; color: #10b981; font-weight: 700; text-transform: uppercase; }
          .sidebar-nav { display: flex; flex-direction: column; gap: 0.4rem; }
          .nav-item { display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.25rem; border-radius: 12px; color: var(--text-muted); font-weight: 600; transition: var(--transition); text-decoration: none; font-size: 0.95rem; }
          .nav-item:hover { background: var(--surface); color: var(--primary); }
          .nav-item.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
          .nav-divider { height: 1px; background: var(--border); margin: 1.5rem 0; }

          .dashboard-content { padding: 2rem 3.5rem; }
          .content-header { flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
          .header-left { width: 400px; }
          .header-actions { display: flex; width: auto; align-items: center; gap: 1.25rem; }
          .add-product-btn { width: auto; padding: 0.85rem 1.75rem; }
          .add-product-btn span { display: inline; }
          .dashboard-hero { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
          .dashboard-hero h1 { font-size: 2.2rem; }
          .date-display { display: flex; align-items: center; gap: 0.5rem; background: var(--surface); padding: 0.6rem 1.2rem; border-radius: 10px; font-weight: 700; font-size: 0.85rem; color: var(--primary); border: 1px solid var(--border); }
          .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
          .stat-value-row { flex-direction: row; justify-content: space-between; align-items: center; }
          .dashboard-grid-layout { display: grid; grid-template-columns: 1.8fr 1fr; gap: 2rem; }
          .analytics-panel { grid-column: span 2; }
          .chart-container { height: 250px; }
          .quick-actions-grid { grid-template-columns: repeat(4, 1fr); }
        }
      ` }} />
    </div>
  );
}
