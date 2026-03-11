'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, 
  Settings, Bell, Plus, Search, TrendingUp, ArrowUpRight, 
  CheckCircle, Clock, AlertCircle, Sparkles
} from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';

export default function SellerDashboard() {
  const stats = [
    { label: "Ventes totales", value: "850.000", unit: "FCFA", icon: <TrendingUp />, trend: "+12.5%", color: "blue" },
    { label: "Commandes", value: "24", unit: "", icon: <ShoppingCart />, trend: "+5", color: "orange" },
    { label: "Produits actifs", value: "12", unit: "", icon: <Package />, trend: "0", color: "green" },
    { label: "Visiteurs", value: "1.2k", unit: "", icon: <Users />, trend: "+18%", color: "purple" }
  ];

  const recentOrders = [
    { id: "LX-102", customer: "Amivi D.", amount: 45000, status: "pending", date: "Il y a 2h" },
    { id: "LX-101", customer: "Koffi A.", amount: 155000, status: "completed", date: "Il y a 5h" },
    { id: "LX-100", customer: "Fousseni M.", amount: 25000, status: "completed", date: "Hier" }
  ];

  return (
    <div className="seller-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="vendor-badge">KB</div>
          <div className="vendor-info">
            <h4>Kara Boutique</h4>
            <span>Vendeur Certifié</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><LayoutDashboard size={20} /> Dashboard</a>
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
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Rechercher une commande..." />
          </div>
          <div className="header-actions">
            <button className="upgrade-btn">
              <Sparkles size={16} /> 
              <span>Premium <small>(Bientôt)</small></span>
            </button>
            <button className="icon-btn"><Bell size={20} /><span className="dot"></span></button>
            <button className="btn btn-primary"><Plus size={18} /> Nouveau Produit</button>
          </div>
        </header>

        <section className="dashboard-welcome">
          <h1>Bon retour, Kara Boutique ! 👋</h1>
          <p>Voici ce qui se passe sur votre boutique aujourd'hui.</p>
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
              <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
              <div className="stat-info">
                <span>{stat.label}</span>
                <h3>{stat.value} <small>{stat.unit}</small></h3>
                <div className="stat-trend">
                  <span className="trend-val">{stat.trend}</span>
                  <span className="trend-label">ce mois</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-grid mt-8">
          {/* Recent Orders */}
          <div className="grid-section">
            <div className="section-header">
              <h3>Commandes récentes</h3>
              <a href="#">Tout voir</a>
            </div>
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount.toLocaleString()} FCFA</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {order.status === 'completed' ? 'Livré' : 'En attente'}
                        </span>
                      </td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="grid-section">
            <div className="section-header">
              <h3>Produits les plus vendus</h3>
            </div>
            <div className="top-products-list">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="top-product-item">
                  <div className="product-img-mini" style={{ backgroundImage: `url(${product.image})` }}></div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <span>{product.price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="product-sales">
                    <strong>12</strong>
                    <span>ventes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .seller-dashboard { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; background: var(--surface); }
        
        /* Sidebar */
        .dashboard-sidebar { background: var(--card-bg); border-right: 1px solid var(--border); padding: 2rem 1.5rem; display: flex; flex-direction: column; }
        .sidebar-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; padding: 0 0.5rem; }
        .vendor-badge { width: 45px; height: 45px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; }
        .vendor-info h4 { font-size: 1rem; color: var(--text-main); margin-bottom: 2px; }
        .vendor-info span { font-size: 0.75rem; color: #10b981; font-weight: 600; }
        
        .sidebar-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-item { display: flex; align-items: center; gap: 1rem; padding: 0.85rem 1rem; border-radius: 12px; color: var(--text-muted); font-weight: 500; transition: var(--transition); text-decoration: none; }
        .nav-item:hover, .nav-item.active { background: rgba(37, 99, 235, 0.05); color: var(--primary); }
        .nav-item.active { background: var(--primary); color: white; }
        .nav-divider { height: 1px; background: var(--border); margin: 1rem 0; }

        /* Main Content */
        .dashboard-content { padding: 2rem 3rem; }
        .content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        
        .search-box { display: flex; align-items: center; gap: 0.75rem; background: var(--card-bg); border: 1px solid var(--border); padding: 0.6rem 1.25rem; border-radius: 99px; width: 400px; }
        .search-box input { border: none; background: none; font-size: 0.9rem; color: var(--text-main); outline: none; width: 100%; }
        
        .header-actions { display: flex; align-items: center; gap: 1.5rem; }
        .upgrade-btn { display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 0.6rem 1.25rem; border-radius: 99px; font-weight: 700; font-size: 0.85rem; cursor: not-allowed; opacity: 0.9; }
        .upgrade-btn small { font-weight: 400; opacity: 0.8; }
        
        .icon-btn { position: relative; background: var(--card-bg); border: 1px solid var(--border); width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-muted); cursor: pointer; }
        .dot { position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; background: var(--accent); border: 2px solid var(--card-bg); border-radius: 50%; }

        .dashboard-welcome h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main); }
        .dashboard-welcome p { color: var(--text-muted); margin-bottom: 2.5rem; }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .stat-card { background: var(--card-bg); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); display: flex; gap: 1.25rem; }
        .stat-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .stat-icon.blue { background: rgba(37, 99, 235, 0.1); color: #2563eb; }
        .stat-icon.orange { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .stat-icon.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .stat-icon.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        
        .stat-info span { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
        .stat-info h3 { font-size: 1.5rem; font-weight: 800; margin: 0.25rem 0; color: var(--text-main); }
        .stat-info h3 small { font-size: 0.8rem; opacity: 0.7; }
        .stat-trend { font-size: 0.75rem; display: flex; gap: 4px; }
        .trend-val { color: #10b981; font-weight: 700; }
        .trend-label { color: var(--text-muted); }

        .dashboard-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 2rem; }
        .grid-section { background: var(--card-bg); border-radius: 20px; border: 1px solid var(--border); padding: 1.5rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .section-header h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-main); }
        .section-header a { font-size: 0.85rem; color: var(--primary); font-weight: 600; text-decoration: none; }

        .orders-table { width: 100%; border-collapse: collapse; }
        .orders-table th { text-align: left; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; padding: 1rem 0; border-bottom: 1px solid var(--border); }
        .orders-table td { padding: 1.25rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; color: var(--text-main); }
        
        .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
        .status-badge.completed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-badge.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .top-products-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .top-product-item { display: flex; align-items: center; gap: 1rem; }
        .product-img-mini { width: 50px; height: 50px; border-radius: 10px; background-size: cover; background-position: center; border: 1px solid var(--border); }
        .product-details { flex: 1; }
        .product-details h4 { font-size: 0.9rem; color: var(--text-main); margin-bottom: 2px; }
        .product-details span { font-size: 0.8rem; color: var(--primary); font-weight: 700; }
        .product-sales { text-align: right; }
        .product-sales strong { display: block; font-size: 1rem; color: var(--text-main); }
        .product-sales span { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }

        @media (max-width: 1200px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dashboard-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .seller-dashboard { grid-template-columns: 1fr; }
          .dashboard-sidebar { display: none; }
          .dashboard-content { padding: 1.5rem; }
          .search-box { width: 100%; }
        }
        .mt-8 { margin-top: 2rem; }
      ` }} />
    </div>
  );
}
